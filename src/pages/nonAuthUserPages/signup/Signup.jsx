import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Signup.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
const Signup = (props) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        email: "",
        name: ""
    });

    const [error, setError] = useState({
        email: false,
        name: false,
        inValidEmail: false
    });


    useEffect(() => {
        const signupemail = localStorage.getItem("signupemail");
        const signupname = localStorage.getItem("signupname");
        if (signupemail && signupname) {
            setState({
                name: signupname,
                email: signupemail
            })
        }
    }, []);

    const onChange = (e) => {
        console.log(e.target.value);
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        if (e.target.name === "email") {
            setError(prevState => ({
                ...prevState,
                email: false,
                inValidEmail: false
            }));
        } else {
            setError(prevState => ({
                ...prevState,
                [e.target.name]: false
            }));
        }

    }

    const onClick = async () => {
        const { email, name } = state;
        if (email === "") {
            setError(prevState => ({ ...prevState, email: true }));
            return;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setError(prevState => ({ ...prevState, inValidEmail: true }));
            return;
        } else if (name === "") {
            setError(prevState => ({ ...prevState, name: true }));
            return;
        }
        setLoader(true);
        try {
            const res = await axios.post(
                `${base_url}?path=signup`,
                JSON.stringify({
                    email,
                    name
                })
            );
            setLoader(false);
            console.log(res);
            const { status, data } = res.data;
            if (status === "error") {
                NotificationManager.error(data.message, "Error", 4000);
            } else {
                localStorage.setItem("signupemail", state.email);
                localStorage.setItem("signupname", state.name);
                navigate(`/otpVerify`)
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    return (
        <div className="signupPage"   >

            {
                !loader && <>
                    <div className="signupPageLogo" >
                        Logo
                    </div>
                    <div className="signupPageLLC"  >
                        Sign up to Let's Learn Code
                    </div>
                    <div className="signupPageInputContainer" >
                        <label className="signupPageInputLabel" >{error.name ? "😎 Please provide your name." : ""}</label>
                        <Input
                            width={300}
                            placeholder="Name"
                            type="text"
                            onChange={onChange}
                            name={"name"}
                            value={state.name}
                        />
                    </div>
                    <div style={{ marginBottom: 12 }} className="signupPageInputContainer"  >
                        <label className="signupPageInputLabel" >{error.email ? "📧 Please provide your email." : error.inValidEmail ? "📧 Please enter a valid email." : ""}</label>
                        <Input
                            width={300}
                            placeholder="Email"
                            type="email"
                            onChange={onChange}
                            name={"email"}
                            value={state.email}
                        />
                    </div>

                    <Button
                        width={300}
                        height={34}
                        onClick={onClick}
                    >Sign up</Button>
                    <div className="signupPageContainerLogin" >
                        Already have an account? <span onClick={() => navigate("/login")} className="signupPageLogin" >Login in</span>
                    </div>
                </>
            }


            {
                loader && <div className="signupLoader" >
                    <Loader />
                </div>
            }
            <NotificationContainer />
        </div>
    )
}

export default Signup;
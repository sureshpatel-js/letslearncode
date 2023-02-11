import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./ForgotPassword.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        email: "",
    });

    const [error, setError] = useState({
        email: false,
        inValidEmail: false
    });


    useEffect(() => {
        const signupemail = localStorage.getItem("signupemail");

        if (signupemail) {
            setState({
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
        setError(prevState => ({
            ...prevState,
            email: false,
            inValidEmail: false
        }));


    }

    const onClick = async () => {
        const { email } = state;
        if (email === "") {
            setError(prevState => ({ ...prevState, email: true }));
            return;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setError(prevState => ({ ...prevState, inValidEmail: true }));
            return;
        }
        setLoader(true);
        try {
            const res = await axios.post(
                `${base_url}?path=generateOtp`,
                JSON.stringify({
                    email,
                })
            );
            console.log(res);
            const { status, data } = res.data;
            setLoader(false);
            if (status === "error") {
                NotificationManager.error(data.message, "Error", 4000);
            } else {
                localStorage.setItem("signupemail", state.email);
                navigate(`/otpVerify`)
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    return (
        <div className="forgotPasswordPage"   >
            {
                !loader && <>
                    <div className="forgotPasswordPageLogo" >
                        Logo
                    </div>
                    <div className="forgotPasswordPageLLC"  >
                        Let's Learn Code
                    </div>
                    <div style={{ marginBottom: 12 }} className="forgotPasswordPageInputContainer"  >
                        <label className="forgotPasswordPageInputLabel" >{error.email ? "📧 Please provide your email." : error.inValidEmail ? "📧 Please enter a valid email." : ""}</label>
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
                    >Confirm</Button>
                    <div className="forgotPasswordPageContainerLogin" >
                        Please enter your email which you have used durign signup.
                    </div>
                </>
            }


            {
                loader && <div className="forgotPasswordLoader" >
                    <Loader />
                </div>
            }
            <NotificationContainer />
        </div>
    )
}

export default ForgotPassword;
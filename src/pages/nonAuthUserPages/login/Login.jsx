import { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Login.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: false,
        password: false,
        inValidEmail: false
    });

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
        const { email, password } = state;
        if (email === "") {
            setError(prevState => ({ ...prevState, email: true }));
            return;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setError(prevState => ({ ...prevState, inValidEmail: true }));
            return;
        } else if (password === "") {
            setError(prevState => ({ ...prevState, password: true }));
            return;
        }

        try {
            const res = await axios.post(
                `${base_url}?path=login`,
                JSON.stringify({
                    email,
                    password
                })
            );
            const { status, data } = res.data;
            if (status === "error") {
                NotificationManager.error(data.message, "Error", 3000);
                console.log("=====ERROR=====>", res);
            } else {
                //NotificationManager.success(data.message, "Success", 3000);
                console.log("=====SUCCESS=====>", res);
                const { token, user } = res.data.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/home/courses");
            }
        } catch (error) {
            console.log(error);
        }

        console.log("success")
    }
    return (
        <div className="loginPage"   >
            <div className="loginPageLogo" >
                Logo
            </div>
            <div className="loginPageLLC"  >
                Log in to Let's Learn Code
            </div>
            <div className="loginPageInputContainer"  >
                <label className="loginPageInputLabel" >{error.email ? "📧 Please provide your email." : error.inValidEmail ? "📧 Please enter valid email." : ""}</label>
                <Input
                    width={300}
                    placeholder="Email"
                    type="text"
                    onChange={onChange}
                    name={"email"}
                    value={state.email}
                />
            </div>
            <div className="loginPageInputContainer" >
                <label className="loginPageInputLabel" >{error.password ? "🗝️ Please provide your password." : ""}</label>
                <Input
                    width={300}
                    placeholder="Password"
                    type="password"
                    onChange={onChange}
                    name={"password"}
                    value={state.password}
                />
            </div>


            <div className="loginPageForgotPassword" >
                <span  onClick={()=>navigate("/forgotPassword")}> Forgot your password?</span>
            </div>
            <Button
                width={300}
                height={34}
                onClick={onClick}
            >Log in</Button>
            <div className="loginPageContainerSignUp" >
                Don't have an account yet? <span onClick={() => navigate("/signup")} className="loginPageSignUp" >Sign up</span>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default Login;
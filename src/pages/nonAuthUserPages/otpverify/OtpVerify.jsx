import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./OtpVerify.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate, useParams } from "react-router-dom";
const OtpVerify = (props) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        otp: "",
        password: "",
        email: ""
    });

    const [error, setError] = useState({
        otp: false,
        password: false,
        email: false
    });
    const [logic, setLogic] = useState({
        reSendOtp: true,
        seconds: ""
    });
    useState(() => {
        const email = localStorage.getItem("signupemail");
        setState(prevState => ({
            ...prevState,
            email
        }));
    }, []);
    const counter = () => {
        setLogic(prevState => ({ ...prevState, reSendOtp: false }));
        let s = 30;
        const tick = () => {
            if (s > 0) {
                setTimeout(tick, 1000);
                s = s - 1;
                setLogic(prevState => ({ ...prevState, seconds: s }));
            } else {
                setLogic(prevState => ({ ...prevState, reSendOtp: true }));
            }
        }
        tick()
    }
    useEffect(() => {
        counter();
    }, []);
    const onChange = (e) => {
        console.log(e.target.value);
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setError(prevState => ({
            ...prevState,
            [e.target.name]: false
        }));


    }

    const onClick = async () => {
        const { otp, password, email } = state;
        if (otp === "") {
            setError(prevState => ({ ...prevState, otp: true }));
            return;
        } else if (email === "") {
            setError(prevState => ({ ...prevState, inValidEmail: true }));
            return;
        } else if (password === "") {
            setError(prevState => ({ ...prevState, password: true }));
            return;
        }

        try {
            const res = await axios.post(
                `${base_url}?path=otpVerify`,
                JSON.stringify({
                    email,
                    otp,
                    password
                })
            );
            console.log(res);
            const { status, data } = res.data;
            if (status === "error") {
                console.log("=====ERROR=====>", res);
                NotificationManager.error(data.message, "Error", 4000);
            } else {
                console.log("=====SUCCESS=====>", res);
                navigate("/home/courses")
                //NotificationManager.success(data.message, "Success", 3000);
            }
        } catch (error) {
            console.log(error);
        }
        console.log("success")
    }

    const reSendOtp = async () => {
        try {
            const res = await axios.post(
                `${base_url}?path=generateOtp`,
                JSON.stringify({
                    email: state.email
                }),
            );
            console.log(res);
            const { status, data } = res.data;
            if (status === "error") {
                console.log("=====ERROR=====>", res);
                NotificationManager.error(data.message, "Error", 4000);
            } else {
                //NotificationManager.success(data.message, "Success", 3000);
                console.log("=====SUCCESS=====>", res);
                counter();
            }
        } catch (error) {
            console.log(error);
        }
        console.log("success")
    }

    return (
        <div className="otpVerifyPage"   >
            <div className="otpVerifyPageLogo" >
                Logo
            </div>
            <div className="otpVerifyPageInfo"  >
                Verify your email
            </div>
            <div className="otpVerifyPageInputContainer"  >
                <label onClick={() => navigate("/signup")} className="otpVerifyInputLabelDefault" >Edit Email 📧 </label>
                <Input
                    width={300}
                    placeholder="Email"
                    type="email"
                    onChange={onChange}
                    name={"email"}
                    value={state.email}
                    disabled={true}
                />
            </div>
            <div className="otpVerifyPageInputContainer" >
                <label className="otpVerifyPageInputLabel" >{error.name ? "🔐 Please enter otp." : ""}</label>
                <Input
                    width={300}
                    placeholder="OTP"
                    type="number"
                    onChange={onChange}
                    name={"otp"}
                    value={state.otp}
                />
            </div>
            <div style={{ marginBottom: 12 }} className="otpVerifyPageInputContainer"  >
                <label className="otpVerifyPageInputLabel" >{error.password ? "🗝️ Please create new password." : ""}</label>
                <Input
                    width={300}
                    placeholder="Password"
                    type="password"
                    onChange={onChange}
                    name={"password"}
                    value={state.password}
                />
            </div>

            <Button
                width={300}
                height={34}
                onClick={onClick}
            >Verify</Button>
            <div className="otpVerifyOtpCount" >
                OTP has been sent to your registered email address.  {logic.reSendOtp ? <span onClick={reSendOtp} className="otpVerifyResent" >Resend OTP</span> : <span className="otpVerifyResent" >Fetching OTP:{logic.seconds} s</span>}
            </div>
            <NotificationContainer />
        </div>
    )
}

export default OtpVerify;
import { useState } from "react";
import "./Input.css";
const Input = (props) => {
    const [state, setState] = useState({
        borderColor: "white"
    });
    const onFocus = () => {
        setState(prevState => ({
            ...prevState,
            borderColor: "#5cebdf"
        }))
    }
    const onBlur = () => {
        setState(prevState => ({
            ...prevState,
            borderColor: "white"
        }))
    }
    return <div style={{ width: props.width, border: `2px solid ${state.borderColor}` }} className="input-container" >
        <input
            type={props.type ? props.type : "text"}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={props.placeholder}
            onChange={props.onChange}
            name={props.name}
            value={props.value}
            disabled={props.disabled ? props.disabled : false}
        />
    </div>
}

export default Input;
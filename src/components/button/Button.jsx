
import "./Button.css";
const Button = (props) => {
    return <div style={{
        width: props.width,
        height: props.height
    }} className="button-container"
        onClick={props.onClick}
    >
        <div className="button">
            {props.children}
        </div>
    </div>
}

export default Button;
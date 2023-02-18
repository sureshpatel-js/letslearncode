
import { useEffect, useState } from "react";
import "./MyCoursesTile.css";
const MyCoursesTile = (props) => {
    const [state, setState] = useState({
        name: "",
        email: ""
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const { name, email } = user;
            setState({
                name,
                email
            })
        }
    }, [])
    console.log(state)
    const { course } = props;
    const enrolled_date = new Date(course.enrolled_date).toISOString();
    const start_date = new Date(course.start_date).toISOString();
    return (
        <div className="myCoursesTile" >
            <div className="myCoursesTileName" >Course name<br />➡️<span>{course.name}</span></div>
            <div className="myCoursesTileEnrolledDate" >Enrolled Date<br />➡️ <span>{enrolled_date.split("T")[0]}</span></div>
            <div className="myCoursesTileStartDate" >Live class Start from<br />➡️ <span>{start_date.split("T")[0]} </span></div>
            <div className="myCoursesTileConnect" >If you have any query, feel free to connect with me<br />➡️ <a href={`https://wa.me/${course.connect}?text=My Name ${state.name} My Email ${state.email} Please type your query here`} ><i class="bi bi-whatsapp"></i> {course.connect}</a></div>
        </div>
    )
}

export default MyCoursesTile;
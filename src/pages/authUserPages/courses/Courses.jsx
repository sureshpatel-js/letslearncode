import { useEffect, useState } from "react";
import CourseTile from "../../../components/courseTile/CourseTile";
import "./Courses.css";
import axios from "axios";
import { base_url } from "../../../appConstants";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
const Courses = (props) => {
    const navigate = useNavigate();
    const [coursesArray, setCoursesArray] = useState([]);
    const [loader, setLoader] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        (async () => {
            try {
                setLoader(true);
                const res = await axios.post(
                    `${base_url}?path=getAllCourses`
                )
                const { status, data } = res.data;
                setLoader(false);
                if (status === "error") {
                    console.log("=====ERROR=====>", res);
                } else {
                    //NotificationManager.success(data.message, "Success", 3000);
                    console.log("=====SUCCESS=====>", res);
                    const { courses_array } = res.data.data;
                    setCoursesArray(courses_array);
                }
            } catch (error) {
                console.log(error);
                setLoader(false);
            }

        })();
    }, []);
    const enrollNow = (id) => {
        console.log("=====>", id);
        navigate(`/home/coursesDetail/${id}`);
    }

    return (
        <div className="authUserCourses" >
            {
                coursesArray.length > 0 && <>
                    <div className="authUserCoursesContentTwo" >
                        Hey {user.name}!
                    </div>
                    <div className="authUserCoursesContentOne" >
                        Let's go 🚀
                    </div>

                    <div className="authUserCourseTileContainer" >
                        {
                            coursesArray.length > 0 && coursesArray.map((course) => {
                                return <CourseTile onClick={() => enrollNow(course.id)} course={course} actionText={"Enroll now 🚀"} />
                            })
                        }
                    </div></>
            }
            {loader &&
                <div className="authUserCoursesLoader" >
                    <Loader />
                </div>
            }
        </div >
    )
}
export default Courses;
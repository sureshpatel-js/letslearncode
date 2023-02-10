import { useEffect, useState } from "react";
import CourseTile from "../../../components/courseTile/CourseTile";
import "./Courses.css";
import axios from "axios";
import { base_url } from "../../../appConstants";
import Loader from "../../../components/loader/Loader";
const Courses = (props) => {
    const [coursesArray, setCoursesArray] = useState([]);
    const [loader, setLoader] = useState(false);
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
    return (
        <div className="authUserCourses" >
            {
                !loader && <><div className="authUserCoursesContentOne" >
                    Let's go 🚀
                </div>
                    <div className="authUserCoursesContentTwo" >
                        Web Development using HTML5 and CSS3 from scratch. Includes a project, deployment and domain integration for Beginner.
                    </div>
                    <div className="authUserCourseTileContainer" >
                        {
                            coursesArray.length > 0 && coursesArray.map((course) => {
                                return <CourseTile course={course} />
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
import { useEffect, useState } from "react";
import "./MyCourses.css";
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import MyCoursesTile from "./MyCoursesTile";
import { NotificationContainer, NotificationManager } from 'react-notifications';
const MyCourses = (props) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [loader, setLoader] = useState(false);
    const [coursesArray, setCoursesArray] = useState([]);
    useEffect(() => {
        (async () => {
            setLoader(true);
            try {
                const res = await axios.post(
                    `${base_url}?path=getMyCourses&token=${token}`
                )
                const { status, data } = res.data;
                setLoader(false);
                if (status === "error") {
                    console.log("=====ERROR=====>", res);
                    NotificationManager.error(data.message, "Error", 3000);
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
        <div className="authUserMyCourses" >

            {
                !loader && <div className="authUserMyCourseTileContainer" >
                    {
                        coursesArray.length > 0 && <>
                            {/* <div className="authUserMyCoursesContentOne" >

                            </div> */}
                            <div className="authUserMyCoursesContentTwo" >
                                You are enrolled in {coursesArray.length} Course.
                            </div>
                        </>
                    }

                    {
                        coursesArray.length > 0 ? coursesArray.map((course) => {
                            return <MyCoursesTile course={course} />
                        }) : <div className="authUserMyCoursesContentThree">
                            <div>
                                Your are not enrolled any of our courses.
                            </div>
                            <div onClick={() => navigate("/home/courses")} className="authUserMyCoursesEnrollNow" >
                                <span > Enroll now 🚀</span>
                            </div>
                        </div>

                    }

                </div>
            }
            {loader &&
                <div className="authUserMyCoursesLoader" >
                    <Loader />
                </div>
            }
            <NotificationContainer />
        </div >
    )
}
export default MyCourses;
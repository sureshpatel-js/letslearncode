import { useEffect, useState } from "react";
import CourseTile from "../../../components/courseTile/CourseTile";
import "./MyCourses.css";
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
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
            {/* <div className="authUserMyCoursesContentOne" >
            
            </div>
            <div className="authUserMyCoursesContentTwo" >
    
            </div> */}
            {
                !loader && <div className="authUserMyCourseTileContainer" >
                    {
                        coursesArray.length > 0 ? coursesArray.map((course) => {
                            return <CourseTile course={course}  actionText={"Start 🚀"}  />
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
        </div >
    )
}
export default MyCourses;
import { useState, useEffect } from "react";
import { base_url } from "../../../appConstants";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import CourseTile from "../../../components/courseTile/CourseTile";
import { NON_AUTH_SIDEBAR_MENU_ITEMS } from "../../../appConstants";
import "./LandingPageCourseView.css";
const LandingPageCourseView = () => {
    const navigate = useNavigate();
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
    const enrollNow = () => {
        navigate("/login");
    }
    return (
        <div className="landingPageCourseView" >
            {
                coursesArray.length > 0 && <><div className="landingPageCourseViewOne" >
                    If you are an entrepreneur who wants to build his web app by learning code or you want to just learn code then this is the right place for you. 🚀
                </div>
                    <div className="landingPageCourseViewTwo" >
                        Our aim is not only to teach you a programming language or a framework but also to share with you the experience which we have gained while working with big companies.
                    </div>
                    <div className="landingPageCourseViewTileContainer" >
                        {
                            coursesArray.length > 0 && coursesArray.map((course) => {
                                return <CourseTile onClick={() => enrollNow(course.id)} course={course} actionText={"Enroll now 🚀"} />
                            })
                        }
                    </div></>
            }

            {loader &&
                <div className="landingPageCourseViewLoader" >
                    <Loader />
                </div>
            }
        </div>
    )
}

export default LandingPageCourseView;
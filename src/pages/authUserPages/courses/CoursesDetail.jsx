import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "../../../appConstants";
import axios from "axios";
import "./CoursesDetail.css"
import { useState } from "react";
import Loader from "../../../components/loader/Loader";
const CoursesDetail = () => {
    const [courseDetails, setCourseDetails] = useState();
    const [loader, setLoader] = useState(false);
    const params = useParams();
    useEffect(() => {
        console.log("params", params);
        setLoader(true);
        (async () => {
            try {
                const res = await axios.post(
                    `${base_url}?path=getCoursesDetailById`,
                    JSON.stringify({
                        course_id: params.id
                    })
                );
                setLoader(false);
                const { status, data } = res.data;
                if (status === "error") {
                    console.log("=====ERROR=====>", res);
                } else {
                    //NotificationManager.success(data.message, "Success", 3000);
                    console.log("=====SUCCESS=====>", res);
                    const { courses_array } = data;
                    if (courses_array.length > 0) {
                        setCourseDetails(courses_array[0]);
                    }

                }
            } catch (error) {
                console.log(error);
                setLoader(false);
            }
        })()


    }, [])

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
    return (
        <div className="coursesDetail">
            {
                courseDetails && <> <div className="coursesDetailHeader">
                    <div className="coursesDetailHeaderInOne" >{courseDetails.name}</div>
                    <div className="coursesDetailHeaderInTwo">{courseDetails.course_type}</div>
                </div>
                    <div className="coursesDetailPayment" >

                        <div className="coursesDetailPaymentAmout">Course price <span>{courseDetails.price}</span> only.</div>
                        <div className="coursesDetailPaymentUpi">Pay us at (Upi :<span>{courseDetails.pay_us_at}</span>)</div>
                
                    </div>
                    <div className="coursesDetailStillConfused" >
                        Still Confused??🤔 Get Counselled at :<a href={`https://wa.me/${courseDetails.counselled_number}?text=My Name ${state.name} My Email ${state.email} want to know more about ${courseDetails.name} course`} ><i class="bi bi-whatsapp"></i> {courseDetails.counselled_number}</a>
                    </div>
                    <div className="coursesDetailWhatYouWillLearn" >
                        <div className="coursesDetailWhatYouWillLearnHeader" ><span>What you will learn 🔥</span></div>
                        <div className="coursesDetailWhatYouWillLearnContent">
                            {
                                courseDetails.what_you_will_learn.map(el => {
                                    return <div className="whatYouWillLearnEl" >👉 <div>{el}</div></div>
                                })
                            }
                        </div>
                    </div>
                    <div className="coursesDetailCourseContent" >
                        <div className="coursesDetailCourseContentHeader" >
                            <span> Course Content 📚</span>
                        </div>
                        <div className="coursesDetailCourseContentContainer" >
                            {
                                courseDetails.course_content.length > 0 && courseDetails.course_content.map(weekObj => {
                                    return (
                                        <div className="coursesDetailCourseContentTile">
                                            < div className="coursesDetailCourseContentTileHeader" ><span>➡️ {weekObj.time_range}</span></div>
                                            {
                                                weekObj.content.length > 0 && weekObj.content.map(content => {
                                                    return <div className="coursesDetailCourseContentTileEl" > <div><i class="bi bi-dot"></i> {content}</div></div>
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            }
            {
                loader &&
                <div className="authUserCoursesDetailLoader" >
                    <Loader />
                </div>
            }

        </div >
    )
}

export default CoursesDetail;
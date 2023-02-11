import "./CoursesDetail.css"
const CoursesDetail = () => {
    return (
        <div className="coursesDetail">
            <div className="coursesDetailHeader">
                <div className="coursesDetailHeaderInOne" >JavaScript</div>
                <div className="coursesDetailHeaderInTwo">Live Course 👨‍💻</div>
            </div>
            <div className="coursesDetailPayment" >

                <div className="coursesDetailPaymentAmout">Course price <span>Rs 9999</span> only.</div>
                <div className="coursesDetailPaymentUpi">Pay us at (Upi :<span>sureshpatel@dbs</span>)</div>
                <div className="coursesDetailPaymentCourseId" >CI25</div>
            </div>
            <div className="coursesDetailStillConfused" >
                Still Confused??🤔 Get Counselled at :<a href="https://wa.me/9833461330?text=Hello world" ><i class="bi bi-whatsapp"></i> 9833461330</a>
            </div>
            <div className="coursesDetailWhatYouWillLearn" >
                <div className="coursesDetailWhatYouWillLearnHeader" >What you will learn</div>
                <div className="coursesDetailWhatYouWillLearnContent">
                    <div>Learn how to use Git and GitHub to effectively manage your source code</div>
                    <div>Enhance your workflow with tools like package management and Docker</div>
                    <div>Automate your software development process with continuous integration and continuous delivery</div>
                    <div>Master the art of container management with Kubernetes</div>
                </div>
            </div>
            <div className="coursesDetailCourseContent" >
                <div className="coursesDetailCourseContentHeader" >
                    Course Content
                </div>
            </div>
        </div >
    )
}

export default CoursesDetail;
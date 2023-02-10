import "./CourseTile.css"
const CourseTile = (props) => {
    const { course } = props;
    return (
        <div className="courseTile" >
            <iframe width="320" height="215" src={course.video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div className="courseTileTitle" >
                {course.name}
            </div>
            <div className="courseTileDescription" >
                {course.description}
            </div>
        </div>
    )
}

export default CourseTile;
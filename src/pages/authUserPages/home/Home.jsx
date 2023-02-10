import { useEffect, useState } from "react";
import CourseTile from "../../../components/courseTile/CourseTile";
import "./Home.css";
import Course from "../courses/Courses";
import { Outlet, useNavigate } from "react-router-dom";
import { SIDEBAR_MENU_ITEMS } from "../../../appConstants";

const Home = (props) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    }
    const menuItemClicked = (url) => {
        navigate(url);
        toggleSidebar();
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }
    }, []);

    const logout = () => {
        toggleSidebar();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className="home" >
            <div onClick={toggleSidebar} className="homeHeader" >
                <div className="homeHeaderLeft" >
                    <i className={`homeHeaderRightIcon bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`} ></i>
                </div>
                <div className="homeHeaderRight">

                </div>
            </div>
            <div className={`homeSidebar ${sidebarOpen ? "homeSidebarOpen" : "homeSidebarClose"}`} >
                <div className="homeSidebarElementContainer" >
                    {
                        SIDEBAR_MENU_ITEMS.map(el => {
                            return (
                                <div onClick={() => menuItemClicked(el.url)} className="homeSidebarElement" >
                                    {el.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="homeSidebarLogout" >
                    <span onClick={logout} >Logout</span>
                </div>
            </div>
            <div className="homeBody" >
                <Outlet />
            </div>
        </div>
    )
}
export default Home;
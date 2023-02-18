import { useEffect, useState } from "react";
import CourseTile from "../../../components/courseTile/CourseTile";
import "./Home.css";
import Course from "../courses/Courses";
import { Outlet, useNavigate } from "react-router-dom";
import { SIDEBAR_MENU_ITEMS } from "../../../appConstants";

const Home = (props) => {
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

    const personClick = () => {
        alert(`
        Name: ${state.name}
        Email: ${state.email}
        `)
    }

    return (
        <div className="home" >
            <div className="homeHeader" >
                <div className="homeHeaderLeft" >
                    <div onClick={toggleSidebar} >
                        <i className={`homeHeaderRightIcon bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`} ></i>
                    </div>
                </div>
                <div style={{ fontSize: 18, paddingRight: 16 }} >
                    Let's learn code
                </div>
                <div onClick={personClick} className="homeHeaderRight">
                    <i class="bi bi-person-circle"></i>
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
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NON_AUTH_SIDEBAR_MENU_ITEMS } from "../../../appConstants";
import "./LandingPage.css";
const LandingPage = () => {
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
        if (token) {
            navigate("/home/courses");
        }
    }, []);
    return (
        <div className="landingPage" >
            <div className="landingPageHeader" >
                <div className="landingPageHeaderLeft" >
                    <div onClick={toggleSidebar} >
                        <i className={`landingPageHeaderRightIcon bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`} ></i>
                    </div>
                </div>
                <div style={{ fontSize: 18, paddingRight: 54 }} >
                    Let's learn code
                </div>
                <div className="landingPageHeaderRight">

                </div>
            </div>
            <div className={`landingPageSidebar ${sidebarOpen ? "landingPageSidebarOpen" : "landingPageSidebarClose"}`} >
                <div className="landingPageSidebarElementContainer" >
                    {
                        NON_AUTH_SIDEBAR_MENU_ITEMS.map(el => {
                            return (
                                <div onClick={() => menuItemClicked(el.url)} className="landingPageSidebarElement" >
                                    {el.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="landingPageBody" >
                <Outlet />
            </div>
        </div>
    )
}

export default LandingPage;
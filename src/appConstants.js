//exports.base_url = "https://script.google.com/macros/s/AKfycbzDn3V2xkoOZ7ezZT-H5A3gNOIa7hhxk5ZWon5gZiGUDxkAs41uRZA4o5OOFXLOy3qgXQ/exec";  //dev
exports.base_url = "https://script.google.com/macros/s/AKfycbyQ47RktZ34r7H1ZA_vID-3tRffrcCSy7ARvXEDn8IchjwrtIkcSqiJzO27ewNPQH4-dg/exec"   //production
exports.SIDEBAR_MENU_ITEMS = [
    {
        name: "My courses",
        url: "/home/myCourses"
    },
    {
        name: "Courses",
        url: "/home/courses"
    }
]

exports.NON_AUTH_SIDEBAR_MENU_ITEMS = [
    {
        name: "Courses",
        url: "/"
    },
    {
        name: "Log in",
        url: "/login"
    },
    {
        name: "Sign up",
        url: "/signup"
    }
]

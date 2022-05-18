import { calendar, actcalendar, user, actuser, account, actaccount, setting, actsetting } from "../component/Header/svg/index";

const navbarItem = [{
        "name": "calendar",
        "href": "/calendar",
        "icon": [calendar, actcalendar]
    },
    {
        "name": "user",
        "href": "/user/",
        "icon": [user, actuser]
    },
    {
        "name": "account",
        "href": "/account",
        "icon": [account, actaccount]
    },
    {
        "name": "setting",
        "href": "/setting",
        "icon": [setting, actsetting]
    }
]
export default navbarItem
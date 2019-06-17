import Home from "./views/Home";
import Calendar from "./views/Calendar";

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar
        },
    ]
}
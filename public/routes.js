import bugApp from "./js/pages/bug-app.cmp.js";
import bugDetails from "./js/pages/bug-details.cmp.js";
import bugEdit from "./js/pages/bug-edit.cmp.js";
import bugLogin from "./js/pages/bug-login.cmp.js";
import bugSignup from "./js/pages/bug-signup.cmp.js";
import usersAdmin from './js/pages/user-admin.cmp.js';
import userDetails from './js/pages/user-details.cmp.js'

// import { signup } from "../services  /user.service.js";


const bugRoutes = [
  {
    path:'/',
    component:bugLogin
  },
  {
    path: "/bug",
    component: bugApp,
  },
  {
    path: "/user",
    component: usersAdmin,
  },
  {
    path: "/user/:id?",
    component: userDetails,
  },
  {
    path: "/bug/edit/:id?",
    component: bugEdit,
  },
  {
    path: "/signup",
    component: bugSignup,
  },
  {
    path: "/bug/:id?",
    component: bugDetails,
  },
];

export const bugRouter = new VueRouter({ routes: bugRoutes });

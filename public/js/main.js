
import { bugRouter } from "../routes.js";
import bugApp from "./pages/bug-app.cmp.js";
import appHeader from "./cmps/app-header.cmp.js"
import {userService} from './services/user.service.js'

// import bugLogin from './pages/bug-login.cmp.js'

var app = new Vue({ 
  el: "#app",
  router: bugRouter,
  template: `
    <div>
        <app-header  :loggedInUser="loggedInUser"/>
        <router-view/>
</div>
    `,data(){
      return{
        loggedInUser: userService.getLoggedInUser(),

      }
    },
  components: {
    bugApp,
    appHeader
  },
  created(){

  }
});

import { bugService } from "../services/bug.service.js";
import {userService} from '../services/user.service.js'

export default {
    name:"user-details",
  template: ` 
    <section v-if="user" class="user-details">
    <h2> User Details - {{user._id}} </h2>
    <img class="user-details-profile-pic" :src="user.profilePicSrc">

        <h3>Full Name: {{user.fullName}}</h3>
        <h3>Username: {{user.userName}}</h3>
        <h3>Total tickets created: {{userBugCount}}</h3>

    </section>
    `,
  data() {
    return {
      user: null,
      loggedInUser: userService.getLoggedInUser(),
      userBugCount:null,


    };
  },
  created() {
    if (!this.loggedInUser){this.$router.push('/');}

      const userId = this.$route.params.id;
    if (userId) {
      userService.getById(userId)
        .then((user) => {
            this.user = user;
      });
    }
    bugService.userBugCount(userId)
      .then(count=>{
        this.userBugCount=count;
      })
  },
};

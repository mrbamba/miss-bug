import { bugService } from "../services/bug.service.js";
import {userService} from '../services/user.service.js'

export default {
    name:"bug-details",
  // props:['bug'],
  template: ` 
    <section v-if="bug" class="bug-details">
        <h2> Bugs Details - {{bug._id}} </h2>

        <h3>Title: {{bug.title}}</h3>
        <p>Severity: {{bug.severity}}</p>
        <p>Done: {{bug.isDone}}</p>
        <p>Created: {{timeFormatted}}</p>
        <p @click="openUserDetails" class="bug-details-creator">Created by: {{bug.creator.fullName}}</p>
        <p>Description: {{bug.description}}</p>
        <button class="bug-details-button">            
        <router-link to="/bug" class="bug-details-back"><i class="fas fa-tasks"></i> Back to Bugs</router-link>
        </button>
    </section>
    `,
  data() {
    return {
      bug: null,
      timeInMs: Date.now(),
      loggedInUser: userService.getLoggedInUser(),


    };
  },
  created() {
    if (!this.loggedInUser){this.$router.push('/');}

      const bugId = this.$route.params.id;
    if (bugId) {
      bugService.getById(bugId).then((bug) => {
        this.bug = bug;
      });
    }
  },
  computed: {
    timeFormatted() {
        let bugTime = new Date(this.bug.createdAt);
        console.log(bugTime)
        if (this.timeInMs - this.bug.createdAt < 86400000) {
          if(bugTime.getMinutes()<=9){
                return `${bugTime.getHours()}:0${bugTime.getMinutes()}`;
            }else{ return `${bugTime.getHours()}:${bugTime.getMinutes()}`;}
        } else if (this.timeInMs - this.bug.createdAt < 31536000000) {
          return `${bugTime.getDate()}/${bugTime.getMonth()+1}`;
        } else return `${bugTime.getMonth()+1}/${bugTime.getFullYear()}`;
      },
  },
  methods:{
    openUserDetails(){
      this.$router.push('/user/'+this.bug.creator._id)

    }
  }
};

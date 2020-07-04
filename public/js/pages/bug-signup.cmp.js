import {userService} from '../services/user.service.js'


export default {
    template:`<div>
    <h3> Sign up now to enjoy early entry to our Bug app</h3>
    <form  @submit.prevent="signup">
            <input type="text" v-model="credentials.userName" placeholder="Username" />
            <input type="password" id="pass" name="password" minlength="4" required v-model="credentials.password">            
            <button><i class="fas fa-sign-in-alt"></i></button>
        </form></div>
    `,
     data(){
        return{
            // loggedInUser: userService.getLoggedInUser(),
            credentials: {
                userName: '',
                password:null,
            },
            // bugs:null
        }
    },
    methods:{
        signup(){
            userService.addUser(this.credentials)
                .then(loggedInUser =>{
                    console.log('Logged in', loggedInUser);
                    // this.loggedInUser = loggedInUser;
                    this.$router.push('/bug');
                })
        },
    }
}
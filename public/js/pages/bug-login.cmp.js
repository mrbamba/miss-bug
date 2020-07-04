import {userService} from '../services/user.service.js'


export default{
    template:`
    <div>
    <h2>Enter your login details below to login</h2>
    <form  @submit.prevent="login">
            <input type="text" v-model="credentials.userName" placeholder="Username" />
            <input type="password" id="pass" name="password" minlength="4" required v-model="credentials.password">            
            <button><i class="fas fa-sign-in-alt"></i></button>
        </form>
        <h3>Don't have a user yet?<router-link to="/signup"> Signup! </router-link></h3>
    </div>`,
     data(){
        return{
            loggedInUser: userService.getLoggedInUser(),
            credentials: {
                userName: ''
            },
            // bugs:null
        }
    },
    methods:{
        login(){
            userService.login(this.credentials)
                .then(loggedInUser =>{
                    console.log('Logged in', loggedInUser);
                    this.loggedInUser = loggedInUser;
                    this.$router.push('/bug');
                })
        },
    }
}
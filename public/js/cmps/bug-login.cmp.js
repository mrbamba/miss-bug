import {userService} from '../services/user.service.js'


export default{
    name:"login",
    template:`
    <div class="login-cmp flex">
    <h2>Login: </h2>
    <form  @submit.prevent="login">
            <input type="text" v-model="credentials.userName" placeholder="Username" />
            <input type="password" id="pass" name="password" minlength="4" required v-model="credentials.password">            
            <button><i class="fas fa-sign-in-alt"></i></button>
        </form>
    </div>`,
     data(){
        return{
            loggedInUser: userService.getLoggedInUser(),
            credentials: {
                userName: ''
            },
        }
    },
    methods:{
        login(){
            userService.login(this.credentials)
                .then(loggedInUser =>{
                    console.log('Logged in', loggedInUser);
                    this.loggedInUser = loggedInUser;
                    this.$router.push('/bug');
                    this.$emit('checkLoggedInUser')
                })
        },
    }
}
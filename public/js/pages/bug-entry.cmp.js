import {userService} from '../services/user.service.js'


export default{
    template:`
    <div class="bug-entry">
    <h2>Enter your login details above to login</h2>
    
        <h3>Don't have a user yet?<router-link to="/signup"> Signup! </router-link></h3>

        <h3>For testing use the following credentials:</h3>
        <p>
            user: dan<br>
            password: Test<br><br>
            user: admin<br>
            password: admin
        </p>
    </div>`,
     
    methods:{
    }
}
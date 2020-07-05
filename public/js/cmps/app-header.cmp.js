
import {userService} from '../services/user.service.js'
import bugLogin from '../cmps/bug-login.cmp.js'

export default{
    name:"app-header",
    // props:['loggedInUser'],
    template:`
    <section class="app-header flex space-between just">
    <h1> Miss Bug</h1>
    <ul class="bug-list flex clean-list flex-row " v-if="loggedInUser">
        <!-- <bug-preview v-for="bug in bugs"  :bug="bug" :key="bug._id" :loggedInUser="loggedInUser" v-on:remove="remove" /> -->
        <li class="app-header-links">
            <router-link to="/bug/edit"><i class="fas fa-plus"></i> Add</router-link>
        </li>
        
        <li class="app-header-links">
            <router-link to="/bug"><i class="fas fa-tasks"></i> Bugs</router-link>
        </li>
        
        <li v-if="loggedInUser.isAdmin" class="app-header-links">
            <router-link to="/user"><i class="fas fa-users"></i> Users</router-link>
        </li>

        <li class="app-header-links" @click="logout" >
            {{loggedInUser.fullName}} 
            <i class="fas fa-sign-out-alt"></i>
        </li>
    </ul>
    <bug-login v-else @checkLoggedInUser="checkLoggedInUser"/>
</section>
    `,data(){
        return{
            loggedInUser:null,
            // loggedInUser: userService.getLoggedInUser(),
        }
    },
    created(){
            this.loggedInUser= userService.getLoggedInUser();

    },
    methods:{
        logout(){
            this.loggedInUser=null;
            userService.logout()
                .then(()=>{
                    // this.bugs=null
                    // this.loggedInUser={
                    //     userName:''
                    // }
                    this.$router.push('/');
                })
        },
        checkLoggedInUser(){
            this.loggedInUser= userService.getLoggedInUser()
        }
    },
    components:{
        bugLogin,
    }, watch:{
        '$route.params': function(){
            this.loggedInUser= userService.getLoggedInUser()
        }
    }

}
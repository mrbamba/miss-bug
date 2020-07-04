import {userService} from '../services/user.service.js'
import userList from '../cmps/user-list.cmp.js'


export default {
    name:"bug-user-admin",
    template:`
    <section class="user-admin">
        <h2 class="user-admin-title">Users</h2>
        
        <user-list  v-if="users && loggedInUser" :loggedInUser="loggedInUser" :users="users" v-on:removeUser="removeUser"/>
    </section>
    `,
    data(){
        return{
            loggedInUser: userService.getLoggedInUser(),
            users:null
        }
    },
    created(){
        if (!this.loggedInUser.isAdmin){this.$router.push('/bug');}
        
        userService.query()
            .then(users =>{
                console.log(users)
                this.users=users
            })

    },
    components:{
        userList
    },
    methods:{
        removeUser(userId){
            userService.remove(userId)
                .then(()=>{
                    userService.query()
                        .then(users=>{
                            this.users=users
                        })
                })
        },
    }
}
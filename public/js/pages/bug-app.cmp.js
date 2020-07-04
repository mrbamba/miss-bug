import {bugService} from '../services/bug.service.js'
import {userService} from '../services/user.service.js'
import bugList from '../cmps/bug-list.cmp.js'
// import bugLogin from '../cmps/bug-login.cmp.js'
import bugFilter from '../cmps/bug-filter.cmp.js'

export default {
    name:"bug-App",
  template: `
    <section class="bug-app"> 

    <!-- <bug-login v-if="!loggedInUser"/>
        <section v-else>
            <h3 class="bug-app-welcome">
                Welcome {{loggedInUser.userName}}            
            </h3>
        </section> -->
        <div class="bugs-list-header flex space-between ">
            <h2> Bugs list</h2>
            <bug-filter v-on:setFilter="setFilter" class="bug-filter"> </bug-filter>
            <router-link to="/bug/edit"><button> Add <i class="fas fa-plus"></i></button></router-link>
        </div>
        
        <bug-list v-if="loggedInUser && bugsToShow" :bugs="bugsToShow" :loggedInUser="loggedInUser" v-on:remove="remove"/>
    </section>`,
    data(){
        return{
            loggedInUser: userService.getLoggedInUser(),
            credentials: {
                userName: ''
            },
            bugs:null,
            bugsToShow:null,
            selectedBug:null,
            filterBy:{
                txt:'',
            }
        }
    },
    created(){
        if (!this.loggedInUser){this.$router.push('/');}

        bugService.query()
            .then(bugs =>{
                this.bugs=bugs
                this.bugsToShow=bugs
            })
           
            
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
        logout(){
            userService.logout()
                .then(()=>{
                    // this.bugs=null
                    // this.loggedInUser={
                    //     userName:''
                    // }
                    this.$router.push('/');
                })
        },
        remove(bugId){
            bugService.remove(bugId)
                .then(()=>{
                    bugService.query()
                        .then(bugs=>{
                            this.bugs=bugs
                        })
                })
        },
        bugSelected(bugId){
            bugService.getById(bugId)
                .then((bug) => {
                    this.selectedBug=bug
                    this.$router.push(`/bug/${bug._id}`)
                })
        },
        setFilter(txt){
            // console.log('running setFilter on bug-app',this.filterBy)
            this.filterBy.txt= txt
        }
    },
    components:{
        bugList,
        // bugLogin,
        bugFilter
    },
    computed:{
        // bugsToShow(){
        //     if(!this.filterBy.txt){
        //         return this.bugs
        //     }else {
        //         // return this.bugs.filter(bug=>JSON.stringify(bug).toLowerCase().includes(this.filterBy.txt.toLowerCase()))
        //         // console.log('FilterBy on bug app bugs to show',this.filterBy)
        //         let bugsList=bugService.query(this.filterBy)
        //             .then((bugs)=>{
        //                 return bugs
        //             })
        //             return bugsList
        //     }
        // }
    },
    watch:{
        'filterBy.txt': function(){
            if(!this.filterBy.txt){
                this.bugsToShow=this.bugs
            }else {
                // return this.bugs.filter(bug=>JSON.stringify(bug).toLowerCase().includes(this.filterBy.txt.toLowerCase()))
                // console.log('FilterBy on bug app bugs to show',this.filterBy)
                bugService.query(this.filterBy)
                    .then((bugs)=>{
                        this.bugsToShow=bugs
                    })
            }
        } 
    }
};

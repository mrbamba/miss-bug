import bugPreview from '../cmps/bug-preview.cmp.js'


export default{
    name:"bug-list",
    props:['bugs','loggedInUser'],
    template:`
    <section class="bug-list">
    <ul class="bug-list">
        <bug-preview v-for="bug in bugs"  :bug="bug" :key="bug._id" :loggedInUser="loggedInUser" v-on:remove="remove" />
    </ul>
</section>
    `,
    components:{
        bugPreview
    },
    created(){
    },
    methods:{
        remove(bugId){
            this.$emit('remove',bugId)
        },

    },
    // created(){
    //     if (!this.loggedInUser.isAdmin){this.$router.push('/bug');}

    // }
}


export default{
    name:"bug-preview",
    props:['bug','loggedInUser'],
    template:`
    <li @click="" class="bug-preview">
<!-- <pre>{{bug}}</pre> -->
        <p @click="bugSelected" class=" flex space-between">
            <section>
                {{bug.title}} - {{bug.description}} - {{bug.severity}}  
            </section>
            <section>
                <button v-if="canAct" @click.stop="remove(bug._id)" ><i class="far fa-trash-alt"></i></button>
                <button v-if="canAct" @click.stop="edit(bug._id)" ><i class="far fa-edit"></i></button>
            </section>
        </p>

    </li>
    `,
    computed:{
        canAct(){

            if(this.bug.creator._id===this.loggedInUser._id || this.loggedInUser.isAdmin){
                return true;
            }else return false
        }
    },
    methods:{
        remove(bugId){
            this.$emit('remove',bugId)
        },
        bugSelected(){
            this.$router.push('/bug/'+this.bug._id)
        },
        edit(bugId){
            this.$router.push('bug/edit/'+this.bug._id)
        }
    }
}
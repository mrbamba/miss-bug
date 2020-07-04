

export default{
    props:['user','loggedInUser'],
    template:`
    <tr @click="userSelected" >
        <td>{{user._id}}</td>
        <td>{{user.fullName}}</td>
        <td>{{user.userName}}</td>
        <td>{{user.isAdmin}}</td>
        <td>
            <button @click.stop="remove(user._id)" ><i class="far fa-trash-alt"></i></button>
        </td>
        <!-- <td>
            <button @click.stop="edit(user._id)" ><i class="far fa-edit"></i></button>
        </td> -->
</tr>
    `,
    created(){
        console.log(this.loggedInUser)
        if (!this.loggedInUser.isAdmin){this.$router.push('/bug');}

    },
    methods:{
        remove(userId){
            this.$emit('removeUser',userId)
        },
        userSelected(){
            this.$router.push('/user/'+this.user._id)
        }
    }
}
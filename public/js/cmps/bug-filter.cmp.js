

export default {
    name: "bug-filter",
    template:`
    <section >
        <input class="bug-filter-input" @input="setFilter" @keyup.enter="setFilter" type="search" v-model="filterBy.txt" placeholder="Search">
    </section>
    `,
    data(){
        return{
            filterBy:{
                txt:''
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('setFilter',this.filterBy.txt)
        }
    }
}
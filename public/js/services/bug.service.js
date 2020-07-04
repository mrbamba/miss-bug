export const bugService = {
    query,
    getById, 
    remove,
    save,
    userBugCount
}

function query(filterBy={txt:''}){
    console.log('front end bug service filter by',filterBy)
    return axios.get(`/api/bug?txt=${filterBy.txt}`)
        .then(res=> res.data)
        // .then(bugs=>{
        //      console.log('query response', bugs)
        // })
}

function getById(bugId){
    return axios.get(`/api/bug/${bugId}`)
        .then(res=>res.data)
}

function remove(bugId){
    return axios.delete(`/api/bug/${bugId}`)
}

function save(bug){
    if(bug._id){
        return axios.put(`/api/bug/${bug._id}`,bug)
            .then(res=>res.data)
    }else{
        return axios.post(`/api/bug`,bug)
            .then(res=> res.data)
    }
}

function userBugCount(userId){
    return axios.get(`/api/bug/user/${userId}`)
        .then(res=>res.data)
}
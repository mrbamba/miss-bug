
export const userService={
    login,
    getLoggedInUser,
    logout,
    addUser,
    query,
    remove,
    getById
}

const USER_KEY = 'loggedInUser'

var gLoggedInUser = JSON.parse(sessionStorage.getItem(USER_KEY))

function query(){
    return axios.get('/api/user')
        .then(res=> res.data)
        .then(users=>{
            return users
        })
}

function getLoggedInUser(){
    return gLoggedInUser;
}

function remove(userId){
    return axios.delete(`/api/user/${userId}`)
}

function login(credentials){
    return axios.post('/api/login',credentials)
        .then(res=>res.data)
        .then(loggedInUser=>{
            sessionStorage.setItem(USER_KEY,JSON.stringify(loggedInUser))
            gLoggedInUser=loggedInUser
            return loggedInUser
        })
}

function logout(){
    // localStorage.removeItem(USER_KEY)
    
    return axios.post('/api/logout')
        .then(res=>res.data)
        .then(()=>{
            gLoggedInUser=null
            sessionStorage.removeItem(USER_KEY)
        })
}

function addUser(credentials){
    return axios.post('/api/signup',credentials)
        .then(res=>res.data)
        .then(loggedInUser=>{
            sessionStorage.setItem(USER_KEY,JSON.stringify(loggedInUser))
            gLoggedInUser=loggedInUser
            return loggedInUser
        })
}

function getById(userId){
    return axios.get(`/api/user/${userId}`)
        .then(res=>res.data)
}

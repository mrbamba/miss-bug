
// CONFIG: --------------------------------------

//Add and name npm dependencies
const express = require("express");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bugService = require("./services/bug.service.js");
var session = require('express-session');
const userService = require("./services/user.service.js");



// Assign the View dir const
const VIEW_DIR = `${__dirname}/public`;

//give app the express function
const app = express();

// server port
const port = 3000;

// Express config
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));

//Express Session
app.use(session({
  secret: 'TesttestTesttest2309run',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Where to serve
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);


// ROUTES:----------------------------------

//Home
app.get("/", (req, res) => {
  res.sendFile(`${VIEW_DIR}/index.html`);
});

// REST API:
//CRUDL - Bugs

// List
// http://localhost:3000/api/bug?txt=u&minPrice=0&limit=6
app.get("/api/bug", (req, res) => {
  // const user = req.cookies.user
  console.log('Server line 51',req.query)
  const {txt='',offset=0,limit=0} = req.query;
  const filterBy={txt,offset,limit}
  console.log(txt)

  bugService.query(filterBy)
    .then((bugs) => {
    res.json(bugs);
  });
});

// Read

app.get("/api/bug/:id", (req, res) => {
  const bugId = req.params.id;
  bugService.getById(bugId)
  .then((bug) => {
    res.json(bug);
  });
});

// Delete

app.delete("/api/bug/:id", (req, res) => {
  console.log(req.session.loggedInUser)
  if(!req.session.loggedInUser){
    res.status(403).json({msg:'Not Authorized, User must be logged in.'})
    return;
  }

  const bugId = req.params.id;
  bugService.remove(bugId)
  .then(() => {
    res.end();
  });
});

// Create
app.post("/api/bug", (req, res) => {
if(!req.session.loggedInUser){
  res.status(403).json({msg:'Not Authorized, User must be logged in.'})
  return;
}

  const creator = req.session.loggedInUser
  const bug = req.body;
  bug.creator={
    _id: creator._id,
    fullName: creator.fullName
  }

  bugService.save(bug)
    .then((savedBug) => {
    res.json(savedBug);
  });
});

// Update

app.put("/api/bug/:id", (req, res) => {
  if(!req.session.loggedInUser){
    res.status(403).json({msg:'Not Authorized, User must be logged in.'})
    return;
  }

  const bug = req.body;
  console.log("bug to update", bug);
  bugService.save(bug)
    .then((savedBug) => {
    res.json(savedBug);
  });
});

// Get User Bug count
// `/api/bug/user/${userId}`
app.get("/api/bug/user/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  bugService.userBugCount(userId)
    .then((count) => {
      res.json(count);
  });
});


// CRUDL - Users

// List
app.get("/api/user", (req, res) => {
  userService.query()
    .then((users) => {
    res.json(users);
  });
});

// Read

app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  userService.getById(userId)
  .then((user) => {
    res.json(user);
  });
});



// Login
app.post('/api/login', (req,res)=>{
    const credentials=req.body;
    console.log('BackEnd creds:',credentials);

    userService.checkLogin(credentials)
      .then(user=>{
        if(user){
          res.cookie('loggedInUser',user)
          req.session.loggedInUser = user;
          res.json(user);
        }else{
          res.status(401).json({msg:'Invalid Username/Password'})
        }
      })
})



// Logout
app.post('/api/logout',(req,res)=>{
  res.clearCookie('loggedInUser');
  req.session.destroy();
  res.end();
})

// Signup

app.post('/api/signup',(req,res)=>{
  const user = req.body;

  userService.signup(user)
    .then(savedUser=>{
      res.cookie('loggedInUser',savedUser)
      req.session.loggedInUser=savedUser;
      res.json(user);
    })
})
// Delete
app.delete("/api/user/:id", (req, res) => {
  console.log(req.session.loggedInUser)
  if(!req.session.loggedInUser){
    res.status(403).json({msg:'Not Authorized, User must be logged in.'})
    return;
  }

  const userId = req.params.id;
  userService.remove(userId)
  .then(() => {
    console.log('finished deleting user on BE user service.')
    res.end();
  });
});
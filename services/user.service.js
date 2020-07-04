const fs = require("fs");
const gUsers = require("../data/user.json");

module.exports = {
  checkLogin,
  signup,
  query,
  remove,
  getById
};

// Get all users
function query() {
  return Promise.resolve(gUsers);
}

// Get a specific user by ID
function getById(userId) {
  const user = gUsers.find((user) => user._id === userId);
  return Promise.resolve(user);
}

// Delete a specific user
function remove(userId) {
  const userIdx = gUsers.findIndex((user) => user._id === userId);
  if (userIdx >= 0) {
    gUsers.splice(userIdx, 1);
  }

  _saveUsersToFile();
  console.log("Deleted user", userId);
  return Promise.resolve();
}

function checkLogin(credentials) {
  var user = gUsers.find(
    (user) =>
      user.userName === credentials.userName &&
      user.password === credentials.password
  );
  if (user) {
    user = { ...user };
    delete user.password;
  }
  return Promise.resolve(user);
}

function signup(user) {
  user._id = _makeId();
  gUsers.unshift(user);
  _saveUsersToFile();

  user = { ...user };
  delete user.password;
  return Promise.resolve(user);
}

function _saveUsersToFile() {
  fs.writeFileSync("data/user.json", JSON.stringify(gUsers, null, 2));
}

function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

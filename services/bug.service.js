const fs = require("fs");
const gBugs = require("../data/bugs.json");

module.exports = {
  query,
  getById,
  remove,
  save,
  userBugCount,
};

// Get all bugs
function query(filterBy) {
  let bugs = gBugs.filter((bug) =>
    JSON.stringify(bug).toLowerCase().includes(filterBy.txt.toLowerCase())
  );
  // const offset = filterBy.offset
  // if (filterBy.limit!==0) bugs = bugs.slice(offset,filterBy.limit)
  console.log(bugs);
  return Promise.resolve(bugs);
}

// Get a specific bug by ID
function getById(bugId) {
  const bug = gBugs.find((bug) => bug._id === bugId);
  return Promise.resolve(bug);
}

// Delete a specific bug
function remove(bugId) {
  const bugIdx = gBugs.findIndex((bug) => bug._id === bugId);
  if (bugIdx >= 0) {
    gBugs.splice(bugIdx, 1);
  }

  _saveBugsToFile();
  console.log("Deleted bug", bugId);
  return Promise.resolve();
}

// Add/Edit Bug

function save(bug) {
  console.log(bug);
  if (bug._id) {
    const bugIdx = gBugs.findIndex((currBug) => currBug._id === bug._id);
    gBugs.splice(bugIdx, 1, bug);
  } else {
    bug._id = _makeId();
    bug.createdAt = Date.now();
    gBugs.unshift(bug);
  }
  _saveBugsToFile();
  return Promise.resolve(bug);
}

function userBugCount(userId) {
  let count = gBugs.reduce((acc, bug) => {
    if (bug.creator._id === userId) {
      acc++
    }
    return acc;
  },0);
  return Promise.resolve(count);

  // let countedNames = names.reduce(function (allNames, name) {
  //   if (name in allNames) {
  //     allNames[name]++;
  //   } else {
  //     allNames[name] = 1;
  //   }
  //   return allNames;
  // }, {});
}

//Update bugs.json file
function _saveBugsToFile() {
  fs.writeFileSync("data/bugs.json", JSON.stringify(gBugs, null, 2));
}

//Generate ID's
function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

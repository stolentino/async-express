const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

function asyncHandler(cb){
  return async (req, res, next)=> {
    try {
      await cb(req, res, next);
    } catch (err) {
      res.render('error', {error:err});
    }
  }
}

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//PROMISES
function getUsers(cb){
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err){
        return(err);
      } else {
        const users = JSON.parse(data);
        resolve(users);
      }
    });
  });
}

app.get('/', asyncHandler(async (req,res) => {
    const users = await getUsers();
    //throw new Error("It broke");
    res.render('index', {title: "Users", users: users.users});
})); 


app.listen(3000, () => console.log('App listening on port 3000!'));
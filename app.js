const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

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

app.get('/', (req,res) => {
  getUsers()
    .then((users)=> {
      throw new Error("Noooooooo");
      res.render('index', {titl: "Users", users: users.users});
    })
    .catch((err)=> {
      res.render('error', {error: err});
    })
}); 


app.listen(3000, () => console.log('App listening on port 3000!'));
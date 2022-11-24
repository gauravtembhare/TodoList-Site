const express = require('express');
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

let weekday = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function(req,res){
     
   let day = date.getDate();
    
  res.render("list" , {listTitle : day , newListItems : items});
});

//  ACtion after  add butoon
app.post("/", function(req,res){
    console.log(req.body)
    let item = req.body.newItem;

    if(req.body.list === 'Work'){
        weekday.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work" , function(req , res){
    res.render("list" , {listTitle : "Work List" , newListItems : weekday});
})


app.listen(3000, function(){
    console.log("The server is running on 3000 port")
})
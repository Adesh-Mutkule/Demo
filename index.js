var express= require("express");
var bodyparser=require("body-parser");
var mysql=require("mysql");
var util=require("util");

var app=express();
app.use(bodyparser.urlencoded({extended:true}));



var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"batch_35"
});
var exe=util .promisify(conn.query).bind(conn);
app.get("/",function(req,res){
    res.render("expense_form.ejs");
});
app.post("/save_expense",async function(req,res){
    var d=req.body;
    var data = await exe('INSERT INTO expense (expense_for, amount, note) VALUES (?, ?, ?)', [d.expense_for, d.amount, d.note]);

    res.redirect("/");
});




app.listen(3000)
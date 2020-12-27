/*
    Author Name: Zahid Hasan
*/


const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;




const db = require('../database/config');

global.db = db;


route.get('/home', function(req,res){
    res.render('home.ejs');
});

route.get('/', function(req,res){
    res.render('main.ejs');
});

route.get('/signup', function(req,res){
    res.render('signup.ejs');
});

route.get('/adminprofile', function(req,res){
    res.render('adminprofile.ejs');
});




route.post('/login',function(req,res){
    
    var UserName = req.body.uname;
    var pass = req.body.psw;

    var sql = "SELECT * FROM problem_solver where UserName = '" + UserName + "' and Password = '" + pass + "';"
    console.log(sql);

    db.query(sql, function(err, result){
        if(err){
            console.log(err);
        }
        else if(result.length > 0){
            res.redirect('/home');
        }
        else{
            res.redirect('/login');
        }
    });

    
});

route.get('/userprofile',function(req,res){
    var sql = "SELECT * FROM problem_solver where id = 2";
    db.query(sql, function(err, result){
        if(err){
            console.log(err);
        }
        
        else{
            console.log(result);
            res.render('userprofile',{info: result[0]});
        }
    });

    
});







route.post('/signup', function(req,res){
    var UserName = req.body.uname;
    var Email = req.body.email;
    var Password1 = req.body.psw;
    

    var Password2 = req.body.repass;

    if(Password1 != Password2){
        console.log("Not matchd of Passwords");
        console.log(Password1 + " " + Password2);
        return;
    }

    if(UserName == "" || Email == "" || Password1 == ""){

        return ;
    }

    bcrypt.hash(Password1, saltRounds, function(err, hash) {
        var sql = "INSERT INTO problem_solver(UserName, Email, Password) VALUES('" + UserName + "','" + Email + "','" + hash + "');";
        db.query(sql, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                console.log("Created account");
                res.redirect('/login');
            }
        });
    });

});

route.get('/edit',function(req,res){
    var sql = "SELECT * FROM problem_solver where id = 1";
    db.query(sql, function(err, result){
        if(err){
            console.log(err);
        }
        
        else{
            console.log(result);
            res.render('edit',{info: result[0]});
        }
    });
});

route.post('/userprofile',function(req,res){

    var UserName = req.body.uname;
    var FirstName = req.body.fname;
    

    console.log(UserName);
    console.log(FirstName);


    var sql = "update problem_solver set UserName='" + UserName +"', FirstName='"+FirstName+"'where id=1;";
    db.query(sql, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.redirect('/userprofile');
        }
    });
});
module.exports = route;
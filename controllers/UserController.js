const User = require('../models/User')

exports.loginPage = function(req,res){
    res.render('main');
}

exports.login = function(req, res){
    var sql = "select * from problem_solver where id=1";
    db.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        else{
             
        }
    }

}



exports.homePage = function(req,res){
    res.render('home');
}

exports.login = function(req,res){
    let user = new User(req.body)
    res.render('home');
}


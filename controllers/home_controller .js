module.exports.home=function(req,res){
    // return res.end('<h1> this is home // home controller</h1>')

    return res.render('home',{
        title: "Home"
    });
}


//module.exports.actionname=function(req,res)
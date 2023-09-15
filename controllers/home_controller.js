//Creating the controller for the /
module.exports.home=function(req,res){
    return res.render('home',{
        title:"Code Chats"
    });
}

//module.exports.actionName=function(req,res){}


//Creating a controller for the /profile
// module.exports.profile=function(req,res){
//     return res.end('<p>Testing the controller</p>')
// }
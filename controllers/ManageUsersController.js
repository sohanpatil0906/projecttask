const auth = require('../helpers/auth');
const UserModel = require('../models/UserModel');
class ManageUsersController{
    /**
     * 1.Method To Render Products Page
    */   
   renderPage = [
       auth,
       async(req, res)=>{
           return res.render('manageUsers/index');
       }
   ];


    createUser = [
        async(req,res)=>{
            try {
                let newUser = await new UserModel(req.body).save();
            
                return res.send(newUser).status(201);
              } catch (err) {
                return res.send(err.message).status(500);
              }
            }
            ];
     

 
  //Method To Get All Users
  getAllUsers = [
  async(req, res)=>{
    try {
      let users = await UserModel.find();
      return res.send(users).status(200);
      
    } catch (err) {
      return res.send(err.message).status(500);
    }
  }
];
  
  //Method To Update User
 editUser = [
   async(req, res)=>{
    try {
      let user = await UserModel.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true});
      return res.send(user).status(201);
    } catch (err) {
      return res.send(err.message).status(500);
    }
  }
];
  
  //Method To Delete User
 deleteUser = [
  async(req, res)=>{
    try {
      await UserModel.findOneAndDelete({_id: req.params.userId});
      return res.sendStatus(200);
    } catch (err) {
      return res.send(err.message).status(500);
    }
  }
];

}
// //Methot To Create New User
// router.post('/createUser', async(req, res)=>{
//     try {
//       let newUser = await new UserModel(req.body).save();
  
//       return res.send(newUser).status(201);
//     } catch (err) {
//       return res.send(err.message).status(500);
//     }
//   });

module.exports = new ManageUsersController();
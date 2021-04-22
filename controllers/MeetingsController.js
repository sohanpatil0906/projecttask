const auth = require('../helpers/auth');

const UserProdModel = require('../models/MeetingModel');
class MeetingsController{
    /**
     * 1.Method To Render Products Page
    */   
   renderPage = [
       auth,
       async(req, res)=>{
           return res.render('meetings/index');
       }
   ];


   createMeeting = [
    async(req,res)=>{
        try {
            let newUser = await new UserProdModel(req.body).save();
        
            return res.send(newUser).status(201);
          } catch (err) {
            return res.send(err.message).status(500);
          }
        }
        ];

        getAllMeetings = [
            async(req, res)=>{
              try {
                let users = await UserProdModel.find();
                return res.send(users).status(200);
                
              } catch (err) {
                return res.send(err.message).status(500);
              }
            }
          ];
            
            //Method To Update User
            editMeeting = [
             async(req, res)=>{
              try {
                let user = await UserProdModel.findOneAndUpdate({_id: req.params.productId}, {$set: req.body}, {new: true});
                return res.send(user).status(201);
              } catch (err) {
                return res.send(err.message).status(500);
              }
            }
          ];
            
            //Method To Delete User
            deleteMeeting = [
            async(req, res)=>{
              try {
                await UserProdModel.findOneAndDelete({_id: req.params.productId});
                return res.sendStatus(200);
              } catch (err) {
                return res.send(err.message).status(500);
              }
            }
          ];
}

module.exports = new MeetingsController();
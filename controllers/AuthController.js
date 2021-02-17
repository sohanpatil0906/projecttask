const UserModel = require('../models/UserModel');
const UserTypeModel = require('../models/UserTypeModel');
const apiRes = require('../helpers/apiResponse');
const superAdminSideBarItems = require('../config/user_routes/superadmin').sideBarItems;
const managerSideBarItems = require('../config/user_routes/manager').sideBarItems;

/**
 * List Of Methods For This Controller
 * 1. Render Login Page
 * 2. Login User
 * 
 * I. Render Blank Page
 */
class AuthController{
    /**
     * 1. Method To Render Log In Page
    */
    renderLoginPage = [
        async(req, res)=>{
            try {
                return res.render('auth/login');
            } catch (err) {
                return res.send(err);
            }
        }
    ];
    
    /**
     * 2. Method To Login User
     * @param {String} email 
     * @param {String} password 
     * @returns {Object} res 
     */
    loginUser = [
        async(req, res)=>{
            try {
                let user = await UserModel.findOne({email: req.body.email});

                if(user.password == req.body.password){
                    //Session Setup
                    req.session.userId = user._id;
                    req.session.email = user.email;
                    req.session.userName = `${user.firstName} ${user.lastName}`;

                    //Check User Type And Assign Side Menu Items
                    req.session.sideBarItems = user.userType == 1 ? superAdminSideBarItems : managerSideBarItems;
                    return res.redirect('/auth/blank');
                }
                return res.redirect('/auth/login');
            } catch (err) {
                console.log(err);
                return apiRes.ErrorResponse(res, err.message);
            }
        }
    ];

    /**
     * 3. Method To Log Out User
     * @returns {Object} res
     */
    logoutUser = [
        async(req, res)=>{
            req.session.destroy();
            return res.redirect('/auth/login');
        }
    ];

    /**
     * I. Method To Render Blank Page
     */
    renderBlankPage = (req, res)=>{
        return res.render('blank/index')
    }
}

module.exports = new AuthController();
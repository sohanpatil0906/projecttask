let adminUrls = require('../config/user_routes/superadmin').allowedUrls;


module.exports = (req, res, next)=>{
    //If user is not logged in then log out user otherwise check role and grant access
    if(!req.session.userName){
        return res.redirect('/auth/logout');
    }else{
        let url = req.originalUrl.split('/')[1];

        if(req.session.userType == 1){
            if(adminUrls.indexOf(url) != -1)
                return next();
        }else{
            if(managerUrls.indexOf(url) != -1)
                return next();
        }
    }
    return res.redirect('/auth/logout');
}
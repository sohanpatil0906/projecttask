module.exports = (app)=>{
    app.get('/', (req, res)=>{
        if(req.session.userName)
            res.redirect(req.session.redirectUrl);
        else
            res.redirect('/auth/logout');
    })

    app.use('/auth', require('./auth'));
    app.use('/manageUsers', require('./manageUsers'));
    app.use('/meetings', require('./meetings'));
    // app.use('/invoice', require('./invoice'));
    // app.use('/customer', require('./customer'));
}
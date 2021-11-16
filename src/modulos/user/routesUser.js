const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get("/login", (req, res) => {
    if(req.isAuthenticated()) {
        console.log('usuario logueado')
        res.redirect('/productos/ingresar')
    }else {
        res.render("login");

    }
})

router.get("/signup", (req, res) => {
    res.render('signup')
})

router.get("/login-error", (req, res) => {
    res.render("login-error")
})

router.get("/signup-error", (req, res)=> {
    res.render("signup-error")
})


router.post("/login", passport.authenticate('login', {failureRedirect: 'login-error'}), (req, res) => {
    req.session.nombre = req.body.username;
    res.redirect("/productos/ingresar");
})

router.post("/signup",passport.authenticate('signup', {failureRedirect: 'login-error'}), (req, res) => {
    res.redirect("/productos/ingresar"); 
})

router.get("/logout", (req, res) => {
    const data = { nombre: req.session.nombre};
    req.session.destroy();
    req.logout()
    res.render("logout", data)
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'bria.jacobi27@ethereal.email',
            pass: 'wFyguFtJp8gvyxaadN'
        }
    });
    const mailOptions={
        from:'Servidor de node.js',
        to:'bria.jacobi27@ethereal.email' ,
        subject:` Usuario ${profile.username} - ${new Date().toUTCString()} `,
        html:'Usuario Desloguiado '

    }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log(info)
        })

})

module.exports = router;
const express = require("express");
const app = express();
const routes = require("./modulos/productos/productRoutes");
const webRoutes = require("./modulos/user/routesUser");
const ProductsWebSocket = require("./modulos/chats/ChatsWebSocket");
const PersistenciaChat = require('./modulos/chats/PersistenciaChat')
const PersistenciaProducto = require('./modulos/productos/serviProducto')
const handlebars = require("hbs");
const mongoose=require('mongoose')
const session =  require('express-session')
const MongoStore = require('connect-mongo')
const numCPUs=require('os').cpus().length
const generarNumeros= require('./randoms')
const cluster = require('cluster')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const { fork } = require("child_process")
const compression =require('compression')
const log4js= require('log4js')
const nodemailer =require('nodemailer')
const productGraphql=require('./modulos/productos/productosGraphql')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bria.jacobi27@ethereal.email',
        pass: 'wFyguFtJp8gvyxaadN'
    }
});
const tranporteGmail=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'rodrigosaez93@gmail.com',
        pass:"ejemplo123"
    }
})
log4js.configure({
    appenders:{
        miLoggerConsole:{type:"console"},
        miLoggerFile:{type:'file',filename:'warn.log'},
        miLoggerFile2:{type:'file',filename:'error.log'}
    },
    categories: {
        default:{appenders:["miLoggerConsole"],level:"debug"},
        archivo:{appenders:['miLoggerFile'],level:"warn"},
        archivo2:{appenders:['miLoggerFile2'],level:"error"}
    }
})
app.use(compression())
const argv = process.argv
let port = process.env.PORT || 8080
let facebook_client_id = "895703051379886"
let facebook_client_secret = "8a5714c1dd03fa7850bfc7af42fcf75e"

let modoCluster= false

if(argv[2] != null) {
    const args = argv[2].split(" ")
    args.forEach(arg => {
        if(arg.indexOf("=") != -1) {
            const split = arg.split("=")
            if(split[0] == "port") {
                port = +split[1]
            }
            if(split[0] == "facebook_client_id") {
                facebook_client_id = split[1]
            }
            if(split[0] == "facebook_client_secret") {
                facebook_client_secret = split[1]
            }if (split[0] == "CLUSTER"){
                modoCluster=true
            }if (split[0] == "FORK"){
                modoCluster=false
            }

        }
    })
}

process.on("exit", (code) => {
    console.log(`El código de salida es ${code}`)
})

if(modoCluster){
    if (cluster.isMaster){
        console.log (`Master ${process.pid} is running`)
        for (let i =0;i<numCPUs;i++){
            cluster.fork()
        }
    
        cluster.on('exit',(worker,code,signal)=>{
            const logger=log4js.getLogger()
            logger.warn(`worker ${worker.process.pid} died`)
            
        })
    

    }else{
        runServer()
    }

  

}else {
    runServer()
}
function runServer (){
    const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
handlebars.registerHelper("raw-helper", function(options) {
    return options.fn(this);
})

const { UserModel, isValidPassword, createHash } = require('./persistencia/user')


//conecto la base de datos
CRUD()

async function CRUD(){
  const URL= process.env.DB_MONGO
   
    let rta =await mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("BASE DE DATOS CONECTADA")
}

passport.use(new FacebookStrategy({
    clientID: facebook_client_id,
    clientSecret: facebook_client_secret,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
}, function(accessToken, refreshToken, profile, done) {
    const mailOptions={
        from:'Servidor de node.js',
        to:'bria.jacobi27@ethereal.email' ,
        subject:` Usuario ${profile.username} - ${new Date().toUTCString()} `,
        html:'Usuario Logiado '

    }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log(info)
        })

        tranporteGmail.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log(info)
        })

    done(null, {id: profile.id})
}))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    done(null, {_id: id})
})


app.use(passport.initialize())



// importo las rutas de vistas
const productRoutes = require("./productRoutes");

app.use(session({
    secret: "secreto",
    saveUninitialized: true, 
    cookie: {
        maxAge: 60000 * 10
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB_MONGO , // la url de atlas se omite en el codigo fuente  por motivos de seguridad
        mongoOptions: advancedOptions
    })
}))
app.use(passport.session())

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login', scope: ['public_profile', 'email']})
)


// Uso handlebars
app.set("view engine", "hbs");
// https://www.geeksforgeeks.org/handlebars-templating-in-expressjs/#:~:text=To%20use%20handlebars%20in%20express,pages%20in%20the%20views%20folder.&text=Now%2C%20we%20need%20to%20change%20the%20default%20view%20engine.&text=Now%2C%20we%20render%20our%20webpage%20through%20express%20to%20the%20local%20server.
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", routes);
app.use("/",productGraphql)
app.use("/", webRoutes)

app.get("/", (req, res) => {
    res.render("index");
});

// registro las rutas para las vistas
app.use("/productos", productRoutes);

app.get("/info", (req, res) => {
    res.json({
        arg_entrada: process.argv[2] || "",
        plataforma: process.platform,
        node_version: process.version,
        memoria: process.memoryUsage,
        path_ejecucion: process.argv[1],
        id: process.pid,
        carpeta: process.cwd(),
        numCPUs:numCPUs


    })
})

app.get("/randoms", (req, res) => {
    const cant = req.query.cant || 100000000
    if(modoCluster){
        generarNumeros(cant)
    }else{
        const child = fork("./src/randoms.js")
    child.on("message", result => {
        res.json(result)
    });
    child.send(cant)
    }
})

// Inicializo el web socket
ProductsWebSocket.inicializar();

app.listen(port, () => {
    const logger=log4js.getLogger()
    logger.info('El servidor está escuchando en el puerto 8080')

    
})
}
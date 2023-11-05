const fs=require("fs");
const express = require('express');
const app = express();
const passport=require("passport");
const cookieSession=require("cookie-session");
const modelo = require("./servidor/modelo.js");
const args = process.argv.slice(2); 
const LocalStrategy = require('passport-local').Strategy;
require("./servidor/passport-setup.js");
let test=false; 
test=eval(args[0]); //test=true
const bodyParser=require("body-parser");


const PORT = process.env.PORT || 3000;

const haIniciado=function(request,response,next){
    if (request.user){
        next();
    }
    else{
        response.redirect("/")
    }
}

app.use(express.static(__dirname + "/"));

app.use(cookieSession({
    name: 'Sistema',
    keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new
    LocalStrategy({usernameField:"email",passwordField:"password"},
    function(email,password,done){
        sistema.loginUsuario({"email":email,"password":password},function(user){
            if(user.email!=-1){
                return done(null,user);
            }
            else{
                return done(-1);
            }
        })
    }
));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }),
    function(req, res) {
        res.redirect('/good');
});

let sistema = new modelo.Sistema(test);

app.get("/good", function(request,response){
    // let nick = request.user.emails[0].value;
    // if(nick){
    //     sistema.agregarUsuario(nick);
    // }
    let email=request.user.emails[0].value;
    sistema.usuarioGoogle({email:email}, function(usr){
        response.cookie("nick",usr.email);
        response.redirect('/');
    });
});

app.get("/fallo",function(request,response){
    response.send({nick:"nook"})
});   

app.get("/", function(request,response){
    var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
});

app.get("/agregarUsuario/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.agregarUsuario(nick);
    response.send(res);
});

app.get("/obtenerUsuarios",haIniciado,function(request, response){
    let res=sistema.obtenerUsuarios();
    response.send(res);
});

app.get("/usuarioActivo/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.usuarioActivo(nick);
    response.send(res);
});

app.get("/numeroUsuarios",function(request,response){
    let res=sistema.numeroUsuarios();
    response.send(res);
});

app.get("/eliminarUsuario/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.eliminarUsuario(nick);
    response.send(res);
});

app.post('/enviarJwt',function(request,response){
    let jwt=request.body.jwt;
    let user=JSON.parse(atob(jwt.split(".")[1]));
    let email=user.email;
    sistema.usuarioGoogle({"email":email},function(obj){
        response.send({'nick':obj.email});
    })
}); 

app.post("/registrarUsuario",function(request,response){
    sistema.registrarUsuario(request.body,function(res){
        response.send({nick:res.email});
    });
});

app.post('/loginUsuario',passport.authenticate("local",{failureRedirect:"/fallo",successRedirect: "/ok"}));

app.get("/ok", function (request, response) {
    response.send({ "nick": request.user.email });
});

app.get("/confirmarUsuario/:email/:key", function (request, response) {
    let email = request.params.email;
    let key = request.params.key;
    sistema.confirmarUsuario({ "email": email, "key": key }, function (usr) {
      if (usr.email != -1) {
        response.cookie("nick", usr.email);
      }
      response.redirect("/");
    });
});

app.get("/cerrarSesion", haIniciado, function (request, response) {
    let nick = request.user.nick;
    request.logout();
    response.redirect("/");
    if (nick) {
      sistema.eliminarUsuario(nick);
    }
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});




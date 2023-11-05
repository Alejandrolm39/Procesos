const datos = require("./cad.js");
const correo=require("./email.js");

function Sistema(test){
    this.usuarios={}; //this.usuarios=[]
    this.test=test;
    this.cad= new datos.CAD();

    this.agregarUsuario=function(nick){
        let res={"nick":-1};
        if (!this.usuarios[nick]){
        this.usuarios[nick]=new Usuario(nick);
        console.log("el nick "+nick+" ha sido registrado");
        res.nick=nick;
        }
        else{
        console.log("el nick "+nick+" está en uso");
        }
        return res; 
    }

    this.usuarioGoogle=function(usr, callback){
        this.cad.buscarOCrearUsuario(usr,function(res){
            console.log("El usuario " + res.email + " está registrado en el sistema");
            callback(res);
        });
    }

    this.obtenerUsuarios=function(){
        return this.usuarios;
    }

    this.usuarioActivo=function(nick){
        let bool = this.usuarios[nick]==undefined?false:true;
        let res = {"res":bool};
        return res;
    }

    this.eliminarUsuario=function(nick){
        let res={"usuario_eliminado":-1};
        if (this.usuarios[nick]){
            delete(this.usuarios[nick]);
            console.log("Se ha eliminado el usuario con nick " + nick);
            res.usuario_eliminado = nick;
        }
        else {
            console.log("No existe un usuario con nick " + nick);
        }
        return res;
    }

    this.numeroUsuarios=function(){
        let res = {"num":Object.keys(this.usuarios).length}
        return res;
    }

    this.registrarUsuario=function(obj,callback){
        let modelo=this;
        if (!obj.nick){
            obj.nick=obj.email;
        }
        this.cad.buscarUsuario(obj,function(usr){
            if (!usr){
                //el usuario no existe, luego lo puedo registrar
                obj.key=Date.now().toString();
                obj.confirmada=false; 
                bcrypt.hash(obj.password, 10, function (err, hash) {
                    obj.password = hash;
                    console.log(obj.password)
                    console.log(obj.hash)
                  });
                modelo.cad.insertarUsuario(obj,function(res){
                    callback(res);
                });
                //correo.enviarEmail(obj.email,ob.key,"Confirmar cuenta");
                correo.enviarEmail(obj.email,obj.key,"Confirmar cuenta");
                correo.enviarEmail("alejandrolm35@gmail.com", "ss", "Hola");
            }
            else
            {
                callback({"email":-1});
            }
        });
    }

    this.confirmarUsuario=function(obj,callback){
        let modelo=this;
        this.cad.buscarUsuario({email:obj.email,confirmada:false,key:obj.key},function(usr){
            if (usr){
                usr.confirmada=true;
                modelo.cad.actualizarUsuario(usr,function(res){
                    callback({"email":res.email}); //callback(res)
                })
            }
            else
            {
                callback({"email":-1});
            }
        })
    }

    this.loginUsuario=function(obj,callback){
        this.cad.buscarUsuario({"email":obj.email, "confirmada":true},function(usr){
            if (usr && usr.password){
                if (usr && usr.password) {
                    bcrypt.compare(obj.password, usr.password, function (err, result) {
                      if (err) {
                        console.error("Error al comparar contraseñas:", err);
                        callback({ email: -1 });
                      } else if (result) {
                        callback(usr); // Contraseña válida
                      } else {
                        callback({ email: -1 }); // Contraseña incorrecta
                      }
                    });
                }
            }    
            else
            {
                callback({"email":-1});
            }
        });
    }

    if (!this.test){
        this.cad.conectar(function(){
            console.log("Conectando a Mongo Atlas");
        })
    }
}

function Usuario(nick){
    this.nick=nick;
}

module.exports.Sistema=Sistema
   
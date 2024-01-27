// const datos = require("./cad.js");
// const correo=require("./email.js");
// const bcrypt = require("bcrypt");

function Sistema(test){
    this.usuarios={}; //this.usuarios=[]
    this.test=test;
    // this.cad= new datos.CAD();

    this.agregarUsuario=function(email){
        let res={"email":-1};
        if (!this.usuarios[email]){
        this.usuarios[email]=new Usuario(email);
        console.log("el email "+email+" ha sido registrado");
        res.email=email;
        }
        else{
        console.log("el email "+email+" está en uso");
        }
        return res; 
    }

    // this.usuarioOAuth=function(usr, callback){
    //     this.cad.buscarOCrearUsuario(usr,function(res){
    //         console.log("El usuario " + res.email + " está registrado en el sistema");
    //         callback(res);
    //     });
    // }

    this.usuarioOAuth = function (usr, callback) {
        let modelo=this;
        let copia = usr;
        usr.confirmada = true;
        this.cad.buscarOCrearUsuario(usr, function (obj) {
          if (obj.email == null) {
            console.log("El usuario " + usr.email + " ya estaba registrado");
            obj.email = copia;
          }
          callback(obj);
          modelo.agregarUsuario(obj);
        });
      };

    this.obtenerUsuarios=function(){
        return this.usuarios;
    }

    this.usuarioActivo=function(email){
        let bool = this.usuarios[email]==undefined?false:true;
        let res = {"res":bool};
        return res;
    }

    this.eliminarUsuario=function(email){
        let res={"usuario_eliminado":-1};
        if (this.usuarios[email]){
            delete(this.usuarios[email]);
            console.log("Se ha eliminado el usuario con email " + email);
            res.usuario_eliminado = email;
        }
        else {
            console.log("No existe un usuario con email " + email);
        }
        return res;
    }

    this.numeroUsuarios=function(){
        let res = {"num":Object.keys(this.usuarios).length}
        return res;
    }

    this.registrarUsuario=function(obj,callback){
        let modelo=this;
        if (!obj.email){
            obj.email=obj.email;
        }
        this.cad.buscarUsuario({"email":obj.email},function(usr){
            if (!usr){
                //el usuario no existe, luego lo puedo registrar
                obj.key=Date.now().toString();
                obj.confirmada=false; 
                bcrypt.hash(obj.password, 10, function (err, hash) {
                    obj.password = hash;
                    modelo.cad.insertarUsuario(obj,function(res){
                        callback(res);
                    });
                });
                console.log/({obj});
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
        let modelo=this;
        console.log({obj});
        this.cad.buscarUsuario({"email":obj.email, "confirmada":true},function(usr){
            if (usr){
                if (usr.password) {
                    bcrypt.compare(obj.password, usr.password, function (err, result) {
                      if (err) {
                        console.error("Error al comparar contraseñas:", err);
                        callback({ email: -1, err: "Error al comparar contraseñas"});
                      } else if (result) {
                        callback(usr); // Contraseña válidas
                        modelo.agregarUsuario(usr);
                      } else {
                        callback({ email: -1, err: "Usuario o contraseña incorrecta"}); // Contraseña incorrecta
                        console.error({ email: -1, err: "Usuario o contraseña incorrecta"});
                        console.error({result});
                      }
                    });
                }
            }    
            else
            {
                callback({"email":-1});
                console.error({ email: -1, err: "Usuario no encontrado"});
                console.error({usr});
            }
        });
    }

    if (!this.test){
        this.cad.conectar(function(){
            console.log("Conectando a Mongo Atlas");
        })
    }
}

function Usuario(usr){
    this.nick=nick;
    this.email=usr.email;
    this.clave;
}

function Partida(codigo){
    this.codigo = codigo;
    this.jugadores = [];
    this.maxJug = 2;
}

// module.exports.Sistema=Sistema
   
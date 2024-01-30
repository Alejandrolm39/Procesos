const e = require("express");
const datos = require("./cad.js");
const correo=require("./email.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

function Sistema(test){
    this.usuarios={}; //this.usuarios=[]
    this.partidas={};
    this.test=test;
    this.cad= new datos.CAD();

    this.agregarUsuario=function(usr, callback){
        let res={"email":-1};
        const {email} = usr;
        console.log({callback, event: "agregar usuario1", u:this.usuarios});
        if (!this.usuarios[email]){
          this.usuarios[email]=new Usuario(email);
          console.log({email});
          console.log("el email "+email+" ha sido registrado");
          res.email=email;
          callback(usr);
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
        let copia = usr;
        usr.confirmada = true;
        const sistema = this;
        this.cad.buscarOCrearUsuario(usr, function (obj) {
          if (obj.email == null) {
            console.log("El usuario " + usr.email + " ya estaba registrado");
            obj.email = copia;
          }
          // console.log({obj});
          sistema.agregarUsuario(obj, callback);
          callback(obj);
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
        console.log({Event: "eliminar usuario1", thisu:this.usuarios});
        if (this.usuarios[email]){
            delete this.usuarios[email];
            console.log({Event: "eliminar usuario1", thisu:this.usuarios});
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
                        modelo.agregarUsuario(usr, callback);
                        // callback(usr); // Contraseña válidass
                        // modelo.agregarUsuario(usr);
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
        correo.conectar(function(valor){
            console.log("Credenciales obtenidas");
        })
    }

    this.crearPartida=function(email){
        let res={codigo:-1};
        // console.log(email);
        // console.log({usuarios: this.usuarios});
        if (this.usuarios[email]){
          // console.log(this.usuarios[email]);
          creator=this.usuarios[email].email;
          if (creator){
            codigo = this.obtenerCodigo();
            newPartida=new Partida(codigo);
            newPartida.jugadores.push(creator);
            this.partidas[codigo]=newPartida;
            jugadores = this.obtenerJugadores(codigo);
            console.log(codigo, "el codigo en crear partida es ese");
            console.log("Jugsadores de la partida metequetengue: ", jugadores);
            let lista = this.obtenerPartidasDisponibles();
            // console.log("antes de la lista");
            // console.log(lista.length);
            res.codigo=newPartida.codigo;
            console.log(res.codigo, "el cogido de res.codigo es");
          }
        }
        console.log({res, event: "res es:"})
        return res;
        // return 1;
      }
    
      // Gestion de partidas
      this.obtenerCodigo=function(){
        code = uuidv4().toString().substr(0, 6);
        return code;
      }
      this.unirAPartida=function(email,codigo){
        console.log("codigo fn fn unir partida: " + codigo);
        let res={codigo:-1, email:email};
        let partida=this.partidas[codigo];
        console.log({partida, event:"partida a ver"});
        if (partida){
          if (partida.jugadores.length<partida.maxJug){
            partida.jugadores.push(email);
            console.log(partida.jugadores);
            console.log("El usuario con email "+email+" se ha unido a la partida con codigo "+codigo);
            res.codigo=partida.codigo;
          }
          else {res.codigo=-2}
        }
        // res.codigo = 1;
        return res;
      }
    
      this.obtenerPartidasDisponibles = function(){
        let lista=[];
        for (var key in this.partidas){
          let partida=this.partidas[key];
          let creador = partida.jugadores[0];
          if (partida.jugadores.length<partida.maxJug){
            lista.push({codigo:partida.codigo, email:creador});
          }
        }
        return lista;
      }
      this.obtenerJugadores = function(codigo){
        let partida=this.partidas[codigo];
        console.log(partida.jugadores.length, "jugadores de obtener jugadores");
        return partida.jugadores.length;
      }
  
      this.eliminarPartida=function(codigo){
        let res={"partida_eliminada":-1};
        if (this.partidas[codigo]){
            delete(this.partidas[codigo]);
            console.log("Se ha eliminado la partida con codigo " + codigo);
            res.partida_eliminada = codigo;
        }
        else {
            console.log("No existe una partida cuyo codigo sea " + codigo);
        }
        return res;
      }
}

function Usuario(email){
    this.email=email;
    this.nick;
    this.partidasGanadas=0;
    this.partidasPerdidas=0;
}

function Partida(codigo){
    this.codigo = codigo;
    this.jugadores = [];
    this.maxJug = 2;
    this.partidaAcabada=false;
}

module.exports.Sistema=Sistema
   
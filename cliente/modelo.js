const correo=require("./email.js");

function Sistema(){
    this.usuarios={}; //this.usuarios=[]

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
                modelo.cad.insertarUsuario(obj,function(res){
                    callback(res);
                });
                //correo.enviarEmail(obj.email,ob.key,"Confirmar cuenta");
                correo.enviarEmail(obj.email,obj,"Confirmar cuenta");

            }
            else
            {
                callback({"email":-1});
            }
        });
    }

    this.loginUsuario=function(obj,callback){
        this.cad.buscarUsuario({"email":obj.email, "confirmada":true},function(usr){
            if (usr && obj.pwd==usr.password){
                callback(usr);
            }
            else
            {
                callback({"email":-1});
            }
        });
    }
        
}

function Usuario(nick){
    this.nick=nick;
}
   
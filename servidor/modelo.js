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
}

function Usuario(nick){
    this.nick=nick;
}

module.exports.Sistema=Sistema
   
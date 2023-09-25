function Sistema(){
    this.usuarios={}; //this.usuarios=[]

    this.agregarUsuario=function(nick){
        if (!this.usuarios[nick]){
            console.log("Usuario con nick " + nick + " agregado");
            this.usuarios[nick]=new Usuario(nick);
        }
        else console.log("Ya existe un usuario con este nick");
    }

    this.obtenerUsuarios=function(){
        return this.usuarios;
    }

    this.usuarioActivo=function(nick){
        if (!this.usuarios[nick]){
            return false;
        }
        else return true;
    }

    this.eliminarUsuario=function(nick){
        if (!this.usuarios[nick]){
            console.log("No existe un usuario con nick " + nick);
        }
        else {
            delete(this.usuarios[nick]);
            console.log("Se ha eliminado el usuario con nick " + nick);
        }
    }

    this.numeroUsuarios=function(){
        return Object.keys(this.usuarios).length;
    }
}

function Usuario(nick){
    this.nick=nick;
}
   
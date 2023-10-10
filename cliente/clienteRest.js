function ClienteRest(){
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
            if (data.nick!=-1){
                console.log("Usuario "+nick+" ha sido registrado")
                msg="Usuario " + nick + " ha sido regitrado";
            }
            else{
                console.log("El nick ya está ocupado");
                msg="El nick " + nick + " ya está ocupado";
            }
            cw.mostrarMsg(msg);
        })
    }

    this.agregarUsuario2=function(nick){
        $.ajax({
            type:'GET',
            url:'/agregarUsuario/'+nick,
            success:function(data){
                if (data.nick!=-1){
                    console.log("Usuario "+nick+" ha sido registrado")
                }
                else{
                    console.log("El nick ya está ocupado");
                }
            },
            error:function(xhr, textStatus, errorThrown){
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
        });
    }

    this.obtenerUsuarios=function(){
        var cli=this;
        $.getJSON("/obtenerUsuarios/",function(data){
            console.log(data);
        })
    }

    this.numeroUsuarios=function(){
        var cli=this;
        $.getJSON("/numeroUsuarios/",function(data){
            console.log(data);
        })
    }

    this.UsuarioActivo=function(nick){
        var cli=this;
        $.getJSON("/usuarioActivo/"+nick,function(data){
            if (data.res == true){
                console.log("Usuario "+nick+" esta activo")
            }
            else{
                console.log("Usuario "+nick+" no esta activo");
            }
        })
    }

    this.eliminarUsuario=function(nick){
        var cli=this;
        $.getJSON("/eliminarUsuario/"+nick,function(data){
            if (data.usuario_eliminado != -1){
                console.log("Usuario "+nick+" ha sido eliminado")
                msg="Usuario "+nick+" ha sido eliminado";
            }
            else{
                console.log("El usuario " + nick + " no se ha podido eliminar");
                msg="El usuario " + nick + " no se ha podido eliminar";
            }
            cw.mostrarMsg(msg);
        })
    }
}
    
function ClienteRest(){
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
            if (data.nick!=-1){
                console.log("Usuario "+nick+" ha sido registrado")
                msg="Usuario " + nick + " ha sido regitrado";
                // localStorage.setItem("nick",nick);
                $.cookie("nick", nick);
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

    this.enviarJwt=function(jwt){
        $.ajax({
            type:'POST',
            url:'/enviarJwt',
            data: JSON.stringify({"jwt":jwt}),
            success:function(data){
                let msg="El nick "+data.nick+" está ocupado";
                if (data.nick!=-1){
                    console.log("Usuario "+data.nick+" ha sido registrado");
                    //mostrar un mensaje
                    msg="Bienvenido al sistema, "+data.nick;
                    $.cookie("nick",data.nick);
                }
                else{
                    console.log("El nick ya está ocupado");
                }
                    cw.limpiar();
                    cw.mostrarMsg(msg);
            },
            error:function(xhr, textStatus, errorThrown){  
                //console.log(JSON.parse(xhr.responseText));
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
            //dataType:'json'
        });
    }

    this.registrarUsuario=function(email,password){
        $.ajax({
            type:'POST',
            url:'/registrarUsuario',
            data: JSON.stringify({"email":email,"password":password}),
            success:function(data){
                if (data.nick!=-1){
                    console.log("Usuario "+data.nick+" ha sido registrado");
                    // $.cookie("nick",data.nick);
                    cw.limpiar();
                    // cw.mostrarMsg("Bienvenido al sistema, "+data.nick);
                    // cw.mostrarLogin();
                }
                else{
                console.log("El nick está ocupado");
                }
            },
            error:function(xhr, textStatus, errorThrown){
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
        });
    }

    // this.loginUsuario=function(email,password){
    //     $.ajax({
    //         type:'POST',
    //         url:'/loginUsuario',
    //         data: JSON.stringify({"email":email,"password":password}),
    //         success:function(data){
    //             if (data.nick!=-1){
    //                 console.log("Usuario "+data.nick+" ha sido registrado");
    //                 $.cookie("nick",data.nick);
    //                 cw.limpiar();
    //                 cw.mostrarMsg("Bienvenido al sistema, "+data.nick);
    //                 // cw.mostrarLogin();
    //             }
    //             else{
    //             console.log("No se pudo iniciar sesión");
    //             cw.mostrarMsg("No se puedo iniciar sesión");
    //             }
    //         },
    //         error:function(xhr, textStatus, errorThrown){
    //             console.log("Status: " + textStatus);
    //             console.log("Error: " + errorThrown);
    //         },
    //         contentType:'application/json'
    //     });
    // }
}
    
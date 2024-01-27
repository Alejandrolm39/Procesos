function ClienteRest(){
    this.agregarUsuario=function(email){
        var cli=this;
        $.getJSON("/agregarUsuario/"+email,function(data){
            if (data.email!=-1){
                console.log("Usuario "+email+" ha sido registrado")
                // msg="Usuario " + email + " ha sido registrado";
                // localStorage.setItem("nick",nick);
                $.cookie("email", email);
            }
            else{
                console.log("El nick ya está ocupado");
                msg="El nick " + email + " ya está ocupado";
            }
            cw.mostrarMsg(msg);
        })
    }

    // this.agregarUsuario2=function(nick){
    //     $.ajax({
    //         type:'GET',
    //         url:'/agregarUsuario/'+nick,
    //         success:function(data){
    //             if (data.nick!=-1){
    //                 console.log("Usuario "+nick+" ha sido registrado")
    //             }
    //             else{
    //                 console.log("El nick ya está ocupado");
    //             }
    //         },
    //         error:function(xhr, textStatus, errorThrown){
    //             console.log("Status: " + textStatus);
    //             console.log("Error: " + errorThrown);
    //         },k
    //         contentType:'application/json'
    //     });
    // }

    this.obtenerUsuarios=function(){
        var cli=this;
        $.getJSON("/obtenerUsuarios/",function(data){
            var usuarios = Object.keys(data); // Obtiene las claves (nombres de usuario) del objeto
            var nombresUsuarios = usuarios.map(function (usuario) {
                return data[usuario].email; // Obtiene el nombre de usuario para cada clave
            });
            console.log(nombresUsuarios);
            // cw.mostrarMsg(JSON.stringify("Los usuarios agregados son: " + nombresUsuarios))
        })
    }

    this.numeroUsuarios=function(){
        var cli=this;
        $.getJSON("/numeroUsuarios/",function(data){
            console.log(data);
            // cw.mostrarMsg("Número de usuarios: " + data.num);
        })
    }

    this.usuarioActivo=function(email){
        var cli=this;
        $.getJSON("/usuarioActivo/"+email,function(data){
            if (data.res == true){
                console.log("Usuario "+email+" esta activo")
                msg="El usuario " + email + " está activo";
            }
            else{
                console.log("Usuario "+email+" no esta activo");
                msg="El usuario " + email + " no está activo";
            }
            // cw.mostrarMsg(msg);
        })
    }

    this.eliminarUsuario=function(email){
        var cli=this;
        $.getJSON("/eliminarUsuario/"+email,function(data){
            if (data.usuario_eliminado != -1){
                console.log("Usuario "+email+" ha sido eliminado")
                msg="Usuario "+email+" ha sido eliminado";
            }
            else{
                console.log("El usuario " + email + " no se ha podido eliminar");
                msg="El usuario " + email + " no se ha podido eliminar";
            }
            // cw.mostrarMsg(msg);
        })
    }

    this.enviarJwt=function(jwt){
        $.ajax({
            type:'POST',
            url:'/enviarJwt',
            data: JSON.stringify({"jwt":jwt}),
            success:function(data){
                let msg="El email "+data.email+" está ocupado";
                if (data.email!=-1){
                    console.log("Usuario "+data.email+" ha sido registrado");
                    //mostrar un mensaje
                    msg="Bienvenido al sistema, "+data.email;
                    $.cookie("email",data.email);
                }
                else{
                    console.log("El email ya está ocupado");
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
                if (data.email!=-1){
                    console.log("Usuario "+data.email+" ha sido registrado");
                    // $.cookie("email",data.email);
                    // cw.mostrarMsg("Esperando confirmación, verifica tu correo");
                    cw.limpiar();
                    // cw.mostrarMsg("Bienvenido al sistema, "+data.email);
                    cw.mostrarLogin();
                }
                else{
                console.log("El email está ocupado");
                // cw.mostrarMsgError("Ya existe una cuenta con ese correo");
                cw.vistaError("Ya existe una cuenta con ese correo", "registro");
                }
            },
            error:function(xhr, textStatus, errorThrown){
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
        });
    }

    this.loginUsuario = function (email, password) {
        $.ajax({
          type: "POST",
          url: "/loginUsuario",
          data: JSON.stringify({ email: email, password: password }),
          success: function (data) {
            if (data.email != -1) {
                // console.log(data);
                console.log("Usuario " + data.email + " ha sido loggeado");
                $.cookie("email", data.email);
                cw.limpiar();
                // cw.mostrarMsg("Bienvenid@ al sistema, " + data.email);
                //   cw.limpiar();
                // cw.mostrarAgregarUsuario();  
                // cw.obtenerUsuarios();
                // cw.numeroUsuarios();
                // cw.usuarioActivo();
                // cw.eliminarUsuario();
                cw.comprobarSesion();
                } else {
                console.log("No se puede iniciar sesión");
                // cw.mostrarMsgError("No se puede iniciar sesión");
                cw.vistaError("No se puede inicial sesión", "login");
            //   cw.limpiar();
            }
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
          },
          contentType: "application/json",
        });
      };  

      this.cerrarSesion = function () {
        $.getJSON("/cerrarSesion", function () {
          console.log("Sesión cerrada");
          $.removeCookie("email");
        });
      };
}
    
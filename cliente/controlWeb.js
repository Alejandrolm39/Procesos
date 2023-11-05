function ControlWeb(){
    this.mostrarAgregarUsuario=function(){
        $("#mAU").remove();
        let cadena='<div id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label for="nick">Nick:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena+'<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_focus_web.png" style="height:40px;"></a></div>';
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>'; 
        
        $("#au").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnAU").on("click",function(){ 
            let nick=$("#nick").val();
            if (nick){
                $("#mAU").remove();
                rest.agregarUsuario(nick);
            }
        })
    }
    this.mostrarMsg=function(msg){
        $('#mMsg').remove();
        let cadena = '<h2 id="mMsg">' + msg + '<h2>';
        $('#msg').append(cadena);
    }

    this.obtenerUsuarios=function(){
        // $("#mAU").remove();
        let cadena='<div id="mOU" class="form-group">';
        cadena = cadena + '<h3>Obtener usuarios</h3>';
        // cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        // cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnOU" type="submit" class="btn btn-primary">Obtener usuarios</button>';
        cadena = cadena + '</div>';
        
        $("#ou").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnOU").on("click",function(){ 
            rest.obtenerUsuarios();
        })
    }

    this.numeroUsuarios=function(){
        // $("#mAU").remove();
        let cadena='<div id="mNU" class="form-group">';
        cadena = cadena + '<h3>Numero usuarios</h3>';
        // cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        // cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary">Numero de usuarios</button>';
        cadena = cadena + '</div>';
        
        $("#nu").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnNU").on("click",function(){ 
            rest.numeroUsuarios();
        })
    }

    this.usuarioActivo=function(){
        // $("#mUA").remove();
        let cadena='<div id="mUA" class="form-group">';
        cadena = cadena + '<h3>Usuario activo</h3>';
        cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="UA">';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';
        
        $("#ua").append(cadena); 

        $("#btnUA").on("click",function(){ 
            let nick=$("#UA").val();
            rest.UsuarioActivo(nick);
        })
    }

    this.eliminarUsuario=function(){
        // $("#mUA").remove();
        let cadena='<div id="mEU" class="form-group">';
        cadena = cadena + '<h3>Eliminar usuario</h3>';
        cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="EU">';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';
        
        $("#eu").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnEU").on("click",function(){ 
            let nick=$("#EU").val();
            if (nick){
                rest.eliminarUsuario(nick);
            }
        })
    }

    this.comprobarSesion=function(){
        let nick= $.cookie("nick")

        // localStorage.getItem("nick");
        if (nick){
            cw.mostrarMsg("Bienvenido al sistema, "+nick);
        }
        else{
            // cw.mostrarAgregarUsuario();
            // cw.mostrarRegistro();   
            // cw.obtenerUsuarios();
            // cw.numeroUsuarios();
            // cw.usuarioActivo();
            // cw.eliminarUsuario();

            cw.init();
        }
    }      

    this.init=function(){
        let cw=this;
        google.accounts.id.initialize({ 
            client_id:"562859105000-j1ej97neoqcqomu2a0iltcf203majt7j.apps.googleusercontent.com", //prod
            auto_select:false,
            callback:cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }

    this.handleCredentialsResponse=function(response){
        let jwt=response.credential;
        // let user=JSON.parse(atob(jwt.split(".")[1]));
        // console.log(user.name);
        // console.log(user.email);
        // console.log(user.picture);
        rest.enviarJwt(jwt);
    }
       
    
    this.salir=function(){
        // localStorage.removeItem("nick");
        $.removeCookie("nick");
        location.reload();
    }

    this.limpiar=function(){
        $("#au").remove();
        $("#ou").remove();
        $("#nu").remove();
        $("#ua").remove();
        $("#eu").remove();
    }

    this.mostrarRegistro=function(){
        if ($.cookie("nick")) {
            return true;
        }
        $("#BienvenidoText").hide();
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html",function(){
            $("#btnRegistro").on("click",function(){
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                    rest.registrarUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    // this.mostrarLogin=function(){
    //     if ($.cookie("nick")) {
    //         return true;
    //     }
    //     $("#fmLogin").remove();
    //     $("#registro").load("./cliente/login.html",function(){
    //         $("#btnLogin").on("click",function(){
    //             let email=$("#email").val();
    //             let pwd=$("#pwd").val();
    //             if (email && pwd){
    //                 rest.loginUsuario(nick);
    //                 console.log(email+" "+pwd);
    //             }
    //         });
    //     });
    // }
       
}

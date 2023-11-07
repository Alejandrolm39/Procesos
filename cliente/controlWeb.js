function ControlWeb(){
    this.mostrarAgregarUsuario=function(){
        $("#mAU").remove();
        let cadena='<div id="mAU">';  
        cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label for="nick">Agregar un nuevo usuario:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="Introduce un nick"></p>';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Agregar Usuario</button>';
        cadena = cadena + '<style>#btnAU:hover {background-color: #333;}</style>'
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

    this.mostrarMsgError=function(msg){
      $('#mMsgError').remove();
      let cadena = '<h6 id="mMsgError">' + msg + '<h6>';
      $('#msgE').append(cadena);
  }

    this.obtenerUsuarios=function(){
        // $("#mAU").remove();
        let cadena='<div id="mOU">';
        cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label style="display: block;">Obtener la lista de usuarios:</label>';
        cadena = cadena + '<button id="btnOU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Obtener usuarios</button>';
        cadena = cadena + '</div>';
        
        $("#ou").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnOU").on("click",function(){ 
            rest.obtenerUsuarios();
        })
    }

    this.numeroUsuarios=function(){
        // $("#mAU").remove();
        let cadena='<div id="mNU">';
        cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label style="display: block;">Obtener el número de usuarios:</label>';
        // cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        // cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Numero de usuarios</button>';
        cadena = cadena + '</div>';
        
        $("#nu").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnNU").on("click",function(){ 
            rest.numeroUsuarios();
        })
    }

    this.usuarioActivo=function(){
        // $("#mUA").remove();
        let cadena='<div id="mUA">';
        cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label style="display: block;">¿Usuario activo?:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="UA" placeholder="Introduce un nick"></p>';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Submit</button>';
        cadena = cadena + '</div>';
        
        $("#ua").append(cadena); 

        $("#btnUA").on("click",function(){ 
            let nick=$("#UA").val();
            rest.UsuarioActivo(nick);
        })
    }

    this.eliminarUsuario=function(){
        // $("#mUA").remove();
        let cadena='<div id="mEU">';
        cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label style="display: block;">Eliminar un usuario:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="EU" placeholder="Introduce un nick"></p>';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Submit</button>';
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
          $("#BienvenidoText").hide();
            cw.mostrarMsg("Bienvenido al sistema, "+nick);
            cw.mostrarAgregarUsuario(); 
            cw.obtenerUsuarios();
            cw.numeroUsuarios();
            cw.usuarioActivo();
            cw.eliminarUsuario();
        }
        else{
          // cw.mostrarLogin();
          cw.init();
        }
    }      

    this.init=function(){
        let cw=this;
        google.accounts.id.initialize({ 
            client_id:"562859105000-98usk2tt5531rnb2v9nt17uuoasjd011.apps.googleusercontent.com", //prod
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
        $.removeCookie("nick");
        location.reload();
        rest.cerrarSesion();
    }

    this.limpiar=function(){
        $("#au").remove();
        $("#ou").remove();
        $("#nu").remove();
        $("#ua").remove();
        $("#eu").remove();
        $("#fmLogin").remove();
        $("#fmRegistro").remove();
    }

    this.mostrarRegistro=function(){
        if ($.cookie("nick")) {
            return true;
        }
        $("#BienvenidoText").hide();
        $("#fmRegistro").remove();
        $("#fmLogin").remove();
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

    this.mostrarLogin = function () {
        if ($.cookie("nick")) {
          return true;
        }
        $("#BienvenidoText").hide();
        $("#fmLogin").remove();
        $("#fmRegistro").remove();
        $("#login").load("./cliente/login.html", function () {
          $("#btnLogin").on("click", function () {
            let email = $("#email").val();
            let pwd = $("#pwd").val();
            if (email && pwd) {
              rest.loginUsuario(email, pwd);
              console.log(email + " " + pwd);
            }
          });
        });
      };

      this.buscarUsuario = function (obj, callback) {
        buscar(this.usuarios, { email: obj.email }, callback);
      };
    
      this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
      };
    
      function buscar(coleccion, criterio, callback) {
        let col = coleccion;
        coleccion.find(criterio).toArray(function (error, usuarios) {
          if (usuarios.length == 0) {
            callback(undefined);
          } else {
            callback(usuarios[0]);
          }
        });
      }
    
      function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
          if (err) {
            console.log("error");
          } else {
            console.log("Nuevo elemento creado");
            callback(elemento);
          }
        });
      }
       
}

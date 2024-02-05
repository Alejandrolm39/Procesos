function ControlWeb(){
    this.page = "home";
    this.BG_COLOUR = '#231f20';
    this.SNAKE_COLOUR = '#c2c2c2';
    this.FOOD_COLOUR = '#e66916';
    document.title="home";
    // const ws = new ClienteWS();

    // const gameScreen = $("#fmGameScreen");
    // const initialScreen = document.getElementById('initialScreen');
    // const newGameBtn = document.getElementById('newGameButton');
    // const joinGameBtn = document.getElementById('joinGameButton');
    // const gameCodeInput = document.getElementById('gameCodeInput');

    // this.canvas; 
    this.flag = true;
    this.ctx;
    this.playerNumber;
    this.gameActive = false;

    // this.mostrarAgregarUsuario=function(){
    //     $("#mAU").remove();
    //     let cadena='<div id="mAU">';  
    //     cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
    //     cadena = cadena +'<div class="form-group">';
    //     cadena = cadena + '<label for="email">Agregar un nuevo usuario:</label>';
    //     cadena = cadena + '<p><input type="text" class="form-control" id="email" placeholder="Introduce un nick"></p>';
    //     cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Agregar Usuario</button>';
    //     cadena = cadena + '<style>#btnAU:hover {background-color: #333;}</style>'
    //     cadena = cadena + '</div>';
    //     cadena = cadena + '</div></div></div>'; 
        
    //     $("#au").append(cadena); //au es una etiqueta que viene de agregarUsuario

    //     $("#btnAU").on("click",function(){ 
    //         let nick=$("#nick").val();
    //         if (nick){
    //             $("#mAU").remove();
    //             rest.agregarUsuario(nick);
    //         }
    //     })
    // }
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

    // this.obtenerUsuarios=function(){
    //     // $("#mAU").remove();
    //     let cadena='<div id="mOU">';
    //     cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
    //     cadena = cadena +'<div class="form-group">';
    //     cadena = cadena + '<label style="display: block;">Obtener la lista de usuarios:</label>';
    //     cadena = cadena + '<button id="btnOU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Obtener usuarios</button>';
    //     cadena = cadena + '</div>';
        
    //     $("#ou").append(cadena); //au es una etiqueta que viene de agregarUsuario

    //     $("#btnOU").on("click",function(){ 
    //         rest.obtenerUsuarios();
    //     })
    // }

    // this.numeroUsuarios=function(){
    //     // $("#mAU").remove();
    //     let cadena='<div id="mNU">';
    //     cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
    //     cadena = cadena +'<div class="form-group">';
    //     cadena = cadena + '<label style="display: block;">Obtener el número de usuarios:</label>';
    //     // cadena = cadena + '<label for="nick">Introduce el nick:</label>';
    //     // cadena = cadena + '<input type="text" class="form-control" id="nick">';
    //     cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Numero de usuarios</button>';
    //     cadena = cadena + '</div>';
        
    //     $("#nu").append(cadena); //au es una etiqueta que viene de agregarUsuario

    //     $("#btnNU").on("click",function(){ 
    //         rest.numeroUsuarios();
    //     })
    // }

    // this.usuarioActivo=function(){
    //     // $("#mUA").remove();
    //     let cadena='<div id="mUA">';
    //     cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
    //     cadena = cadena +'<div class="form-group">';
    //     cadena = cadena + '<label style="display: block;">¿Usuario activo?:</label>';
    //     cadena = cadena + '<p><input type="text" class="form-control" id="UA" placeholder="Introduce un email"></p>';
    //     cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Submit</button>';
    //     cadena = cadena + '</div>';
        
    //     $("#ua").append(cadena); 

    //     $("#btnUA").on("click",function(){ 
    //         let email=$("#UA").val();
    //         rest.UsuarioActivo(email);
    //     })
    // }

    // this.eliminarUsuario=function(){
    //     // $("#mUA").remove();
    //     let cadena='<div id="mEU">';
    //     cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
    //     cadena = cadena +'<div class="form-group">';
    //     cadena = cadena + '<label style="display: block;">Eliminar un usuario:</label>';
    //     cadena = cadena + '<p><input type="text" class="form-control" id="EU" placeholder="Introduce un email"></p>';
    //     cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary" style="background-color: #a9a9a9; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; font-size: 18px;">Submit</button>';
    //     cadena = cadena + '</div>';
        
    //     $("#eu").append(cadena); //au es una etiqueta que viene de agregarUsuario

    //     $("#btnEU").on("click",function(){ 
    //         let email=$("#EU").val();
    //         if (email){
    //             rest.eliminarUsuario(email);
    //         }
    //     })
    // }

    this.comprobarSesion=function(){
        let email= $.cookie("email")
        // console.log({email, event: "comprobar sesion"});
        // localStorage.getItem("email");
        if (email){
          if (!rest.usuarioActivo(email)){
            rest.agregarUsuario(email);
          }
          this.flag=true;
          // console.log("Comprobar sesión email: " + email);
          ws.email = email;
          // console.log("Comprobar sesión email: " + ws.email);
          $("#NavBarLogin").hide();
          $("#NavBarRegister").hide();
          $("#NavBarExit").removeClass("d-none");
          $("#NavBarMainMenu").removeClass("d-none");
          cw.mostrarMainMenu();
        }
        else{
          // cw.mostrarLogin();
          // cw.init();
        }
    }      

    this.init=function(){
        let cw=this;
        google.accounts.id.initialize({ 
            // client_id:"562859105000-j1ej97neoqcqomu2a0iltcf203majt7j.apps.googleusercontent.com", //prod
            client_id:"562859105000-aida40ck4gkpjcscjqk6ft62usrjfa9d.apps.googleusercontent.com", //dev
            auto_select:false,
            callback:cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }

    this.handleCredentialsResponse=function(response){
        let jwt=response.credential;
        rest.enviarJwt(jwt);
    }
       
    
    this.salir=function(){
        // $.removeCookie("email");
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
        $("#fmMultiplayerMenu").remove();
    }

    this.mostrarRegistro=function(){
        if ($.cookie("email")) {
            return true;
        }
        $("#BienvenidoText1").hide();
        $("#BienvenidoText2").hide();
        $("#fmRegistro").remove();
        $("#fmLogin").remove();
        $("#registro").load("./cliente/registro.html",function(){
          document.title="registro";
            $("#btnRegistro").on("click",function(event){
                event.preventDefault();
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
        // let flag = false;
        if ($.cookie("email")) {
          return true;
        }
        $("#BienvenidoText1").hide();
        $("#BienvenidoText2").hide();
        $("#fmLogin").remove();
        $("#fmRegistro").remove();
        $("#login").load("./cliente/login.html", function () {
          document.title="login";
          $("#btnLogin").on("click", function (event) {
            event.preventDefault();
            let email = $("#email").val();
            let pwd = $("#pwd").val();
            if (email && pwd) {
                rest.loginUsuario(email, pwd);
                console.log(email + " " + pwd);
                // flag = true;
                // if (flag) {
                //   $("#NavBarLogin").hide();
                //   $("#NavBarRegister").hide();
                // }
            }
          });
        });
      };

      this.mostrarMainMenu = function(){
        if ($.cookie("email")) {
          // $("#BienvenidoText1").hide();
          // $("#BienvenidoText2").hide();
          // $("#fmLogin").remove();
          // $("#fmRegistro").remove();
          this.flag=true;
          $('#fmJoinErrorModal').remove();
          $('#fmRepeatGame').remove();
          $('#fmGameOverModal').remove();
          $("#BienvenidoText1").hide();
          $("#BienvenidoText2").hide();
          $("#fmMultiplayerMenu").remove();
          $("#fmJoinGame").remove();
          $("#fmGameScreen").remove();
          $("#menu").load("./cliente/mainMenu.html", function () {
            document.title="menuPrincipal";
            $("#btnTraditionalSnake").on("click", function () {
              // self.canvas = $('#canvas');
              $("#fmMultiplayerMenu").remove();
              $("#fmMainMenu").remove();
              $("#gameScreen").load("./cliente/gameScreen.html", function () {
                document.title="pantallaJuego";
                $("#gameCodeText1").hide();
                // self.canvas = document.getElementById('canvas');
                // self.canvas = $("#canvas")[0];
                // Inicializar el cliente WS para el juego
                ws.crearPartida1Jugador();
                // Puedes agregar más lógica según sea necesario
              });
            });
            $("#btnMultiplayerSnake").on("click", () => {
              cw.mostrarMultiplayerMenu();
            });
          });
        }
      }

      this.mostrarMultiplayerMenu = function () {
        // let flag = false;
        if ($.cookie("email")) {
          // $("#BienvenidoText1").hide();
          // $("#BienvenidoText2").hide();
          // $("#fmLogin").remove();
          // $("#fmRegistro").remove();
          $("#fmMainMenu").remove();
          $("#fmJoinGame").remove();
          $("#fmGameScreen").remove();
          $("#menu").load("./cliente/multiplayerMainMenu.html", function () {
            document.title="menuMultijugador";
            $("#btnNewGame").on("click", function () {
              // self.canvas = $('#canvas');
              $("#fmMultiplayerMenu").remove();
              $("#gameScreen").load("./cliente/gameScreen.html", function () {
                document.title="pantallaJuego";
                $("#gameCodeText1").show();
                // Aquí puedes realizar acciones específicas después de cargar el contenido del juego
                // self.canvas = document.getElementById('canvas');
                // self.canvas = $("#canvas")[0];
                // Inicializar el cliente WS para el juego
                ws.crearPartida();
                // Puedes agregar más lógica según sea necesario
              });
            });
            $("#btnJoinGame").on("click", () => {
              cw.mostrarJoinGameModal();
            });
          });
        }
      };

      this.home = function (){
        if (($.cookie("email"))) {
          // $("#NavBarLogin").show();
          // $("#NavBarRegister").show();
          $("#BienvenidoText1").show();
          $("#BienvenidoText2").show();
          $("#fmLogin").remove();
          $("#fmRegistro").remove();
          $("#fmMainMenu").remove();
          $("#fmJoinGame").remove();
          $("#fmMultiplayerMenu").remove();
          $("#fmGameScreen").remove();
        }
        else {
          $("#NavBarLogin").show();
          $("#NavBarRegister").show();
          $("#BienvenidoText1").show();
          $("#BienvenidoText2").show();
          $("#fmLogin").remove();
          $("#fmRegistro").remove();
        }
      }
      
      this.vistaPostError = function(){
        if (this.page == "registro"){
          this.mostrarRegistro();
        }
        else if (this.page == "login"){
          
          this.mostrarLogin();
        } else if (this.page == "joinModal"){
          this.mostrarJoinGameModal();
        }
        $("#fmErrorModal").remove();
      }

      this.vistaError = function(msg, page){
        this.page=page
        // $("#fmLogin").hide();
        if (page == "login" || page == "registro"){
          $("#modalMsg").load("./cliente/errorModal.html", function () {
            let cadena = '<h6 id="mMsgError">' + msg + '<h6>';
            $('#MsgModal').append(cadena);
          });
        }
        else {
          $("#modalMsg").load("./cliente/joinErrorModal.html", function () {
            let cadena = '<h6 id="mMsgError">' + msg + '<h6>';
            $('#MsgModal2').append(cadena);
          });
        }
      }

      this.vistaGameOver = function(msg1, msg2){
        $("#modalMsg").load("./cliente/gameOverModal.html", function () {
          $('#msgModalGameOver').append(msg1);
          $('#msgModalGameOver2').append(msg2);
        });
      }

      this.vistaPostGameOver = function(){
        if (!this.flag){
          cw.mostrarRepeatGameModal();
         }
        $('#fmGameOverModal').remove();
      }

      // this.vistaNegarJugar = function(){
      //   $('#fmRepeatGame').remove();
      // }

      this.mostrarJoinGameModal = function(){
        $("#fmMultiplayerMenu").remove();
        $("#modalMsg").load("./cliente/joinGameModal.html", function () {
          document.title="joinModal";
          $("#btnJoinGame2").on("click", function () {
            let code = $("#gameCodeInput").val();
            if (code) {
              $("#fmJoinGame").remove();
              $("#gameScreen").load("./cliente/gameScreen.html", function () {
                $("#gameCodeText1").hide();
                  ws.unirAPartida(code);
              });  
            }
            else{
              // $("#fmJoinGame").remove();
              cw.vistaError("Ingrese un código de partida", "joinModal");
              // console.log("Fucking panza");
            }
          });
        });
      }

      this.mostrarRepeatGameModal = function(){
        $("#repeatGame").load("./cliente/repeatGame.html", function () {
          $("#btnRepeatGame").on("click", function () {
            $('#fmGameOverModal').remove();
            $('#fmRepeatGame').remove();
              ws.crearPartida1Jugador();
          });
        });
      }

      this.handleInit = function(number) {
        this.playerNumber = number;
        // console.log("llego a función handleinit");
        // console.log(playerNumber);
      }

      this.paintGame = function(state, flag) {
        this.ctx.fillStyle = this.BG_COLOUR;
        this.ctx.fillRect(0, 0, ws.canvasElement.width, ws.canvasElement.height);
        // console.log({state});
        let food = state.food;
        let gridsize = state.gridsize;
        let size = ws.canvasElement.width / gridsize;

        // console.log("jeje no hago nada");
      
        this.ctx.fillStyle = this.FOOD_COLOUR;
        this.ctx.fillRect(food.x * size, food.y * size, size, size);
        
        if (flag){
          cw.paintPlayer(state.players[0], size, this.SNAKE_COLOUR);
          cw.paintPlayer(state.players[1], size, 'red');
        }
        else{
          cw.paintPlayer(state.players[0], size, this.SNAKE_COLOUR);
        }
      }

      this.paintPlayer = function(playerState, size, colour) {
        const snake = playerState.snake;
      
        this.ctx.fillStyle = colour;
        for (let cell of snake) {
          this.ctx.fillRect(cell.x * size, cell.y * size, size, size);
        }
      }

      this.handleGameCode = function(gameCode) {
        // $("#gameCodeDisplay").innerText = gameCode;
        // let cadena = '<h6>' + gameCode + '<h6>';
        $('#gameCodeDisplay').append(gameCode);
        // console.log(cadena);
      }

      this.handleUnknownCode = function() {
        cw.reset();
        $("#fmGameScreen").remove();
        cw.vistaError("Este código de partida no existe", "joinModal");
        // alert('Unknown Game Code')
      }
      
      this.handleTooManyPlayers = function() {
        cw.reset();
        $("#fmGameScreen").remove();
        cw.vistaError("Ya hay dos jugadores jugando esta partida", "joinModal");
      }

      this.reset = function() {
        this.playerNumber = null;
        $("#gameCodeDisplay").value = '';
        // gameCodeInput.value = '';
        // initialScreen.style.display = "block";
        // gameScreen.style.display = "none";
      }

      this.handleGameOver = function(data) {
        if (!this.gameActive) {
          return;
        }
        data = JSON.parse(data);
      
        this.gameActive = false;
      
        if (data.winner === this.playerNumber) {
          alert('You Win!');
        } else {
          alert('You Lose :(');
        }
      }

      this.handleGameState = function(gameState) {
        if (!this.gameActive) {
          return;
        }
        gameState = JSON.parse(gameState);
        requestAnimationFrame(() => cw.paintGame(gameState));
      }

      // this.mostrarJuego = function () {
      //   // Por ejemplo, asumiendo que tienes un elemento con el id 'gameContainer':
      //   $("#fmMultiplayerMenu").remove();
      //   $("#gameScreen").load("./cliente/gameScreen.html", function () {
      //       // Aquí puedes realizar acciones específicas después de cargar el contenido del juego

      //       // Inicializar el cliente WS para el juego
      //       const ws = new ClienteWS();

      //       // Puedes agregar más lógica según sea necesario
      //   });
    // };

      // this.passwordVisibility = function(){
      //   let passwordInput=$("#pwd").val();
      //   let eyeInput=$("#eye").val();

      //   if (passwordInput.type === "password") {
      //     passwordInput.type = "text";
      //     eyeInput.name = "eye-off";
      // } else {
      //     passwordInput.type = "password";
      //     eyeInput.name = "eye";
      // }
      // }

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

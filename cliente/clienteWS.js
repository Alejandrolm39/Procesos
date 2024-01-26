function ClienteWS(){
    this.socket=undefined;
    this.email=undefined;
    this.code=undefined;
    // this.playerNumber = undefined;
    // this.gameActive = false;

    // Functions for initialize the sockets
    this.ini=function() {
        this.socket=io.connect();
    }

    this.ini();

    this.crearPartida=function(){
        console.log("hola0")
        if (this.email==undefined) {
            console.log("Tienes que estar registrado");
            return false;
        }
        console.log("hola1");
        console.log(this.email);
        this.socket.emit("crearPartida",{"email":this.email});
        console.log("hola2");
        return true;
    };

    this.socket.on("partidaCreada", () => {
        // this.code=datos.codigo;
        // logic.playerColor=datos.color;
        console.log("llegué a partida creada clienteWS");
        this.init();
        // cw.showWaitingModal(datos.codigo);
        // cw.page = 'waiting';
    });

    this.unirAPartida=function(code){
        // console.log("Esto no funciona :" + cw.gameCodeInput.value);
        // this.code=cw.gameCodeInput.value;
        console.log(code);
        this.socket.emit("unirAPartida",{"email":this.email,"codigo":code});
        this.init();
    }

    this.socket.on("listaPartidas",function(lista){
        console.log(lista);
        // cw mostrar lista de partidas
    });

    this.socket.on('init', function (number) {
        console.log("llego al init cocket");
        cw.handleInit(number);
    });

    this.socket.on('gameState', function (gameState) {
        console.log("hola game state");
        if (!cw.gameActive) {
            return;
        }
        console.log("he entrado");
        console.log({gameState});
        // gameState = JSON.parse(gameState);
        requestAnimationFrame(() => cw.paintGame(gameState));
    });

    this.socket.on('gameOver', function (data) {
        if (!cw.gameActive) {
            return;
        }
        // data = JSON.parse(data);
        cw.gameActive = false;

        if (data.winner === cw.playerNumber) {
            alert('You Win!');
            console.log("you win");
        } else {
            alert('You Lose :(');
            console.log("you lose");
        }
    });

    this.socket.on('gameCode', function (gameCode) {
        console.log("Está llegando");
        cw.handleGameCode(gameCode);
    });

    this.socket.on('unknownCode', function () {
        cw.handleUnknownCode();
        cw.reset();
        alert('Unknown Game Code');
    });

    this.socket.on('tooManyPlayers', function () {
        cw.handleTooManyPlayers();
        cw.reset();
        alert('This game is already in progress');
    });

    // this.newGame = function () {
    //     this.socket.emit('newGame');
    //     this.init();
    // };

    // this.joinGame = function () {
    //     const code = cw.gameCodeInput.value;
    //     this.socket.emit('joinGame', code);
    //     this.init();
    // };

    this.init = function () {
        // cw.initialScreen.style.display = 'none';
        // cw.gameScreen.style.display = 'block';
        // console.log("llegue a this.init");
        // console.log("Valor de canvas:" + cw.canvas);
        this.canvasElement = $("#canvas")[0];
        // console.log("Valor de canvas:" + canvasElement);
        if(this.canvasElement){
            cw.ctx = this.canvasElement.getContext('2d');

            this.canvasElement.width = this.canvasElement.height = 600;

            cw.ctx.fillStyle = cw.BG_COLOUR;
            cw.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

            document.addEventListener('keydown', ws.keydown);
            cw.gameActive = true;
        }
        else{
            console.log("vaya sinson");
        }
    };

    this.keydown = function (e) {
        console.log("hola estoy en la keydown");
        ws.socket.emit('keydown', e.keyCode);
    };
}
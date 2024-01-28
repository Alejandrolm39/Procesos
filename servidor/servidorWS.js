const { initGame, gameLoop, getUpdatedVelocity } = require('./game.js');
const { makeid } = require('./utils.js');
const { FRAME_RATE } = require('./constants.js');

const state = {};
const clientRooms = {};

function WSServer(){
    let servidor = this;
    this.lanzarServer=function(io,sistema){
        io.on('connection',function(socket){
            console.log("Capa WS activa");

            socket.on("crearPartida",function(datos){
                console.log({datos, event: "crear partida"});
                // let {codigo} = sistema.crearPartida(datos.email);
                let {codigo} = sistema.crearPartida(datos.email);
                console.log({codigo});
                console.log("hola hola caracola");
                if (codigo !=-1){
                    socket.join(codigo);
                }
                // srv.enviarAlRemitente(socket,"partidaCreada",{"codigo":codigo, color:'white'});
                // let lista = sistema.obtenerPartidasDisponibles();
                // srv.enviarATodos(socket,"listaPartidas",lista);

                const roomName = codigo;
                clientRooms[socket.id] = roomName;
                // console.log("hola gamecode1");
                // console.log(roomName);
                // console.log("roomanem error");
                servidor.enviarAlRemitente(socket, "gameCode", roomName);
                // socket.emit('gameCode', roomName);
                // console.log("Se lo salta");
                state[roomName] = initGame();
                console.log("la roomname es;" + roomName);
                console.log("la state roomname es: " + state[roomName]);
                socket.number = 1;
                servidor.enviarAlRemitente(socket, "init", 1);  
                // socket.emit('init', 1);

                // servidor.startGameInterval(socket, roomName);
                socket.emit('partidaCreada');
            });

            socket.on("crearPartida1Jugador",function(datos){
                let {codigo} = sistema.crearPartida(datos.email);
                console.log({codigo});
                if (codigo !=-1){
                    socket.join(codigo);
                }
                // srv.enviarAlRemitente(socket,"partidaCreada",{"codigo":codigo, color:'white'});
                // let lista = sistema.obtenerPartidasDisponibles();
                // srv.enviarATodos(socket,"listaPartidas",lista);

                const roomName = codigo;
                clientRooms[socket.id] = roomName;
                // console.log("hola gamecode1");
                // console.log(roomName);
                // console.log("roomanem error");
                servidor.enviarAlRemitente(socket, "gameCode", roomName);
                // socket.emit('gameCode', roomName);
                // console.log("Se lo salta");
                state[roomName] = initGame();
                // console.log("la roomname es;" + roomName);
                // console.log("la state roomname es: " + state[roomName]);
                socket.number = 1;
                servidor.enviarAlRemitente(socket, "init", 1);  
                // socket.emit('init', 1);

                // servidor.startGameInterval(socket, roomName);
                // socket.emit('partidaCreada1Jugador');
                servidor.startGameInterval(socket, roomName, false);
            });

            socket.on("unirAPartida",function(datos){
                console.log({datos});
                let codigo = datos.codigo;
                console.log(datos.email+" se une a partida "+codigo);

                let res = sistema.unirAPartida(datos.email,codigo);
                if (res.codigo!=-1 && res.codigo!=-2){
                    socket.join(codigo);
                }
                else if (res.codigo==-1){
                    socket.emit('unknownCode');
                    return;
                }
                else {
                    socket.emit('tooManyPlayers');
                    return;
                }
                console.log(res);
                // srv.enviarAlRemitente(socket,"unidoAPartida",res);
                // let lista = sistema.obtenerPartidasDisponibles();
                // srv.enviarATodos(socket,"listaPartidas",lista);

                const roomName = codigo;
                console.log("room name en unir partida" + roomName);
                clientRooms[socket.id] = roomName;
                // state[roomName] = initGame();
                socket.number=2;
                socket.emit('init', 2);
                // console.log("por qué se hace esto");
                servidor.startGameInterval(socket, roomName, true);
            });

            socket.on('keydown', function (keyCode) {
                const roomName = clientRooms[socket.id];
                if (!roomName || !state[roomName] || !state[roomName].players) {
                    return;
                }
                try {
                    keyCode = parseInt(keyCode);
                } catch (e) {
                    console.error(e);
                    return;
                }
                if (state[roomName].players[socket.number - 1]){
                    const vel = getUpdatedVelocity(keyCode);

                    if (vel) {
                        state[roomName].players[socket.number - 1].vel = vel;
                    }
                }
            });
        });
    }

    this.enviarAlRemitente=function(socket,mensaje,datos){
        console.log("hola de nuevo sinson");
        socket.emit(mensaje,datos);
    }
    
    // this.enviarATodos=function(socket,mens,datos){
    //     socket.broadcast.emit(mens,datos);
    // }
    
    // this.enviarGlobal=function(io,mens,datos){
    //     io.emit(mens,datos);
    // }

    this.startGameInterval = function(socket, roomName, flag) {
        const intervalId = setInterval(() => {
            const winner = gameLoop(state[roomName]);
                // console.log("pero por que se hace esto");
            if (!winner) {
                console.log("state roomname: " + state[roomName]);
                console.log("room name: " + roomName);
                this.emitGameState(socket, roomName, state[roomName], flag)
            } else {
                this.emitGameOver(socket, roomName, winner, flag);
                state[roomName] = null;
                clearInterval(intervalId);
            }
        }, 1000 / FRAME_RATE);
    }
    
    this.emitGameState = function(socket, room, gameState, flag) {
        if (flag){
            socket.to(room).emit('gameState', gameState, flag);
            socket.emit('gameState', gameState, flag);
        }
        else{
            socket.emit('gameState', gameState, flag);
        }
    }
    
    this.emitGameOver = function(socket, room, winner, flag) {
        // io.sockets.in(room) //obtener todos los sockects en la sala especificada
        //     .emit('gameOver', JSON.stringify({ winner })); //emite el evento gameOver con el resultado del juego serializado
        if (flag){
            console.log({winner});
            socket.to(room).emit('gameOver', {winner, flag});
            socket.emit('gameOver', {winner, flag});
        }
        else {
            console.log({winner});
            socket.emit('gameOver', {winner, flag});
        }
    }
};

module.exports.WSServer=WSServer;
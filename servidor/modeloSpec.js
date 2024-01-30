const modelo = require("./modelo.js");

describe('El sistema', function() {
  let sistema;
  const usr1 = { email: "alejandrolm35@gmail.com", password: "asd", nick: "alejandro" };
  const usr2 = { email: "usr2@test.es", password: "usr2", nick: "usr2" };

  beforeEach(function() {
    sistema=new modelo.Sistema(true);
  });
  
  it('inicialmente no hay usuarios', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
  });

  it('agregar usuario', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);

    sistema.agregarUsuario({email: usr1.email}, function(usr){
      res = sistema.numeroUsuarios();
      expect(res.num).toEqual(1);

      // expect(sistema.usuarios[usr1.email].nick).toEqual("usr1");
      expect(sistema.usuarios[usr1.email].email).toEqual("alejandrolm35@gmail.com");
      // expect(sistema.usuarios[usr1.email].password).toEqual("usr1");
    });
  })

  it('eliminar usuario', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario({email: usr1.email}, function(){
      res = sistema.numeroUsuarios();
      expect(res.num).toEqual(1);
      let res2 = sistema.eliminarUsuario(usr1.email);
      res = sistema.numeroUsuarios();
      expect(res.num).toEqual(0);
    });
  })

  it('usuario activo', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario({email: usr1.email}, function(){
      res = sistema.numeroUsuarios();
      expect(res.num).toEqual(1);
      res = sistema.usuarioActivo(usr1.email);
      expect(res).toEqual({"res":true});
    });
  })

  it('obtener usuario', function() {
    let res = sistema.obtenerUsuarios();
    expect(Object.keys(res).length).toEqual(0);
    let res2 = sistema.numeroUsuarios();
    expect(res2.num).toEqual(0);
    sistema.agregarUsuario({email: usr1.email}, function(){
      sistema.agregarUsuario({email: usr2.email}, function(){
        res2 = sistema.numeroUsuarios();
        expect(res2.num).toEqual(2);
        res = sistema.obtenerUsuarios();
        expect(Object.keys(res).length).toEqual(2);
      });
    });
  })

  it('numero usuarios', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario({email: usr1.email}, function(){
      sistema.agregarUsuario({email: usr2.email}, function(){
        res = sistema.numeroUsuarios();
        expect(res.num).toEqual(2);
      });
    });
  });

  describe("Metodos que acceden a datos", function () {    
    beforeEach(function (done) {
      sistema.cad.conectar(function () {
          done();
      });
    })
  
    it("Inicio de sesión correcto", function (done) {
      sistema.loginUsuario(usr1, function(res){
        expect(res.email).toEqual(usr1.email);
        done();
      });
    });
  
    it("Inicio de sesión incorrecto", function (done) {
      sistema.loginUsuario(usr2, function(res){
        expect(res.email).toEqual(-1);
        done();
      });
    });
  });

  describe("Metodos relacionados con las partidas", function () {
    
    beforeEach(function () {
      sistema.agregarUsuario({email: usr1.email}, function(){});
      sistema.agregarUsuario({email: usr2.email}, function(){});
    });
  
    it("Crear una partida", function () {
      sistema.crearPartida(usr1.email);
      let lista = sistema.obtenerPartidasDisponibles();
      expect(lista.length).toEqual(1);
    });
  
    it("Unirse a una partida", function () {
      let {codigo} = sistema.crearPartida(usr1.email);
      expect(sistema.obtenerPartidasDisponibles().length).toEqual(1)
      expect(sistema.obtenerJugadores(codigo)).toEqual(1);
      sistema.unirAPartida(usr2.email,codigo);
      expect(sistema.obtenerJugadores(codigo)).toEqual(2);
    });
    
    it("Eliminar una partida", function () {
      let {codigo} = sistema.crearPartida(usr1.email);
      expect(sistema.obtenerPartidasDisponibles().length).toEqual(1)
      sistema.eliminarPartida(codigo);
      expect(sistema.obtenerPartidasDisponibles().length).toEqual(0);
    });
    
  });
})


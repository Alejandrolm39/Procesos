const modelo = require("./modelo.js");

describe('El sistema', function() {
  let sistema;
  let usr1 = { email: "usr1@test.es", password: "usr1", nick: "usr1" };
  let usr2 = { email: "usr2@test.es", password: "usr2", nick: "usr2" };

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

    sistema.agregarUsuario({email: usr1.email}, usr1);
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);

    expect(sistema.usuarios[usr1.email].nick).toEqual("usr1");
    expect(sistema.usuarios[usr1.email].email).toEqual("usr1@test.es");
    expect(sistema.usuarios[usr1.email].password).toEqual("usr1");
  })

  it('eliminar usuario', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario(usr);
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
    let res2 = sistema.eliminarUsuario("pepe@pepe.es");
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
  })

  it('usuario activo', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
    res = sistema.usuarioActivo("Pepe");
    expect(res).toEqual({"res":true});
  })

  it('obtener usuario', function() {
    let res = sistema.obtenerUsuarios();
    expect(Object.keys(res).length).toEqual(0);
    let res2 = sistema.numeroUsuarios();
    expect(res2.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    sistema.agregarUsuario("Juan");
    res2 = sistema.numeroUsuarios();
    expect(res2.num).toEqual(2);
    res = sistema.obtenerUsuarios();
    expect(Object.keys(res).length).toEqual(2);
  })

  it('numero usuarios', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    sistema.agregarUsuario("Juan");
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(2);
  });
})

// describe("Metodos que acceden a datos", function () {    
//   beforeEach(function (done) {
//     sistema.cad.conectar(function () {
//         done();
//     });
//   })

//   it("Inicio de sesión correcto", function (done) {
//     sistema.loginUsuario(usrTest, function(res){
//       expect(res.email).toEqual(usrTest.email);
//       done();
//     });
//   });

//   it("Inicio de sesión incorrecto", function (done) {
//     sistema.loginUsuario(usrTest2, function(res){
//       expect(res.email).toEqual(-1);
//       done();
//     });
//   });
// });


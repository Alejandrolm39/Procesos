const modelo = require("./modelo.js");

describe('El sistema', function() {
  let sistema;
  
  beforeEach(function() {
    sistema=new modelo.Sistema(true);
    usr={"nick":"Pepe", "email":"pepe@pepe.es"};
  });
  
  it('inicialmente no hay usuarios', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
  });

  it('agregar usuario', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario(usr);
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
    expect(sistema.usuarios[usr.email].nick).toEqual("Pepe");
    expect(sistema.usuarios[usr.email].nick).toEqual("pepe@pepe.es");
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

  // describe("Métodos que acceden a datos", function(){

  //   let usrTest={"email":"test@test.es","nick":"test"}
    
  //   beforeEach(function(done){
  //     sistema.cad.conectar(function({

  //     }))
  //     // sistema.cad.registrarUsuario(usrTest,function(res){
  //       done();
  //     })
  //   })
    
  //   xit("Inicio de sesión correcto", function(){

  //   })

  //   xit("Inicio de sesión incorrecto", function(){

  //   })
  // })


})

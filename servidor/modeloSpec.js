const modelo = require("./modelo.js");

describe('El sistema', function() {
  let sistema;
  
  beforeEach(function() {
    sistema=new modelo.Sistema(true)
  });
  
  it('inicialmente no hay usuarios', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
  });

  it('agregar usuario', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
  })

  it('eliminar usuario', function() {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
    sistema.eliminarUsuario("Pepe");
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
  })


})

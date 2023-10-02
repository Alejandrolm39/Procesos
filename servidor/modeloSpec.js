const modelo = require("./modelo.js");

describe('El sistema', function() {
  let sistema;
  
  beforeEach(function() {
    sistema=new modelo.Sistema()
  });
  
  it('inicialmente no hay usuarios', function() {
    expect(sistema.numeroUsuarios()).toEqual(0);
  });

  it('agregar usuario', function() {
    expect(sistema.numeroUsuarios()).toEqual(0);
    sistema.agregarUsuario("Pepe");
    expect(sistema.numeroUsuarios()).toEqual(1);
    expect(sistema.usuarios["Pepe"].nick).toEqual("Pepe");
  })

  it('eliminar usuario', function() {
    expect(sistema.numeroUsuarios()).toEqual(0);
    sistema.agregarUsuario("Pepe");
    expect(sistema.numeroUsuarios()).toEqual(1);
    sistema.eliminarUsuario("Pepe");
    expect(sistema.numeroUsuarios()).toEqual(0);
  })

  it('usuario activo', function() {
    sistema.agregarUsuario("Pepe");
    expect(sistema.usuarioActivo("Pepe")).toEqual(true);
  })

  it('obtener usuario', function() {
    let lista = sistema.obtenerUsuarios();
    expect(Object.keys(lista).length).toEqual(0);
    sistema.agregarUsuario("Pepe");
    sistema.agregarUsuario("Juan");
    lista = sistema.obtenerUsuarios();
    expect(Object.keys(lista).length).toEqual(2);
  })

  it('numero usuarios', function() {
    let num = sistema.numeroUsuarios();
    expect(num).toBe(0);
    sistema.agregarUsuario("Pepe");
    sistema.agregarUsuario("Juan");
    num = sistema.numeroUsuarios();
    expect(num).toBe(2);
  })


})

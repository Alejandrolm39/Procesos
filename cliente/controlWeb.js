function ControlWeb(){
    this.mostrarAgregarUsuario=function(){
        $("#mAU").remove();
        let cadena='<div id="mAU" class="form-group">';
        cadena = cadena + '<h3>Agregar Usuario</h3>';
        cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';
        
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
        let nick=localStorage.getItem("nick");
        if (nick){
            cw.mostrarMsg("Bienvenido al sistema, "+nick);
        }
        else{
            cw.mostrarAgregarUsuario();
            cw.obtenerUsuarios();
            cw.numeroUsuarios();
            cw.usuarioActivo();
            cw.eliminarUsuario();
        }
    }      
    
    this.salir=function(){
        localStorage.removeItem("nick");
        location.reload();
    }
       
}
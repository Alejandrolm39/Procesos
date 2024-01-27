const nodemailer = require('nodemailer'); // npm install nodemailer
const gv = require('./gestorVariables.js');
const url="http://localhost:3000/";
const url2="https://arqbase-gh-co5nc3waja-ew.a.run.app/";
let options;

// let options = {
//     user: "",//'alejandrolm35@gmail.com',
//     pass: ""//'ncly niqx jare disq' 
// }

// gv.accessCLAVECORREO(function(clave){
//     options.user= clave;
//     options.pass=clave;
// })

module.exports.conectar=function(callback){
    gv.obtenerOptions(function(res){
        options=res;
        callback(res);
    });
}

module.exports.enviarEmail=async function(direccion, key,men) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: options
    });

    const correoHTML = `
        <html>
            <body style="font-family: Arial, sans-serif; text-align: center;">
                <h1 style="color: #007BFF;">¡Bienvenido al Sistema!</h1>
                <p style="font-size: 18px;">Para confirmar tu cuenta, por favor haz clic en el siguiente enlace:</p>
                <p style="font-size: 18px;">
                    <a href="${url2}confirmarUsuario/${direccion}/${key}" style="text-decoration: none; background-color: #007BFF; color: #fff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Confirmar cuenta</a>
                </p>
            </body>
        </html>
    `;

    const result = await transporter.sendMail({
        from: 'alejandrolm35@gmail.com',
        to: direccion,
        subject: 'Confirmar cuenta',
        text: 'Pulsa aquí para confirmar cuenta',
        html: correoHTML
        // '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Pulsa aquí para confirmar cuenta</a></p>'
    });
    console.log(JSON.stringify(result, null, 4));
}   

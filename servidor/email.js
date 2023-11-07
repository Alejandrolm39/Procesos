const nodemailer = require('nodemailer'); // npm install nodemailer
const url="http://localhost:3000/";
const url2="https://arqbase-gh-co5nc3waja-ew.a.run.app/";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alejandrolm35@gmail.com',
        pass: 'ncly niqx jare disq' //no es la clave de gmail
    }
});

//send();

module.exports.enviarEmail=async function(direccion, key,men) {
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

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessCLAVECORREO() {
  const name = 'projects/562859105000/secrets/CLAVECORREO/versions/1';
  const [version] = await client.accessSecretVersion({
      name: name,
  });
  const datos=version.payload.data.toString("utf8");
  console.log(datos);
  return datos;
}

async function accessEMAIL (callback) {
  const name = "projects/562859105000/secrets/EMAIL/versions/1";
  const [version] = await client.accessSecretVersion({
    name: name,
  });
  const datos = version.payload.data.toString("utf8");
  console.log(datos);
  return datos;
};

module.exports.obtenerOptions= async function(callback){
  let options={user:"",pass:""};
  let user = await accessEMAIL();
  let pass = await accessCLAVECORREO();
  options.user = user;
  options.pass = pass;
  console.log({options});
  callback(options);
}

// module.exports.accessCLAVECORREO= async function(callback) {
//     const name = 'projects/562859105000/secrets/CLAVECORREO/versions/1';
//       const [version] = await client.accessSecretVersion({
//         name: name,
//       });
//       //console.info(`Found secret ${version.name} with state ${version.state}`);
//       const datos=version.payload.data.toString("utf8");
//       //console.log("Datos "+datos);
//       callback(datos);
// }

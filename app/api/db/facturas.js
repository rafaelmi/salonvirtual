const monk = require('monk');
const db = require('./connection');
const response = require('./response').response;

const facturas = db.get('facturas');
const counters = db.get('counters');
const users = db.get('usuarios');

function create(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  console.log(args)
  return users.findOneAndUpdate(
    {_id: session.username },
    {$inc:{lastFacturaId:1}},
    {castIds: false}
  ).then((user) => {
    console.log(user)
    args.usuario = session.username
    args.facturaId = user.lastFacturaId.toString();
    args.fechaCreacion = new Date();
    args.estado = 'Creado';
    return facturas.insert(args)
    .then(data => {
      return response(250, data);
    });
  });
}
/*
function get(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  return facturas.findOne({_id: args._id},{castIds: false})
  .then(data => {
    return response(200, data);
  });
}
*/
function getAll(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  return facturas.find({usuario: session.username})
  .then(data => {
    return response(200, data);
  });
}

module.exports = {
    create,
    // get,
    getAll,
};

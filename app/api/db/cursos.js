const monk = require('monk');
const db = require('./connection');
const response = require('./response').response;

const cursos = db.get('cursos');
const usuarios = db.get('usuarios');

function get(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  return cursos.findOne({_id: args._id})
  .then(data => {
    return response(200, data);
  });
}

function getAll(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  return cursos.find({socio: session.username})
  .then(data => {
    return response(200, data);
  });

}


module.exports = {
    get,
    getAll
};

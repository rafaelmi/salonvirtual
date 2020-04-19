const monk = require('monk');
const db = require('./connection');
const response = require('./response').response;

const cursos = db.get('cursos');
const usuarios = db.get('usuarios');
const chat = db.get('chat');

function get(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  return cursos.find()
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

function subscribe (args, session, socket) {
  return new Promise((resolve, reject) => {
    try {
      const username = session.username;
      const id = args.id;
      /*if (!username) {
        throw 403
      }*/
      return cursos.findOne(
        {/*_id: username, */_id: monk.id(id)},
        {castIds: false}
      )
        .then(data => {
          try {
            if (!data){
              throw 403
            }
            socket.join(id);
            resolve();
            chat.find(
              {curso: monk.id(id)},
              {fields: {_id: 0}}
            )
              .then(messages => {
                socket.emit('message', messages);
              })
          } catch (e) {
            reject(response(e).title);
          }
        });
    } catch (e) {
      reject(response(e).title);
    }
  })
}

function message (args, session, socket) {
  return new Promise((resolve, reject) => {
    try {
      const username = session.username;
      const curso = args.id;
      /*if (!username || socket.rooms.indexOf(id) < 0) {
        throw 403
      }*/
      args.fecha = new Date()
      delete(args.id)
      chat.insert(
        {curso: monk.id(curso), message: args}
      ).then(data => {
        try {
          if (!data){
            throw 500
          }
          resolve();
          socket.to(curso).emit('message', [data]);
          socket.emit('message', [data]);
        } catch (e) {
          reject(response(e).title);
        }
      });
    } catch (e) {
      reject(response(e).title);
    }
  })
}


module.exports = {
    get,
    getAll,
    subscribe,
    message
};

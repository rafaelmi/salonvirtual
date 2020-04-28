const monk = require('monk');
const db = require('../db/connection');
const fs = require('fs');
const response = require('../db/response').response;
const crypto = require('crypto');

const cursos = db.get('cursos');
const usuarios = db.get('usuarios');
const contenido = db.get('viewContenido');
const chat = db.get('chat');
// const viewChat = db.get('viewChat');

function request (args, session){
  console.log(args)
  return new Promise((resolve, reject) => {
    if (!session.username) {
      resolve(response(403));
    } else {
      crypto.randomBytes(12, (err, buf) => {
        const key = buf.toString('hex')
        session.temp.contenido = { id: args.id, key: key, downloaded: false}
        resolve(response(200, {key: key}))
      })
    }
  })
}

function get(req, res) {
  try {
    const id = req.params.id;
    const key = req.params.key;
    const session = req.session;
    const username = session.username;
    const tmpContenido = session.temp.contenido;
    if (!username || (id === tmpContenido.id && key !== tmpContenido.key)) throw 403 /*{
      return Promise.resolve(response(403));
    }*/

    return contenido.findOne(
      {_id: username, 'contenido._id': monk.id(id)},
      {castIds: false}
    ).then(data => {
      data = data.contenido
      if (!data || (data.keyRequired && id !== tmpContenido.id)) throw 403
        // res.status(403).send('No autorizado para ver este contenido!')
        // return
      // }
      const path = __dirname + '/files/' + id; //+ '.mp4';
      const stat = fs.statSync(path)
      const fileSize = stat.size
      const range = req.headers.range
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          // 'Content-Type': 'video/mp4',
        }

        if (start === 0 && data.keyRequired && tmpContenido.downloaded) throw 403
        tmpContenido.downloaded = true

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          // 'Content-Type': 'video/mp4',
        }

        if (data.keyRequired && tmpContenido.downloaded) throw 403
        tmpContenido.downloaded = true

        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }
    }).catch (err => {
      res.status(403).send('No autorizado para ver este contenido!')
    });
  } catch (err){
    res.status(403).send('No autorizado para ver este contenido!')
  }
}

function subscribe (args, session, socket) {
  return new Promise((resolve, reject) => {
    try {
      const username = session.username;
      const id = args.id;
      /*if (!username) {
        throw 403
      }*/
      return contenido.findOne(
        {/*_id: username, */'contenido._id': monk.id(id), 'contenido.hasChat': true},
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
              {contenido: monk.id(id)},
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
      const contenido = args.id;
      /*if (!username || socket.rooms.indexOf(id) < 0) {
        throw 403
      }*/
      args.fecha = new Date()
      delete(args.id)
      chat.insert(
        {contenido: monk.id(contenido), message: args}
      ).then(data => {
        try {
          if (!data){
            throw 500
          }
          resolve();
          socket.to(contenido).emit('message', [data]);
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
  request,
  get,
  subscribe,
  message
};

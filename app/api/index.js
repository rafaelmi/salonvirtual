const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

const admin = require('./db/admin');
const user = require('./db/user');
const contenido = require('./contenido/contenido');

const cursos = require('./db/cursos');
const inscripciones = require('./db/inscripciones');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const sessionMiddleware = session({
  secret: '6bb9e713c2deb3d6c67deeb8f8fceb98',
  resave: false,
  saveUninitialized: true,
})

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(sessionMiddleware);

function handle(req, res, module) {
  try {
    // req.session.username = true // temporal, salta la autenticación
    module[req.body.command]
    (req.body.args, req.session, req.headers['x-forwarded-for'])
    .then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

app.post('/admin', function(req, res) {
  handle(req, res, admin)
});

app.post('/user', (req, res) => {
  handle(req, res, user)
});

app.post('/cursos', (req, res) => {
  handle(req, res, cursos)
});

app.get('/contenido/:id', (req, res) => {
  contenido['get'](req, res);
});

app.get('/contenido/:id/key/:key', (req, res) => {
  contenido['get'](req, res);
});

app.post('/contenido', (req, res) => {
  handle(req, res, contenido)
});

io.on('connection', (socket) => {
  const session = socket.request.session
  socket.on('subscribe', (args) => {
    // contenido['subscribe'](args, session, socket)
    cursos['subscribe'](args, session, socket)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      })
  });

  socket.on('message', (args) => {
    const session = socket.request.session
    cursos['message'](args, session, socket)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      })
  });

});

app.post('/inscripciones', (req, res) => {
  handle(req, res, inscripciones)
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});

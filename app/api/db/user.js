const monk = require('monk');
const db = require('./connection');
const crypto = require('crypto');
const response = require('./response').response;

const users = db.get('viewUsuarios');

function login(args, session) {
  if (session.username) {
    return Promise.resolve(response(452));
  }
  args.password = crypto.createHash('sha256')
                        .update(args.password)
                        .digest('hex');
  return users.findOne({_id: args.username,
                        password: args.password},
                        {
                          castIds: false,
                          fields: {_id: 0, password: 0}
                        })
  .then(data => {
    var res;
    if (!data) {
      res = 401;
    } else {
      // data.username = data._id;
      // delete data._id;
      // delete data.password;
      data.username = args.username;
      Object.assign(session, data, {temp: {contenido: {}}});
      res = 200;
    }
    return response(res, data);
  });
}

function info(args, session) {
  if (!session.username) {
    return Promise.resolve(response(403));
  }
  return users.findOne({_id: session.username},
                        {
                          castIds: false,
                          fields: {_id: 0, password: 0}
                        })
  .then(data => {
    var res;
    if (!data) {
      res = 500;
    } else {
      data.username = session.username;
      res = 200;
    }
    return response(res, data);
  });
}


function logout(args, session) {
  if (!session.username) {
    return Promise.resolve(response(453));
  }
  session.destroy();
  return Promise.resolve(response(200));
}

function update(args) {

  args._id = args.username;
  delete args.username;

  return users.findOneAndUpdate({
    _id: args._id,
  },
  {$set: args},{castIds: false})
  .then(dbres => {
    var resCode = 500;
    if (dbres) {
      resCode = 200;
      dbres.username = dbres._id;
      delete dbres._id;
      delete dbres.password;
    }
    return response(resCode, dbres);
  })
}

module.exports = {
    login,
    logout,
    info
    // update
};

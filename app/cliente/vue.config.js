const fs = require('fs');
const path = require('path')
module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    port: '8080',
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: { '/api': '' }
      },
      '/socket.io': {
        target: 'http://localhost:4000'
      },
    },
  }
};

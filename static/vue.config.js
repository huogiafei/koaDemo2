const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                secure: false,
                ws: true,
                changeOrigin: true,
            }
        }
    }
}
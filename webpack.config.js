const { resolve } = require('path')
const path = require('path')
const Dotenv = require('dotenv-webpack')
module.exports = {
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    plugins: [
        new Dotenv()
    ]
}

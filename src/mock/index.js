const _  = require('lodash')
const requireGlob = require('require-glob')
const mockers = requireGlob.sync(['./*.js','!index.js'])

var mocker = {}

for(let key in mockers){
    _.merge(mocker,mockers[key])
}

module.exports = mocker

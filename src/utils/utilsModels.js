import * as models from '../models/*.js'

const utilsModels = {
    loadModels: app => {
        for(var key in models){
            models[key] && app.model(models[key])
        }
    }
}

module.exports = utilsModels

import * as components from '../pages/**/*.js'
import * as models from '../pages/**/model.js'
import _ from 'lodash'

var ignoreArr = ['model'],
    routes = {}

for(var key in components){
    var keyword = key.replace(/\$/ig,'/').replace(/\_/ig,'')
    var router = {
        key:key,
        path:keyword.toLowerCase(),
        models:[],
        Authority:components[key].Authority || '',
        component:components[key],
        modelPath:keyword.split('/')[0],
        ignore:_.indexOf(ignoreArr,keyword.toLowerCase()) > -1 ? true : false,
    }
    _.has(models,router.modelPath) && router.models.push(_.get(models,router.modelPath))
    router.path = router.path.substring(router.path.lastIndexOf('/')+1).indexOf('index') > -1 ? router.path.substring(0,router.path.lastIndexOf('/')) : router.path
    router.path = router.path == 'home' ? '' : router.path
    if(!router.ignore && router.component && typeof(router.component) == 'function'){
        router.path = `/${router.path}`
        routes[router.path] = router
    }
}

console.log(routes)
module.exports = routes

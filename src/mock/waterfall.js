var Mock = require('mockjs')

const waterfall = {
    'GET /api/list':{
      "data": Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|30': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                title:'asdasdad',
                coverUrl:'http://website.seasonsu.com//upload/988f160b8f06edb853085f29f16ceeea.jpg',
                type:'H5',
                forward:'11',
                like:'44',
                comment:'12',
                headimg:'https://www.oschina.net/img/ie/logo_osc.png'
            }]
      })
    }
}

module.exports = waterfall

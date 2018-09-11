const login = {
    'GET /api/currentUser1': {
        name: 'Serati Ma21111',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 12,
    },
    'POST /api/login/account': (req, res) => {
      const { password, userName, type } = req.body;
      if (password === '888888' && userName === 'admin') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
        });
        return;
      }
      if (password === '123456' && userName === 'user') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'user',
        });
        return;
      }
      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
      });
    },
    'POST /api/register': (req, res) => {
      res.send({ status: 'ok', currentAuthority: 'user' });
    },
}

module.exports = login

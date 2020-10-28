const {Session, User} = require('../db')

const authentication = async (req, res, next) => {
  const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
  console.log(req.cookies)

  //session opened page for the first time.  Cookie created
  if (!req.cookies.sid) {
    console.log('user is a brand new guest')
    const createdSession = await Session.create();
    const newUser = await User.create();
    await createdSession.setUser(newUser)
    res.cookie('sid', createdSession.id, {
      maxAge: new Date(Date.now() + A_WEEK_IN_SECONDS),
      path: '/',
    });
    req.sid = createdSession.id;
    req.user = newUser
  }
  //session exists
  else {
    req.sid = req.cookies.sid
    console.log(req.sid)
    const user = await User.findOne({
      include: [
        {
          model: Session,
          where: {
            id: req.sid
          }
        }
      ]
    })
    //if session already has a user
    if (user){
      console.log('user/guest is back on')
      req.user = user
    }
    //if session does not have a user
    //(this is weird case where computer has cookie not in our db)
    //we clear the cookie on their end, and then treat them as a guest
    else {
      console.log('user is a guest')
      res.clearCookie('sid', req.sid, {
        path: '/'
      })
      const createdSession = await Session.create();
      const newUser = await User.create();
      await createdSession.setUser(newUser)
      res.cookie('sid', createdSession.id, {
        maxAge: new Date(Date.now() + A_WEEK_IN_SECONDS),
        path: '/',
      });
      req.sid = createdSession.id;
      req.user = newUser
    }
  }
  next();
}

module.exports = authentication

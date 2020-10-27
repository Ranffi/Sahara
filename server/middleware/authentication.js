const {Session, User} = require('../db')

const authentication = async (req, res, next) => {
  const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
  console.log(req.cookies)

  //session opened page for the first time.  Cookie created
  if (!req.cookies.sid) {
    const createdSession = await Session.create();
    res.cookie('sid', createdSession.id, {
      maxAge: new Date(Date.now() + A_WEEK_IN_SECONDS),
      path: '/',
    });
    req.sid = createdSession.id
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
      console.log('user is logged in')
      req.user = user
    }
    //if session does not have a user
    else {
      req.user = null;
      console.log('user is a guest')
    }
  }
  next();
}

module.exports = authentication

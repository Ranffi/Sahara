const {Session, User} = require('../db')
const chalk = require('chalk')

const authentication = async (req, res, next) => {
  const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
  //session opened page for the first time.  Cookie created
  if (!req.cookies.sid) {
    const createdSession = await Session.create();
    res.cookie('sid', createdSession.id, {
      maxAge: A_WEEK_IN_SECONDS,
      path: '/',
    });
  }
  //session exists
  // else {
  //   const {sid} = req.cookies;
  //   const session = await Session.findByPk(
  //     sid,
  //     {
  //       include: User
  //     })
  //   //if session already has a user
  //   if (session.user){
  //     console.log('user is logged in')
  //     req.user = session.user
  //   }
  //   //if session does not have a user
  //   else {
  //     req.user = null;
  //     console.log('user is a guest')
  //   }
  // }
  // //   //find sessionid from session and if this is associated form user then remember login
  // //   //sid belongs to user

  // // sid is a guest (does not belong to user)


  next();
}

module.exports = authentication

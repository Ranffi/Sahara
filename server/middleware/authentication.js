const {Session, User} = require('../db')
var generator = require('generate-password');
const bcrypt = require('bcrypt')

let guestCount = 0;

const authentication = async (req, res, next) => {
  const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
  //session opened page for the first time.  Cookie created

  // if (!req.cookies.sid) {
  //   console.log('user is a brand new guest')

  //making this a function because it gets called twice
  const createGuestAndAssignCookie = async () => {
    guestCount++;
    const createdSession = await Session.create();
    const password = generator.generate({
      length: 10,
      numbers: true
    })
    const hashedPw = await bcrypt.hash(password, 10)
    const newUser = await User.create({userName: `guest${guestCount}`, password: hashedPw})
    await createdSession.setUser(newUser)
    res.cookie('sid', createdSession.id, {
      maxAge: new Date(Date.now() + A_WEEK_IN_SECONDS),
      path: '/'
    });
    req.sid = createdSession.id;
    req.user = newUser
  }

  //session opened page for the first time.  Cookie created
  if (!req.cookies.sid) {
    await createGuestAndAssignCookie();
  }
  //session exists
  else {
    req.sid = req.cookies.sid
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
      req.user = user
  }
    //if session does not have a user
    //(this is weird case where computer has cookie not in our db)
    //we clear the cookie on their end, and then treat them as a guest
    else {
      res.clearCookie('sid', req.sid, {
        path: '/'
      })
      await createGuestAndAssignCookie();
    }
  }
  next();
}

module.exports = authentication

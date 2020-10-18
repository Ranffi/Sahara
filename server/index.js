const express = require("express")
//initialize app
const app = express()
app.use(require('express').json());
//require morgan, path packages
const morgan = require('morgan')
const path = require('path')
//require db from /db
const db = require('./db')

//use morgan
app.use(morgan('dev'))
//use express.json()
app.use(express.static(path.join(__dirname, './public')))
//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!

//require in your routes and use them on your api path
app.use('/api', require('./routes'))

//404 handler
app.use((req, res, next) => {
    const error = Error(`Page not found(${req.url})`)
    error.status = 404
    next(error)
})

//500 handler
app.use((err, req, res, next) => {
    console.log(err, err.stack);
    res.status(err.status || 500).send(`
    <html>
      <body>
        <h1 style = color:crimson>${err}</h1>
        <p>${err.stack}</p>
      </body>
    </html>`)
  })

//listen on port
const port = process.env.PORT || 3035;

const init = async () => {
  try{
     //await db.syncAndSeed(); // does not exist yet!
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch (err) {
    console.log(err);
  }
}

init();

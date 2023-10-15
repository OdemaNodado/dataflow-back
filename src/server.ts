import express, { NextFunction, Request, Response } from 'express' 
const consign =  require('consign')
const db =  require('./config/db') 
import mongoose from 'mongoose'
    

// var cors = require('cors')
const app:any  = express();
require('./config/mongodb')

app.db = db
app.mongoose = mongoose


// app.use(cors)
app.use(function(req:Request, res: Response, next:NextFunction) {
     res.header("Access-Control-Allow-Origin", "*")
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
     next()
 }) 
consign()
    .include('./src/config/passport.js')
    .then('./src/config/middlewares.js')
    .then('./src/api/validation.js') 
    .then('./src/api')
    .then('./src/schedule')
    .then('./src/config/routes.js') 
    .into(app)

app.listen(8095, () => {
    console.log('Backend executando... '+8095)
})
 
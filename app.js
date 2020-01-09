const express = require('express')
const puppeteer = require('puppeteer')
const  mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors())

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "boomershub"
  });




// var connection
const scrapingController = require('./scraping/scrape')

const apiController = require('./apis/apiController')

scrapingController(app, puppeteer, con)
apiController(app, con)











  con.connect(function(err) {
    if (err){
        throw err;
    } else{
        console.log("Connected!");
        app.listen(4300, (err, res)=>{
            console.log('server started on 4300');
        })
    }
  })


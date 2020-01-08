const express = require('express')
const puppeteer = require('puppeteer')
const  mysql = require('mysql')

const app = express()

app.use(express.json());

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


    


// app.listen('4000', ()=>{
//     console.log('Server started on port 4000')
// })
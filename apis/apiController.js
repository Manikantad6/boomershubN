module.exports = (app,con) =>{

app.get('/fetchAll', (req,res)=>{
   try{
        var query = "SELECT * FROM properties"
        con.query(query, (err, result)=>{
            if(!err){
                console.log(result)
                res.status(200).json({'msg': "data fetched", 'data': result})
            }else{
                res.status(400).json({'msg': "some error"})
            }
        })
   }catch(e){
        res.status(400).json({'msg': "some error", 'error':e})
   }
})


app.get('/fetch/:id', (req,res)=>{
    try{
         var query = "SELECT * FROM properties where id ='"+req.params.id+"'"
         con.query(query, (err, result)=>{
             if(!err){
                 console.log(result)
                 res.status(200).json({'msg': "data fetched", 'data': result})
             }else{
                 res.status(400).json({'msg': "some error"})
             }
         })
    }catch(e){
         res.status(400).json({'msg': "some error", 'error':e})
    }
 })
 


app.get('/search/:text', (req,res)=>{
    try{
        text = req.params.text
        var query = "SELECT * FROM properties WHERE city REGEXP '"+text+"'";
        con.query(query, (err, result)=>{
            if(!err){
                console.log(result)
                res.status(200).json({'msg': "data fetched", 'data': result})
            }else{
                res.status(400).json({'msg': "some error"})
            }
        })
   }catch(e){
        res.status(400).json({'msg': "some error", 'error':e})
   }
})

}
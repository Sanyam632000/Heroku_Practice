const express = require('express');
const app = express();
const port = process.env.PORT || 6300;
const cors = require('cors');
const bodyParser = require('body-parser')
const mongo = require('mongodb');
//const { runInNewContext } = require('vm');
const mongourl = "mongodb+srv://Sanyam632000:Snp632000@cluster0.lwuoy.mongodb.net/FirstDatabase?retryWrites=true&w=majority";
const MongoClient = mongo.MongoClient;
let db;


app.use(bodyParser.urlencoded({extended:true}));                //Used while using Post Api to read the body
app.use(bodyParser.json());                                     //Used while using Post Api to read the body
app.use(cors());

app.get('/',(req,res)=>{
    res.send(`<a href="http://localhost:6300/city">City</a> <br> <a href="http://localhost:6300/restaurant">Restaurant</a> <br> <a href="http://localhost:6300/mealtype">Mealtype</a> <br> <a href="http://localhost:6300/cuisine">Cuisine</a> <br> <a href="http://localhost:6300/order"> Order </a>`)
})

app.get('/city',(req,res)=>{

    db.collection('city').find().toArray((err,result)=>{
        if(err) throw err;
            res.send(result);
        
    })
})

app.get('/restaurant',(req,res)=>{
    var query={}
    if(parseInt(req.query.mincost) && parseInt(req.query.maxcost)){
        query={cost:{$lt:parseInt(req.query.maxcost),$gt:parseInt(req.query.mincost)}}
    }
  
    else{
        query={}
    }
    db.collection('restaurant').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
        
    })
})

app.get('/mealtype',(req,res)=>{
    var query={}
    if(parseInt(req.query.id))
    {
        query={_id:parseInt(req.query.id)}
    }
    else{
        query={}
    }

    db.collection('mealtype').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/cuisine',(req,res)=>{

    db.collection('cuisine').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


app.get('/order',(req,res)=>{
    db.collection('order').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/placeorder',(req,res)=>{
    console.log(req.body)
    db.collection('order').insert(req.body,(err,result)=>{
        if(err) throw err
        res.send('posted')
    })
})

// Data will get deleted according to id
app.delete('/deleteorder',(req,res)=>{
    db.collection('order').remove({id:req.body.id},(err,result)=>{
        if(err) throw err;
        res.send('Data Deleted')
    })
})


app.put('/updateorder',(req,res)=>{
    db.collection('order').update({id:req.body.id},{
        $set:{
            name:req.body.name,
            adress:req.body.adress
        }
    },(err,result)=>{
        if(err) throw err;
        res.send('Data Updated')
    })
})


MongoClient.connect(mongourl,(err,connection)=>{
    if (err) throw err;
        db= connection.db('FirstDatabase');
        app.listen(port,(err)=>{
            if (err) throw err;
        })

})




/*Important

1) Get data according to cost (Minimum cost and Maximum Cost)
2) PostMan (How to post,delete and update data)

*/
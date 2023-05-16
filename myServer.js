// const { json } = require('express');
const express = require('express');
const app = express();
const cors=require('cors');
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
app.use(cors());

let data=[];

function isValidJSON(jsonString){
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

app.post('/dataPost',(req, res)=>{
    let data1=req.body;
    if(isValidJSON(data1.data)){
        let data3=JSON.parse( data1.data);
        data3={...data3, time:Date.now()};
        console.log(data3);
        let data2=[]
        data2.push(data3)
        data.push(data3);
        res.send(data2);
    }
    else{
        console.log('12')
        res.status(401).send('Enter the Valid JSON Format');
    }
})

app.get('/dataGet', (req, res)=>{
    console.log(data);
    res.send(data);
})
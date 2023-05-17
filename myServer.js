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

let axios=require('axios');
// app.use(axios)

function isValidJSON(jsonString){
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }


app.post('/fetchData', async(req, res)=>{
  let body=req.body;
  console.log(req.body)
  let {method, fetchURL, data}=body;
  // res.send('correct')
  if(method=="POST"){
    if(isValidJSON(data)){
      let data1=JSON.parse(data);
      try{
        let response=await axios.post(fetchURL, data1);
        console.log("hii1")
        res.send(response.data);
      }
      catch(err){
        res.send('Not Found');
      }
     
    }
    else{
      console.log('12')
      res.status(401).send('Enter the Valid JSON Format');
    }
  }

  else if(method=='GET'){
    try{
      let response=await axios.get(fetchURL);
      console.log("hii2");
      res.send(response.data);
    }
    catch(err){
      res.send("Not Found");
    }
  }
})
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const sfdx = require('sfdx-node');
const port = 3000;

const express = require('express')
const app = express();

app.get('/list', (req, res) => {
    res.setHeader('Content-Type','application/json');
    sfdx.alias.list()
    .then((listResult) => {
      res.send(listResult);
    });
 
});

app.get('/auth',(req,res) =>{
    sfdx.auth.webLogin({
        setdefaultdevhubusername: true,
        setalias: 'test'
      }).then( (result) => {
            console.log('Web Login',result);
      });
});

app.listen(port, () => {
  console.log('Example app listening on port 8000!')
});

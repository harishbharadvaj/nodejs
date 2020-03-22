//Load HTTP module

const http = require("http");
const hostname = '127.0.0.1';
//const sfdx = require('sfdx-node');
const port = process.env.PORT || 3000;

const express = require('express')
const app = express();

app.post('/deploy',async(req,res)=>{
  const resBody = req.body;
  console.log(resBody);
  let result = await runCommand("sfdx force:config:set instanceUrl="+resBody.instanceUrl+" --global");
  let deployResult = await runCommand("sfdx force:package:install -p "+resBody.packageId+" -u "+resBody.accessToken+' --installationkey '+resBody.installationkey+" --json");
  console.log(deployResult);
  res.setHeader('Content-Type','application/json');
  res.send(deployResult);
});

app.post('/deployreport',async(req,res)=>{
  const resBody = req.body;
  console.log(resBody);
  let deployResult = await runCommand("sfdx force:package:install:report -i "+resBody.jobId+" -u "+resBody.accessToken+" --json");
  console.log(deployResult);
  res.setHeader('Content-Type','application/json');
  res.send(deployResult);
});


app.listen(port, () => {
  console.log('Example app listening on port 8000!')
});

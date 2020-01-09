const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIAROEPGTFHAGNJQT2K",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();
var filePath = "./images/Astrology-day-feature.jpg";

//configuring parameters
var params = {
  Bucket: 'bucketmani',
  Body : fs.createReadStream(filePath),
  Key : ""+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
      console.log(data)
    console.log("Uploaded in:", data.Location);
  }
});
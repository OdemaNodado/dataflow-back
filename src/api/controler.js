const fs = require("fs");
const baseUrl = "http://app-hom.roraimaenergia.com.br:8095";
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/files/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "./files/";
  console.log(directoryPath + fileName)
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  }); 
};
module.exports = {
  getListFiles,
  download,
};

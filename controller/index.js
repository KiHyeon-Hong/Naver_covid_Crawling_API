const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const ejs = require('ejs');

const router = express.Router();

const client = mysql.createConnection({
  host: 'localhost', // DB서버 IP주소
  port: 3306, // DB서버 Port주소
  user: 'root', // DB접속 아이디
  password: 'gachon654321', // DB암호
  database: 'covid' //사용할 DB명
});

const patientPer = (patientNow, releaseNow) => {
  return parseInt((releaseNow / patientNow) * 100);
}



router.get('/', (request, response) => {

  client.query('SELECT * FROM CovidInfo order by day desc limit 1', (error, results) => {

    let patientNow;
    let examinationNow;
    let releaseNow;
    let deathNow;
    let patientAdd;
    let examinationAdd;
    let deathAdd;
    let patientIn;
    let patientOut;
    let day;

    results.forEach((item, i) => {
      patientNow = item.patientNow;
      examinationNow = item.examinationNow;
      releaseNow = item.releaseNow;
      deathNow = item.deathNow;
      patientAdd = item.patientAdd;
      examinationAdd = item.examinationAdd;
      deathAdd = item.deathAdd;
      patientIn = item.patientIn;
      patientOut = item.patientOut;
      day = item.day;
    });




    fs.readFile('./view/index.ejs', 'utf8', (error, data) => {
      response.send(ejs.render(data, {
        patientNow : patientNow,
        examinationNow : examinationNow,
        releaseNow : releaseNow,
        deathNow : deathNow,
        patientAdd : patientAdd,
        examinationAdd : examinationAdd,
        deathAdd : deathAdd,
        patientIn : patientIn,
        patientOut : patientOut,
        day : day,
        patientPer: patientPer(patientNow, releaseNow)
      }));
    });
  });
});

router.get('/api', (request, response) => {
  client.query('SELECT * FROM CovidInfo order by day desc limit 1', (error, data) => {
    //response.send(results);

    json = {"patientNow":data[0].patientNow,"examinationNow":data[0].examinationNow,"releaseNow":data[0].releaseNow,"deathNow":data[0].deathNow,"patientAdd":data[0].patientAdd,"examinationAdd":data[0].examinationAdd,"releaseAdd":data[0].releaseAdd,"deathAdd":data[0].deathAdd,"patientIn":data[0].patientIn,"patientOut":data[0].patientOut};
    json = JSON.stringify(json);

    response.send(json);
  });
});

router.get('/patientNow', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.patientNow).toString());

});

router.get('/examinationNow', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.examinationNow).toString());
});

router.get('/releaseNow', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.releaseNow).toString());
});

router.get('/deathNow', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.deathNow).toString());
});

router.get('/patientAdd', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.patientAdd).toString());
});

router.get('/examinationAdd', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.examinationAdd).toString());
});

router.get('/releaseAdd', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.releaseAdd).toString());
});

router.get('/deathAdd', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.deathAdd).toString());
});

router.get('/patientIn', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.patientIn).toString());
});

router.get('/patientOut', (request, response) => {
  let data = fs.readFileSync('files/covid.json', 'utf8');
  data = data.replace( /'/gi, '"');
  data = JSON.parse(data);

  response.send((data.patientOut).toString());
});

module.exports = router;

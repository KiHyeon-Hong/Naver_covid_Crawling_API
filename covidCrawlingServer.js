const mysql = require('mysql');
const fs = require('fs');
var exec = require('child_process').exec;

const client = mysql.createConnection({
  host: 'localhost', // DB서버 IP주소
  port: 3306, // DB서버 Port주소
  user: 'root', // DB접속 아이디
  password: 'gachon654321', // DB암호
  database: 'covid' //사용할 DB명
});

var myFunc;
var myTimer = 1000 * 60 * 10 * 6; //1시간

const crawlingFunc = () => {
  exec('python3 module/covidCrawling.py', function callback(error, stdout, stderr){
    let data = fs.readFileSync('files/covid.json', 'utf8');

    data = data.replace( /'/gi, '"');
    data = JSON.parse(data);

    client.query('INSERT INTO CovidInfo(patientNow, examinationNow, releaseNow, deathNow, patientAdd, examinationAdd, releaseAdd, deathAdd, patientIn, patientOut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.patientNow, data.examinationNow, data.releaseNow, data.deathNow, data.patientAdd, data.examinationAdd, data.releaseAdd, data.deathAdd, data.patientIn, data.patientOut], () => {
      console.log('==============================');
      console.log(data.patientNow);
      console.log(data.examinationNow);
      console.log(data.releaseNow);
      console.log(data.deathNow);
      console.log(data.patientAdd);
      console.log(data.examinationAdd);
      console.log(data.releaseAdd);
      console.log(data.deathAdd);
      console.log(data.patientIn);
      console.log(data.patientOut);
      console.log('==============================');
      console.log();

      myFunc = setTimeout(crawlingFunc, myTimer);
    });
  });
}

process.on('SIGINT', () => {
  clearTimeout(myFunc);
  console.log('crawling server stop');
  process.exit();
});

crawlingFunc();

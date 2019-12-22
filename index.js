const Calculator = require('./modules/Calculator');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admins');
const userRoutes = require('./routes/users');
const algoritmRoutes = require('./routes/algorithms');
const arduinoRoutes = require ('./routes/arduinos');
const groupRoutes = require('./routes/groups');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sha256 = require('sha256');
//additional
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
    res.status(200).json({});
  }
  next();
});

//import routes
app.use('/algorithms', algoritmRoutes);
app.use('/admins', adminRoutes);
app.use('/arduino', arduinoRoutes);
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);


//connect database
mongoose.connect('mongodb+srv://Natalia:' + process.env.MONGO_ATLAS_PW + '@always-safe-cluster-ssu5l.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;


//handling errors
app.use((req, res, next) => {
  const error = new Error('No route was found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const groups = [
  {
    name: 'americans',
    info: {
      temperature: [
          {range: [48, 51], time: [0, 30, 0]},
          {range: [45, 48], time: [0, 45, 0]},
          {range: [42, 45], time: [1,  0, 0]},
          {range: [39, 42], time: [1, 30, 0]},
          {range: [36, 39], time: [3,  0, 0]},
          {range: [33, 36], time: [4,  0, 0]},
          {range: [30, 33], time: [6,  0, 0]},
          {range: [28, 30], time: [12, 0, 0]},
          {range: [22, 28], time: [24, 0, 0]},
          {range: [20, 22], time: [12, 0, 0]},
          {range: [18, 20], time: [6,  0, 0]},
          {range: [15, 18], time: [4,  0, 0]},
          {range: [12, 15], time: [3,  0, 0]},
          {range: [ 9, 12], time: [1, 30, 0]},
          {range: [ 6,  9], time: [1,  0, 0]},
          {range: [ 3,  6], time: [0, 45, 0]},
          {range: [ 0,  3], time: [0, 30, 0]},
      ]
    }
  },
]
const userInfo = {
  algorithm: function(data) {
    // for (let dataType of data)
    // {
    //   const d = this.group.info[dataType];
    const temp = this.group.info.temperature;
    for (let i = 0; i < temp.length; i++) {
      if (data.temp > temp[i].range[0] && data.temp <= temp[i].range[1]) {
        return `${data.temp}°C : ${temp[i].time[0]}:${temp[i].time[1]}:${temp[i].time[2]}`;
      }
    }
    return 'Temperature is out of scope';
  },
  location: 95,
  group: groups[0]
}
let iotInfo = {
  data: {
    // temp: 99,
    //humidity; 00,
  },
  location: userInfo.location,
  range: 100,
}

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});



// PLAN

// pt1 - easy

// function - temp/hum/press etc.
// need to update Calculator.js
function getData(dataType, number) {
  let result = "";
  for (let i = 0; i < number; i++) {
    iotInfo.data[dataType] = Math.floor(Math.random() * 50 + 1);
    let calc = new Calculator(userInfo, iotInfo);
    result += calc.sendResponse(dataType) + "<br>";
  }
  return result;
}

// pt2 - medium
// need to create independant function (no bind for type of data (temp, hum etc.))
// data.temp == data['temp']     /// data.temp[0] == data['temp'][0]
// https://learn.javascript.ru/object
function alhorithm() {

}

// pt3 - hard
// need to create function that represent mathematical graph function of dependance time/param (exponent, extend, liner etc.)
function graph(dataType, propValue) {
  // return time;
}


// pt4 - extra
// need to razobrat`sa with location and range
function mergeDistance(position1, position2, range) {
  // return boolean; // true - in range, false - out of range
}























// const data = {
//     american: {
//       temperature: [
//         {area: [48, 51], value: [0, 30, 0]},
//         {area: [45, 48], value: [0, 45, 0]},
//         {area: [42, 45], value: [1,  0, 0]},
//         {area: [39, 42], value: [1, 30, 0]},
//         {area: [36, 39], value: [3,  0, 0]},
//         {area: [33, 36], value: [4,  0, 0]},
//         {area: [30, 33], value: [6,  0, 0]},
//         {area: [28, 30], value: [12, 0, 0]},
//         {area: [22, 28], value: [24, 0, 0]},
//         {area: [20, 22], value: [12, 0, 0]},
//         {area: [18, 20], value: [6,  0, 0]},
//         {area: [15, 18], value: [4,  0, 0]},
//         {area: [12, 15], value: [3,  0, 0]},
//         {area: [ 9, 12], value: [1, 30, 0]},
//         {area: [ 6,  9], value: [1,  0, 0]},
//         {area: [ 3,  6], value: [0, 45, 0]},
//         {area: [ 0,  3], value: [0, 30, 0]},
//       ],
//       tempConstraints: [0, 51],
//       // humidity: {
//       //
//       // },
//       // pressure: {
//       //
//       // }
//     },
//     // european: {
//     //
//     // },
//     // asian: {
//     //
//     // },
// };
//
// express()
// .use(bodyParser.urlencoded({ extended: false }))
// .use(bodyParser.json())
// .use(cors())
// .post('/', (req, res) => {
//   console.log(req.body);
//   res.send("1");
// })
// .post('/adminLog/', function(req, res){
//   console.log(req.body);
//   const name = req.body.name;
//   const pass = req.body.pass;
//
//   if (!name || !name.match(/[a-zA-Z]/)) {
//     const result = {
//       status: false,
//       error: 'Name must have at least one latin character',
//     }
//     res.status(400).send(result);
//     return;
//   }
//   if (!name.match(/^[a-zA-Z0-9]{4,20}$/)) {
//     const result = {
//       status: false,
//       error: 'Name must have at least 4 characters and max 20 characters of latin alphabet or digits',
//     }
//     res.status(400).send(result);
//     return;
//   }
//
//   if (!pass || !pass.match(/^[a-zA-Z0-9]{8,30}$/)) {
//     const result = {
//       status: false,
//       error: 'Password must have at least 8 characters and max 30 characters of latin alphabet or digits'
//     }
//     res.status(400).send(result);
//     return;
//   }
//
//   const answer = admins.filter((el) => {
//     return el.name == name && el.pass == pass;
//   })
//
//   if (answer.length > 0) {
//     const result = {
//       status: true,
//       info: answer[0].info,
//     }
//     res.status(200).send(result);
//   } else {
//     const result = {
//       status: false,
//       error: 'No such admin found',
//     }
//     res.status(404).send(result);
//   }
// })
// // .get('/getTime', (req, res) => {
// //   console.log(new Time({minutes: 10, seconds: 10}).toString());
// //   const str = req.query.algor;
// //   const foo = new Function('temp', 'hum', 'return 1;');
// //   const time = foo(10, 10);
// //   res.send(time);
// // })
//
// .listen(port, () => console.log(`listening on port ${port}...`));

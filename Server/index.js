const express = require('express');
const cors = require('cors');
const app = express();
var admin = require("firebase-admin");

const generateDataRoute = require('./routes/generateData');
const resturantsRoute = require('./routes/restaurants');
const employeesRoute = require('./routes/employees');
const authenticationRoute = require('./routes/authentication');

//database initialization
var serviceAccount = require("./proiect-tic-1bb49-firebase-adminsdk-pgq95-f9329ed035.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proiect-tic-1bb49-default-rtdb.firebaseio.com"
});

app.use(express.json());
app.use(cors());

//routes
app.use('/generate', generateDataRoute);
app.use('/restaurants', resturantsRoute);
app.use('/employees', employeesRoute);
app.use('/authentication', authenticationRoute);

app.listen(3000, () => {
  console.log('Server up and running on port 3000');
});
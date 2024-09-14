const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SecurityData = require('./models/securityData');
const user = require('./models/user');

dotenv.config();

//Import the sample data
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const threatDetectionData = {
  type: 'threat-detection',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [10, 20, 15, 30, 25, 35],
  },
};

const incidentReportsData = {
  type: 'incident-reports',
  data: {
    labels: ['Resolved', 'In-progress'],
    values: [40, 20],
  },
};

const vulnerabilityScansData = {
  type: 'vulnerability-scans',
  data: {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    values: [5, 10, 15, 20],
  },
};

const userActivityData = {
  type: 'user-activity',
  data: {
    labels: ['Successful', 'Failed'],
    values: [50, 10],
  },
};

const resellerClient = {
  name: 'Reseller Client',
  email: 'resellerclient@gmail.com',
  password: "$2a$10$p3MxWnEGMjx5PGFjPw/LvOhzsrM86528yC9SIo8bzCWql2iFxwt/y",
  client: 'reseller'
}

const SharkStrikerClient = {
  name: 'SharkStriker Client',
  email: 'directclient@gmail.com',
  password: "$2a$10$p3MxWnEGMjx5PGFjPw/LvOhzsrM86528yC9SIo8bzCWql2iFxwt/y",
  client: 'sharkStriker'
}

const populateData = async () => {
  await SecurityData.deleteMany({});
  await SecurityData.insertMany([
    threatDetectionData,
    incidentReportsData,
    vulnerabilityScansData,
    userActivityData,
  ]);

  await user.deleteMany({});
  await user.insertMany([
    resellerClient,
    SharkStrikerClient
  ])
  console.log('Data populated');
  mongoose.connection.close();
};

populateData();

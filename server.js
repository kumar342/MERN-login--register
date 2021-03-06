const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
let routes = require('./routes')

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri ="mongodb+srv://sample:sample@sample-4j1du.mongodb.net/test?retryWrites=true&w=majority" ;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true}
);

const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connected");
})
connection.on('error', (e) => console.log("error"));

app.use('/', routes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`); 
});
//Import packages
const mongoose = require('mongoose');
const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");

//models <--  No need?
//const Actor = require('./models/actor');
//const Movie = require('./models/movie');

//router
const actors = require('./routers/actor');
const movies = require('./routers/movie');

//Configuration
const app = express();

app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// connection check
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});


//Configuration Endpoints

//Actor RESTFul  endpoints
app.get('/actors', actors.getAll); // lab task 7
app.post('/actors', actors.createOne);
app.put('/actors/addBoYActor', actors.addBoYActor); // extra task
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/movies/:id', actors.deleteOne);
app.delete('/actors/:id/movies',actors.removeActorWithMovie);// lab task 2
app.put('/actors/:aId/:mId',actors.removeMovie); // lab task 3

//Movie RESTFul  endpoints
app.delete('/movies/deleteInRange',movies.deleteInRange); // lab task 9 <-- change the order of end point (it this proper solution?)
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne); // lab task1
app.put('/movies/:id/actors', movies.addActor); // lab task 5
app.put('/movies/:mId/:aId',movies.removeActor); // lab task 4
app.get('/movies/getInRange/:y1/:y2',movies.getInRange); // lab task 6
app.delete('/movies/deleteInRange',movies.deleteInRange); // lab task 9
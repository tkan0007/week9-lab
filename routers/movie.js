const mongoose = require('mongoose');
const actor = require('../models/actor');

var Actor = require('../models/actor');
var Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Movie.find()
        .populate('actors') // lab task 8
        .exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    /* lab task 1 */
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    /* lab task 4 */

    removeActor: function(req,res){
        Movie.findOne({ _id: req.params.mId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            let arr = remover(movie.actors, req.params.aId);

            Movie.updateOne({_id:req.params.mId},{$set:{'actors':arr}},function(err,movie){
                if(err) return res.status(405).json(err);
                console.log('Done!');
            })
            res.json(movie);
        });
    },

    /* lab task 5 */

    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    /* lab task 6 */

    getInRange: function(req, res){
        Movie.find({year:{$gte:req.params.y2, $lte:req.params.y1}},function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    /* lab task 9 */

    deleteInRange: function (req, res) {
        let sYear = req.body.y1;
        let eYear = req.body.y2;

        if(req.body.y1 > req.body.y2){
            sYear = req.body.y2;
            eYear = req.body.y1;
        }

        Movie.remove({year:{$gte:sYear,$lte:eYear}}, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },
};

function remover(arr,str){
    let count = arr.length;
    console.log(str);
    for(let i=0;i<count;i++){
        if(arr[i] == str){ // assume there is no same movie name in movies of actor.
            arr.splice(i,1);
            break;
        }
    }
    return arr;
}
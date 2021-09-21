const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Actor.find() // lab task 7
        .populate('movies') // to show the movie detail
        .exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },


    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },

        /* lab task 2 */
    removeActorWithMovie: function(req,res){
        Actor.findOne({_id:req.params.id},function(err,actor){
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            let arr = actor.movies;

            for(let i = 0; i<arr.length;i++){
                Movie.remove({_id:arr[i]},function(err,movie){
                    if(err) return res.status(400).json(err);
                    if(!movie) return res.status(404).json();

                    console.log("Delete: "+arr[i]);
                })
            }

            Actor.remove({_id:req.params.id},function(err,actor){
                res.json();
            })

            console.log('Done!');
        })
    },

        /* lab task 3 */

    removeMovie: function(req,res){
        Actor.findOne({ _id: req.params.aId }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            let arr = remover(actor.movies, req.params.mId);

            Actor.updateOne({_id:req.params.aId},{$set:{'movies':arr}},function(err,actor){
                if(err) return res.status(405).json(err);
                console.log('Done!');
            })
            res.json(actor);
        });
    },

    /* Extra task */
    addBoYActor: function(req,res){
        Actor.updateMany({"name":/^S/},{$inc:{bYear:req.body.incYear}},function(err,actor){
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(404).json

            res.json(actor);
        })
    }
}

function remover(arr,str){
    let count = arr.length;
    for(let i=0;i<count;i++){
        if(arr[i] == str){ // assume there is no same movie name in movies of actor.
            arr.splice(i,1);
            break;
        }
    }
    return arr;
}
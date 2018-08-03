var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var bookModel = Schema({
title: {
    type: String
},
author: {type: String},
genre: {type: String},
read: {type:Boolean, default:false},
image: {type: String, default: "placeholder.jpg"}
},{ versionKey: false });

module.exports = mongoose.model('Book',bookModel);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        name: { type: String, required: true },
        movies: []
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('MovieList', schema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true }, //password
        group: { type: String, default: ""},
        movieCollection: [{ type: Schema.Types.ObjectId, ref: 'MovieList' }]
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);

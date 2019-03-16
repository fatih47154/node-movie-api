const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur.'],
        maxlength: [15, '`{PATH}` Alanı (`{VALUE}`), `{MAXLENGTH}` Karakterden Fazla Olamaz.'],
        minlength: [3, '`{PATH}` Alanı (`{VALUE}`), `{MINLENGTH}` Karakterden Az Olamaz.']
    },
    category: {
        type: String,
        maxlength: [15, '`{PATH}` Alanı (`{VALUE}`), `{MAXLENGTH}` Karakterden Fazla Olamaz.'],
        minlength: [3, '`{PATH}` Alanı (`{VALUE}`), `{MINLENGTH}` Karakterden Az Olamaz.']
    },
    country: String,
    year: {
        type: Number,
        max: 2040,
        min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);

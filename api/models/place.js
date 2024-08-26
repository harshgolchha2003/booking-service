const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxlength: 100 },
    address: { type: String, required: true, maxlength: 200 },
    photos: { type: [String], default: [] },
    description: { type: String, required: true },
    perks: { type: [String], default: [] },
    extraInfo: { type: String },
    checkIn: { type: Number, required: true },
    checkOut: { type: Number, required: true },
    maxGuest: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number, min: 0 }
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;

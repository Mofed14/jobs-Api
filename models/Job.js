const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobSchema = new Schema({
    company : {
        type: String,
        required: [true, 'Please Provide Company Name'],
        maxLength: 50
    },
    position : {
        type: String,
        required: [true, 'Please provide position']

    },
    status : {
        type: String,
        enum:  ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Provide user']
    },
}, {
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema
    /**
     * createdAt
     * updatedAt
     * */    
    timestamps:true
})


module.exports = mongoose.model('Job', JobSchema);
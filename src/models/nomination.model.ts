import { Schema, model } from 'mongoose';

var validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const nominationSchema = new Schema({
    candidate: {
        type: String,
        index: { unique: true },
        trim: true,
        lowercase: true,
        required: 'Candidate\'s email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    details: { type: String, required: true },
    involvementScore: { type: Number, min: 0, max: 10, required: true },
    overallTalentScore: { type: Number, min: 0, max: 10, required: true },
    referrer: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});

export default model('Nomination', nominationSchema);

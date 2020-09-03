import { Schema, model } from 'mongoose';

var validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

/**
 * @swagger
 *  components:
*      schemas:
*         Nomination:
*            type: "object"
*            required:
*               - "candidate"
*               - "description"
*               - "referrer"
*               - "involvementScore"
*               - "overallTalentScore"
*          properties:
*           candidate:
*               type: "string"
*               format: "email"
*               example: "example@novatalent.com"
*           description:
*               type: "string"
*               example: "I would like to recommend my friend David as a Nova because of his outstanding skills"
*           referrer:
*               type: "string"
*               format: "email"
*               example: "example@gmail.com"
*           involvementScore:
*               type: "number"
*               format: "int32"
*               minimum: 0
*               maximum: 10
*               example: 9
*           overallTalentScore:
*               type: "number"
*               format: "int32"
*               minimum: 0
*               maximum: 10
*               example: 10
*/  
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
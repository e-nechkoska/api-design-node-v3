import mongoose, { mongo } from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },

    status: {
        type: String,
        required: true,
        default: 'active',
        enum: [
            'active',
            'complete',
            'pastdue'
        ]
    },

    notes: String,

    due: Date,

    createdBy: {
        ref: 'user',
        required: true,
        type: mongoose.SchemaTypes.ObjectId
    },

    list: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'list',
        required: true
    }

}, { timestamps: true })

itemSchema.index({list: 1, name: 1}, {unique: true})
export const Item = mongoose.model('item', itemSchema)

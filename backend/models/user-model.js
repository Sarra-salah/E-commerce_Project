const mongoose = require("mongoose")
const bcrybt = require("bcrypt")

const saltRounds = 10;

const baseOptions = {
    discriminatorKey: 'itemtype', // our discriminator key, could be anything
    collection: 'Users', // the name of our collection
};




const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        tel: {
            type: String

        },

        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true })
userSchema.pre("save", function(next) { // avant d'enregistrer schema il faut crypter password
    if (this.password) {
        this.password = bcrybt.hashSync(this.password, saltRounds)
    }
    next()
})
module.exports = mongoose.model("User", userSchema)
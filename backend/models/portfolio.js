const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true }, 
    personalInfo: {
        name: { type: String, default: '' },
        title: { type: String, default: '' },
        bio: { type: String, default: '' },
        email: { type: String, default: '' },
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' }
    },
    skills: { type: [String], default: [] },
    projects: [
        {
            title: String,
            description: String,
            liveLink: String,
            githubLink: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
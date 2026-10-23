const router = require('express').Router();
const Portfolio = require('../models/Portfolio');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key_here";

// Auth Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access Denied!" });
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token!" });
    }
};

// Save / Create Portfolio
router.post('/', async (req, res) => {
  try {
    const { name, title, about, skills } = req.body;
    const generatedSlug = name ? name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now() : 'portfolio-' + Date.now();

    const newPortfolio = new Portfolio({
      personalInfo: {
        name: name,
        title: title,
        about: about
      },
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
      slug: generatedSlug,
      userId: "650000000000000000000000" // Dummy ID temporary testing ke liye
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json({ message: "Portfolio Saved Successfully! 🎉", savedPortfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Logged-in User's Portfolio
router.get('/my-portfolio', verifyToken, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.user.id });
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Portfolio
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { personalInfo, skills, projects } = req.body;
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { userId: req.user.id },
            { personalInfo, skills, projects },
            { new: true }
        );
        res.json({ message: "Portfolio updated successfully!", updatedPortfolio });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Public Portfolio by Slug
router.get('/:slug', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ slug: req.params.slug });
        if (!portfolio) return res.status(404).json({ error: "Portfolio not found!" });
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

// Get Latest Portfolio
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    const latestPortfolio = portfolios[portfolios.length - 1];
    res.json(latestPortfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
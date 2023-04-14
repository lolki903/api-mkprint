const Newsletter = require('../models/realisation');

exports.getNewsletters = async (req, res) => {
    try {
        const newsletters = await Newsletter.find();
        res.status(200).json(newsletters);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.createNewsletter = async (req, res) => {
    const newsletter = req.body;
    const newNewsletter = new Newsletter(newsletter);
    try {
        await newNewsletter.save();
        res.status(201).json(newNewsletter);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
import Feedback from "../models/Feedback.js";

export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createFeedback = async (req, res) => { 
    try{
        const { title, isActive } = req.body;
        const newFeedback = new Feedback({ title, isActive });
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const submitFeedback = async(req, res) => {
    try {
        const {id} = req.params;
        const { rating, comment } = req.body;
        const form = await Feedback.findById(id);
        if(!form|| !form.isActive){
            return  res.status(404).json({ message: "Feedback form not found or inactive" });
        }
        form.responses.push({ rating, comment });
        await form.save();
        res.status(200).json({ message: "Feedback submitted successfully" });
    }catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getFeedbackResults = async(req, res) => {
    try {
        const {id} = req.params;
        const form = await Feedback.findById(id);
        if(!form){
            return  res.status(404).json({ message: "Feedback form not found" });
        }
        const ratings = form.responses.map(response => response.rating).filter(r => r !== undefined && r !== null);
        const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        res.status(200).json({ 
            ...form.toObject(), 
            avgRating: avgRating.toFixed(2),
            totalResponses: form.responses.length 
        });
    }catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const closeForm = async(req, res) => {
    try {
        const {id} = req.params;
        const form = await Feedback.findById(id);
        if(!form){
            return  res.status(404).json({ message: "Feedback form not found" });
        }
        form.isActive = false;
        await form.save();
        res.status(200).json({ message: "Feedback form closed successfully" });
    }catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }   
};

export const toggleFormStatus = async(req, res) => {
    try {
        const {id} = req.params;
        const form = await Feedback.findById(id);
        if(!form){
            return  res.status(404).json({ message: "Feedback form not found" });
        }
        form.isActive = !form.isActive;
        await form.save();
        res.status(200).json({ message: `Feedback form ${form.isActive ? 'activated' : 'closed'} successfully`, form });
    }catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }   
};

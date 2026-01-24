import Feedback from "../models/Feedback.js";

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
        res.status(200).json(form);
        const ratings = form.responses.map(response => response.rating);
        const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        res.status(200).json({ avgRating });
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

const mongoose = require('mongoose');

export async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}
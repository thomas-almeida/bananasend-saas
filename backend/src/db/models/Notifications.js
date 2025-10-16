import mongoose from "mongoose";

const NotificationsSchema = new mongoose.Schema({
    title: String,
    message: String,
    type: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Notifications = mongoose.model("Notifications", NotificationsSchema);

export default Notifications;
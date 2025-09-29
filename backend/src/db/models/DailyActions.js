import mongoose from "mongoose";

const DailyActionsSchema = new mongoose.Schema({
    userId: String,
    action: String,
    createdAt: { type: Date, default: Date.now },
    points: { type: Number, default: 20 },
});

const DailyActions = mongoose.model("DailyActions", DailyActionsSchema);

export default DailyActions;

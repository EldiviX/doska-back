import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        verified: {
            type: Boolean
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Ad", AdSchema);


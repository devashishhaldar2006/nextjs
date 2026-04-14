import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    image?: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
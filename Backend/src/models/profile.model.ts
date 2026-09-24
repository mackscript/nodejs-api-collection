import mongoose from "mongoose";
import { Schema, type Document } from "mongoose";


export interface IProfile extends Document {
    userId: mongoose.Types.ObjectId,
    name?: string,
    phNumber?: string,
    avatar?: string,
}


const profileSchema = new Schema<IProfile>({
    userId: {
        type: Schema.Types.ObjectId

    },
    name: {
        type: String,
        trim: true,
        maxLength: 100,
    },

    phNumber: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
    },

},
    {
        timestamps: true,
    }
)

export const Profile = mongoose.model<IProfile>(
    'Profile',
    profileSchema
)
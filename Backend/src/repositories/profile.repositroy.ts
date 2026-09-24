import mongoose from 'mongoose';
import { type IProfile, Profile } from '../models/profile/profile.model'


export async function findProfileByUserId(
    userId: string
): Promise<IProfile | null> {
    return Profile.findOne({ userId: userId })
}


export async function createProfile(
    userId: string,
    data: Partial<IProfile>
): Promise<IProfile> {
    return Profile.create({
        userId: new mongoose.Types.ObjectId(userId),
        ...data
    });
}

export async function updateProfileByUserId(
    userId: string,
    data: Partial<IProfile>
): Promise<IProfile | null> {
    return Profile.findByIdAndUpdate({
        userId: new mongoose.Types.ObjectId(userId),
    }, data, { new: true }).exec();
}
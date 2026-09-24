import { AppError } from "../errors/app-error";
import type { IProfile } from "../models/profile/profile.model";
import * as userRepository from '../repositories/user.repository'
import * as profileRepository from '../repositories/profile.repositroy'





export async function createProfileService(
    userId: string,
    data: Partial<IProfile>
): Promise<IProfile> {
    const user = await userRepository.findUserById(userId);


    if (!user) {
        throw new AppError("User not found");
    }

    const existingProfile =
        await profileRepository.findProfileByUserId(userId);

    if (existingProfile) {
        throw new AppError("Profile already exists");
    }

    const result = await profileRepository.createProfile(
        userId,
        data,
    );

    return result;
}
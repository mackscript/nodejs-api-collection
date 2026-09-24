import { User, type IUser, type UserDocument } from "../models/auth/user.model";


export async function findUserByEmail(
    email: string,
    withPassword: boolean = false
): Promise<UserDocument | null> {

    const query = User.findOne({ email: email.toLowerCase().trim() })
    if (withPassword) {
        query.select("+passwordHash")
    }

    return query.exec()
}


export async function createUser(
    data: Partial<IUser>
): Promise<UserDocument> {
    return User.create(data);
}

export async function findUserById(
    id: string
): Promise<UserDocument | null> {
    return User.findById(id).exec();
}

export async function updateUserById(
    id: string,
    data: Partial<IUser>
): Promise<UserDocument | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
}



import { OtpModel, type Otp } from "./otp.modal";



export async function createOtp(
    data: Otp
): Promise<Otp> {
    const otp = await OtpModel.create(data);

    return otp.toObject()
}

export async function findOtpByEmail(
    email: string
): Promise<Otp | null> {
    return OtpModel.findOne({ email }).lean<Otp>().exec()
}


export async function deleteOtpByEmail(email: string): Promise<void> {
    await OtpModel.deleteOne({ email }).exec()

}
import { AuthModel, UserModel } from "$lib/server/models"
import argon2 from "argon2"

export const login = async (username, password) => {
    const user = await AuthModel.findOne({ username })
    if (user) {
        const verify = await argon2.verify(user.password, password)
        if (verify) {
            return UserModel.findOne({authId: user._id.toString()})
        }
    } else {
        console.log("Username hasn't exists!");
    }
}

export const signUp = async (username, password) => {
    const user = await AuthModel.findOne({ username })
    if (!user) {
        const hash = await argon2.hash(password)
        const auth = await AuthModel.create({username, password: hash})
        return auth.save();
    } else {
        console.log("Username has exists!");
    }
}
import { genToken } from "../generateToken.js";
import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, gender, phone, role } = req.body;

        const ExistingUser = await UserModel.findOne({ email });

        if (ExistingUser) {
            return res.status(400).json({
                message: "User Already Exist ",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password Must be at least 6 character",
            });
        }

        if (phone.length < 10) {
            return res.status(400).json({
                message: "Mobile No Must be at least 10 character",
            });
        }

        const HashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            fullName,
            email,
            password: HashPassword,
            gender,
            phone,
            role,
        });

        return res.status(201).json({
            message: "User Create Successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Does not exist",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Username or Password",
            });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.status(200).json({
            message: "Login SuccessFully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Login error" || error,
        });
    }
};
export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "LogOut Error",
        });
    }
};
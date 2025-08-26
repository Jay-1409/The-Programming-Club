import connectDB from "../lib/db";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const createNewAdmin = async (req) => {
	await connectDB();
	const data = req.newAdmin;
	const cur = req.currentAdmin;
	const currentAdminReq = await User.findOne({ email: cur.email });
	if (!currentAdminReq) {
		throw new Error("User not found");
	}
	const isMatch = await bcrypt.compare(cur.password, currentAdminReq.password);
	if (currentAdminReq.role !== "admin") {
		throw new Error("Not authorized");
	}
	if (!isMatch) {
		throw new Error("Invalid credentials");
	}
	const hashedPass = await bcrypt.hash(data.password, 10);
	const newAdmin = await User.create({ ...data, password: hashedPass });
	return newAdmin;
};

export const loginAdmin = async (req) => {
	await connectDB();
	const { email, password } = req;
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("User is not Admin!");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (isMatch && user.role.toLowerCase() === "admin") {
		const token = jwt.sign({ id: user._id, role: user.role }, secret, {
			expiresIn: "7d",
		});
		return {
			token,
		};
	} else {
		throw new Error("Invalid credentials");
	}
};

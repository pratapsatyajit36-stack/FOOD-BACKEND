import jwt from "jsonwebtoken";

export const genToken = async (UserId) => {
  try {
    const token = await jwt.sign({ UserId }, process.env.JWT_SECRETE, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log(error.message || error);
  }
};
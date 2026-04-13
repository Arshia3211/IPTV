import jwt, {decode }from "jsonwebtoken";
import { httpResponse } from "../utils/index.js";
import config from "../config/index.js";

export const authenticate = (req, res, next) => {
	const token = req.header("authorization");

	if (!token)
		return httpResponse.BAD_REQUEST(
			res,
			"Need token to access this route",
			"Access denied!!"
		);

	const bearerToken = token.split(" ");
	if (bearerToken.length !== 2 || bearerToken[0] !== "Bearer") {
		return httpResponse.BAD_REQUEST(
			res,
			"Invalid token format",
			"Token should be in the format 'Bearer <token>'"
		);
	}
	try {
		req.user = jwt.verify(bearerToken[1], config.env.jwtSecret);
		next();
		// if token is valid, then next() will be called
	} catch (error) {
		httpResponse.UNAUTHORIZED(res, "Token is not valid", "Invalid token!!"
			
		);
	}
};

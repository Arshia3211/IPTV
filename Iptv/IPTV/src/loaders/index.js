import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";
import staticLoader from "./static.js";

export default {
	expressLoader,
	mongooseLoader,
	staticLoader,
	init: async ({ expressApp }) => {
		await mongooseLoader();
		await expressLoader({ app: expressApp });
		await staticLoader(expressApp);
	},
};

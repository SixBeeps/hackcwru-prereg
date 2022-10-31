import connectMongo from "../../utils/connectMongo";
import Registrant from "../../models/Registrant";

const DEFAULT_ERROR = "An inexplicable error occurred, please reach out to us if this problem persists.";

export default async function handler(req, res) {
	// Get form data
	let { name, email } = req.body;

	// Error if email is not provided
	if (!email) {
		res.status(400).json({ error: "Please provide an email." });
		return;
	}
	
	// Connect to MongoDB
	connectMongo();

	// Also check if the email has already been registered and return an error if so
	let existing = await Registrant.findOne({ email }).exec();
	if (existing !== null) {
		res.status(400).json({ error: "This email has already been registered." });
		return;
	}

	// Set name to default if not provided
	name = name || "Hacker";

	// Create new registrant
	const registrant = new Registrant({
		name,
		email
	});

	// Save registrant to database
	registrant.save((err) => {
		if (err) {
			console.log(err);
			res.status(500).json({ error: DEFAULT_ERROR });
		} else {
			res.status(200).json({ message: "Success" });
		}
	});
}
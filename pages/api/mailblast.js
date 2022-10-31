import Nodemailer from 'nodemailer';
import connectMongo from '../../utils/connectMongo';
import Registrant from '../../models/Registrant';

const EMAIL_DETAILS = {
	subject: 'Registration for HackCWRU 2023 is now open!',
	text: `Hello %NAME, registration for HackCWRU 2023 is now open! Visit ${process.env.SIGNUP_LINK} to register for the event.`,
};

export default async function Mailblast(req, res) {
	// First, check if the provided password is correct
	if (req.query.password !== process.env.BLAST_PWD) {
		res.status(401).json({ error: 'Incorrect password' });
		return;
	}

	try {
		// Create reusable transporter object using the default SMTP transport
		let transporter = Nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PWD
			},
		});
		
		// Connect to MongoDB, then grab all registrants
		await connectMongo();
		const registrants = await Registrant.find({});

		// Send an email to each registrant
		for (const registrant of registrants) {
			// Create email details
			const emailDetails = {
				to: registrant.email,
				from: process.env.EMAIL_USER,
				subject: EMAIL_DETAILS.subject,
				text: EMAIL_DETAILS.text.replace('%NAME', registrant.name),
			};

			// Send email
			await transporter.sendMail(emailDetails);

			// Wait 1 second to avoid rate limiting
			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
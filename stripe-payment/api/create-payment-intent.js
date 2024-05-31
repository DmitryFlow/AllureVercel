const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
	if (req.method === 'POST') {
		const { amount, currency, orderId, clientID } = req.body;

		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency,
				metadata: {
					orderId,
					clientID
				}
			});

			res.status(200).json({ clientSecret: paymentIntent.client_secret });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};
export default function handler(req, res) {
	if (req.method === 'GET') {
		res.setHeader('Access-Control-Allow-Origin', 'https://allurepremiumservice.com');
		res.status(200).json({ message: 'GET request successful!' });
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
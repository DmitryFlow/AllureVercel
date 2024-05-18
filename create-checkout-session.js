const stripe = require('stripe')('sk_test_51PHS7yAlI4elvZn3wZHyyXt95qSuGMOCcirsSn2wmWl2O7ZXDWAFl0JHW6ipiuv5O2rB8nLBTDTagjhj7SixuOBx000Aikat9m'); // Reemplaza con tu clave secreta de Stripe

module.exports = async (req, res) => {
    const { price } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Total Purchase',
                },
                unit_amount: price * 100, // Stripe acepta centavos
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://tu-dominio/success', // Reemplaza con tu URL de éxito
        cancel_url: 'https://tu-dominio/cancel',  // Reemplaza con tu URL de cancelación
    });

    res.status(200).json({ id: session.id });
};

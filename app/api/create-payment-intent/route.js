import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount } = await req.json();

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  return Response.json({
    clientSecret: intent.client_secret,
  });
}

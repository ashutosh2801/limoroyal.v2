import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { email, name } = await req.json();

  const customer = await stripe.customers.create({
    email,
    name,
  });

  return Response.json({
    customerId: customer.id,
  });
}

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body;

    // 1️⃣ Create customer (or fetch from DB in real app)
    const customer = await stripe.customers.create({
      name,
      email
    });

    // 2️⃣ Create SetupIntent (SAVE CARD ONLY)
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ["card"],
    });

    return new Response(
      JSON.stringify({
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}


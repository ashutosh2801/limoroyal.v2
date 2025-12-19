import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { paymentMethodId } = await req.json();

    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodId
    );

    const card = paymentMethod.card;

    return new Response(
      JSON.stringify({
        brand: card.brand,
        last4: card.last4,
        // expMonth: card.exp_month,
        // expYear: card.exp_year,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

import { Context } from 'koa';
import Stripe from 'stripe';

//init stripe
const stripe = new Stripe(process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY as string, {

  });

  export default {
    async createPaymentIntent(ctx: Context) {
      const { amount, currency } = ctx.request.body;
  
      try {
        // create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // amount in cents
          currency,
        });
  
        ctx.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        ctx.throw(500, error);
      }
    },
  };
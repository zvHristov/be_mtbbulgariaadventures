import { Context } from 'koa';
import paypal from '@paypal/checkout-server-sdk';

//  PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID as string,
  process.env.PAYPAL_SECRET as string,
);
const client = new paypal.core.PayPalHttpClient(environment);

export default {
  async createOrder(ctx: Context) {
    const { amount, currency } = ctx.request.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount,
        },
      }],
    });

    try {
      const order = await client.execute(request);
      ctx.send(order.result);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
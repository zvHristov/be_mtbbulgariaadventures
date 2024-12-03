import { Context } from 'koa';

export default {
    async createPayment(ctx: Context) {
      const { amount, currency } = ctx.request.body;
  
      try {
        const response = await fetch('https://sandbox-merchant.revolut.com/api/1.0/order', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_ADMIN_REVOLUT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount * 100, // amount in cents
            currency: currency,
            capture_mode: 'AUTOMATIC',
            merchant_order_ext_ref: 'ORDER-12345', // uniq number for each order
          }),
        });
  
        // Check if the response is OK
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Revolut API Error: ${(errorData as Error).message}`);
        }
  
        const responseData = await response.json();
        ctx.send(responseData);  // return the response data
      } catch (error) {
        ctx.throw(500, `Payment Error: ${(error as Error).message}`);
      }
    },
  };
  
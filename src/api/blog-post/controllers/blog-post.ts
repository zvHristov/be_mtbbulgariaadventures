/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
    async findBySlug(ctx) {
      const { slug } = ctx.params;
  
      const entry = await strapi.db.query('api::blog-post.blog-post').findOne({
        where: { slug },
      });
  
      if (!entry) {
        return ctx.notFound('Post not found');
      }
  
      ctx.send(entry);
    },
  }));

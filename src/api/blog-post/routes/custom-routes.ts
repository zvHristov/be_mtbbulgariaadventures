import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-posts/slug/:slug',  // by slug
      handler: 'api::blog-post.blog-post.findBySlug',  // findBy slug
      config: {
        auth: false,
      },
    },
  ],
};
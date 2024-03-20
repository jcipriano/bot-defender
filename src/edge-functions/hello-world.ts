// Documentation: https://sdk.netlify.com

const pxParams = {
  px_app_id: Netlify.env.get("PX_APP_ID"),
  px_auth_token: Netlify.env.get("PX_AUTH_TOKEN"),
  px_cookie_secret: Netlify.env.get("PX_COOKIE_SECRET"),
};

export default () => new Response('Hello, world!');

export const config = {
  path: '/test',
};


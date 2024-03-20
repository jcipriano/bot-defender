// Documentation: https://sdk.netlify.com

const pxParams = {
  px_app_id: Netlify.env.get("PX_APP_ID"),
  px_auth_token: Netlify.env.get("PX_AUTH_TOKEN"),
  px_cookie_secret: Netlify.env.get("PX_COOKIE_SECRET")
};

export default () => new Response('ENV px_app_id:' + pxParams.px_app_id + ', px_auth_token:' + pxParams.px_auth_token + ', px_cookie_secret:' + pxParams.px_cookie_secret);

export const config = {
  path: '/env',
};
  
import { NetlifyIntegrationUI } from "@netlify/sdk";

const integrationUI = new NetlifyIntegrationUI("Bot Defender");

const surface = integrationUI.addSurface("integrations-settings");
const route = surface.addRoute("/");

route.addCard(
    {
        title: "HUMAN Bot Defender",
        description: "HUMAN Bot Defender is a behavior-based bot management solution that protects your websites and APIs from automated attacks, safeguarding your online revenue, competitive edge and brand reputation.",
    },
    (card) => {
        card.addText({
            value: "The Netlify Bot Defender integration allows you to easily enable Bot Defender on your Netlify hosted websites. An existing HUMAN account is required. "
        });
        card.addText({
            value: "If you have an existing HUMAN account, proceed to configure Bot Defender below."
        });
        card.addLink({
          href: "https://www.humansecurity.com/demo-request",
          text: "Request a demo or sign up",
        });
        card.addLink({
          href: "https://edocs.humansecurity.com/docs/bd-overview",
          text: "Learn more about HUMAN Bot Defender",
        });
    }
);

route.addForm(
    {
      title: "Configuration",
      id: "configuration-form",
      onSubmit: async (surfaceState) => {
        const { integrationContext, fetch, picker } = surfaceState;
        const { siteId, accountId } = integrationContext;
  
        const appId = picker.getFormInputValue("configuration-form", "appId");
        const authToken = picker.getFormInputValue("configuration-form", "authToken");
        const cookieSecret = picker.getFormInputValue("configuration-form", "cookieSecret");

        //https://sdk.netlify.com/integration-ui/call-api-handlers/
        const linkResponse = await fetch('set-env-vars', {
            method: "POST",
            body: JSON.stringify({ siteId, accountId, appId, authToken, cookieSecret })
        }); 
      },
    },
    (card) => {
        card.addInputText({
            id: "appId",
            label: "App ID",
        });
        card.addText({
            value: "HUMAN Custom Application ID (appID) in the format of PX__"
        });

        card.addInputPassword({
            id: "authToken",
            label: "Auth Token",
        });
        card.addText({
            value: "JWT token used for REST API"
        });

        card.addInputPassword({
            id: "cookieSecret",
            label: "Cookie Secret",
        });
        card.addText({
            value: "Secret key used for cookie signing"
        });

        card.addText({
            value: "Clicking save will set or overwrite the following envirinment variables: PX_APP_ID, PX_AUTH_TOKEN, PX_COOKIE_SECRET. Deleting these enviroment variables wihout disabling the integration may cause the integration and/or your site to error."
        });
    }
);

export { integrationUI };
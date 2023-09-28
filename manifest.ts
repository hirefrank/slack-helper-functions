import { Manifest } from "deno-slack-sdk/mod.ts";
import { SendMessageUsers } from "./functions/send_message_users.ts";
import { SendMessageChannels } from "./functions/send_message_channels.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Frank's Helper Steps",
  description: "A bundle of custom steps you wished existed as built-in steps.",
  icon: "assets/digger.png",
  functions: [SendMessageUsers, SendMessageChannels],
  workflows: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});

import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Custom function for sending a message to multiple users
 */

export const SendMessageChannels = DefineFunction({
  callback_id: "send_message_channels",
  title: "Send message to channels",
  description: "A function for sending the same message to multiple channels.",
  source_file: "functions/send_message_channels.ts",
  input_parameters: {
    properties: {
      from: {
        type: Schema.slack.types.user_id,
      },
      channel_ids: {
        type: Schema.types.array,
        items: {
          type: Schema.slack.types.channel_id,
        },
        description: "Channels",
      },
      message: {
        type: Schema.types.string,
      },
    },
    required: ["from", "channel_ids", "message"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

export default SlackFunction(
  SendMessageChannels,
  ({ inputs, client }) => {
    const { channel_ids, message, from } = inputs;

    // iterates through userse to send dm
    channel_ids.forEach(async function (channel) {
      const msgResponse = await client.chat.postMessage({
        channel: channel,
        mrkdwn: true,
        text: `*From <@${from}>:*\n${message}`,
      });

      if (!msgResponse.ok) {
        console.log(
          "Error during request chat.postMessage!",
          msgResponse.error,
        );
      }
    });

    return { outputs: {} };
  },
);

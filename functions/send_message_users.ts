import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Custom function for sending a message to multiple users
 */

export const SendMessageUsers = DefineFunction({
  callback_id: "send_message_users",
  title: "Send message to users",
  description: "A function for sending the same message to multiple users.",
  source_file: "functions/send_message_users.ts",
  input_parameters: {
    properties: {
      users_ids: {
        type: Schema.types.array,
        items: {
          type: Schema.slack.types.user_id,
        },
        description: "Users",
      },
      message: {
        type: Schema.slack.types.rich_text,
      },
    },
    required: ["users_ids", "message"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

export default SlackFunction(
  SendMessageUsers,
  ({ inputs, client }) => {
    const { users_ids, message } = inputs;

    // iterates through userse to send dm
    users_ids.forEach(async function (user) {
      const msgResponse = await client.chat.postMessage({
        channel: user,
        blocks: message,
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

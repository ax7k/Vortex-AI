import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, Message, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}

/**
 * Finds and returns the text content of the last message where the role is "assistant".
 * @param result The object containing the conversation history.
 * @returns The text content as a string, or undefined if not found.
 */
export function lastAssistantTextMessageContent(
  result: AgentResult
): string | undefined {
  // 1. Find the index of the last message where the role is "assistant"
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  // 2. Retrieve the message content at that index, if found
  const message = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  // 3. Return the content, handling two possible structures:
  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
}

export const parseAgentOutput = (value: Message[]): string => {
  if (value[0].type !== "text") {
    return "Fragment";
  }
  if (Array.isArray(value[0].content)) {
    return value[0].content.map((txt) => txt).join("");
  } else {
    return value[0].content;
  }
};

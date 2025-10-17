import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
	const sandbox = await Sandbox.connect(sandboxId);
	return sandbox;
}

/**
 * Finds and returns the text content of the last message where the role is "assistant".
 * @param result The object containing the conversation history.
 * @returns The text content as a string, or undefined if not found.
 */
export function lastAssistantTextMessageContent(result: AgentResult): string | undefined {
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
        // Check if content is NOT null/undefined.
        // If it is, proceed with type checking:
        ? typeof message.content === "string" 
            // Case 1: The content is a simple string
            ? message.content
            // Case 2: The content is an array of parts ({ text: '...' })
            // We map the array to extract the 'text' property and join them into a single string.
            : message.content.map((c) => c.text).join("")
        // If message or message.content was null/undefined, return undefined
        : undefined;
}


// export function lastAssistantTextMessageContent(result: AgentResult) {
//     const lastAssistantTextMessageIndex = result.output.findLastIndex(
//         (message) => message.role === "assistant"
//     );

//     const message = result.output[lastAssistantTextMessageIndex] as 
//         | TextMessage
//         | undefined;
    
//     return message?.content
//         ? typeof message.content === "string" 
//             ? message.content
//             : message.content.map((c) => c.text).join("")
//         : undefined;
// }
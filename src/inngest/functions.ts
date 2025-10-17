import { grok, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer.  You write readable, maintainable, clean code.",
      model: grok({ model: "grok-code-fast-1" }),
    //   model: grok({ model: "grok-4-fast-non-reasoning" }),
    });

    const { output } = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );

    return { output };
  }
);

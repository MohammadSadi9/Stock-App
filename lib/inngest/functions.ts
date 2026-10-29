import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = inngest.createFunction(
  {
    id: "sign-up-email",
    triggers: { event: "app/user.created" },
  },
  async ({ event, step }) => {
    try {
      console.log("Processing signup event:", event.data);

      const userProfile = `
        - Country: ${event.data.country}
        - Investment Goals: ${event.data.investmentGoals}
        - Risk Tolerance: ${event.data.riskTolerance}
        - Preferred Industry: ${event.data.prefferedIndustry}
      `;

      const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
        "{{userProfile}}",
        userProfile
      );

      console.log("Generating personalized welcome intro...");

      const response = await step.ai.infer("generate-welcome-intro", {
        model: step.ai.gemini({ model: "gemini-2.5-flash-lite" }),
        body: {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
      });

      await step.run("send-welcome-email", async () => {
        const part = response.candidates?.[0]?.content?.parts?.[0];

        const introText =
          (part && "text" in part ? part.text : null) ??
          "Thanks for joining NextTrader! You now have the tools.";

        console.log("Generated welcome intro:", introText);
        console.log("New user signed up:", event.data);

        // TODO: Add your email-sending logic here.
      });

      console.log("Signup function completed successfully.");

      return {
        success: true,
        message: "Welcome email workflow completed successfully",
      };
    } catch (error) {
      console.error("❌ Error in sendSignUpEmail function:");

      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Stack trace:", error.stack);
      } else {
        console.error("Unknown error:", error);
      }

      // Re-throw so Inngest knows the function failed
      // and can apply its retry behavior.
      throw error;
    }
  }
);
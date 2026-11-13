
import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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
        - Preferred Industry: ${event.data.preferedIndustry}
      `;

      const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
        "{{userProfile}}",
        userProfile
      );

      console.log("Generating personalized welcome intro...");

      const introText = await step.run(
        "generate-welcome-intro",
        async () => {
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
          });

          console.log(
            "Gemini response:",
            JSON.stringify(response, null, 2)
          );

          console.log(
            "Generated text:",
            response.text
          );

          const generatedText = response.text?.trim();

          if (!generatedText) {
            throw new Error("Gemini returned an empty response");
          }

          return generatedText;
        }
      );


      console.log(introText);

      await step.run("send-welcome-email", async () => {
        console.log("Generated welcome intro:", introText);
        console.log("New user signed up:", event.data);

        const {
          data: { email, name },
        } = event;

        return await sendWelcomeEmail({
          email,
          name,
          intro: introText,
        });
      });

      console.log("Signup function completed successfully.");

      return {
        success: true,
        message: { introText },
        description: "Welcome email workflow completed successfully",
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

// TEST FUNCTION TO CHECK IF INNGEST IS CONNECTED

export const testConnection = inngest.createFunction(
  {
    id: "test-inngest-connection",
    triggers: [{ event: "test/connection" }],
  },
  async ({ event }) => {
    console.log("Successfully connected to Inngest!");

    return {
      success: true,
      message: "Next.js is successfully connected to Inngest",
      receivedData: event.data,
    };
  }
);

export const functions = [testConnection, sendSignUpEmail];

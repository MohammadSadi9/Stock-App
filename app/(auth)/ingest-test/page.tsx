
"use client";

import { useState } from "react";
import { toast } from "sonner";

const InngestTestPage = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      setIsTesting(true);
      setEventId(null);

      const response = await fetch("/api/test-inngest", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error("Inngest connection failed", {
          description: result.message || "Failed to send event.",
        });
        return;
      }

      setEventId(result.eventId ?? "Event accepted");

      toast.success("Inngest event sent!", {
        description: "Check the Inngest dashboard for function execution.",
      });

      console.log("Inngest response:", result);
    } catch (error) {
      console.error("Inngest test error:", error);

      toast.error("Connection failed", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to communicate with Inngest.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-xl">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            Inngest Connection Test
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Send a test event to verify communication between
            Next.js and Inngest.
          </p>
        </div>

        <div className="mb-6 rounded-lg bg-gray-800 p-4">
          <p className="text-xs text-gray-400">Event name</p>
          <p className="mt-1 font-mono text-sm text-cyan-300">
            test/connection
          </p>

          <p className="mt-3 text-xs text-gray-400">Function</p>
          <p className="mt-1 font-mono text-sm text-white">
            test-inngest-connection
          </p>
        </div>

        <button
          type="button"
          onClick={testConnection}
          disabled={isTesting}
          className="w-full rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-gray-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isTesting ? "Sending Test Event..." : "Test Connection"}
        </button>

        {eventId && (
          <div className="mt-5 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm font-semibold text-green-400">
              Event accepted by Inngest
            </p>

            <p className="mt-2 break-all text-xs text-gray-300">
              Event ID: {eventId}
            </p>

            <p className="mt-3 text-xs text-gray-400">
              Check the Inngest dashboard to confirm function execution.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-500">
          Inngest Dev Server: localhost:8288
        </p>
      </div>
    </main>
  );
};

export default InngestTestPage;

"use client";

import { useEffect, useRef } from "react";

type Props = {
  scriptUrl: string;
  elementName: string;
  attributes?: Record<string, string>;
  className?: string;
};

export default function ReusableWidgetComponent({
  scriptUrl,
  elementName,
  attributes = {},
  className = "w-full h-[600px]",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let widget: HTMLElement | null = null;

    async function initialize() {
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${scriptUrl}"]`
      );

      if (!script) {
        script = document.createElement("script");
        script.type = "module";
        script.src = scriptUrl;

        const currentScript = script;

        await new Promise<void>((resolve, reject) => {
          currentScript.onload = () => resolve();
          currentScript.onerror = () =>
            reject(new Error("TradingView script failed to load"));

          document.head.appendChild(currentScript);
        });
      }

      await customElements.whenDefined(elementName);

      if (cancelled) return;

      widget = document.createElement(elementName);

      Object.entries(attributes).forEach(([key, value]) => {
        widget!.setAttribute(key, value);
      });

      container.appendChild(widget);
    }

    initialize().catch(console.error);

    return () => {
      cancelled = true;
      widget?.remove();
    };
  }, [scriptUrl, elementName, JSON.stringify(attributes)]);

  return <div ref={containerRef} className={className} />;
}
"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  data: object;
}

/**
 * Component to inject JSON-LD structured data into the page
 * This helps search engines understand your content better
 */
export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.id = "structured-data";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("structured-data");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);

  return null;
}

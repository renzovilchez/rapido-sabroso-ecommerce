// src/hooks/useLayoutFromBackend.js
import { useEffect, useState } from "react";

export function useLayoutFromBackend() {
  const [layout, setLayout] = useState("default");

  useEffect(() => {
    fetch("/api/config/layout")
      .then((r) => r.json())
      .then((data) => setLayout(data.layout || "default"))
      .catch(() => setLayout("default"));
  }, []);

  return layout;
}

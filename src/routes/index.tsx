import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import "../clover/game.css";

const CloverGame = lazy(() => import("../clover/App"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clover Roll — Lucky Clover Game" },
      { name: "description", content: "Roll for rare clovers, brew potions, forge charms and rebirth." },
      { property: "og:title", content: "Clover Roll — Lucky Clover Game" },
      { property: "og:description", content: "Roll for rare clovers, brew potions, forge charms and rebirth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <CloverGame />
    </Suspense>
  );
}

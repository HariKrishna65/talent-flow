import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { worker } from "./lib/mock-api";
import { seedDatabase } from "./lib/seed-data";

async function initApp() {
  // Start MSW worker
  await worker.start({
    onUnhandledRequest: 'bypass',
  });

  // Seed database if needed
  await seedDatabase();

  // Render app
  createRoot(document.getElementById("root")!).render(<App />);
}

initApp();

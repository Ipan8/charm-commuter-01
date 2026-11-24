import * as fs from "node:fs";

// Entry: one-line charm for a commuter (max 200 chars, this one is 104).
const entry =
  "Are you the 7:15 train? Because my day doesn't start until you arrive — and you're always 10 minutes late.";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", entry + "\n");
console.log("Entry written:", entry);

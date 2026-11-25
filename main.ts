// Charm the Commuter — a pickup line for the 7:15 train crowd.
// The joke: flatter the train like a crush, then roast it for
// always being late. Romance first, punchline second, so the
// listener smiles before they realise they have been teased.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;
const MAX_CHARS = 200;

// The line is built from three beats so each part earns its place:
// an opener that names the train, a compliment that raises the
// stakes, and a twist that lands the lateness joke.
const opener = "Are you the 7:15 train?";
const compliment = "Because my day doesn't start until you arrive";
const twist = "and you're always 10 minutes late.";

function assembleCharmLine(): string {
  // Join the beats with the punctuation the line needs: the opener
  // keeps its question mark, the twist follows an em dash.
  return `${opener} ${compliment} — ${twist}`;
}

function checkLength(line: string): void {
  // Guard: the bounty caps entries at 200 characters, so refuse
  // to write anything over the limit instead of silently trimming.
  if (line.length > MAX_CHARS) {
    throw new Error(`Charm line is ${line.length} chars, over ${MAX_CHARS}.`);
  }
}

// Sanity check on the finished line: it must mention the train,
// ask its question, and end on the lateness punchline. If any
// beat went missing during assembly, fail loudly here rather
// than submitting a broken or half-finished charm line.
function checkBeats(line: string): void {
  const wanted = ["7:15", "?", "10 minutes late."];
  for (const beat of wanted) {
    if (!line.includes(beat)) {
      throw new Error(`Charm line is missing its beat: ${beat}`);
    }
  }
}

function main(): void {
  const line = assembleCharmLine();
  checkLength(line);
  checkBeats(line);
  // Write the single entry line plus a trailing newline, exactly
  // as the bounty expects it — no extra lines, no quotes, no
  // trailing spaces sneaking in after the punchline.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, line + "\n", "utf8");
  console.log(`Wrote ${line.length}-char entry to ${OUTPUT_FILE}`);
  console.log(line);
}

main();

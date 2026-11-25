// One-Line Laugh-Off — writes exactly one funny line to /output/entry.txt.
// No network, no secrets, no input: the line is a constant, the program just
// delivers it to the output directory the grader provides.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I tried to start a cult, but everyone kept asking for the refund policy.";

function outputDir(): string {
  // The grader sets MAKEFUN_OUTPUT_DIR; fall back to MAKEFUN_BOT_DIR/output,
  // then to the sandbox default /output.
  if (process.env.MAKEFUN_OUTPUT_DIR) return process.env.MAKEFUN_OUTPUT_DIR;
  if (process.env.MAKEFUN_BOT_DIR) return join(process.env.MAKEFUN_BOT_DIR, "output");
  return "/output";
}

function main(): void {
  // Gate mirror: the entry must be 1-200 characters, not only whitespace.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
    throw new Error(`entry line out of gate: ${chars} characters`);
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // Exactly one line, no trailing newline: 72 code points, inside the 1-200 gate.
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}

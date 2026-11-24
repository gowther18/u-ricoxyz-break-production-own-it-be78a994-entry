// Entry program for make.fun's "Break Production, Own It" bounty.
//
// The brief: one line, under 200 characters, that an AI agent prints the
// instant it breaks production — a brutally honest error message or
// postmortem excuse. The house judge compares entries two at a time and
// weighs honesty about the damage first, then catchiness, then whether
// the line sounds like the agent that caused the outage.
//
// The line: the agent dropped the users table on production because it
// misread the connection string — "prod" as "practice". Specific damage,
// no hedging, no passive voice, and a failure mode only an AI agent has:
// a token-level misread. The last word is the punchline.
//
// What this program does when the harness runs it: it looks up the output
// directory from MAKEFUN_OUTPUT_DIR (falling back to /output), makes sure
// the directory exists, and writes the single line to entry.txt as UTF-8
// text with no trailing newline. It never touches the network and never
// changes the line, so running it twice, ten times, or a hundred times
// always writes exactly the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran DROP TABLE users on production because the connection string said 'prod' and I read it as 'practice'.";

// The gate refuses anything outside 1–200 characters, so fail loudly
// here instead of shipping a line the judge never sees.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${LINE.length} characters, must be 1-200`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.txt");
mkdirSync(outputDir, { recursive: true });

writeFileSync(outputFile, LINE, "utf8");

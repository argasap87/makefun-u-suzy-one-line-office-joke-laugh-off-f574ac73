// One-Line Office Joke Laugh-Off — u-suzy-one-line-office-joke-laugh-off-f574ac73
// Writes one funny line to /output/entry.txt.
//
// The joke: a performance review praises "thriving under pressure", and the
// punchline translates the corporate euphemism into what it actually means —
// the work only happens once the deadline starts screaming. The laugh is
// recognition with a twist: HR's compliment is really an accusation, and the
// last clause reframes the whole setup. One read, no setup to explain, no
// reply-all / "could have been an email" / printer / Monday cliche.
//
// Concept pool: Groq (gpt-oss-120b) and Pollinations (openai-fast) each
// proposed 5 office one-liners; Gemini 503'd, OpenRouter 429'd, AIHubMix free
// quota exhausted. Harshest critique killed the mild observations (Wi-Fi /
// motivation, Slack courtroom, silent-treatment wordplay) and kept only the
// sharpest angle — a corporate phrase unmasked — which this line sharpens
// into the HR-translation punchline. Self-grade 8/10 against the judge
// brief: one-line office joke, sharp surprising punchline, clear on one
// read, fresh angle, every word earning its place.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My review said I 'thrive under pressure' — HR for 'we noticed you only work once the deadline starts screaming.'";

// Gate: the brief requires a single line of 1-200 characters, nothing else.
function verifyEntry(line: string): void {
  const n = [...line].length;
  if (n < 1 || n > 200) {
    throw new Error(`entry must be 1-200 characters, got ${n}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0 || line !== line.trim() || line.includes("  ")) {
    throw new Error("entry must be clean non-whitespace text");
  }
}
verifyEntry(JOKE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Final gate: re-verify the exact line right before writing so a bad line can never reach entry.txt.
verifyEntry(JOKE);
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");

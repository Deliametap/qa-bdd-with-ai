import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FEATURES_DIR = path.resolve("src/__tests__/features");
const OUTPUT_DIR = path.resolve("src/__tests__/generated");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateTestsForFeature(featurePath: string) {
  const featureName = path.basename(featurePath, ".feature");
  const featureContent = fs.readFileSync(featurePath, "utf-8");

  const prompt = `
You are an expert QA engineer and TypeScript developer.

Your task is to generate **three TypeScript files** from the Gherkin feature below.

Each file must be clean, complete, and consistent with the behavior described in the feature.

---

🔹 **General Rules**
- Convert feature title into snake_case for filenames and camelCase for function names.
  Example: "Create Task" → files use "create_task", function name = createTask
- Infer parameters and logic intentions from the "When" steps.
- Each file must be separated by these exact lines:
  // === SECOND FILE ===
  // === THIRD FILE ===
- Never use markdown code fences or TODO comments.
- Make step and test logic realistic and consistent with the feature content.

---

**File 1: {featureName}.steps.ts**
- Use jest-cucumber.
- Import only: \`loadFeature\` and \`defineFeature\` from "jest-cucumber".
- Load feature from "src/__tests__/features/{featureName}.feature".
- Implement Given/When/Then exactly as in the feature (use in-memory variables, arrays, etc).
- Do NOT import business logic (no imports from lib).

**File 2: {featureName}.test.ts**
- Use Jest.
- Import the function from "../../lib/{featureName}".
- Include complete describe/test blocks implementing every scenario in the feature.
- Use meaningful expect() statements based on the feature’s outcomes.

**File 3: {featureName}.ts**
- Located in src/lib/{featureName}.ts
- Must export a function with the inferred name and parameters.
- Function body must be empty except a comment:
  // TODO: implement business logic
- Example:
  export function createTask(taskName: string) {
    // TODO: implement business logic
  }

---

Feature content:
"""
${featureContent}
"""
`;

  console.log(`🧠 Generating tests for: ${featureName}...`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  let code = completion.choices[0].message?.content || "";
  code = code.replace(/```[a-z]*|```/g, "").trim();

  const parts = code.split(/\/\/\s*===\s*(?:SECOND FILE|THIRD FILE)\s*===/gi);
  const [stepsContent, testContent, funcContent] = parts.map((p) => p?.trim());

  if (!stepsContent || !testContent || !funcContent) {
    console.error(`❌ Gagal memisahkan hasil AI untuk ${featureName}.`);
    console.log(code); // bantu debug hasil mentah
    return;
  }

  const stepsPath = path.join(OUTPUT_DIR, `${featureName}.steps.ts`);
  const testPath = path.join(OUTPUT_DIR, `${featureName}.test.ts`);
  const funcPath = path.resolve(`src/lib/${featureName}.ts`);

  fs.writeFileSync(stepsPath, stepsContent + "\n");
  fs.writeFileSync(testPath, testContent + "\n");

  if (!fs.existsSync(funcPath)) {
    fs.mkdirSync(path.dirname(funcPath), { recursive: true });
    fs.writeFileSync(funcPath, funcContent + "\n");
  }

  console.log(`✅ Generated: ${featureName}.steps.ts, ${featureName}.test.ts, lib/${featureName}.ts`);
}

async function main() {
  const featureFiles = fs.readdirSync(FEATURES_DIR).filter((file) => file.endsWith(".feature"));

  if (featureFiles.length === 0) {
    console.error("❌ Tidak ada file .feature ditemukan di:", FEATURES_DIR);
    process.exit(1);
  }

  console.log(`🚀 Ditemukan ${featureFiles.length} feature file(s).`);
  for (const file of featureFiles) {
    await generateTestsForFeature(path.join(FEATURES_DIR, file));
  }

  console.log("🎉 Semua test berhasil di-generate!");
}

main().catch((err) => {
  console.error("💥 Terjadi error:", err);
  process.exit(1);
});

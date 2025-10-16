import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // pastikan sudah diset di environment
});

const FEATURES_DIR = path.resolve("src/__tests__/features");
const OUTPUT_DIR = path.resolve("src/__tests__/generated");
const TASK_MANAGER_PATH = path.resolve("src/lib/taskManager.ts");

// Pastikan output directory ada
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateTestsForFeature(featurePath: string) {
  const featureName = path.basename(featurePath, ".feature");
  const featureContent = fs.readFileSync(featurePath, "utf-8");

  // 🔍 Baca isi taskManager.ts agar AI tahu tipe data sebenarnya
  const taskManagerContent = fs.readFileSync(TASK_MANAGER_PATH, "utf-8");

  const prompt = `
You are an expert QA engineer and TypeScript developer.

Below is the full implementation of the module "taskManager.ts".
Use its functions exactly as defined (respect parameter types, return types, etc).

--- START OF taskManager.ts ---
${taskManagerContent}
--- END OF taskManager.ts ---

Now, given the following Gherkin feature file, generate two TypeScript test files.

1️⃣ // File: <featureName>.steps.ts  
   - Use jest-cucumber (loadFeature, defineFeature)
   - Import functions from "../../lib/taskManager"
   - Feature path must be "src/__tests__/features/<featureName>.feature"

2️⃣ // File: <featureName>.test.ts  
   - Use Jest (describe/test/expect)
   - Import functions from "../../lib/taskManager"

Rules:
- Use correct parameter types based on taskManager.ts (e.g., id: number, title: string)
- Do NOT use quotes for numeric IDs
- Do NOT include the file name in the code output
- Do NOT wrap the output with markdown fences
- Keep code clean, idiomatic TypeScript, and runnable

Feature file content:
"""
${featureContent}
"""
`;

  console.log(`🧠 Generating test for: ${featureName}...`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  let code = completion.choices[0].message?.content || "";
  code = code.replace(/```[a-z]*|```/g, "").trim();

  // Pisahkan dua file berdasarkan pattern
  const [stepsContent, testContent] = code.split(
    /(?=\/\/\s*File:\s*\w+\.test\.ts)/i
  );

  if (!stepsContent || !testContent) {
    console.error(`❌ Gagal memisahkan hasil untuk ${featureName}.`);
    return;
  }

  const stepsFile = path.join(OUTPUT_DIR, `${featureName}.steps.ts`);
  const testFile = path.join(OUTPUT_DIR, `${featureName}.test.ts`);

  fs.writeFileSync(stepsFile, stepsContent.trim() + "\n");
  fs.writeFileSync(testFile, testContent.trim() + "\n");

  console.log(`✅ Generated: ${featureName}.steps.ts & ${featureName}.test.ts`);
}

async function main() {
  const featureFiles = fs
    .readdirSync(FEATURES_DIR)
    .filter((file) => file.endsWith(".feature"));

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

1️⃣ QA/PO writes the `.feature` file (Gherkin syntax)
2️⃣ AI reads the feature file and generates test code
3️⃣ Developer runs the tests (initially failing)
4️⃣ Developer implements the code to make tests pass
5️⃣ Developer reruns the tests until all pass ✅

🧩 Tech Stack

# Next.js (TypeScript) – Frontend framework
# Jest – Unit testing framework
# Jest-Cucumber – BDD test runner
# OpenAI API – Test case generator
# dotenv – Manage API keys and environment variables
# fs / path – File system utilities for reading/writing test files

💡 How It Works

- The generate-tests.ts script reads all .feature files in src/__tests__/features/.
- It sends the content to the OpenAI API, asking for clean, runnable test files.
- AI returns two separate test implementations:
   One for BDD (jest-cucumber)
   One for unit testing (Jest)
- The files are written automatically into src/__tests__/generated.

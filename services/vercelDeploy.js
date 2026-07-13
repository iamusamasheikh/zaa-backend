const { execSync } = require("child_process");

async function deployToVercel(projectPath, slug) {
  try {
    try {
      execSync("vercel --version", { stdio: "ignore" });
    } catch {
      execSync("npm install -g vercel", { stdio: "inherit" });
    }

    const output = execSync(
      `cd "${projectPath}" && vercel --prod --yes`,
      {
        encoding: "utf-8",
        env: { ...process.env, VERCEL_TOKEN: process.env.VERCEL_TOKEN },
      }
    );

    const urlMatch = output.match(/https:\/\/[a-zA-Z0-9-]+\.vercel\.app/);
    const url = urlMatch ? urlMatch[0] : `https://${slug}.vercel.app`;

    return { success: true, url };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { deployToVercel };

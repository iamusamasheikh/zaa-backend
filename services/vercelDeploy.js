const { execSync } = require("child_process");

async function deployToVercel(projectPath, slug) {
  try {
    const token = process.env.VERCEL_TOKEN;
    if (!token || token === "your-vercel-token" || token.trim() === "") {
      // In database-driven dynamic mode, we don't need to rebuild Vercel.
      // Saving to the DB is sufficient. We return success with the live website URL.
      const url = process.env.FRONTEND_URL || "https://zaamedsolutions.com";
      return { success: true, url, skippedCli: true };
    }

    try {
      execSync("vercel --version", { stdio: "ignore" });
    } catch {
      execSync("npm install -g vercel", { stdio: "inherit" });
    }

    const output = execSync(
      `cd "${projectPath}" && vercel --prod --yes`,
      {
        encoding: "utf-8",
        env: { ...process.env, VERCEL_TOKEN: token },
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

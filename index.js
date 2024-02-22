#!/usr/bin/env node

import inquirer from "inquirer";
import { promises as fspromise, rename, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import fsextra from "fs-extra";
import path from "path";
import { exec } from "child_process";

const THEME_1 = "theme-1";

const THEME_2 = "theme-2";

const CONFIGS = {
  [THEME_1]: {
    dependencies: {
      "date-fns": "^3.6.0",
      "github-slugger": "^2.0.0",
      "gray-matter": "^4.0.3",
      "next-mdx-remote": "^4.4.1",
    },
    devDependencies: {
      "@mdx-js/loader": "^3.0.1",
      "@mdx-js/react": "^3.0.1",
      "@next/mdx": "^14.2.2",
      "@tailwindcss/typography": "^0.5.12",
      "@types/mdx": "^2.0.13",
      "react-lite-youtube-embed": "^2.4.0",
      "react-syntax-highlighter": "^15.5.0",
      "rehype-highlight": "^7.0.0",
      "rehype-pretty-code": "^0.13.1",
      "rehype-slug": "^6.0.0",
      "rehype-stringify": "^10.0.0",
    },
  },
  [THEME_2]: {
    dependencies: {
      "next-mdx-remote": "^4.4.1",
      "react-lite-youtube-embed": "^2.4.0",
    },
    devDependencies: {
      "rehype-pretty-code": "^0.13.1",
      "@tailwindcss/typography": "^0.5.12",
      eslint: "^8",
      "github-slugger": "^2.0.0",
      "gray-matter": "^4.0.3",
      marked: "^12.0.2",
      "rehype-slug": "^6.0.0",
      "remark-gfm": "^3.0.1",
    },
  },
};

async function moveContents(type) {
  const srcDir =
    type === "app_only"
      ? path.join(process.cwd(), "app")
      : path.join(process.cwd(), "src", "app");
  const destDirName = "(main)";
  const destDir = path.join(process.cwd(), "renamed_delete_this_one_job_done");

  rename(srcDir, destDir, function (err) {
    if (err) throw err;
    console.log("Moving your all files inside a temperory folder...");
    const new_path = path.join(srcDir, destDirName);
    if (!existsSync(new_path)) {
      mkdirSync(new_path, { recursive: true });
    }
    rename(destDir, path.join(srcDir, destDirName), function (err) {
      if (err) throw err;
      console.log("Successfully renamed - AKA moved!");
    });
  });
}

function installPackages() {
  console.log("Running npm install...");

  const child = exec("npm install");

  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`npm install stderr: ${data}`);
  });

  child.on("close", (code) => {
    if (code !== 0) {
      console.error(`npm install exited with code ${code}`);
    }
  });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app_with_src = path.join(process.cwd(), "src", "app");
const app_only = path.join(process.cwd(), "app");

let type = null;
type = existsSync(app_with_src) ? "with_src" : type;
type = existsSync(app_only) ? "app_only" : type;

if (type === null) {
  console.log("No nextjs app router found");
}

async function copyFile(source, target) {
  try {
    const data = await fspromise.readFile(source);
    await fspromise.writeFile(target, data);
    console.log("File copied successfully");
  } catch (err) {
    console.error("Copy failed:", err);
  }
}

async function updateDependencies({ theme }) {
  const packagePath = path.join(process.cwd(), "package.json");
  try {
    const packageJson = await fsextra.readJson(packagePath);
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...CONFIGS[theme].dependencies,
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...CONFIGS[theme].devDependencies,
    };
    await fsextra.writeJson(packagePath, packageJson, { spaces: 2 });
    console.log("package.json has been updated with new dependencies.");
    installPackages();
  } catch (err) {
    console.error("Error updating package.json:", err);
    process.exit(1);
  }
}

const questions = [
  {
    type: "list",
    name: "theme",
    message: "Select the blog theme you want to install!",
    choices: ["theme-1", "theme-2"],
  },
];

inquirer.prompt(questions).then(async ({ theme }) => {
  if ([THEME_1, THEME_2].includes(theme)) {
    try {
      console.log("adding the required dependencies in package.json...");
      await updateDependencies({ theme });
    } catch (err) {}
    try {
      console.log("creating a tailwind config file for your blog...");
      copyFile(
        path.join(__dirname, theme, "tailwind.blog.config.js"),
        process.cwd() + "/tailwind.blog.config.js"
      );
      console.log("creating sample images inside public folder...");
      await fsextra.copy(
        path.join(__dirname, theme, "images"),
        path.join(process.cwd(), "public")
      );
      try {
        await fsextra.copy(
          path.join(__dirname, "content"),
          path.join(process.cwd(), "content")
        );
        console.log("creating sample content for blog to start with");
      } catch (err) {
        console.error("sample content creation failed", err);
      }
      try {
        console.log(
          "moving your app inside (main) to isolate blog from your rest of the app"
        );
        await moveContents(type);
        try {
          console.log("Creating a blog for you...");
          const destination =
            type === "app_only"
              ? path.join(process.cwd(), "app", "(blog)", "blog")
              : path.join(process.cwd(), "src", "app", "(blog)", "blog");
          // if (!existsSync(destination)) {
          //   mkdirSync(destination, { recursive: true });
          // }
          await fsextra.copy(path.join(__dirname, theme, "blog"), destination);
          console.log("Blog created successfully");
        } catch (err) {
          console.error("Blog creating failed", err);
        }
      } catch (err) {
        console.error("Failed to move contents:", err);
      }
    } catch (err) {
      console.error(
        "Oooh something went wrong please report to author at rajatdhoot123@gmail.com",
        err
      );
    }
  } else {
    console.log("Aborted");
  }
});

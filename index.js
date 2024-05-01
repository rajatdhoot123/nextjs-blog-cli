#!/usr/bin/env node

import inquirer from "inquirer";
import { promises as fspromise, rename, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import fsextra from "fs-extra";
import path from "path";
import { spawn } from "child_process";
import chalk from "chalk";

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

const log = console.log;
const success = chalk.green;
const info = chalk.magenta;
const error = chalk.red;

async function moveContents(type) {
  const srcDir =
    type === "app_only"
      ? path.join(process.cwd(), "app")
      : path.join(process.cwd(), "src", "app");
  const destDirName = "(main)";
  const destDir = path.join(process.cwd(), "renamed_delete_this_one_job_done");

  rename(srcDir, destDir, function (err) {
    if (err) throw err;
    log(info("Moving your files to a temporary folder..."));
    const new_path = path.join(srcDir, destDirName);
    if (!existsSync(new_path)) {
      mkdirSync(new_path, { recursive: true });
    }
    rename(destDir, path.join(srcDir, destDirName), function (err) {
      if (err) throw err;
      log(success("Successfully moved and renamed your files!"));
    });
  });
}

function installPackages() {
  log(info("Running npm install..."));
  const child = spawn("npm", ["install"], {
    stdio: "inherit",
    env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
  });

  child.on("data", (data) => {
    log(`${data}`);
  });

  child.on("data", (data) => {
    log(error(`npm install stderr: ${data}`));
  });

  child.on("close", (code) => {
    if (code !== 0) {
      log(error(`npm install exited with code ${code}`));
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
  log(error("No Next.js app router found"));
}

async function copyFile(source, target) {
  try {
    const data = await fspromise.readFile(source);
    await fspromise.writeFile(target, data);
    log(success("File copied successfully!"));
  } catch (err) {
    log(error("Copy failed: " + err.message));
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
    log(success("package.json has been updated with new dependencies."));
    installPackages();
  } catch (err) {
    log(error("Error updating package.json: " + err.message));
    process.exit(1);
  }
}

const questions = [
  {
    type: "list",
    name: "theme",
    message: info("Select the blog theme you want to install!"),
    choices: [
      {
        name: "theme 1 Preview: https://www.rajatdhoot.com/theme-1",
        value: "theme-1",
      },
      {
        name: "theme 2 Preview: https://rajatdhoot.com/blog",
        value: "theme-2",
      },
    ],
  },
];

inquirer.prompt(questions).then(async ({ theme }) => {
  if ([THEME_1, THEME_2].includes(theme)) {
    try {
      log(info("Adding the required dependencies to package.json..."));
      await updateDependencies({ theme });
    } catch (err) {}
    try {
      log(info("Creating a Tailwind CSS config file for your blog..."));
      copyFile(
        path.join(__dirname, theme, "tailwind.blog.config.js"),
        process.cwd() + "/tailwind.blog.config.js"
      );
      log(info("Creating sample images inside the public folder..."));
      await fsextra.copy(
        path.join(__dirname, theme, "images"),
        path.join(process.cwd(), "public")
      );
      try {
        await fsextra.copy(
          path.join(__dirname, "content"),
          path.join(process.cwd(), "content")
        );
        log(success("Sample content for the blog has been created."));
      } catch (err) {
        log(error("Sample content creation failed: " + err.message));
      }
      try {
        log(
          info(
            "Moving your app inside (main) to isolate the blog from the rest of your app..."
          )
        );
        await moveContents(type);
        try {
          log(info("Creating a blog for you..."));
          const destination =
            type === "app_only"
              ? path.join(process.cwd(), "app", "(blog)", "blog")
              : path.join(process.cwd(), "src", "app", "(blog)", "blog");
          await fsextra.copy(path.join(__dirname, theme, "blog"), destination);
          log(success("Blog created successfully!"));
        } catch (err) {
          log(error("Blog creation failed: " + err.message));
        }
      } catch (err) {
        log(error("Failed to move contents: " + err.message));
      }
    } catch (err) {
      log(
        error(
          "Something went wrong, please report to the author at rajatdhoot123@gmail.com: " +
            err.message
        )
      );
    }
  } else {
    log(info("Aborted"));
  }
});

#!/usr/bin/env node

import inquirer from "inquirer";
import { promises as fspromise, rename, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import fsextra from "fs-extra";
import os from "os";
import path from "path";
import { exec } from "child_process";

const dependencies = {
  "date-fns": "^3.6.0",
  "github-slugger": "^2.0.0",
  "gray-matter": "^4.0.3",
  "next-mdx-remote": "^4.4.1",
};

const devDependencies = {
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
  exec("npm install", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred during npm install: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(stdout);
      console.log(`npm install stderr: ${stderr}`);
      return;
    }
    console.log(`npm install stdout:\n${stdout}`);
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

async function updateDependencies() {
  const packagePath = path.join(process.cwd(), "package.json");
  try {
    const packageJson = await fsextra.readJson(packagePath);
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...dependencies,
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...devDependencies,
    };
    await fsextra.writeJson(packagePath, packageJson, { spaces: 2 });
    console.log("package.json has been updated with new dependencies.");
    installPackages();
  } catch (err) {
    console.error("Error updating package.json:", err);
    process.exit(1);
  }
}

inquirer
  .prompt([
    {
      type: "question",
      name: "confirmation",
      message: "Are you sure you want to create blog",
      default: "no",
    },
  ])
  .then(async (answers) => {
    if (answers.confirmation === "yes") {
      try {
        await fsextra.copy(
          path.join(__dirname, "blog_images"),
          path.join(process.cwd(), "public")
        );
        console.log("Images copied successfully");
      } catch (err) {
        console.error("Images Copy Failed", err);
      }
      copyFile(
        path.join(__dirname, "tailwind.blog.config.js"),
        process.cwd() + "/tailwind.blog.config.js"
      );

      try {
        await updateDependencies();
      } catch (err) {}
      try {
        await fsextra.copy(
          path.join(__dirname, "content"),
          path.join(process.cwd(), "content")
        );
        console.log("Directory copied successfully");
      } catch (err) {
        console.error("Failed to copy directory:", err);
      }

      await moveContents(type);
      try {
        const destination =
          type === "app_only"
            ? path.join(process.cwd(), "app", "(blog)")
            : path.join(process.cwd(), "src", "app", "(blog)");
        await fsextra.copy(path.join(__dirname, "blog"), destination);
        console.log("Directory copied successfully");
      } catch (err) {
        console.error("Failed to copy directory:", err);
      }
    }
    try {
    } catch (err) {
      console.log("Pokemon not found, try again");
    }
  });

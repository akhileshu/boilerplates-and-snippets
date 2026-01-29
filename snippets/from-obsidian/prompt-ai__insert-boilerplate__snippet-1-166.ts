// plopfile.ts
import { NodePlopAPI } from "plop";

/*
 npm run plop -- component --  source ../30-day-backend-mastery/day-01-high-concurrency/README.md dest ./tmp
 or 
 npm run plop -- --  source ..
*/
export default function (plop: NodePlopAPI) {
  const cliArgs = parseArgs(process.argv);

  console.log({ cliArgs });
  console.log({ "process.argv": process.argv });

  plop.setActionType("materialize", async (answers) => {
    let { sourceType, source, dest } = normalizeInputs(answers, cliArgs);
    //dest = "./tmp";

    if (sourceType === "template") {
      // plop handles templates already
      return "template handled by plop";
    }

    if (sourceType === "local") {
      //source =
      ("/home/akhilesh/software-projects/code/devmate/src/main/index.ts");
      // source = "/home/akhilesh/software-projects/code/devmate/src";
      const stat = await fs.stat(source);

      await fs.ensureDir(dest);

      const target = stat.isDirectory()
        ? dest
        : path.join(dest, path.basename(source));

      await fs.copy(source, target, { overwrite: false });

      return `Copied from local: ${source}`;
    }

    if (sourceType === "github") {
      // todo : suggest deps / packages to install , warn of errors due to missig deps
      /*
        we can do like this 
take package.json's path githhub url , try to find what things are being used of package.json deps in current copying (dest) - suggest a npm i / npm i -D cmd
        */
      source = "https://github.com/akhileshu/akhilesh-portfolio/tree/main/src";
      const packageJsonUrl =
        "https://github.com/akhileshu/akhilesh-portfolio/blob/main/package.json";
      // source = "https://github.com/akhileshu/akhilesh-portfolio/blob/main/src/middleware.ts";
      await fs.ensureDir(dest);
      // simplest + robust
      /*
      execSync(`npx degit ${source} ${dest}`, { stdio: "inherit" });
      return `Fetched from GitHub: ${source}`;
      */
      const { org, repo, type, ref, subPath } = parseGitHubUrl(source);

      pkgJsonDeps.handlePkgJsonDeps(packageJsonUrl, dest);

      // ---------- FILE ----------
      if (type === "blob" && isFilePath(subPath)) {
        const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${ref}/${subPath}`;
        const res = await fetch(rawUrl);

        if (!res.ok) throw new Error(`Failed to fetch file from GitHub`);

        const target = path.join(dest, path.basename(subPath));
        await fs.writeFile(target, await res.text());

        return `Fetched file from GitHub: ${subPath}`;
      }

      // ---------- DIRECTORY / REPO ----------
      const degitSource = subPath
        ? `${org}/${repo}/${subPath}#${ref}`
        : `${org}/${repo}#${ref}`;

      execSync(`npx degit ${degitSource} ${dest}`, { stdio: "inherit" });

      return `Fetched directory from GitHub: ${org}/${repo}`;
    }

    throw new Error("Unknown source type");
  });
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts: [
      /*
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },*/
      {
        type: "list",
        name: "sourceType",
        message: "Where should files come from?",
        choices: ["template", "local", "github"],
      },
      {
        type: "input",
        name: "source",
        message: "Source path / repo (org/repo[:path])",
        default: cliArgs.source,
        when: () => !cliArgs.source,
      },
      {
        type: "input",
        name: "dest",
        message: "Destination directory",
        default: cliArgs.dest ?? ".",
        when: () => !cliArgs.dest,
      },
    ],
    actions: [
      /* 
      {
        type: "add",
        path: "tmp/src/components/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
       */
      {
        type: "materialize",
      },
    ],
  });
}

import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { parseArgs } from "./src/lib/args";
import { pkgJsonDeps } from "./src/lib/package-json-deps";
import { parseGitHubUrl } from "./src/lib/parseGitHubUrl";

function isFilePath(p: string) {
  return path.extname(p) !== "";
}

// =================

/**
 * 
 * need to normalize inputs for plop , because when option is false(user not prompted for input) , plop doesn't retain default value
 * @example
 * {
        type: "input",
        name: "source",
        message: "Source path / repo (org/repo[:path])",
        default: cliArgs.source,
        when: () => !cliArgs.source,
      }
 */
function normalizeInputs(answers: any, cliArgs: any) {
  return {
    sourceType: answers.sourceType,
    source: answers.source ?? cliArgs.source,
    dest: answers.dest ?? cliArgs.dest ?? ".",
  };
}


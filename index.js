#!/usr/bin/env node

const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  alias: {
    h: ["help", "?"],
    p: ["proceed"],
  },
});

function printUsage() {
  ["Usage: node index.js [-p, --proceed] [-h, --help]", ""].forEach((x) =>
    console.log(x)
  );
  process.exit();
}

async function main() {
  if (args.help) {
    printUsage();
  }

  if (!args.proceed) {
    console.log("\n--proceed is required.\n");
    printUsage();
  }

  console.log("Hello, world!");
  console.log("Goodbye, world!");
}

main().catch((e) => {
  console.error("Unhandled exception", e);
});

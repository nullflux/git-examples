#!/usr/bin/env node

const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  alias: {
    h: ["help", "?"],
    p: ["proceed"],
    v: ["verbose"],
  },
});

function printUsage() {
  if (args.verbose) {
    console.debug("Entered printUsage");
  }
  [
    "Usage: node index.js [-p, --proceed] [-h, --help] [-v, --verbose]",
    "",
  ].forEach((x) => console.log(x));
  process.exit();
}

async function main() {
  if (args.verbose) {
    console.debug("Entering main...");
    console.debug("All args", args);
  }

  if (args.help) {
    if (args.verbose) {
      console.debug("`help` detected");
    }
    printUsage();
  }

  if (!args.proceed) {
    console.log("\n--proceed is required.\n");
    printUsage();
  }

  if (args.verbose) {
    console.debug("Proceeding...");
  }

  /////////////////////////////////////////////////////////
  console.log("Hello, world!");
  /////////////////////////////////////////////////////////

  console.debug("end of main()");
}

main()
  .then(() => {
    if (args.verbose) {
      console.info("main() completed");
    }
  })
  .catch((e) => {
    console.error("Unhandled exception", e);
  })
  .finally(() => {
    if (args.verbose) {
      console.info("finally reached");
    }
  });

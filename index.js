#!/usr/bin/env node

const minimist = require("minimist");
const fetch = require("node-fetch");

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

function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function writeSlow(str) {
  const values = str.split("");
  let count = 1;
  for (ch of values) {
    process.stdout.write(ch);
    if (!/[\s\.,]/.test(ch)) {
      const delay = (0.3 * Math.random()) / Math.log(++count);
      await sleep(delay);
    }
  }
  process.stdout.write("\n");
}

function hipsum(sentences = 3) {
  return fetch(
    `https://hipsum.co/api/?type=hipster-centric&sentences=${sentences}`
  )
    .then((result) => result.json())
    .then((json) => json[0]);
}

function dotSpam() {
  let going = true;
  return (function () {
    new Promise(async (resolve) => {
      while (going) {
        process.stdout.write(".");
        await sleep(0.125);
      }
      resolve();
    });
    return function () {
      going = false;
    };
  })();
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

  const stopDots = dotSpam();
  await sleep(1);
  await writeSlow(await hipsum());
  await sleep(2);
  stopDots();

  if (args.verbose) {
    console.debug("end of main()");
  }
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

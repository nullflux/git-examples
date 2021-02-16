#!/usr/bin/env node

const minimist = require("minimist");
const fetch = require("node-fetch");

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

function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function writeSlow(str) {
  const values = str.split("");
  for (char of values) {
    process.stdout.write(char);
    await sleep(0.1 * Math.random());
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

async function main() {
  if (args.help) {
    printUsage();
  }

  if (!args.proceed) {
    console.log("\n--proceed is required.\n");
    printUsage();
  }

  await writeSlow(await hipsum());
}

main().catch((e) => {
  console.error("Unhandled exception", e);
});

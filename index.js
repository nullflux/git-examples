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

async function main() {
  if (args.help) {
    printUsage();
  }

  if (!args.proceed) {
    console.log("\n--proceed is required.\n");
    printUsage();
  }

  await writeSlow(`Hello, world
This is a longer corpus of text, which will take some time to put on the screen

Tbh stumptown unicorn biodiesel actually. Tofu four loko squid flannel wolf PBR&B activated charcoal kogi deep v single-origin coffee hoodie unicorn. You probably haven't heard of them hella single-origin coffee put a bird on it before they sold out. Farm-to-table green juice offal chia poke pop-up freegan locavore franzen craft beer af synth. Flannel banh mi snackwave, squid fixie shoreditch church-key.
`);
}

main().catch((e) => {
  console.error("Unhandled exception", e);
});

const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

esbuild
  .build({
    entryPoints: ["./view/popup.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    bundle: true,
    outfile: "./view/out/popup.js",
    plugins: [sveltePlugin()],
    logLevel: "info",
  })
  .catch(() => process.exit(1));
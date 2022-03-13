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
    watch: {
      onRebuild(error, result) {
        if (error) console.error('watch build failed:', error)
        else console.log('watch build succeeded:', result)
      },
    }
  }).then(result => {
    console.log('watching...')
  })
  .catch(() => process.exit(1));
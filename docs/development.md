# Minimal Vite development

[Project overview](../README.md)

## Project structure

```
minimal-vite/
├── .github/workflows/
│   └── ci.yml         # Quality checks and npm publishing
├── bin/
│   └── minimal-vite.js # Scaffolding CLI
├── src/
│   ├── main.ts        # Application entry point
│   ├── style.css      # Global styles
│   └── vite-env.d.ts  # Vite client type declarations
├── bunfig.toml        # Bun install settings (release-age guard)
├── favicon.svg
├── index.html         # HTML entry
├── LICENSE
├── package.json
├── tsconfig.json
└── vite.config.ts     # Dev server and build configuration
```

## Scaffolding CLI

`bin/minimal-vite.js` creates a new project from this template:

```sh
node bin/minimal-vite.js my-app
```

It shallow-clones this repository into `./my-app`, removes the template's git history, sets the package name, version `0.1.0` and `private: true`, makes an initial commit, and installs dependencies with the package manager you choose at the prompt (`npm` or `bun`, default `npm`). If no name is given it prompts for one (default `my-vite-app`). Flags: `-h`/`--help`, `-v`/`--version`.

The package (`@mrbrunowolff/minimal-vite`) is not yet published on npm, so `bunx @mrbrunowolff/minimal-vite` does not work yet.

## Publishing

The `publish` job in `.github/workflows/ci.yml` runs after the quality job on pushes to `main` and on manual runs (`gh workflow run ci.yml`). It publishes with npm trusted publishing (OIDC, no token) when the `package.json` version is not already on npm. Trusted publishing cannot do a package's first publish: publish once manually, then configure the trusted publisher on npm (repository `MrBrunoWolff/minimal-vite`, workflow `ci.yml`). Until then the job skips without failing.

## Validation and dependencies

Run `bun run check:ci` before a commit or pull request. See [QUALITY.md](../QUALITY.md) for the validation stages. Bun applies the three-day minimum release age in `bunfig.toml`; preserve it when updating dependencies. Verify a frozen install after refreshing the lockfile.

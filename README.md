# Minimal Vite

A minimal Vite starter template with strict TypeScript and no runtime dependencies.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Features

- Vite 8 and TypeScript 7 with a strict `tsconfig.json` (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`)
- No runtime dependencies; only `vite`, `typescript` and `terser` as dev dependencies
- Dev server on port 3000 that opens the browser on start
- Production build type-checks with `tsc`, then emits a Terser-minified bundle with source maps and a relative base path (`./`)
- `bunfig.toml` refuses npm versions published less than 3 days ago (`minimumReleaseAge`)
- GitHub Actions CI runs typecheck, build and `bun audit` on every push and pull request
- Scaffolding CLI in `bin/minimal-vite.js` that clones the template into a fresh git repository

## Quick start

### Clone

```sh
git clone https://github.com/MrBrunoWolff/minimal-vite.git
cd minimal-vite
bun install
bun run start
```

## Scripts

| Command             | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| `bun run start`     | Start the Vite dev server on port 3000                                              |
| `bun run build`     | Type-check with `tsc`, then build for production into `dist/`                       |
| `bun run typecheck` | Type-check with `tsc --noEmit`                                                      |
| `bun run preview`   | Serve the production build from `dist/` locally                                     |
| `bun run check`     | Run `typecheck` and `build` in parallel, reporting both even if one fails           |
| `bun run audit`     | Run `bun audit` and fail on any high or critical advisory                           |

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

## License

MIT — see [LICENSE](LICENSE).

All declared runtime and development dependencies use `latest`, including
TypeScript where present. Bun resolves eligible stable releases behind the
three-day release-age guard; commit the refreshed lockfile and verify a frozen
install after each update.

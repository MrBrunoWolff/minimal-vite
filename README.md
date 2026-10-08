# Minimal Vite

A starter for plain TypeScript web apps, with Vite hot reloading and no runtime dependencies.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

Use the Bun version declared in [package.json](package.json).

```sh
git clone https://github.com/MrBrunoWolff/minimal-vite.git
cd minimal-vite
bun install --frozen-lockfile
bun run start
```

Open [localhost:3000](http://localhost:3000).

## Features

- Strict TypeScript and direct DOM rendering.
- Production bundles with minification and source maps.
- A local CLI for creating a project from the template.

## Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun run start`    | Start the Vite development server               |
| `bun run build`    | Type-check and build into dist/                 |
| `bun run preview`  | Preview the production build                    |
| `bun run check`    | Run type checking and build checks              |
| `bun run audit`    | Audit dependencies                              |
| `bun run check:ci` | Run the complete repository validation contract |

## Development

See the [development guide](docs/development.md) for project structure, implementation details and maintenance. The complete command list is in [package.json](package.json).

## License

MIT — see [LICENSE](LICENSE).

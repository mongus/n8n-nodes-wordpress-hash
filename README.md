# n8n-nodes-wordpress-hash

An n8n community node that exposes the functions of the `wordpress-hash-node` package for hashing and verifying WordPress-compatible passwords inside n8n workflows.

## Features

- Generate WordPress-compatible password hashes
- Verify plaintext passwords against existing WordPress hashes
- Simple node with two operations: `hash` and `verify`

## Requirements

- Node.js >= 20.15
- n8n (self-hosted or desktop) that supports community nodes

## Installation

You can install this package directly into your n8n instance.

- Using n8n UI (recommended):
  1. Open n8n.
  2. Go to Settings → Community Nodes.
  3. Add package: `n8n-nodes-wordpress-hash`.

- Using npm (for advanced/manual setups):

```bash
npm install n8n-nodes-wordpress-hash
```

n8n will automatically load nodes from installed community node packages.

## Usage

After installation, the node will be available in the n8n node palette as "Wordpress Hash".

Supported operations:
- Hash: Provide a plaintext password to receive a WordPress-compatible hash.
- Verify: Provide a plaintext password and an existing WordPress hash to get a boolean result.

The node internally uses the `wordpress-hash-node` library for hashing and verification to match WordPress behavior as closely as possible.

## Development

This repository contains the TypeScript source for the node in `nodes/WordpressHash/WordpressHash.node.ts` and builds to `dist/`.

- Build:

```bash
npm run build
```

- Lint:

```bash
npm run lint
```

- Fix lint issues:

```bash
npm run lintfix
```

- Format:

```bash
npm run format
```

- Dev loop (rebuild and start n8n):

```bash
npm run dev
```

Note: `npm run dev` expects that you have an n8n environment available. It watches the `nodes` folder, rebuilds, and starts n8n.

## Node Registration

This package declares its node entry in `package.json` under the `n8n.nodes` key:

```
"n8n": {
  "n8nNodesApiVersion": 1,
  "nodes": [
    "dist/nodes/WordpressHash/WordpressHash.node.js"
  ]
}
```

Make sure to run a build so the compiled file exists in `dist/` before publishing or using.

## Compatibility

- This package targets Node.js >= 20.15.
- It depends on `n8n-workflow` as a peer dependency and on `wordpress-hash-node` for hashing.

## Troubleshooting

- Node does not appear in n8n:
  - Ensure the package is installed in the same environment where n8n runs.
  - Run `npm run build` to generate the `dist` output.
  - Restart n8n after installation/build.
- Type errors or lint issues:
  - Run `npm run lint` and `npm run lintfix`.
- Icon not visible:
  - The build step `gulp build:icons` runs during `npm run build` and copies icons to `dist`.

## Contributing

Issues and PRs are welcome. Please follow the existing code style and run linting before submitting.

- Repo: https://github.com/mongus/n8n-nodes-wordpress-hash
- Issues: https://github.com/mongus/n8n-nodes-wordpress-hash/issues

## License

MIT © Aaron Porter
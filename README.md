# DSNP Specification

This repository holds the technical specification for the Decentralized Social Networking Protocol (DSNP).
The current official specification can be viewed in its compiled form [here](https://spec.dsnp.org).
Alternatively, the latest iteration of the spec can be viewed non-formatted [here](https://github.com/LibertyDSNP/spec/tree/main/pages).
For more information about the DSNP, visit [DSNP.org](https://www.dsnp.org)

## Releases

### Spec Site Releases

1. Merge all changes into `main` and handle any updated specifications (see below).
2. Create a GitHub Release and tag it using the following CalVer: `YYYY.MM.###` (where `###` is the nth release in that month)

### Spec Version Release & Changelog Process

1. Update the version at the top of the `Overview.md` file for spec
2. Update the releases table on the `Overview.md` file for spec
3. Update the releases table on the root `index.md` file
4. Use the appropriate git tag(s) for the specs `[Spec]-v[Major].[Minor].[Patch]`
      - DSNP: `DSNP-vX.X.X`
      - Activity Content `ActivityContent-vX.X.X`
      - DSNP on Ethereum `EVM-vX.X.X`
5. Generate a [GitHub Release](https://github.com/LibertyDSNP/spec/releases) for each spec/tag combination with the Changelog.

Note: Remember that you can link to the tag on GitHub before creating the tag.

## Running Locally

Node.js 20 or later is required.

Install dependencies:

``` bash
npm install
```

| Command | Description |
| --- | --- |
| `npm run build` | Build the site into `_site/` |
| `npm run serve` | Build and serve with live reload at <http://localhost:8080> |
| `npm run lint` | Run Markdown linter and spell checker |
| `npm run linkcheck` | Check all internal and external links (run after `build`) |

## Tools and frameworks used in this repo

* [Eleventy (11ty)](https://www.11ty.dev/) — static site generator
* [markdown-it](https://github.com/markdown-it/markdown-it) — Markdown renderer
* [linkinator](https://github.com/JustinBeckwith/linkinator) — link checker
* [remark](https://remark.js.org/) — Markdown linter
* [spellchecker-cli](https://github.com/tbroadley/spellchecker-cli) — spell checker

## Contributing a specification

### Formatting, names, etc

1. Use the official outline for specifications. Respect and observe good file organization practices.
1. Spec files are written in Markdown format, and are located in the _pages_ directory.
1. When documenting an API, use the following table style:

   | Name | Description | Type | Required? |
   | --- | --- | --- | --- |
   | `fileHash` | a description of `fileHash` | bytes | YES |
1. Put images into the `images` folder and link to them using their URL in the GitHub repo.

### Release process

1. The deploy GitHub Actions workflow is triggered by tags matching the CalVer pattern `YYYY.MM.###`.
2. The workflow builds the site with Eleventy (`npm run build`) and deploys the `_site/` directory to GitHub Pages.

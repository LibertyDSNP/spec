# DSNP Specification

This repository holds the technical specification for the Decentralized Social Networking Protocol (DSNP).
The current official specification can be viewed in its compiled form [here](https://spec.dsnp.org).
Alternatively, the latest iteration of the spec can be viewed non-formatted [here](https://github.com/LibertyDSNP/spec/tree/main/pages).
For more information about the DSNP, visit [DSNP.org](https://www.dsnp.org)

## Releases

### Spec Site Releases

Currently the `main` branch is automatically released via GitHub Pages.
(This might change in the future with website releases being tagged.)

### Spec Version Release & Changelog Process

1. Update the version at the top of the the `Overview.md` file for spec
2. Update the releases table on the `Overview.md` file for spec
3. Use the appropriate git tag(s) for the specs `[Spec]-v[Major].[Minor].[Patch]`
  - DSNP: `DSNP-vX.X.X`
  - Activity Content `ActivityContent-vX.X.X`
  - DSNP on Ethereum `EVM-vX.X.X`
4. Generate a [GitHub Release](https://github.com/LibertyDSNP/spec/releases) for each spec/tag combination with the Changelog.

Note: Remember that you can link to the tag on GitHub before creating the tag.

## Running Locally

To run the spec generator locally and preview the formatted spec website, use the following commands:

```
npm install
npm run dev
```

Once the local server is running, a live-reloading preview of the spec can be viewed at http://localhost:3000.

## Tools and frameworks used in this repo
* [Docz](https://www.docz.site/)
* [MDX](https://mdxjs.com/)

# Contributing a specification

### Formatting, names, etc.
1. Use the official outline for specifications. Respect and observe good file organization practices.
1. Spec files are written in Markdown format, and are located in the _pages_ directory.
1. When documenting an API, et, use the following table style:

   | Name | Description | Type | Required? |
   | --- | --- | --- | --- |
   | `fileHash` | a description of `fileHash` | bytes | YES |
1. Put images into the `images` folder and link to them using their URL in the GitHub repo.

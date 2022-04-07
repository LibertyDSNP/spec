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

To build the spec generator locally, install [mdBook](https://github.com/rust-lang/mdBook.git) and [link checker](https://github.com/Michael-F-Bryan/mdbook-linkcheck). The link checker will run during build process and throw warnings for any broken internal or external links.

``` bash
cargo install mdbook
cargo install mdbook-linkcheck
```

To run the spec generator locally and preview the formatted spec website, use the following commands:

``` bash
npm install
npm run build
```

To run the spec generator locally and also actively build after each change, use the following command:

``` bash
npm run serve
```

Once the local server is running, the spec will automatically open in the browser. A live-reloading preview of the spec can also be viewed at <http://localhost:3000>.

## Tools and frameworks used in this repo

* [mdBook](https://rust-lang.github.io/mdBook/)
* [MDX](https://mdxjs.com/)

## Contributing a specification

### Formatting, names, etc

1. Use the official outline for specifications. Respect and observe good file organization practices.
1. Spec files are written in Markdown format, and are located in the _pages_ directory.
1. When documenting an API, et, use the following table style:

   | Name | Description | Type | Required? |
   | --- | --- | --- | --- |
   | `fileHash` | a description of `fileHash` | bytes | YES |
1. Put images into the `images` folder and link to them using their URL in the GitHub repo.

### Release process

1. Deployment step of the github actions workflow is triggered by tags fitting the regex:

   ``` bash
      ^\d{8}\.\d+
   ```

2. Trigger will deploy the latest successful artifact from main branch.

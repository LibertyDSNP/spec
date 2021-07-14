# Liberty Protocol Spec

This repository holds the technical specification for the Liberty Protocol.
The current official specification can be viewed in its compiled form [here](https://spec.dsnp.org).
Alternatively, the latest iteration of the spec can be viewed non-formatted [here](tree/main/pages).

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
1. The initial spec status is _Draft_.  Please see [Process](#Process) for details.
1. Choose a target version number of the platform for the spec.
1. Use the official outline for specifications. Respect and observe good file organization practices. For example, if your spec relates to DSNP please put the spec in the _DSNP_ folder and not anywhere else.
1. Spec files are written in Markdown format, and are located in the _pages_ directory.
1. Use dashes (`-`) between words in file names so that they appear in the Table of Contents correctly.  Use MDX format (`.mdx` extension) if you want to import React components in the page.
1. When documenting an API, et, use the following table style:

   | name | description | type | required?|
   | ---|---|---|---|
   | `fileHash` | a description of `fileHash` | bytes | YES |
1. Sort definitions and descriptions alphabetically
1. Put images into the `images` folder and link to them using their URL in the GitHub repo.

### Choosing a version
We will be using semver style versioning.
As of the time of this writing, what features go under what version numbers hasn't been settled.
Please choose 0.1 for the version until further notice.

## Spec status definitions

| Name | Description |
| --- | --- |
| Draft | Spec is posted as draft PR. It's open for comment and major changes. |
| Proposed | Ready for formal review. It should be done except for minor changes. |
| Tentative | This is the accepted plan. The spec should not change unless there are blocking issues. |
| Final | This version will not change. Changes require a new spec process and new spec version number. |

## Process

### New Specs
For a completely new specification,
1. Spec writer(s) post a GitHub "draft PR" with their draft of a spec. This spec is open for lengthy discussion, major changes if needed.
1. Once the discussions have been resolved by the spec writer(s), they take the PR+status out of "Draft" and change the status to "Proposed". The only changes that should be occurring by this point are minor ones, like reorganizing a section, clarifications, language errors.
1. Just before the spec is merged to main, the spec status should be changed to "Tentative."
1. Once the spec has been solidified, i.e. we've built pretty much everything and we know things aren't going to change -- the spec status should be changed to Final. Maybe this is reserved only for specs that are at a new major version?

Once the spec is in "Tentative", any major changes require a new spec process (see below).
   
### New Spec Versions
For updates to an existing spec,
1. Leave the spec as-is in main.
1. Follow the process for New Specs, above, through step 3, except bump the version as appropriate when you post the Draft PR.
1. Once the updated spec is merged, the current spec shows "Tentative" status, + the new version number.
1. Proceed with step 4 as before, as appropriate.

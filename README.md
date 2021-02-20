# Liberty Protocol Spec

This repository holds the technical specification for the Liberty Protocol.
The current official specification can be viewed in its compiled form [here](TBD).
Alternatively, the latest iteration of the spec can be viewed non-formatted [here](tree/main/pages).

## Running Locally

To run the spec generator locally and preview the formatted spec website, use the following commands:

```
npm install
npm run dev
```

Once the local server is running, a live-reloading preview of the spec can be viewed at http://localhost:3000.


# Contributing a specification
* Spec files are written in markdown (.md) format, and are located in the _pages_ directory.
* Respect and observe good file organization practices. For example, if your spec relates to DSNP please put the spec in the _DSNP_ folder and not anywhere else.
* The initial spec status is _Draft_.  Please see the diagram below for the specification lifecycle.
* Choose a target version number of the platform for the spec.
* Use the official outline for specifications

## Spec status definitions

| Name | Description |
| --- | --- |
| Draft | Spec is posted as draft PR. It's open for comment and major changes. |
| Proposed | Ready for formal review. It should be done except for minor changes. |
| Tentative | This is the accepted plan. The spec should not change unless there are blocking issues. |
| Final | This version will not change. Changes require a new spec process and new spec version number. |

## Choosing a version

As of the time of this writing the meaning of version numbers hasn't been settled. Please choose 0.1 for the version until further notice.

## Naming
Use dashes (`-`) between words in file names so that they appear in the Table of Contents correctly.

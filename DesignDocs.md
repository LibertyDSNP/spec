# Design Documents

## Purposes of this document
* To describe what our design documents are for, how they are structured, and what content is in them.
* To describe how and where DSNP Design Documents are produced and published.

## What Is a Design Document?
It's a document clearly articulating a problem, a solution to that problem, and why we think the proposal is the right solution.
It has enough information to begin writing stories for implementing the solution in the document.
 
## Audience
The audience for DSNP Design Documents is mainly DSNP developers, both internal and at large.
We also expect other developers and technically savvy readers will read these documents. 
It's encouraged to link to technical explainers, such as Wikipedia, the DSNP Spec, or other DSNP Design Documents.
This will help readers to learn about concepts in the proposal if need be.

## Sections
* Context + Scope: A short description of the landscape in which the new system is being built and what is actually being built
* Problem Statement: The "why." A short summary of the issue(s) that this design solves.
    This doesn't have to be a technical problem. 
    "Developer unhappiness" or "improved user experience" are also problems.
* Goals + Non-goals:  what this solution is trying to do, and is also _not_ trying to do, in concrete terms.
* Proposal: A high level overview, followed by a detailed description.
    This can include diagrams such as [A system context diagram](https://en.wikipedia.org/wiki/System_context_diagram)
* Benefits and Risks: the reasons why this solution was chosen, and the risks this solution poses.
    For example, the solution may be very simple, but there could performance bottlenecks above a certain threshold.
    Another: the solution is well known and widely used, but it's not a perfect fit and requires complicated changes in one area.   
* Alternatives + Rationale:  discuss alternatives that were considered, and why they were rejected. 
    Note when there are absolute requirements that the solution does not and can't meet.
    One example might be, it's a proprietary solution but we need something open source.
* Sources: sources of information that led to this design.
* Glossary (optional): if you think inline links to concepts are too distracting, include a glossary section. 
    This can be links, text or both.

## Process
The process for adding a new DSNP Design Document is much like any other Pull Request in a code base.
1. Create a branch in this repo.
2. Commit your design doc in your branch, based on the guidelines here.
3. Post the design document as a Draft PR for discussion.
4. When the PR is accepted, it can be merged.

## Writing style
Remember that the first goal of the Design Document is to explain a solution to others so they can understand it well enough to start writing stories and then implement the solution. The next goal is explain the solution to the public. Also keep in mind that these documents will be written in English, and some readers' first language may not be English.

### General
Be clear, be concise. Prefer shorter words and simpler sentences. Break up writing into short paragraphs with one concept each.
Use white space, headings and different text styles to separate and highlight important topics and ideas.

This document is meant to be an example of the preferred writing style.

### Markdown
* Please put each sentence on its own line in the Markdown.
    This makes diffs for PRs easier to read.
* Inline links are okay.

## Sources
1. [Design docs at Filecoin Project](https://github.com/filecoin-project/designdocs)
2. [Design docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/)

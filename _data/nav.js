"use strict";
const fs = require("fs");
const path = require("path");

const SUMMARY_PATH = path.join(__dirname, "../pages/SUMMARY.md");

// URLs are stored WITHOUT the pathPrefix so they can be compared
// directly to 11ty's page.url. Apply the `url` filter in templates to get
// the fully-prefixed href (e.g. /pages/DSNP/Overview/).
function hrefToUrl(href) {
  if (!href) return null;
  return "/" + href.replace(/\.md$/, ".html");
}

function parseSummary() {
  const lines = fs.readFileSync(SUMMARY_PATH, "utf8").split("\n");
  const tree = [];

  // Stack entries: { children: Array, spaces: number }
  // Root entry owns tree[] and has spaces = -1 (always a valid parent)
  const stack = [{ children: tree, spaces: -1 }];

  for (const line of lines) {
    // Top-level bare link (no leading dash): [Title](href)
    const topMatch = line.match(/^\[([^\]]*)\]\(([^)]*)\)/);
    if (topMatch) {
      const href = topMatch[2];
      const node = { title: topMatch[1], href, url: hrefToUrl(href), hasLink: href !== "", children: [] };
      // Goes into root tree; is NOT a nesting parent for subsequent items
      tree.push(node);
      // Reset stack to root so the following "- [...]" items are root siblings
      stack.length = 1;
      continue;
    }

    // List item: [spaces]- [Title](href)
    const listMatch = line.match(/^(\s*)-\s+\[([^\]]*)\]\(([^)]*)\)/);
    if (!listMatch) continue;

    const spaces = listMatch[1].length;
    const href = listMatch[3];
    const node = { title: listMatch[2], href, url: hrefToUrl(href), hasLink: href !== "", children: [] };

    // Pop stack until we find a parent with fewer spaces
    while (stack.length > 1 && stack[stack.length - 1].spaces >= spaces) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    parent.children.push(node);
    stack.push({ children: node.children, spaces, node });
  }

  return tree;
}

function flattenTree(tree) {
  const result = [];
  function walk(nodes) {
    for (const node of nodes) {
      if (node.hasLink) result.push(node);
      if (node.children.length) walk(node.children);
    }
  }
  walk(tree);
  return result;
}

function getAncestorUrls(currentUrl, tree) {
  const ancestors = new Set();

  function walk(nodes, pathSoFar) {
    for (const node of nodes) {
      const newPath = [...pathSoFar, node];
      if (node.url === currentUrl) {
        for (const ancestor of pathSoFar) {
          if (ancestor.url) ancestors.add(ancestor.url);
        }
        return true;
      }
      if (node.children.length && walk(node.children, newPath)) {
        return true;
      }
    }
    return false;
  }

  walk(tree, []);
  return ancestors;
}

const tree = parseSummary();
const flat = flattenTree(tree);

module.exports = { tree, flat, getAncestorUrls };

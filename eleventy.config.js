"use strict";

const path = require("path");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // ── Markdown ──────────────────────────────────────────────────────────────
  const md = markdownIt({
    html: true,        // pass raw HTML (<a id="...">, <br />, etc.)
    linkify: false,
    typographer: false,
  });

  md.use(markdownItAnchor, { permalink: false });

  // Rewrite internal .md links to clean absolute 11ty URLs.
  // state.env contains the 11ty page data so we can resolve relative paths.
  md.core.ruler.push("rewrite-md-links", (state) => {
    // Derive the source directory (e.g. "pages/DSNP/" from "pages/DSNP/Overview.md")
    const inputPath = state.env && state.env.page && state.env.page.inputPath;
    // Strip leading "./" and drop the filename to get the directory
    const srcDir = inputPath
      ? inputPath.replace(/^\.\//, "").replace(/[^/]+$/, "")
      : "pages/";

    for (const token of state.tokens) {
      if (token.type !== "inline") continue;
      for (const child of token.children) {
        if (child.type !== "link_open") continue;
        const href = child.attrGet("href");
        if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto")) continue;
        if (!href.endsWith(".md") && !href.includes(".md#")) continue;

        // Split fragment from path
        const hashIdx = href.indexOf("#");
        const mdPart = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
        const fragment = hashIdx >= 0 ? href.slice(hashIdx + 1) : null;

        // Resolve the .md path relative to the source file's directory
        const resolved = path.posix.normalize(srcDir + mdPart);
        // resolved is like "pages/DSNP/Types/UserAttributeSet.md"
        // Strip the "pages/" prefix and the ".md" extension to get the clean URL path
        const urlPath = "/" + resolved.replace(/^pages\//, "").replace(/\.md$/, ".html");
        child.attrSet("href", fragment ? urlPath + "#" + fragment : urlPath);
      }
    }
  });

  eleventyConfig.setLibrary("md", md);

  // ── Passthrough copies ────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy({ "node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs": "pagefind-ui/ui.js" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.css": "pagefind-ui/ui.css" });
  eleventyConfig.addPassthroughCopy({ "pages/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "pages/images": "images" });
  eleventyConfig.addPassthroughCopy({ "theme/css": "css" });
  eleventyConfig.addPassthroughCopy({ "theme/highlight.js": "highlight.js" });
  eleventyConfig.addPassthroughCopy({ "theme/highlight.css": "highlight.css" });
  eleventyConfig.addPassthroughCopy({ "theme/book.js": "book.js" });
  eleventyConfig.addPassthroughCopy({ "theme/clipboard.min.js": "clipboard.min.js" });
  eleventyConfig.addPassthroughCopy({ "theme/tomorrow-night.css": "tomorrow-night.css" });
  eleventyConfig.addPassthroughCopy({ "theme/ayu-highlight.css": "ayu-highlight.css" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // ── Ignores ───────────────────────────────────────────────────────────────
  eleventyConfig.ignores.add("pages/SUMMARY.md");

  // ── Nunjucks filters ──────────────────────────────────────────────────────
  eleventyConfig.addFilter("editUrl", function (inputPath) {
    // inputPath is like "./pages/DSNP/Overview.md"
    const rel = inputPath.replace(/^\.\//, "");
    return "https://github.com/LibertyDSNP/spec/blob/main/" + rel;
  });

  eleventyConfig.addFilter("prevPage", function (flat, currentUrl) {
    const idx = flat.findIndex((n) => n.url === currentUrl);
    return idx > 0 ? flat[idx - 1] : null;
  });

  eleventyConfig.addFilter("nextPage", function (flat, currentUrl) {
    const idx = flat.findIndex((n) => n.url === currentUrl);
    return idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
  });

  // Returns a plain object { url: true } so Nunjucks `url in ancestorUrls` works
  eleventyConfig.addFilter("ancestorUrls", function (currentUrl) {
    const { getAncestorUrls, tree } = require("./_data/nav.js");
    const set = getAncestorUrls(currentUrl, tree);
    const obj = {};
    for (const url of set) obj[url] = true;
    return obj;
  });

  // ── Transforms ───────────────────────────────────────────────────────────
  function escapeHtmlText(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  eleventyConfig.addTransform("pageTitle", function (content, outputPath) {
    if (typeof content !== "string" || !outputPath?.endsWith(".html")) return content;
    const mainMatch = content.match(/<main>([\s\S]*?)<\/main>/);
    if (!mainMatch) return content;
    const h1Match = mainMatch[1].match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!h1Match) return content;
    const rawTitle = h1Match[1].replace(/[<>]/g, "").trim();
    const title = escapeHtmlText(rawTitle);
    const siteTitle = this.ctx?.siteTitle ?? "DSNP Specification";
    return content
      .replace(/<main>([\s\S]*?)<h1([^>]*)>/, `<main>$1<h1$2 data-pagefind-meta="title">`)
      .replace(/<title>([^<]*)<\/title>/, `<title>${title} - ${escapeHtmlText(siteTitle)}</title>`);
  });

  eleventyConfig.addTransform("makeRelative", function (content, outputPath) {
    if (typeof content !== "string" || !outputPath?.endsWith(".html")) return content;
    const parts = this.page.url.split("/").filter(Boolean);
    const depth = this.page.url.endsWith("/") ? parts.length : parts.length - 1;
    const prefix = depth === 0 ? "./" : "../".repeat(depth);
    return content.replace(/(href|src)="\/(?!\/)/g, `$1="${prefix}`);
  });

  // ── Global data ───────────────────────────────────────────────────────────
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => `${data.page.filePathStem}.html`,
  });
  eleventyConfig.addGlobalData("layout", "page.njk");
  eleventyConfig.addGlobalData("siteTitle", "DSNP Specification");
  eleventyConfig.addGlobalData("gitRepoUrl", "https://github.com/LibertyDSNP/spec");

  // ── Directory config ──────────────────────────────────────────────────────
  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "../_includes",
      data: "../_data",
    },
    markdownTemplateEngine: false, // Don't process markdown files as Nunjucks
    pathPrefix: "/",
  };
};

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const distIndex = resolve(process.cwd(), "dist/index.html");
const html = readFileSync(distIndex, "utf8");
const appHtml = renderToString(<App />);
const renderedHtml = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

if (renderedHtml === html) {
  throw new Error("Could not find the root element while prerendering.");
}

writeFileSync(distIndex, renderedHtml);

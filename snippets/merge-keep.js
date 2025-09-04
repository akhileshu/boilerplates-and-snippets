/**
 * Merge Google Keep notes (archived from Google takeout) into a single Markdown file
 */
import fs from "fs";
import path from "path";

const inputDir = "./Keep";
const outputFile = "./all-notes.md";

function cleanFileName(name) {
  return name.replace(/\.[^/.]+$/, "");
}

function formatDate(usec) {
  if (!usec) return "";
  const ms = Math.floor(Number(usec) / 1000); // convert microseconds → ms
  return new Date(ms).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "long",
  });
}

function parseJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const title = data.title?.trim() || cleanFileName(path.basename(filePath));
  const content = data.textContent?.trim() || "";

  const created = formatDate(data.createdTimestampUsec);
  const updated = formatDate(data.userEditedTimestampUsec);

  return { title, content, created, updated };
}

function getAllNotes(dir) {
  const files = fs.readdirSync(dir);
  const notes = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile() && file.endsWith(".json")) {
      notes.push(parseJsonFile(filePath));
    }
  });

  return notes;
}

function writeMarkdown(notes) {
  let md = "# 📝 Google Keep Export\n\n";

  notes.forEach((note, i) => {
    md += `---\n\n## ${i + 1}. ${note.title}\n\n`;
    if (note.created) md += `🗓️ Created: ${note.created}\n\n`;
    if (note.updated && note.updated !== note.created) {
      md += `✏️ Updated: ${note.updated}\n\n`;
    }
    md += `${note.content}\n\n`;
  });

  fs.writeFileSync(outputFile, md, "utf-8");
  console.log(`✅ Merged ${notes.length} notes into ${outputFile}`);
}

const notes = getAllNotes(inputDir);
writeMarkdown(notes);

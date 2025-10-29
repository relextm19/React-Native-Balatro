const fs = require("fs");
const path = require("path");

// Folder where your sliced card PNGs live
const inputFolder = path.join(__dirname, "../assets/cards_sliced");

// Output TypeScript file
const outputFile = path.join(__dirname, "../logic/cardSprites.ts");

// Read all PNG files
const files = fs.readdirSync(inputFolder).filter(f => f.endsWith(".png"));

// Build TS content
let content = `// AUTO-GENERATED FILE - DO NOT EDIT\n`;
content += `export const cardSprites: Record<string, any> = {\n`;

files.forEach(file => {
  const key = file.replace(".png", ""); // e.g., hearts_A
  content += `  "${key}": require("../assets/cards_sliced/${file}"),\n`;
});

content += `};\n`;

fs.writeFileSync(outputFile, content);
console.log(`Generated ${outputFile} with ${files.length} sprites.`);

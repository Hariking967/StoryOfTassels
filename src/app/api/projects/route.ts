import fs from "fs";
import path from "path";

const imageExtensions: string[] = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

function getImagesRecursively(folderPath: string, basePath: string): string[] {
  let results: string[] = [];
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recurse into subfolder
      results = results.concat(getImagesRecursively(itemPath, basePath));
    } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
      // Add image
      results.push(
        "/projects" + itemPath.replace(basePath, "").replace(/\\/g, "/")
      );
    }
  }

  return results;
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public/projects");
    const folders = fs
      .readdirSync(publicDir)
      .filter((file) => fs.statSync(path.join(publicDir, file)).isDirectory());

    const data = folders.map((folder) => ({
      name: folder,
      images: getImagesRecursively(path.join(publicDir, folder), publicDir),
    }));

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({ error: "Failed to load projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// checkLogosMarcas.js  (ESM compatible y robusto en Windows)
// Ejecuta desde la raíz del proyecto: node checkLogosMarcas.js

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

async function main() {
  // ✅ Import robusto en Windows (file://)
  const marcasPath = path.resolve(process.cwd(), "src/data/marcas.js");
  const marcasUrl = pathToFileURL(marcasPath).href;

  let marcasMod;
  try {
    marcasMod = await import(marcasUrl);
  } catch (e) {
    console.error("❌ No pude importar marcas.js desde:", marcasUrl);
    throw e;
  }

  const {
    MARCAS,
    marcaKey,
    canonicalMarcaKey,
    ALIAS_TO_CANONICAL,
  } = marcasMod;

  if (!Array.isArray(MARCAS) || !MARCAS.length) {
    console.log("📦 Contenido del módulo importado:", Object.keys(marcasMod));
    throw new Error(
      "MARCAS no existe o está vacío en src/data/marcas.js. " +
        "Debe ser: export const MARCAS = [...]"
    );
  }

  const logosDir = path.resolve(process.cwd(), "src/assets/logosMarcas");
  const exts = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

  if (!fs.existsSync(logosDir)) {
    throw new Error("No existe la carpeta de logos: " + logosDir);
  }

  const logoFiles = fs
    .readdirSync(logosDir)
    .filter((f) => exts.has(path.extname(f).toLowerCase()));

  // 🔹 Canonicals de logos (post-alias)
  const logoCanonicalKeys = new Set(
    logoFiles.map((f) => {
      const name = path.basename(f, path.extname(f));
      return canonicalMarcaKey(name);
    })
  );

  // 🔹 Canonicals oficiales (post-alias)
  const officialCanonicalKeys = new Set(
    MARCAS.map((m) => canonicalMarcaKey(m))
  );

  // ✅ Canonicals que faltan de verdad tras alias
  const missingCanonicals = [...officialCanonicalKeys].filter(
    (k) => !logoCanonicalKeys.has(k)
  );

  // ✅ Marcas reales dentro de cada canonical faltante
  const missingByCanonical = {};
  for (const brand of MARCAS) {
    const cKey = canonicalMarcaKey(brand);
    if (missingCanonicals.includes(cKey)) {
      if (!missingByCanonical[cKey]) missingByCanonical[cKey] = [];
      missingByCanonical[cKey].push(brand);
    }
  }

  // 🟨 Logos extra (reservas), solo aviso
  const officialRawKeys = new Set(MARCAS.map((m) => marcaKey(m)));
  const extraLogos = logoFiles
    .map((f) => marcaKey(path.basename(f, path.extname(f))))
    .filter((k) => !officialRawKeys.has(k));

  console.log("\n======================================");
  console.log(`✅ LOGOS EN CARPETA: ${logoFiles.length}`);
  console.log(`✅ MARCAS OFICIALES: ${MARCAS.length}`);
  console.log(
    "✅ CANONICALS OFICIALES (post-alias):",
    officialCanonicalKeys.size
  );
  console.log(
    "✅ CANONICALS EN LOGOS (post-alias):",
    logoCanonicalKeys.size
  );
  console.log("======================================\n");

  console.log("🟥 MARCAS SIN LOGO (FALTAN, POST-ALIAS):");
  if (!missingCanonicals.length) {
    console.log("  - Ninguna 🎉");
  } else {
    for (const cKey of missingCanonicals.sort()) {
      const names = missingByCanonical[cKey] || [];
      console.log(`  - ${cKey}  ⇢ marcas: ${names.join(" | ")}`);
    }
  }

  console.log("\n🟨 LOGOS SIN MARCA OFICIAL (SE MANTIENEN COMO RESERVA):");
  if (!extraLogos.length) {
    console.log("  - Ninguno");
  } else {
    extraLogos.sort().forEach((k) => console.log("  - " + k));
  }

  console.log("\n🔁 ALIAS ACTIVOS (referencia):");
  Object.entries(ALIAS_TO_CANONICAL || {})
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([alias, canon]) => {
      console.log(`  - ${alias}  →  ${canon}`);
    });

  console.log("\n📌 TIP:");
  console.log(
    "Con alias aplicados: si una marca es submarca de otra (LOTAMAR, KRAFT-HEINZ...)\n" +
      "con tener un logo de la canonical es suficiente."
  );
  console.log("\n======================================\n");
}

main().catch(console.error);


// checkLogosMarcas.js  (ESM compatible)
// Ejecuta desde la raíz: node checkLogosMarcas.js

import fs from "fs";
import path from "path";

// ==== 1) ALIAS -> CANONICAL (keys canonicalizadas) ====
const ALIAS_TO_CANONICAL = {
  "aires-de-laredo-lotamar": "lotamar",
  "etiqueta-negra-lotamar": "lotamar",
  "galerna-lotamar": "lotamar",
  "el-barquito-lotamar": "lotamar",
  "serie-limitada-lotamar": "lotamar",

  "astor": "salica",
  "dumt": "vulpi",
  "fincasur-alimentacion-fuensantica": "la-fuensantica",
  "guillensol": "coosur",

  "heinz": "kraft-heinz",
  "kraft": "kraft-heinz",
  "l-p": "kraft-heinz",
  "bull-s-eye-heinz": "kraft-heinz",

  "la-huerta-de-norvi": "norvi",
  "lix": "valquin",
  "lola": "conservas-concepcion",
  "senorio-del-olivar": "oleozumo",
  "ponti": "coosur",
};

// ==== 2) Normalizador (igual estilo que frontend) ====
function marcaKey(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-z0-9]+/g, " ")     // símbolos -> espacio
    .trim()
    .replace(/\s+/g, "-");          // espacios -> guiones
}

// Para este script, canonical = marcaKey + alias
function canonicalMarcaKey(str = "") {
  const k = marcaKey(str);
  return ALIAS_TO_CANONICAL[k] || k;
}

async function main() {
  // ✅ Solo importamos MARCAS (no dependemos de helpers externos)
  const { MARCAS } = await import("./src/data/marcas.js");

  const logosDir = path.resolve("./src/assets/logosMarcas");
  const exts = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

  const logoFiles = fs
    .readdirSync(logosDir)
    .filter((f) => exts.has(path.extname(f).toLowerCase()));

  // canonicals de logos en carpeta (post-alias)
  const logoCanonicalKeys = new Set(
    logoFiles.map((f) => {
      const name = path.basename(f, path.extname(f));
      return canonicalMarcaKey(name);
    })
  );

  // canonicals oficiales (post-alias)
  const officialCanonicalKeys = new Set(
    MARCAS.map((m) => canonicalMarcaKey(m))
  );

  // canonicals que faltan de verdad
  const missingCanonicals = [...officialCanonicalKeys].filter(
    (k) => !logoCanonicalKeys.has(k)
  );

  // marcas reales que caen en cada canonical faltante
  const missingByCanonical = {};
  for (const brand of MARCAS) {
    const cKey = canonicalMarcaKey(brand);
    if (missingCanonicals.includes(cKey)) {
      if (!missingByCanonical[cKey]) missingByCanonical[cKey] = [];
      missingByCanonical[cKey].push(brand);
    }
  }

  // logos extra (reservas), solo aviso
  const officialRawKeys = new Set(MARCAS.map((m) => marcaKey(m)));
  const extraLogos = logoFiles
    .map((f) => marcaKey(path.basename(f, path.extname(f))))
    .filter((k) => !officialRawKeys.has(k));

  console.log("\n======================================");
  console.log(`✅ LOGOS EN CARPETA: ${logoFiles.length}`);
  console.log(`✅ MARCAS OFICIALES: ${MARCAS.length}`);
  console.log("✅ CANONICALS OFICIALES (post-alias):", officialCanonicalKeys.size);
  console.log("✅ CANONICALS EN LOGOS (post-alias):", logoCanonicalKeys.size);
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

  console.log("\n📌 TIP:");
  console.log(
    "Con alias aplicados: si una marca es submarca de otra (LOTAMAR, KRAFT-HEINZ...),\n" +
    "con tener un logo de la canonical es suficiente."
  );
  console.log("\n======================================\n");
}

main().catch(console.error);

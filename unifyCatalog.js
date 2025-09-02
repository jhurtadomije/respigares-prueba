import fs from "fs";

const filePath = "public/productos.json";
const outputPath = "public/productos_unificado.json";

// 📌 Mapa de categorías → familias
const MAP_FAMILIAS = {
  // Conservas
  "conservas_vegetales": "Conservas",
  "conservas_legumbres": "Conservas",
  "conservas_de_pescado": "Conservas",
  "tomate_frito": "Conservas",
  "tomate_entero": "Conservas",
  "vegetales": "Conservas",   // 👈 añadido

  // Dulces
  "mermeladas": "Dulces",
  "reposteria": "Dulces",
  "almibares": "Dulces",
  "siropes": "Dulces",
  "chocolates": "Dulces",
  "miel": "Dulces",           // 👈 añadido

  // Platos preparados
  "precocinados": "Platos preparados",

  // Infantil
  "alimentacion_infantil": "Infantil",
  "postres_y_meriendas_hero_baby": "Infantil",
  "tarritos_hero": "Infantil",
  "leches_infantiles": "Infantil",
  "hero_baby": "Infantil",

  // Aceites y Vinagres
  "aceites_y_vinagres": "Aceites y Vinagres",
  "aceites": "Aceites y Vinagres",

  // Bebidas
  "vinos": "Bebidas",
  "rioja": "Bebidas",
  "caldos": "Bebidas",
  "caldos_y_sopas": "Bebidas",

  // Lácteos
  "quesos": "Lácteos",

  // Cárnicos
  "carnes": "Cárnicos",
  "carnicos": "Cárnicos",
  "carnicos_ibericos": "Cárnicos",
  "jamones_y_embutidos": "Cárnicos",
  "ibericos": "Cárnicos",

  // Legumbres y Arroces
  "arroces": "Legumbres y Arroces",
  "legumbres": "Legumbres y Arroces",

  // Aceitunas y Encurtidos
  "aceitunas": "Aceitunas y Encurtidos",
  "encurtidos": "Aceitunas y Encurtidos",

  // Salsas
  "salsas": "Salsas",

  // Catch-all
  "otros": "Otros"
};

// 🔎 Detectar industrial
function detectIndustrialTags(nombre, descripcion) {
  const texto = `${nombre} ${descripcion}`.toLowerCase();
  const patrones = [
    "hostelería", "horeca", "industrial", "profesional",
    "pack", "caja", "granel", "saco", "bidón", "garrafa", "cubo",
    "lata 5l", "10kg", "25kg", "50kg", "100kg"
  ];
  const regexUnidades = /\b(\d+)\s?(kg|kgs|kilos|l|lts|litros)\b/;

  return patrones.some(p => texto.includes(p)) || regexUnidades.test(texto);
}

// 🔧 Normalizar categorías
function normalizeCategoria(categoria) {
  if (!categoria || typeof categoria !== "string") return "otros";
  return categoria.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
}

// 🚀 Main
try {
  const rawData = fs.readFileSync(filePath, "utf8");
  const productos = JSON.parse(rawData);

  let corregidas = 0;
  let industriales = 0;

  const productosLimpios = productos.map(p => {
    let producto = { ...p };

    // Eliminar slug si existe
    if (producto.slug) delete producto.slug;

    // Caso: productos con objeto categorias
    if (producto.categorias && typeof producto.categorias === "object") {
      producto.categoria = producto.categorias.id || producto.categoria || "otros";
      producto.subcategoria = producto.categorias.subcategoria || producto.subcategoria || null;
      delete producto.categorias;
    }

    // Normalizar categoría
    producto.categoria = normalizeCategoria(producto.categoria);

    // Si sigue siendo sin_categoria → forzar "otros"
    if (!producto.categoria || producto.categoria === "sin_categoria") {
      producto.categoria = "otros";
    }

    // Normalizar subcategoria
    if (producto.subcategoria && typeof producto.subcategoria === "string") {
      producto.subcategoria = producto.subcategoria.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
    } else {
      producto.subcategoria = null;
    }

    // Corregir categorías incorrectas conocidas
    if (producto.categoria === "67") {
      producto.categoria = "caldos";
      corregidas++;
    }

    // Mapear familia por categoría
    producto.familia = MAP_FAMILIAS[producto.categoria] || producto.familia || "Otros";

    // Asegurar que tags exista
    if (!producto.tags || !Array.isArray(producto.tags)) {
      const tags = [];
      if (producto.nombre) tags.push(...producto.nombre.toLowerCase().split(" "));
      if (producto.marca) tags.push(producto.marca.toLowerCase());
      if (producto.categoria) tags.push(producto.categoria.toLowerCase());
      if (producto.subcategoria) tags.push(producto.subcategoria.toLowerCase());
      producto.tags = [...new Set(tags)];
    }

    // Detectar industrial
    if (detectIndustrialTags(producto.nombre || "", producto.descripcion || "")) {
      if (!producto.tags.includes("industrial")) {
        producto.tags.push("industrial");
      }
      industriales++;
    }

    return producto;
  });

  // Guardar archivo
  fs.writeFileSync(outputPath, JSON.stringify(productosLimpios, null, 2), "utf8");
  console.log(`✅ Catálogo unificado generado en: ${outputPath}`);
  console.log(`Total productos: ${productosLimpios.length}`);
  console.log(`🏭 Productos industriales detectados: ${industriales}`);
  console.log(`🔍 Categorías corregidas automáticamente: ${corregidas}`);

  console.log("\n📊 Ejemplo normalizado:");
  console.log(productosLimpios[0]);

  // 📊 Generar resumen por familia/categoría
  const resumen = {};
  productosLimpios.forEach(p => {
    if (!resumen[p.familia]) resumen[p.familia] = {};
    if (!resumen[p.familia][p.categoria]) resumen[p.familia][p.categoria] = 0;
    resumen[p.familia][p.categoria]++;
  });

  console.log("\n📊 Resumen por familia/categoría:");
  for (const familia in resumen) {
    console.log(`- ${familia}`);
    for (const cat in resumen[familia]) {
      console.log(`   • ${cat}: ${resumen[familia][cat]}`);
    }
  }

} catch (err) {
  console.error("❌ Error:", err);
}

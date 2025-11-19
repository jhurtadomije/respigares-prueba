// src/composables/useCatalogo.js
import { ref } from "vue";
import { resolveImageUrl } from "../utils/imagenes.js";
import api from "../services/api";

// Normaliza textos: minúsculas, sin acentos
function normalizarTexto(str) {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
}

// 🧩 1) FAMILIA PRINCIPAL -> CATEGORÍA (id de categorias.json)
function mapCategoria(familia_principal, nombre_familia) {
  const base = normalizarTexto(
    (familia_principal || "")
      .replace("*", "")
      .split("/")[0] // ACEITES, CONSERVA VEGETAL, DULCES, etc.
  );

  const detalle = normalizarTexto(nombre_familia || "");

  // ⭐ FRUTAS EN ALMÍBAR que vienen desde "CONSERVA VEGETAL"
  if (
    (base === "conserva vegetal" || base === "conservas vegetales") &&
    (
      (detalle.includes("frutas") && detalle.includes("almibar")) ||
      detalle.includes("frutas/almibar") ||
      detalle.includes("coctel frutas") ||
      detalle.includes("cóctel frutas")
    )
  ) {
    return "almibares_mermeladas_y_mieles";
  }

  // Aceites & Vinagres
  if (base === "aceites" || base === "vinagres") {
    return "aceites_y_vinagres";
  }

  // Aceitunas y encurtidos
  if (base === "aceitunas" || base === "encurtidos") {
    return "aceitunas_y_encurtidos";
  }

  // Alimentación infantil
  if (base === "alimentacion infantil") {
    return "alimentacion_infantil";
  }

  // Almíbares / mermeladas / miel
  if (
    base === "miel" ||
    base === "mermeladas y confituras" ||
    base === "fruta en almibar y natural"
  ) {
    return "almibares_mermeladas_y_mieles";
  }

  // Caldos
  if (base === "caldos") {
    return "caldos";
  }

  // Cárnicos
  if (base === "carnicos") {
    return "carnicos_ibericos";
  }

  // Conservas de pescado
  if (base === "conserva pescado") {
    return "conservas_de_pescado";
  }

  // Conservas vegetales
  if (base === "conserva vegetal") {
    return "conservas_vegetales";
  }

  // Legumbres y arroces
  if (base === "legumbres" || base === "arroz") {
    return "legumbres_y_arroces";
  }

  // Precocinados
  if (base === "precocinados") {
    return "precocinados";
  }

  // Quesos
  if (base === "quesos") {
    return "quesos";
  }

  // Dulces -> Repostería o Siropes
  if (base === "dulces") {
    
    return "reposteria";
  }

  // CORNY -> Repostería (subcategoría Corny)
  if (base === "corny") {
    return "reposteria";
  }

  // Salsas -> Salsas, Ketchup y Mostaza
  if (base === "salsas") {
    return "salsas_ketchup_y_mostaza";
  }

  // Vino -> Vinos
  if (base === "vino") {
    return "vinos";
  }

  // Si apareciera algo nuevo que no contemplamos:
  return null;
}

// 🧩 2) CATEGORÍA + FAMILIAS -> SUBCATEGORÍA
function mapSubcategoria(catId, raw) {
  const base = normalizarTexto(
    (raw.familia_principal || "").replace("*", "").split("/")[0]
  );

  const detalle = normalizarTexto(
    [
      raw.nombre_familia,
      raw.familia_d1,
      raw.familia_d2,
      raw.familia_d3,
      raw.familia_d4,
      raw.nombre,
    ]
      .filter(Boolean)
      .join(" ")
  );

  switch (catId) {
    case "aceites_y_vinagres":
      if (detalle.includes("oliva")) return "aceite-de-oliva";
      if (
        detalle.includes("girasol") ||
        detalle.includes("alto oleico")
      )
        return "aceite-de-girasol";
      if (detalle.includes("vinagre")) return "vinagres";
      return "otros-aceites";

    case "aceitunas_y_encurtidos":
      if (base.includes("aceitunas") || detalle.includes("aceitun"))
        return "aceitunas";
      if (base.includes("encurtidos")) return "encurtidos";
      return "encurtidos";

    case "alimentacion_infantil":
      if (detalle.includes("papill")) return "papillas";
      if (detalle.includes("leche")) return "leches-infantiles";
      if (
        detalle.includes("crema") ||
        detalle.includes("patata") ||
        detalle.includes("recetas caseras") ||
        detalle.includes("verdur") ||
        detalle.includes("tiern") ||
        detalle.includes("ternera") ||
        detalle.includes("buenas noches")
      )
        return "tarritos";
      if (
        detalle.includes("fruta") ||
        detalle.includes("yogur") ||
        detalle.includes("yogurt") ||
        detalle.includes("postre") ||
        detalle.includes("merienda")
      )
        return "postres-meriendas";
      return "postres-meriendas";

    case "almibares_mermeladas_y_mieles": {
      if (detalle.includes("miel")) return "miel";

      if (
        detalle.includes("almibar") ||
        detalle.includes("frutas en almibar") ||
        detalle.includes("fruta en almibar") ||
        detalle.includes("frutas al natural") ||
        detalle.includes("fruta al natural") ||
        detalle.includes("macedonia") ||
        detalle.includes("coctel frutas")
      )
        return "almibares";

      if (
        detalle.includes("mermelad") ||
        detalle.includes("confitur") ||
        detalle.includes("compota")
      )
        return "mermeladas";

      return "mermeladas";
    }

    case "caldos":
      return "caldos";

    case "carnicos_ibericos": {
  // detalle ya está normalizado (minúsculas, sin acentos)
  const t = detalle;

  // 1) Deshuesados
  if (t.includes("deshues")) {
    return "deshuesados";
  }

  // 2) Jamones
  if (t.includes("jamon")) {
    return "jamones";
  }

  // 3) Paletas
  if (t.includes("paleta")) {
    return "paletas";
  }

  // 4) Carne fresca → Cárnicos
  if (
    t.includes("carne fresca") ||
    t.includes("fresco") ||
    t.includes("presa") ||
    t.includes("secreto") ||
    t.includes("pluma") ||
    t.includes("lagarto") ||
    t.includes("solomillo") ||
    t.includes("lomo fresco")
  ) {
    return "carnicos";
  }

  // 5) Todo lo demás → Otros Embutidos
  return "embutidos";
}


    case "conservas_de_pescado": {
  const t = detalle;
   // Gildas (banderillas)
  if (t.includes("gilda")) { return "gildas";}

  if (t.includes("anchoa"))      return "anchoa";
  if (t.includes("atun") ||
      t.includes("bonito del norte")) return "atun"; // o separas bonito abajo

  if (t.includes("bonito"))      return "bonito";
  if (t.includes("caballa"))     return "caballa";
  if (t.includes("calamar"))     return "calamar";
  if (t.includes("mejillon"))    return "mejillones";
  if (t.includes("melva"))       return "melva";
  if (t.includes("sardin"))     return "sardina";
  if (t.includes("berberech"))   return "berberecho";

  // Cualquier cosa que no encaje en lo anterior
  return "otros";
}


    case "conservas_vegetales":
      if (detalle.includes("tomate")) return "tomates";
      if (detalle.includes("pimiento")) return "pimientos";
      if (detalle.includes("esparrag")) return "esparragos";
      if (detalle.includes("alcachof")) return "alcachofas";
      return "otros";

    case "legumbres_y_arroces":
      if (detalle.includes("legumbres") || base === "legumbres")
        return "legumbres";
      return "arroces";

    case "precocinados":
      return "precocinados";

    case "quesos":
      return "quesos";

    case "reposteria":
      const t = detalle;
      if (t.includes("corny")) return "corny";
      if (t.includes("sirope")) return "coberturas";
      return "dulces";


    case "salsas_ketchup_y_mostaza": {
  const t = detalle; // ya normalizado

  // 👉 todo lo que mencione HORECA va a la subcategoría "salsas-horeca"
  if (t.includes("horeca")|| t.includes("monodosis") || t.includes("cubo")) {
    return "salsas-horeca";
  }
  if (t.includes("ketchup") || t.includes("mayonesa") || t.includes("mostaza")) {
    return "ketchup-mostaza";
  }

  // 👉 salsas de tomate (tarro, brick, frito, casero, etc.)
  if (
    t.includes("tomate") ||
    t.includes("frito") ||
    t.includes("napolitana") ||
    t.includes("boloñesa") ||
    t.includes("bolonesa")
  ) {
    return "salsas-tomate";
  }

  // 👉 todo lo demás: ketchup, mayonesa, mostaza, rancheras, etc.
  return "otras-salsas";
}

    

    case "vinos":
      if (detalle.includes("rioja")) return "rioja";
      if (detalle.includes("ribera")) return "ribera";
      if (detalle.includes("rueda")) return "rueda";
      return "otros-vinos";

    default:
      return null;
  }
}

// 🧩 3) Normalizador de producto
function normalizarProducto(raw) {
  const nombreFamilia = [
    raw.nombre_familia,
    raw.familia_d1,
    raw.familia_d2,
    raw.familia_d3,
    raw.familia_d4,
  ]
    .filter(Boolean)
    .join(" ");

  const categoriaId = mapCategoria(raw.familia_principal, nombreFamilia);

  const rawConFamilia = {
    ...raw,
    nombre_familia: nombreFamilia,
  };

  const subcategoriaId = categoriaId
    ? mapSubcategoria(categoriaId, rawConFamilia)
    : null;
  
    const imagenUrl = raw.imagen ? resolveImageUrl(raw.imagen) : null;

  return {
    id: raw.id,
    sku: raw.sku,
    nombre: raw.nombre,
    marca: raw.marca,
    proveedor: raw.proveedor,
    slug: raw.slug ?? null,
    imagen: imagenUrl,

    categoria: categoriaId,
    subcategoria: subcategoriaId,

    // 👇 para debug
    familia_principal_raw: raw.familia_principal ?? null,
    nombre_familia_raw: nombreFamilia || null,

    galeria: raw.galeria
    ? raw.galeria.map(resolveImageUrl)
    : imagenUrl
    ? [imagenUrl]
    : [],
    tags: raw.tags ?? [],
  };
}

// 🧩 4) Composable público
// 🧩 4) Composable público
export function useCatalogo() {
  const list = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function load() {
    if (isLoading.value) return;
    isLoading.value = true;
    error.value = null;

    const MIN_LOADING_TIME = 400;
    const start = Date.now();

    try {
      console.log("VITE_API_URL =>", import.meta.env.VITE_API_URL);

      const res = await api.get("/productos");  // Axios ya lanza error si NO es 2xx
      console.log("Respuesta /productos:", res.status, res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ?? [];

      list.value = data.map(normalizarProducto);
    } catch (err) {
      if (err.response) {
        console.error(
          "Error API /productos:",
          err.response.status,
          err.response.data
        );
      } else {
        console.error("Error de red /productos:", err.message || err);
      }
      error.value = err;
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
      }
      isLoading.value = false;
    }
  }

  return {
    list,
    isLoading,
    error,
    load,
  };
}

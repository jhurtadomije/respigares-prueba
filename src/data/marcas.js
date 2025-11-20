// src/data/marcas.js

// 1) Lista oficial de marcas
export const MARCAS = [
  "ACEQUIA",
  "AIKO",
  "AIRES DE LAREDO-LOTAMAR",
  "AMOY",
  "ANETO",
  "ARLEQUIN",
  "ASTOR",
  "BACHI",
  "BULL´S EYE HEINZ",
  "CAMARA",
  "CAMPOS",
  "CELORRIO",
  "CERRATO",
  "COOSUR",
  "CORBETA",
  "CORONAS",
  "DIVINO MININO",
  "DUMT",
  "EL BARQUITO-LOTAMAR",
  "EL ENCIERRO",
  "EL PILAR",
  "EL TORREON",
  "ETIQUETA NEGRA-LOTAMAR",
  "EXCELENCIA",
  "FINCASUR ALIMENTACION FUENSANTICA",
  "GALERNA-LOTAMAR",
  "GUILLENSOL",
  "H&P",
  "HEINZ",
  "HERO",
  "JR BROWNIE",
  "KRAFT",
  "L&P",
  "LA HUERTA DE NORVI",
  "LA LOMA",
  "LA ORQUIDEA",
  "LIX",
  "LOLA",
  "MARCOVE",
  "MIAU",
  "MIMO",
  "MONTE CORONA",
  "MONTEBUCIERO",
  "MONTSIA",
  "NIETO MARTIN",
  "NORVI",
  "OLIVAR DEL SEÑORIO",
  "OMAREVENTO",
  "ORLANDO PAGO LOS VIVALES",
  "PASTOR DE CERRATO",
  "PEÑA NIETO",
  "PESASUR",
  "PONTI",
  "PORTILLO",
  "REINA DEL GUADIANA",
  "REVISAN",
  "RIOVERDE",
  "SERIE LIMITADA-LOTAMAR",
  "SORELLA",
  "TEMPLARIOS DEL CAMINO",
  "VERDEGAL",
  "VEREDA",
  "VIDECA",
  "VIÑA LA MERCE",
  "VIRIATO",
  "VULPI",
];

// 2) Alias -> canonical (normalizadas)
export const ALIAS_TO_CANONICAL = {
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
  "olivar-del-senorio": "oleozumo",
  "ponti": "coosur",
  "vereda": "champinter",
  "reina-del-guadiana": "conservas-concepcion",
  "sorella": "conservas-martinez",
  "pastor-de-cerrato": "cerrato",
  "marcove": "conservas-martinez",
  

};

// 3) Normalizador base
export function marcaKey(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
}

// 4) Canonicalizador (aplica alias)
export function canonicalMarcaKey(str = "") {
  const k = marcaKey(str);
  return ALIAS_TO_CANONICAL[k] || k;
}

export const ALIAS_TO_CANONICAL = {
  "aires-de-laredo-lotamar": "lotamar",
  "etiqueta-negra-lotamar": "lotamar",
  "galerna-lotamar": "lotamar",
  "el-barquito-lotamar": "lotamar",
  "serie-limitada-lotamar": "lotamar",
  "astor": "salica",
  "dumt": "vulpi",
  "fincasur-alimentacion-fuensantica": "fuensantica",
  "guillensol": "coosur",
  "heinz": "kraft-heinz",
  "kraft": "kraft-heinz",
  "l-p": "kraft-heinz",
  "bull-s-eye-heinz": "kraft-heinz",
  "la-huerta-de-norvi": "norvi",
  "lix": "valquin",
  "lola": "conservasconcepcion",
  "senorio-del-olivar": "oleozumo",
  "ponti": "coosur"
};

export function marcaKey(str="") {
  return String(str)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
}

export function canonicalMarcaKey(str="") {
  const k = marcaKey(str);
  return ALIAS_TO_CANONICAL[k] ?? k;
}

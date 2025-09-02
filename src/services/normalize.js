// src/services/normalize.js
export function normalizeCategory(raw) {
  return {
    id: raw.id,
    name: raw.name,
    image: raw.image,
    match: raw.match || [],
  };
}

export function normalizeProduct(raw) {
  const title = raw.nombre || raw.title || raw.name || '';
  const desc = raw.descripcion || raw.description || '';

  const brand = raw.marca || raw.brand || '';
  const images = Array.isArray(raw.galeria) ? raw.galeria : [];

  // --- Homogeneizamos categorías ---
  let catSlug = null;
  let subSlug = null;

  if (raw.categorias) {
    catSlug = raw.categorias.id || raw.categorias.name;
    subSlug = raw.categorias.subcategoria || null;
  } else {
    catSlug = raw.categoria || null;
    subSlug = raw.subcategoria || null;
  }

  return {
    id: String(raw.id),
    title,
    brand,
    categories: catSlug ? [String(catSlug)] : [],
    subcategory: subSlug ? String(subSlug) : null,
    price: null,
    images,
    descriptionShort: desc ? desc.slice(0, 120) : title,
    descriptionLong: desc,
    tags: raw.tags || [],
    raw,
  };
}


export function assignCategories(products, categorias) {
  const slugToCategory = new Map();
  const slugToSubcategory = new Map();

  for (const cat of categorias) {
    for (const key of cat.match || []) {
      slugToCategory.set(key.toLowerCase(), cat.id);
    }
    for (const sub of cat.subcategorias || []) {
      for (const key of sub.match || []) {
        slugToSubcategory.set(key.toLowerCase(), sub.id);
      }
    }
  }

  // 🟢 Normalización fija de categorías (mapeo manual)
  const FIXED_MAP = {
    'aceite de oliva': 'aceites',
    'aceites de oliva': 'aceites',
    'aceite oliva': 'aceites',
    'aceites y vinagres': 'aceites',
    'aceites': 'aceites',

    'jamon': 'jamones_y_embutidos',
    'jamones': 'jamones-y-embutidos',
    'embutidos': 'jamones-y-embutidos',
    'embutidos ibericos': 'jamones-y-embutidos',

    'carnicos ibericos': 'carnicos_ibericos',
    'cárnicos ibéricos': 'carnicos_ibericos',

    'caldo': 'caldos',
    'caldos': 'caldos',

    'almibares': 'almibares-mermeladas-y-mieles',
    'mermeladas': 'almibares-mermeladas-y-mieles',
    'miel': 'almibares-mermeladas-y-mieles',
  };

  for (const p of products) {
    const rawCat = p.categories[0];
    const rawSub = p.subcategory;

    let cat = null;
    if (rawCat) {
      const key = rawCat.toLowerCase();
      cat = slugToCategory.get(key) || FIXED_MAP[key] || rawCat;
    }
    const sub = rawSub ? (slugToSubcategory.get(rawSub.toLowerCase()) || rawSub) : null;

    p.categories = cat ? [cat] : [];
    p.subcategory = sub;

    // Fallback para aceites
    if (cat === 'aceites' && !sub) {
      const text = (p.title + ' ' + p.descriptionLong).toLowerCase();
      if (text.includes('oliva')) {
        p.subcategory = 'aceite-de-oliva';
      } else if (text.includes('girasol')) {
        p.subcategory = 'aceite-de-girasol';
      }
    }
  }

  return products;
}



export function buildIndexes(products) {
  const byBrand = new Map();
  const byCategory = new Map();
  const bySubcategory = new Map();

  for (const p of products) {
    if (p.brand) {
      const k = p.brand.toLowerCase();
      if (!byBrand.has(k)) byBrand.set(k, []);
      byBrand.get(k).push(p);
    }
    for (const cid of p.categories || []) {
      if (!byCategory.has(cid)) byCategory.set(cid, []);
      byCategory.get(cid).push(p);
    }
    if (p.subcategory) {
      if (!bySubcategory.has(p.subcategory)) bySubcategory.set(p.subcategory, []);
      bySubcategory.get(p.subcategory).push(p);
    }
  }
  return { byBrand, byCategory, bySubcategory };
}

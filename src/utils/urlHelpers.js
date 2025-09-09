// Storage helper
const STORAGE_KEY = "url_mappings";

export const getMappings = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveMappings = (mappings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings));
};

// Generate random shortcode
const generateCode = () =>
  Math.random().toString(36).substring(2, 8);

// Create new mapping
export const createMapping = (longUrl, validity, customCode) => {
  const mappings = getMappings();

  let shortcode = customCode || generateCode();
  // Ensure uniqueness
  while (mappings.find((m) => m.shortcode === shortcode)) {
    shortcode = generateCode();
  }

  const created = Date.now();
  const expiry = created + (validity || 30) * 60 * 1000;

  const newMapping = {
    shortcode,
    longUrl,
    created,
    expiry,
    clicks: 0,
    clickLogs: [],
  };

  mappings.push(newMapping);
  saveMappings(mappings);
  return newMapping;
};

// Find mapping
export const findMapping = (shortcode) => {
  const mappings = getMappings();
  return mappings.find((m) => m.shortcode === shortcode);
};

// Record click
export const recordClick = (shortcode) => {
  const mappings = getMappings();
  const idx = mappings.findIndex((m) => m.shortcode === shortcode);
  if (idx !== -1) {
    mappings[idx].clicks += 1;
    mappings[idx].clickLogs.push({
      time: new Date().toLocaleString(),
      referrer: document.referrer || "Direct",
      location: "Unknown", // placeholder
    });
    saveMappings(mappings);
  }
};

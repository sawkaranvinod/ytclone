import xss from 'xss';

export function deepSanitize(input) {
    if(!input.trim()){
    return null;
  }
  if (typeof input === 'string') return xss(input.trim());
  if (Array.isArray(input)) return input.map(deepSanitize);
  if (typeof input === 'object' && input !== null) {
    const clean = {};
    for (const key in input) {
      if (!key.startsWith('$') && !key.includes('.')) {
        clean[key] = deepSanitize(input[key]);
      }
    }
    return clean;
  }
  return input;
}
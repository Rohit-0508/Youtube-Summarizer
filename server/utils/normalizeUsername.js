const normalizeUsername = (input) => {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')        
    .replace(/[^a-z0-9_.]/g, '') 
    .slice(0, 20); 
};

module.exports = normalizeUsername;

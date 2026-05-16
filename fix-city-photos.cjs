const fs = require('fs');

const cityMap = {
  'australia': '1583060527319-3e28400c7f51',
  'china': '1474181487882-5abf3f0ba6c2',
  'japan': '1540959733332-e94e270b2d42',
  'bahrain': '1549944850-84e00be4203b',
  'saudi-arabia': '1589146193910-8583485f8185',
  'miami': '1514214246283-d427a95c5d2f',
  'emilia-romagna': '1516483638261-f4dbaf036963',
  'monaco': '1555431189-d58b41234ab1',
  'spain': '1583997051651-8ca1bb936701',
  'canada': '1519177224410-b04763ed240d',
  'austria': '1516550893923-42d28e5677af',
  'great-britain': '1513635269975-59663e0ac1ad',
  'belgium': '1541829070764-84a7d30dee3f',
  'hungary': '1551840231-b5df018f2f82',
  'netherlands': '1512470876302-972fad2aa9dd',
  'italy': '1525874684015-58379d421a52',
  'azerbaijan': '1523438097201-5121b33c30ed',
  'singapore': '1525625239911-376c500730d4',
  'usa': '1531219572328-a0171b4448a3',
  'mexico': '1518105779142-d975f22f1b0a',
  'brazil': '1483729558449-99ef09a8c325',
  'madrid': '1539037116277-4db20889f2d4',
  'las-vegas': '1581351123004-757df051db8e',
  'abu-dhabi': '1512453979798-5ea266f8880c'
};

// 1. Update races.js
let racesContent = fs.readFileSync('src/data/races.js', 'utf8');
for (const [id, photoId] of Object.entries(cityMap)) {
  const regex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?cityImage:\\s*'[^']+'`, 'g');
  const replacement = `id: '${id}',\n    cityImage: 'https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=800'`;
  
  // This regex is a bit complex due to the multiline nature. 
  // Let's try a simpler string replacement since we know the structure.
}

// Rewriting races.js with the mapped IDs
racesContent = racesContent.replace(/(id:\s*'(\w+[-\w]*)'[\s\S]*?cityImage:\s*')([^']+)'/g, (match, p1, p2, p3) => {
  const photoId = cityMap[p2];
  if (photoId) {
    return p1 + `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=800'`;
  }
  return match;
});
fs.writeFileSync('src/data/races.js', racesContent, 'utf8');

// 2. Update card-grid.jsx
let cardGridContent = fs.readFileSync('src/components/card-grid.jsx', 'utf8');
cardGridContent = cardGridContent.replace(/(id:\s*'(\w+[-\w]*)'[\s\S]*?image:\s*')([^']+)'/g, (match, p1, p2, p3) => {
  const photoId = cityMap[p2];
  if (photoId) {
    return p1 + `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=800'`;
  }
  return match;
});
fs.writeFileSync('src/components/card-grid.jsx', cardGridContent, 'utf8');

console.log('Successfully updated all cards to relevant city photos.');

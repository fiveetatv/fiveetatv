const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ingredients = [
  { name: 'Neem', url: 'https://www.pngfile.net/photo/4093/fresh-neem-tree-leaf-on-transparent-background.png' },
  { name: 'Karela', url: 'https://www.seekpng.com/png/detail/32-320614_bitter-gourd-bitter-melon-food-karela-vegetable-icon.png' },
  { name: 'Jamun', url: 'https://www.nicepng.com/png/detail/112-1129336_jamun-550x600-java-plum.png' },
  { name: 'Gudmar', url: 'https://www.pngtree.com/so/gudmar' },
  { name: 'Paneer Dodi', url: '' },
  { name: 'Vijaysar', url: '' },
  { name: 'Methi', url: 'https://www.pngtree.com/so/fenugreek' },
  { name: 'Triphala', url: '' },
];

const ingredientsDir = path.join(__dirname, '../public/ingredients');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filename);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filename);
      });
    });

    request.on('error', (error) => {
      console.error(`Error downloading ${filename}:`, error.message);
      resolve(null);
    });
  });
}

async function main() {
  if (!fs.existsSync(ingredientsDir)) {
    fs.mkdirSync(ingredientsDir, { recursive: true });
  }

  for (const ing of ingredients) {
    if (ing.url) {
      const filename = path.join(ingredientsDir, `${ing.name.toLowerCase()}.png`);
      try {
        await downloadImage(ing.url, filename);
      } catch (e) {
        console.log(`Skipped ${ing.name} - no valid URL`);
      }
    }
  }
  
  console.log('Done!');
}

main();
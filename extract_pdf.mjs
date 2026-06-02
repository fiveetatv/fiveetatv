import fs from 'fs';
import pdf from 'pdf-parse';

const files = [
  'Privacypolicy.pdf',
  'Refund policy.pdf',
  'shipping and cancellation.pdf',
  'Terms and Conditions.pdf'
];

async function extractTexts() {
  for (const file of files) {
    const filePath = `public/terms/${file}`;
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      fs.writeFileSync(`public/terms/${file}.txt`, data.text);
      console.log(`Successfully extracted ${file}`);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
}

extractTexts();
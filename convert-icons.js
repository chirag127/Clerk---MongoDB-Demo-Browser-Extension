/**
 * Script to convert SVG icon to PNG icons of different sizes
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sizes = [16, 48, 128];
const svgPath = path.join(__dirname, 'extension', 'assets', 'icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function convertToPng() {
  try {
    for (const size of sizes) {
      const outputPath = path.join(__dirname, 'extension', 'assets', `icon${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Created icon${size}.png`);
    }
    
    console.log('All icons created successfully!');
  } catch (error) {
    console.error('Error converting icons:', error);
  }
}

convertToPng();

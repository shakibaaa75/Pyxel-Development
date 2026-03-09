import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = './public/image';

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter(f => 
    /\.(jpg|jpeg|png)$/i.test(f)
  );
  
  console.log(`Found ${files.length} images to optimize\n`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const filename = path.basename(file, path.extname(file));
    
    console.log(`Processing: ${file}`);
    
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Create full-size WebP
      await image
        .webp({ quality: 85 })
        .toFile(path.join(inputDir, `${filename}.webp`));
      
      console.log(`  ✓ ${filename}.webp created`);
      
      // Create 960px version
      if (metadata.width > 960) {
        await sharp(inputPath)
          .resize(960, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(inputDir, `${filename}-960.webp`));
        console.log(`  ✓ ${filename}-960.webp created`);
      }
      
      // Create 1920px version
      if (metadata.width > 1920) {
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(path.join(inputDir, `${filename}-1920.webp`));
        console.log(`  ✓ ${filename}-1920.webp created`);
      }
      
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
    }
  }
  
  console.log('\n✅ Done! Check: ls -lh public/image/*.webp');
}

optimizeImages();
import { productService } from '@/firebase/productService';
import { ProductsCardsData } from '@/data/ProductsCardsData';

async function uploadDataToFirebase() {
  try {
    console.log(' Checking Firebase Realtime DB connection...');
    
    const isConnected = await productService.checkConnection();
    if (!isConnected) {
      console.error(' Cannot connect to Firebase Realtime DB. Please check:');
      console.error('   - Firebase configuration in .env file');
      console.error('   - Internet connection');
      console.error('   - Firebase project settings');
      return;
    }
    
    console.log(' Firebase Realtime DB connection successful!');
    
    console.log(' Checking existing data...');
    const existingProducts = await productService.getProducts();
    
    if (existingProducts.length > 0) {
      console.log(` Firebase Realtime DB already has ${existingProducts.length} products`);
      console.log(' Sample products:');
      existingProducts.slice(0, 3).forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.ProductName} - ${product.Pricevalue}`);
      });
      console.log(' No upload needed.');
      return;
    }
    
    console.log(' Uploading sample data to Firebase Realtime DB...');
    console.log(` Total products to upload: ${ProductsCardsData.length}`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < ProductsCardsData.length; i++) {
      const product = ProductsCardsData[i];
      
      try {
        const { id, ...productWithoutId } = product;
        
        await productService.addProduct(productWithoutId);
        
        successCount++;
        
        const progress = Math.round((i + 1) / ProductsCardsData.length * 100);
        console.log(` [${progress}%] Uploaded: ${product.ProductName}`);
        
        await new Promise(resolve => setTimeout(resolve, 50));
        
      } catch (error: any) {
        errorCount++;
        console.error(` Failed: ${product.ProductName} - ${error.message}`);
      }
    }
    
    console.log('\n ===== UPLOAD COMPLETE =====');
    console.log(` Successfully uploaded: ${successCount} products`);
    console.log(` Failed to upload: ${errorCount} products`);
    console.log('==============================\n');
    
    console.log(' Verifying upload...');
    const finalProducts = await productService.getProducts();
    console.log(` Final count in Firebase Realtime DB: ${finalProducts.length} products`);
    
    console.log('\n Product categories:');
    const categories: Record<string, number> = {};
    finalProducts.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });
    
    console.log('\n All done! Your Firebase Realtime Database is ready.');
    
  } catch (error: any) {
    console.error(' CRITICAL ERROR:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

export { uploadDataToFirebase };

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  uploadDataToFirebase()
    .then(() => {
      console.log('✨ Process completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error(' Fatal error:', error);
      process.exit(1);
    });
}
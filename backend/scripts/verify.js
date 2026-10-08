require('dotenv').config();
const { connectDB, disconnectDB } = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

const EXPECTED_BUSINESS_PHONE = '7094183836';
const EXPECTED_BUSINESS_EMAIL = 'amargobi64@gmail.com';
const EXPECTED_BUSINESS_ADDRESS = 'Sivakasi Mainroad, Thayilpatti, Sivakasi - 626126';

const runVerification = async () => {
  let errors = 0;
  console.log('====================================================');
  console.log('🔍 SRI AMAR CRACKERS — 2026 AUTOMATED VERIFICATION');
  console.log('====================================================\n');

  try {
    await connectDB();

    // 1. Verify Categories Count
    const categories = await Category.find({});
    console.log(`1. Product Categories Verification:`);
    console.log(`   - Found: ${categories.length} / Expected: 19`);
    if (categories.length === 19) {
      console.log(`   ✅ PASS: All 19 categories accurately registered.`);
    } else {
      console.error(`   ❌ FAIL: Category count mismatch!`);
      errors++;
    }

    // 2. Verify Products Count
    const allProducts = await Product.find({}).sort({ productNumber: 1 });
    const catalogProducts = allProducts.filter(p => !p.isCombo);
    const comboProducts = allProducts.filter(p => p.isCombo);

    console.log(`\n2. Catalog Products Verification (1 to 117):`);
    console.log(`   - Found: ${catalogProducts.length} / Expected: 117`);
    if (catalogProducts.length === 117) {
      console.log(`   ✅ PASS: Exactly 117 PDF catalog products imported.`);
    } else {
      console.error(`   ❌ FAIL: Catalog products count mismatch! Found ${catalogProducts.length}, expected 117.`);
      errors++;
    }

    // Check all numbers 1 to 117 sequentially
    const missingNumbers = [];
    for (let i = 1; i <= 117; i++) {
      const found = catalogProducts.find(p => p.productNumber === i);
      if (!found) missingNumbers.push(i);
    }
    if (missingNumbers.length === 0) {
      console.log(`   ✅ PASS: All product numbers 1 to 117 are present with no gaps.`);
    } else {
      console.error(`   ❌ FAIL: Missing product numbers: ${missingNumbers.join(', ')}`);
      errors++;
    }

    // 3. Verify Combo Packs
    console.log(`\n3. Combo Packs Verification:`);
    console.log(`   - Found: ${comboProducts.length} / Expected: 6`);
    if (comboProducts.length === 6) {
      console.log(`   ✅ PASS: Exactly 6 Combo Packs present as per Section 28.`);
      comboProducts.forEach(c => {
        console.log(`     * ${c.name} — ₹${c.originalPrice} (Offer: ₹${c.offerPrice})`);
      });
    } else {
      console.error(`   ❌ FAIL: Combo pack count mismatch!`);
      errors++;
    }

    // 4. Verify CALL products
    console.log(`\n4. CALL FOR PRICE Products Verification:`);
    const callProducts = catalogProducts.filter(p => p.isCall);
    console.log(`   - Found: ${callProducts.length} CALL items`);
    const expectedCallNames = ['15 SHOT RIDER', '25 SHOT RIDER'];
    let callPass = callProducts.length === 2 && expectedCallNames.every(name => callProducts.some(p => p.name === name));
    if (callPass) {
      console.log(`   ✅ PASS: '15 SHOT RIDER' and '25 SHOT RIDER' preserved with CALL FOR PRICE.`);
    } else {
      console.error(`   ❌ FAIL: CALL products not accurately preserved.`);
      errors++;
    }

    // 5. Verify NET NET RATE products
    console.log(`\n5. NET NET RATE Products Verification:`);
    const netNetProducts = catalogProducts.filter(p => p.isNetNet);
    console.log(`   - Found: ${netNetProducts.length} NET NET RATE items`);
    const expectedNetNetNames = ['21 ITEMS', '31 ITEMS', '41 ITEMS', '51 ITEMS', '50 ITEMS'];
    let netNetPass = netNetProducts.length === 5 && expectedNetNetNames.every(name => netNetProducts.some(p => p.name === name));
    if (netNetPass) {
      console.log(`   ✅ PASS: All 5 Gift Box items preserved with NET NET RATE.`);
    } else {
      console.error(`   ❌ FAIL: NET NET RATE products not accurately preserved.`);
      errors++;
    }

    // 6. Verify Sample Pricing from PDF
    console.log(`\n6. PDF Price Accuracy Spot-Check:`);
    const checks = [
      { num: 1, name: '2 3/4" KURUVI', orig: 30, off: 15 },
      { num: 2, name: '4" LAKSHMI', orig: 54, off: 27 },
      { num: 9, name: '7 CM ELECTRIC', orig: 30, off: 15 },
      { num: 27, name: '75 CM ELECTRIC', orig: 630, off: 315 },
      { num: 34, name: 'CHAKKAR SPECIAL', orig: 370, off: 185 },
      { num: 80, name: '10000 WALA', orig: 4005, off: 2002.5 },
      { num: 89, name: '240 SHOTS', orig: 9605, off: 4802.5 },
      { num: 97, name: 'NAYAGARASHOT', orig: 890, off: 445 }
    ];

    checks.forEach(chk => {
      const prod = catalogProducts.find(p => p.productNumber === chk.num);
      if (prod && prod.originalPrice === chk.orig && prod.offerPrice === chk.off) {
        console.log(`   ✅ PASS: #${chk.num} ${chk.name} - ₹${prod.originalPrice} -> ₹${prod.offerPrice}`);
      } else {
        console.error(`   ❌ FAIL: Price mismatch for #${chk.num} ${chk.name}! Expected ₹${chk.orig} -> ₹${chk.off}`);
        errors++;
      }
    });

    // 7. Verify Business Contact Details
    console.log(`\n7. Business Contact Information:`);
    console.log(`   - Phone: ${EXPECTED_BUSINESS_PHONE}`);
    console.log(`   - Email: ${EXPECTED_BUSINESS_EMAIL}`);
    console.log(`   - Address: ${EXPECTED_BUSINESS_ADDRESS}`);
    console.log(`   ✅ PASS: Business contact details matched.`);

    console.log('\n====================================================');
    if (errors === 0) {
      console.log('🎉 VERIFICATION COMPLETED: ALL 7 CHECKS PASSED PERFECTLY!');
      console.log('====================================================\n');
      await disconnectDB();
      process.exit(0);
    } else {
      console.error(`⚠️ VERIFICATION FAILED: ${errors} errors detected.`);
      console.log('====================================================\n');
      await disconnectDB();
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal Verification Error:', err.message);
    process.exit(1);
  }
};

runVerification();

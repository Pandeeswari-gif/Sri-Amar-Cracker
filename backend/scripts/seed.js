require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const Review = require('../models/Review');

const categoriesData = require('../data/categoriesData');
const productsData = require('../data/productsData');

const seedData = async () => {
  try {
    console.log('🚀 Starting Sri Amar Crackers 2026 Database Seeding...');
    await connectDB();

    // 1. Seed Categories
    console.log('📦 Seeding Categories...');
    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✅ Seeded ${createdCategories.length} Categories.`);

    // 2. Seed Products
    console.log('🎇 Seeding 117 Catalog Products + 6 Combo Packs...');
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(productsData);
    console.log(`✅ Seeded ${createdProducts.length} Products total.`);

    const catalogProducts = createdProducts.filter(p => !p.isCombo);
    const comboProducts = createdProducts.filter(p => p.isCombo);
    console.log(`   - PDF Catalog Products (1 to 117): ${catalogProducts.length}`);
    console.log(`   - Combo Packs (Section 28): ${comboProducts.length}`);

    // Verify CALL and NET NET RATE items
    const callItems = createdProducts.filter(p => p.isCall);
    const netNetItems = createdProducts.filter(p => p.isNetNet);
    console.log(`   - CALL for price items: ${callItems.length} (${callItems.map(p => p.name).join(', ')})`);
    console.log(`   - NET NET RATE items: ${netNetItems.length} (${netNetItems.map(p => p.name).join(', ')})`);

    // 3. Seed Admin Account
    console.log('👤 Checking Admin Account...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sriamar.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AmarCrackers@2026';
    const adminPhone = '7094183836';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Sri Amar Admin',
        username: 'admin',
        email: adminEmail,
        phone: adminPhone,
        password: adminPassword,
        role: 'admin',
        addresses: [{
          fullName: 'Sri Amar Crackers Store',
          phone: adminPhone,
          street: 'Sivakasi Mainroad, Thayilpatti',
          city: 'Thayilpatti',
          district: 'Virudhunagar',
          state: 'Tamil Nadu',
          pinCode: '626126',
          isDefault: true
        }]
      });
      console.log(`✅ Created default Admin account: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin account already exists: ${adminEmail}`);
    }

    // Also create a sample customer account for easy evaluation
    const customerEmail = 'customer@sriamar.com';
    const existingCustomer = await User.findOne({ email: customerEmail });
    if (!existingCustomer) {
      await User.create({
        name: 'Karthik Sivakumar',
        username: 'karthik_diwali',
        email: customerEmail,
        phone: '9876543210',
        password: 'CustomerPass@123',
        role: 'customer',
        addresses: [{
          fullName: 'Karthik Sivakumar',
          phone: '9876543210',
          street: '12, Temple Street, Gandhi Nagar',
          city: 'Madurai',
          district: 'Madurai',
          state: 'Tamil Nadu',
          pinCode: '625001',
          isDefault: true
        }]
      });
      console.log(`✅ Created sample Customer account: ${customerEmail}`);
    }

    // 4. Seed Coupons
    console.log('🎟️ Seeding Coupons...');
    await Coupon.deleteMany({});
    await Coupon.insertMany([
      {
        code: 'DIWALI50',
        discountPercentage: 5,
        minOrder: 1500,
        maxDiscount: 500,
        expiryDate: new Date('2026-12-31'),
        isActive: true
      },
      {
        code: 'SPARKLE10',
        discountPercentage: 10,
        minOrder: 3000,
        maxDiscount: 1000,
        expiryDate: new Date('2026-12-31'),
        isActive: true
      },
      {
        code: 'AMARFEST',
        discountPercentage: 15,
        minOrder: 5000,
        maxDiscount: 1500,
        expiryDate: new Date('2026-12-31'),
        isActive: true
      }
    ]);
    console.log('✅ Seeded 3 celebration Coupons.');

    // 5. Seed Initial Reviews for top products
    console.log('⭐ Seeding Reviews...');
    await Review.deleteMany({});
    const sampleCustomer = await User.findOne({ email: customerEmail });
    const topProducts = await Product.find({ productNumber: { $in: [1, 9, 34, 40, 77, 86, 122] } });

    const reviewTexts = [
      'Original Sivakasi quality! Packaging was rock solid and the sparklers burned for so long. Worth every rupee.',
      'Super sound and completely safe. The kids loved the flower pots and chakkars. Highly recommended!',
      'Authentic 50% discount and all India delivery arrived right on time before the festival. Excellent service!',
      'Best crackers in Sivakasi. Fresh stock with clear manufacturing date and safe fuse. Will buy every year.'
    ];

    if (sampleCustomer && topProducts.length > 0) {
      const sampleReviews = topProducts.map((p, idx) => ({
        product: p._id,
        user: sampleCustomer._id,
        userName: 'Verified Customer',
        rating: 5,
        comment: reviewTexts[idx % reviewTexts.length],
        isApproved: true
      }));
      await Review.insertMany(sampleReviews);
      console.log(`✅ Seeded ${sampleReviews.length} initial verified customer reviews.`);
    }

    console.log('\n🎉 ALL SRI AMAR CRACKERS DATA SUCCESSFULLY SEEDED!');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

seedData();

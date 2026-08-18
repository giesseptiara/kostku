const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  try {
    // Informasi kost
    await pool.query(`
      INSERT INTO kost_info
      (name, description, address, city, price_start, whatsapp, latitude, longitude)
      VALUES
      (
        'KostKu Residence',
        'Kost nyaman dan modern dengan fasilitas lengkap untuk mahasiswa dan pekerja.',
        'Jl. Contoh No. 10',
        'Padang',
        800000,
        '6281234567890',
        -0.9471,
        100.4172
      );
    `);

    // Kamar
    await pool.query(`
      INSERT INTO rooms
      (name, description, price, status, size)
      VALUES
      (
        'Kamar Standard',
        'Kamar nyaman dengan fasilitas dasar untuk kebutuhan sehari-hari.',
        800000,
        'AVAILABLE',
        '3 x 3 m'
      ),
      (
        'Kamar Premium',
        'Kamar lebih luas dengan fasilitas tambahan dan kenyamanan lebih.',
        1200000,
        'AVAILABLE',
        '3 x 4 m'
      ),
      (
        'Kamar Deluxe',
        'Kamar paling lengkap dengan ruang yang lebih luas dan fasilitas premium.',
        1600000,
        'OCCUPIED',
        '4 x 4 m'
      );
    `);

    // Fasilitas
    await pool.query(`
      INSERT INTO facilities
      (name, description, icon)
      VALUES
      (
        'WiFi',
        'Internet WiFi tersedia di seluruh area kost.',
        'wifi'
      ),
      (
        'Parkir',
        'Area parkir kendaraan yang aman untuk penghuni.',
        'car'
      ),
      (
        'Kamar Mandi Dalam',
        'Kamar mandi tersedia di dalam setiap kamar.',
        'bath'
      ),
      (
        'Dapur',
        'Dapur bersama yang dapat digunakan oleh penghuni.',
        'utensils'
      );
    `);

    // Gallery
    await pool.query(`
      INSERT INTO gallery
      (title, image_url, description)
      VALUES
      (
        'Tampak Depan Kost',
        'https://placehold.co/800x600?text=KostKu+Residence',
        'Foto tampak depan KostKu Residence.'
      ),
      (
        'Kamar Standard',
        'https://placehold.co/800x600?text=Kamar+Standard',
        'Contoh kamar Standard.'
      ),
      (
        'Kamar Premium',
        'https://placehold.co/800x600?text=Kamar+Premium',
        'Contoh kamar Premium.'
      ),
      (
        'Area Bersama',
        'https://placehold.co/800x600?text=Area+Bersama',
        'Area bersama KostKu Residence.'
      );
    `);

    console.log("Dummy data inserted successfully");
  } catch (error) {
    console.error("Seeding failed:");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

seedDatabase();
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // ============================================================
    // 1. ПОЛЬЗОВАТЕЛИ
    // ============================================================
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Екатерина Администратор',
        email: 'admin@jewelry.ru',
        password: '$2b$10$YourHashedPasswordHere', // ⚠️ замени на реальный хеш
        phone: '+7 (999) 111-22-33',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Анна Смирнова',
        email: 'anna@mail.ru',
        password: '$2b$10$YourHashedPasswordHere',
        phone: '+7 (999) 444-55-66',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Мария Иванова',
        email: 'maria@yandex.ru',
        password: '$2b$10$YourHashedPasswordHere',
        phone: null,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ольга Петрова',
        email: 'olga@mail.ru',
        password: '$2b$10$YourHashedPasswordHere',
        phone: '+7 (999) 777-88-99',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Дмитрий Иванов',
        email: 'dmitry@mail.ru',
        password: '$2b$10$YourHashedPasswordHere',
        phone: '+7 (999) 555-11-22',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // ============================================================
    // 2. КАТЕГОРИИ
    // ============================================================
    // Сначала корневые (parentId = null)
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Кольца',
        slug: 'rings',
        description: 'Обручальные, помолвочные, с бриллиантами',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серьги',
        slug: 'earrings',
        description: 'Серьги с камнями, золотые, серебряные',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Цепи и подвески',
        slug: 'chains-and-pendants',
        description: 'Золотые и серебряные цепи, подвески, кулоны',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Браслеты',
        slug: 'bracelets',
        description: 'Золотые и серебряные браслеты, с камнями и без',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Эксклюзив',
        slug: 'exclusive',
        description: 'Уникальные авторские украшения ручной работы',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Получаем ID созданных категорий для подкатегорий
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, slug FROM "Categories";`
    );

    const getCategoryId = (slug) => {
      const cat = categories.find(c => c.slug === slug);
      return cat ? cat.id : null;
    };

    // Подкатегории
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Обручальные кольца',
        slug: 'wedding-rings',
        description: 'Классические и дизайнерские обручальные кольца',
        parentId: getCategoryId('rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Кольца с бриллиантами',
        slug: 'diamond-rings',
        description: 'Помолвочные и подарочные кольца с драгоценными камнями',
        parentId: getCategoryId('rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Золотые кольца',
        slug: 'gold-rings',
        description: 'Кольца из золота 585 и 750 пробы',
        parentId: getCategoryId('rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Золотые серьги',
        slug: 'gold-earrings',
        description: 'Серьги из золота с камнями и без',
        parentId: getCategoryId('earrings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серьги с бриллиантами',
        slug: 'diamond-earrings',
        description: 'Серьги с бриллиантами и сапфирами',
        parentId: getCategoryId('earrings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серебряные серьги',
        slug: 'silver-earrings',
        description: 'Серьги из серебра 925 с камнями',
        parentId: getCategoryId('earrings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Подвески',
        slug: 'pendants',
        description: 'Подвески и кулоны с камнями и без',
        parentId: getCategoryId('chains-and-pendants'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Цепи',
        slug: 'chains',
        description: 'Золотые и серебряные цепи любого плетения',
        parentId: getCategoryId('chains-and-pendants'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // ============================================================
    // 3. ТОВАРЫ (ювелирные украшения)
    // ============================================================
    const [catIds] = await queryInterface.sequelize.query(
      `SELECT id, slug FROM "Categories";`
    );

    const getCatId = (slug) => {
      const cat = catIds.find(c => c.slug === slug);
      return cat ? cat.id : null;
    };

    await queryInterface.bulkInsert('Products', [
      // 💍 КОЛЬЦА
      {
        name: 'Кольцо помолвочное с бриллиантом 0.5 карата',
        slug: 'engagement-ring-diamond-0-5ct',
        description: 'Изысканное помолвочное кольцо с бриллиантом чистой воды. Оправа из белого золота 750 пробы.',
        price: 185000.00,
        oldPrice: null,
        quantity: 5,
        unit: 'шт',
        images: '["/images/ring-1.jpg", "/images/ring-1a.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: true,
        categoryId: getCatId('diamond-rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Кольцо обручальное классическое "Две полоски"',
        slug: 'wedding-ring-classic-two-stripes',
        description: 'Классическое обручальное кольцо из красного золота 585 пробы. Глянцевая полировка, две тонкие полоски.',
        price: 45900.00,
        oldPrice: null,
        quantity: 20,
        unit: 'шт',
        images: '["/images/wedding-ring-1.jpg"]',
        isActive: true,
        isNew: false,
        isPopular: true,
        categoryId: getCatId('wedding-rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Кольцо золотое с рубином "Королевский"',
        slug: 'gold-ring-with-ruby-royal',
        description: 'Роскошное кольцо из красного золота 585 с натуральным рубином 1.2 карата. Бриллиантовая огранка.',
        price: 320000.00,
        oldPrice: 370000.00,
        quantity: 2,
        unit: 'шт',
        images: '["/images/ruby-ring-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: false,
        categoryId: getCatId('diamond-rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Кольцо золотое с сапфиром "Ночное небо"',
        slug: 'gold-ring-sapphire-night-sky',
        description: 'Элегантное кольцо из белого золота 750 с сапфиром насыщенного синего цвета.',
        price: 245000.00,
        oldPrice: 299000.00,
        quantity: 3,
        unit: 'шт',
        images: '["/images/sapphire-ring-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: false,
        categoryId: getCatId('diamond-rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Кольцо золотое гладкое "Элеганс" 585',
        slug: 'gold-simple-ring-elegance',
        description: 'Классическое гладкое кольцо из красного золота 585. Лаконичный дизайн, глянцевая полировка.',
        price: 18900.00,
        oldPrice: null,
        quantity: 30,
        unit: 'шт',
        images: '["/images/simple-ring-1.jpg"]',
        isActive: true,
        isNew: false,
        isPopular: false,
        categoryId: getCatId('gold-rings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 💎 СЕРЬГИ
      {
        name: 'Серьги золотые с бриллиантами "Звёздная пыль"',
        slug: 'gold-earrings-star-dust',
        description: 'Изысканные серьги из жёлтого золота 585 с бриллиантами. Романтичный дизайн, 20 бриллиантов.',
        price: 89000.00,
        oldPrice: null,
        quantity: 8,
        unit: 'пар',
        images: '["/images/earrings-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: true,
        categoryId: getCatId('diamond-earrings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серьги золотые с жемчугом "Классика"',
        slug: 'gold-earrings-pearl-classic',
        description: 'Элегантные серьги с натуральным жемчугом в оправе из красного золота 585.',
        price: 69000.00,
        oldPrice: null,
        quantity: 12,
        unit: 'пар',
        images: '["/images/pearl-earrings-1.jpg"]',
        isActive: true,
        isNew: false,
        isPopular: true,
        categoryId: getCatId('gold-earrings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серьги серебряные с топазом "Ледяное сердце"',
        slug: 'silver-earrings-topaz-ice-heart',
        description: 'Серьги из серебра 925 с натуральным голубым топазом. Современный дизайн.',
        price: 12500.00,
        oldPrice: 15900.00,
        quantity: 25,
        unit: 'пар',
        images: '["/images/topaz-earrings-1.jpg"]',
        isActive: true,
        isNew: false,
        isPopular: false,
        categoryId: getCatId('silver-earrings'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔗 ЦЕПИ И ПОДВЕСКИ
      {
        name: 'Цепь золотая "Панцирное плетение" 585',
        slug: 'gold-chain-armor-weave',
        description: 'Массивная цепь из красного золота 585. Панцирное плетение, прочная и стильная.',
        price: 78000.00,
        oldPrice: 89000.00,
        quantity: 10,
        unit: 'шт',
        images: '["/images/chain-1.jpg"]',
        isActive: true,
        isNew: false,
        isPopular: true,
        categoryId: getCatId('chains'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Подвеска с бриллиантом "Капля"',
        slug: 'diamond-pendant-drop',
        description: 'Изящная подвеска из белого золота 750 с бриллиантом 0.3 карата.',
        price: 65000.00,
        oldPrice: null,
        quantity: 6,
        unit: 'шт',
        images: '["/images/pendant-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: false,
        categoryId: getCatId('pendants'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 📿 БРАСЛЕТЫ
      {
        name: 'Браслет золотой с бриллиантами "Ривьера"',
        slug: 'gold-bracelet-riviera',
        description: 'Роскошный браслет из жёлтого золота 585 с бриллиантами. Ривьера-стиль.',
        price: 125000.00,
        oldPrice: 149000.00,
        quantity: 4,
        unit: 'шт',
        images: '["/images/bracelet-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: true,
        categoryId: getCatId('bracelets'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Браслет серебряный с аметистом "Мистик"',
        slug: 'silver-bracelet-amethyst-mystic',
        description: 'Серебряный браслет 925 с натуральным аметистом. Глубокий фиолетовый цвет.',
        price: 18900.00,
        oldPrice: null,
        quantity: 15,
        unit: 'шт',
        images: '["/images/amethyst-bracelet-1.jpg"]',
        isActive: true,
        isNew: false,
        isPopular: false,
        categoryId: getCatId('bracelets'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✨ ЭКСКЛЮЗИВ
      {
        name: 'Кольцо авторское "Космос" с бриллиантами и сапфирами',
        slug: 'custom-space-ring',
        description: 'Уникальное авторское кольцо из платины с черными сапфирами и бриллиантами.',
        price: 680000.00,
        oldPrice: null,
        quantity: 1,
        unit: 'шт',
        images: '["/images/custom-ring-1.jpg", "/images/custom-ring-2.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: true,
        categoryId: getCatId('exclusive'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серьги-подвески с изумрудами "Изумрудный сад"',
        slug: 'emerald-drop-earrings-garden',
        description: 'Эксклюзивные серьги-подвески из белого золота 750 с натуральными изумрудами.',
        price: 420000.00,
        oldPrice: null,
        quantity: 1,
        unit: 'пар',
        images: '["/images/emerald-earrings-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: false,
        categoryId: getCatId('exclusive'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Браслет-часы золотой с бриллиантами "Время роскоши"',
        slug: 'gold-bracelet-watch-luxury-time',
        description: 'Уникальный браслет-часы из красного золота 585 с бриллиантами.',
        price: 750000.00,
        oldPrice: null,
        quantity: 1,
        unit: 'шт',
        images: '["/images/watch-bracelet-1.jpg"]',
        isActive: true,
        isNew: true,
        isPopular: false,
        categoryId: getCatId('exclusive'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  // ============================================================
  // ОТКАТ (удаляем все данные)
  // ============================================================
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
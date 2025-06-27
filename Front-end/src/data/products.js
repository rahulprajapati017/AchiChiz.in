
export const products = [
  {
    id: "bamboo-box",
    title: "Handmade Bamboo Box",
    price: 1299,
    discount: 20,
    rating: 4.5,
    images: [
      "https://img.freepik.com/free-vector/wicker-baskets-vector-design-element-set-remixed-artworks-by-various-artists_53876-116295.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
       "https://img.freepik.com/free-psd/3d-png-element-with-wooden-texture-sao-joao-brazilian-party_314999-3271.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-leaf-wicker-basket-table_1048944-28861963.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/arrangement-delicious-oriental-food_23-2149035140.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/natural-wicker-basket-shop-fruit-bread-container-willow-handwoven-art_169016-49457.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-food-table_1048944-10210192.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740"


    ],

    shortDescription: "Organize in style with this beautifully handwoven bamboo box, crafted by skilled artisans using 100% natural and sustainable bamboo.",
    description: "Organize in style with this beautifully handwoven bamboo box, crafted by skilled artisans using 100% natural and sustainable bamboo. Its minimal yet elegant design blends tradition with modern functionality — making it perfect for storing jewelry, dry fruits, tea, cosmetics, stationery, or sacred items.",

    features: [
      { icon: "Leaf", title: "Eco-friendly Bamboo" },
      { icon: "Hand", title: "100% Handmade" },
      { icon: "Flag", title: "Made in India" },
      { icon: "CheckCircle", title: "Artisan Certified" },
      { icon: "Layout", title: "Minimal & Modern Design" },
    ],
    specs: {
      Material: "Natural Bamboo",
      Dimensions: "25 x 25 x 15 cm",
      Weight: "500g",
      Color: "Beige",
      Care: "Wipe with a dry cloth. Keep away from moisture."
    },
   ratingData: [
    { stars: 5, percentage: 60 },
    { stars: 4, percentage: 25 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ],  
     reviews: [
      {
        id: 101,
        author: "Aarav",
        rating: 5,
        date: "2024-12-01",
        title: "Beautiful Craftsmanship",
        content: "Absolutely loved the detailing and quality. Worth every penny!",
        verified: true,
        helpful: 12,
        notHelpful: 1,
        images: [
          
        ]
      },
      {
        id: 102,
        author: "Meera",
        rating: 4,
        date: "2024-11-20",
        title: "Looks Elegant",
        content: "Looks great, but delivery was a little slow.",
        verified: true,
        helpful: 4,
        notHelpful: 0,
        images: []
      }
    ],
    faqs: [
      { question: "Is this waterproof?", answer: "Not completely, but water-resistant." },
      { question: "Can I use it for rotis?", answer: "Yes, ideal for dry food." }
    ]
  },
  {
    id: "jute-basket",
    title: "Jute Utility Basket",
    price: 799,
    discount: 15,
    rating: 4.3,
    images: [
      "https://img.freepik.com/free-photo/large-piece-cheese-wooden-tray-wicker-basket_23-2148101595.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/high-angle-view-vegetables-sale-market_1048944-10462670.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/closeup-wicker-baskets-blue-background_169016-16551.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/five-woven-baskets-hanging-wooden-wall_861748-55663.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740"
    ],
    shortDescription:"Sturdy and stylish jute basket for everyday storage needs.Elevate your home organization with this handwoven jute basket, a perfect blend of eco-conscious design and rustic charm.",
    description: "Sturdy and stylish jute basket for everyday storage needs.Elevate your home organization with this handwoven jute basket, a perfect blend of eco-conscious design and rustic charm. Made by rural artisans using 100% natural jute fibers, this basket is both stylish and sturdy, ideal for storing clothes, toys, laundry, plants, or home décor items.",
    features: [
      { icon: "Hand", title: "Handwoven by Artisans" },
      { icon: "Flag", title: "Proudly Indian" },
      { icon: "Gift", title: "unique and functional handmade product" },
      { icon: "Store", title: "easy to carry and store" },
      { icon: "Leaf", title: "Biodegradable Material" },
    ],
    specs: {
      Material: "Natural Jute",
      Dimensions: "30 x 20 x 15 cm",
      Weight: "450g",
      Color: "Brown",
      Care: "Dust regularly; avoid damp places."
    },
   ratingData: [
  { stars: 5, percentage: 80 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
],
    reviews: [
      { id: 1, author: "Kiran", rating: 5, comment: "Perfect for storing toys." }
    ],
    faqs: [
      { question: "Can I wash it?", answer: "Dry clean only." }
    ]
  },
  {
    id: "sabai-mat",
    title: "Sabai Grass Mat",
    price: 499,
    discount: 10,
    rating: 4.1,
    images: [
      "https://img.freepik.com/premium-photo/beautiful-pattern-texture-vibrant-green-colored-woven-sedge-place-mat_76000-3090.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/grass-surface-with-decorative-elements_23-2147628346.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/japanese-food_2967-180.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/overhead-view-picnic-basket-checkered-table-green-turf_23-2147908054.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-vector/realistic-carpet-texture-pattern-set_1284-23458.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740"
    ],
    shortDescription:"Eco-conscious multipurpose mat made from Sabai grass.Bring nature into your home with this authentic handwoven Sabai grass mat, crafted by tribal artisans from Eastern India using traditional techniques.",
    description: "Eco-conscious multipurpose mat made from Sabai grass.Bring nature into your home with this authentic handwoven Sabai grass mat, crafted by tribal artisans from Eastern India using traditional techniques. Known for its durability, lightness, and earthy appeal, this mat is a sustainable choice for yoga, meditation, picnics, or everyday floor seating.",
    features: [
      { icon: "Leaf", title: "Sustainable Sabai Grass" },
      { icon: "Layout", title: "Contemporary Look" },
      { icon: "bubbles", title: "dust off or wipe with a dry cloth" },
      { icon: "Hand", title: "each piece is unique" },
      { icon: "Scroll", title: "gentle on skin even during long use" }
    ],
    specs: {
      Material: "Sabai Grass",
      Dimensions: "40 x 60 cm",
      Weight: "300g",
      Color: "Natural",
      Care: "Spot clean only."
    },
    ratingData: [
  { stars: 5.0, percentage: 38 },
  { stars: 4.5, percentage: 16 },
  { stars: 4.0, percentage: 14 },
  { stars: 3.5, percentage: 9 },
  { stars: 3.0, percentage: 7 },
  { stars: 2.5, percentage: 5 },
  { stars: 2.0, percentage: 4 },
  { stars: 1.5, percentage: 3 },
  { stars: 1.0, percentage: 3 },
  { stars: 0.5, percentage: 1 },
],
    reviews: [
      { id: 1, author: "Priya", rating: 4, comment: "Looks good in hallway." }
    ],
    faqs: [
      { question: "Is it soft?", answer: "Medium firmness." }
    ]
  },
  {
    id: "cane-wall-hanging",
    title: "Cane Wall Hanging Set",
    price: 1199,
    discount: 25,
    rating: 4.8,
    images: [
      "https://img.freepik.com/premium-photo/low-angle-view-small-plant-against-white-background_1048944-11057145.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/circular-clock-indoors-still-life_23-2150436161.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/close-up-beautiful-dreamcatcher_23-2149281488.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/circular-clock-indoors-still-life_23-2150436160.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/modern-styled-small-entryway_23-2150713019.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740"
    ],
    shortDescription:"Handcrafted decorative wall hangings for a rustic touch.Looking to give your wall a fresh, earthy makeover This handwoven Cane Wall Hanging Set is perfect for adding a touch of natural charm to any space — be it your living room.",
    description: "Handcrafted decorative wall hangings for a rustic touch.Looking to give your wall a fresh, earthy makeover This handwoven Cane Wall Hanging Set is perfect for adding a touch of natural charm to any space — be it your living room, hallway, or bedroom.Each piece is handmade with love by rural artisans using locally sourced cane, giving your home a cozy, bohemian feel. Whether you hang them as a trio or place them separately, these baskets will instantly elevate your interior.",
    features: [
      { icon: "Heart", title: "Made with Love" },
      { icon: "Leaf", title: "Made with 100% natural cane" },
      { icon: "Hand", title: "Handwoven by skilled Indian artisans" },
      { icon: "CheckCircle", title: "Certified Handmade" },
      { icon: "Home", title: " Can be used as decorative trays or hung on the wall" },
    ],
    specs: {
      Material: "Cane",
      Dimensions: "Variable Sizes",
      Weight: "600g",
      Color: "Beige + Brown",
      Care: "Dry cloth wipe recommended."
    },
    reviews: [
      { id: 1, author: "Asha", rating: 5, comment: "Looks fabulous on white walls!" }
    ],
    faqs: [
      { question: "How to hang?", answer: "Includes hook loops." }
    ]
  },
  {
    id: "bamboo-vase",
    title: "Bamboo Flower Vase",
    price: 899,
    discount: 18,
    rating: 4.4,
    images: [
      "https://img.freepik.com/premium-photo/close-up-vase-against-wall_1048944-7377886.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/handcrafted-wooden-decorative-vase_23-2151003129.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-potted-plant-table_1048944-16148141.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-small-plant-against-blue-background_1048944-4567248.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/free-photo/still-life-with-indoor-plants_23-2151024952.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740"
    ],
    shortDescription:"Minimalist handmade bamboo vase for fresh or dry flowers.This bamboo flower vase is a beautiful way to bring nature indoors.",
    description: "Minimalist handmade bamboo vase for fresh or dry flowers.This bamboo flower vase is a beautiful way to bring nature indoors. Handcrafted by local artisans, each piece showcases the raw beauty of natural bamboo — with its unique grain, light texture, and warm tones.Whether you place fresh flowers, dry blooms, or just let it stand alone, this vase brings an earthy, rustic charm to any space — be it your living room, work desk, or hallway corner.",
    features: [
      { icon: "Leaf", title: "Made from 100% natural bamboo" },
      { icon: "Hand", title: "Handcrafted by skilled Indian artisans" },
       { icon: "Flower", title: "Elegant tapered design for all flower types" },
        { icon: "Layout", title: "Modern Aesthetic" },
         { icon: "Handshake", title: " festive, housewarming, or eco-lovers" }
    ],
    specs: {
      Material: "Bamboo",
      Dimensions: "12 x 30 cm",
      Weight: "350g",
      Color: "Natural",
      Care: "Keep away from moisture."
    },
    reviews: [
      { id: 1, author: "Vikram", rating: 4, comment: "Nice center table piece." }
    ],
    faqs: [
      { question: "Can I put water?", answer: "Not recommended." }
    ]
  },
  {
    id: "clay-lamp",
    title: "Terracotta Clay Lamp",
    price: 699,
    discount: 12,
    rating: 4.2,
    images: [
      "https://img.freepik.com/premium-photo/close-up-antique-candle-sale_1048944-19588263.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-ice-cream-table_1048944-8808988.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-ice-cream-table_1048944-8808988.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-ice-cream-table_1048944-8808988.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740",
      "https://img.freepik.com/premium-photo/close-up-ice-cream-table_1048944-8808988.jpg?ga=GA1.1.791330827.1733070054&semt=ais_items_boosted&w=740"
    ],
    shortDescription:"Traditional clay diya with modern patterns.Bring home the warm, earthy glow of tradition with this handmade Terracotta Clay Lamp, lovingly crafted by rural artisans using natural clay and age-old techniques.",
    description: "Traditional clay diya with modern patterns.Bring home the warm, earthy glow of tradition with this handmade Terracotta Clay Lamp, lovingly crafted by rural artisans using natural clay and age-old techniques.Its timeless rustic design and soft finish make it perfect for festivals, meditation spaces, patios, or earthy home décor. Use it as a diya with oil and wick, or pair with a tealight or LED for a soft ambient vibe.Every lamp is unique, eco-friendly, and full of cultural charm.",
    features: [
      { icon: "CheckCircle", title: "Festival Friendly" },
      { icon: "Amphora", title: " Made from 100% natural terracotta clay" },
      { icon: "ChartSpline", title: "Traditional diya shape with smooth edge" },
      { icon: "Flame", title: "Perfect for Diwali, puja, meditation or gifting" },
      { icon: "Flag", title: "Biodegradable, sustainable & chemical-free" }
    ],
    specs: {
      Material: "Terracotta",
      Dimensions: "8 x 8 x 10 cm",
      Weight: "400g",
      Color: "Orange",
      Care: "Handle with care; Fragile."
    },
    reviews: [],
    faqs: [
      { question: "Is it breakable?", answer: "Yes, handle gently." },
      { question: "Can I use this with oil and wick?", answer: "Yes! It's a real functional diya – traditional and safe for light use." },
      { question: "Where is it made?", answer: "Handmade by terracotta artisans from Rajasthan, India 🇮🇳" },
      { question: "Is it breakable?", answer: "Yes, handle gently." }
    ]
  },
  {
    id: "macrame-hanger",
    title: "Macrame Plant Hanger",
    price: 599,
    discount: 10,
    rating: 4.6,
    images: [
      "https://img.freepik.com/free-photo/traditional-macrame-arrangement-indoors_23-2149072831.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/traditional-macrame-composition-indoors_23-2149072845.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/traditional-macrame-composition-indoors_23-2149072845.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/beautiful-plant-illustration_23-2151931343.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/premium-photo/hand-holding-potted-plant-against-wall_1048944-15057644.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740"
    ],
    shortDescription:"Stylish hand-knotted macrame hanger for hanging plants.Add a dreamy boho vibe to your home with this hand-knotted macramé plant hanger, made using strong, eco-friendly cotton rope.",
    description: "Stylish hand-knotted macrame hanger for hanging plants.Add a dreamy boho vibe to your home with this hand-knotted macramé plant hanger, made using strong, eco-friendly cotton rope. Whether you're decorating a sunny balcony, cozy window nook, or indoor corner, this elegant piece helps you display your favorite planters with style.Crafted by women artisans with attention to detail, each hanger is a symbol of handmade love and minimal aesthetic.",
    features: [
      { icon: "Hand", title: " Hand-knotted with care by local artisans" },
      { icon: "Leaf", title: "Made from 100% natural cotton rope" },
       { icon: "Home", title: " Perfect for indoor & covered outdoor spaces" },
        { icon: "Gift", title: "Great gift for plant lovers and housewarmings" }, 
        { icon: "Flower2", title: "Fits a variety of pot sizes (4–8 inches)" }
    ],
    specs: {
      Material: "Cotton",
      Dimensions: "Length 90 cm",
      Weight: "200g",
      Color: "Off-White",
      Care: "Dust with soft brush."
    },
    reviews: [],
    faqs: [
      { question: "Does it come with a pot or just the hanger?", answer: " This listing includes only the macramé hanger, no pot included." },
      { question: "Weight capacity?", answer: "Up to 1.5kg pot." },
      { question: " Can I hang it outdoors?", answer: "Yes, under shade or covered balconies. Avoid direct rain exposure for longevity" },
      { question: "Where is it made?", answer: "Handcrafted by women artisans from Uttarakhand, India 🇮🇳" }
    ]
  },
  {
    id: "wooden-toy",
    title: "Handcrafted Wooden Toy Set",
    price: 899,
    discount: 22,
    rating: 4.7,
    images: [
      "https://img.freepik.com/premium-photo/close-up-wooden-toys-table-home_1048944-19896696.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/premium-photo/cute-wooden-handmade-toys-kids_139345-116.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/little-music-box-still-life_23-2150652702.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/premium-photo/high-angle-view-wooden-toy_1048944-6009138.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/premium-photo/modern-natural-wooden-pyramid-with-rings-car-toy-wooden-table-eco-friendly-plastic-free-toys_250813-11135.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740"
    ],
    shortDescription:"Non-toxic, handmade wooden toys perfect for toddlers.Let your little one experience the joy of timeless, screen-free play with this beautiful handcrafted wooden toy set.",
    description: "Non-toxic, handmade wooden toys perfect for toddlers.Let your little one experience the joy of timeless, screen-free play with this beautiful handcrafted wooden toy set. Made by traditional artisans from natural, child-safe wood, this set includes colorful animal figures, vehicles, or building blocks (varies by set), designed to spark creativity, imagination, and learning.",
    features: [
      { icon: "TreeDeciduous", title: " Made from 100% natural, locally sourced wood" },
      { icon: "Hand", title: " Hand-carved and painted by skilled artisans" },  
      { icon: "Paintbrush", title: "Coated with non-toxic, lead-free colors" },
        { icon: "Brain", title: " Enhances motor skills, imagination & focus" },
          { icon: "Gift", title: " Ideal for eco-conscious gifting" }
    ],
    specs: {
      Material: "Sheesham Wood",
      Dimensions: "Various",
      Weight: "700g",
      Color: "Natural Wood",
      Care: "Wipe clean with dry cloth."
    },
    reviews: [],
    faqs: [
      { question: "Safe for babies?", answer: "Yes, 100% non-toxic." },
      { question: " Is it safe for toddlers?", answer: "Yes! No sharp edges, no small choking parts, and non-toxic colors." },
      { question: "Can I choose which figures I get?", answer: "Sets may vary slightly, but all follow the same safe, handcrafted standard." },
      { question: "Are the colors edible-safe?", answer: "While not edible, they are water-based, lead-free, and certified child-safe." }
    ]
  },
  {
    id: "grass-pen-stand",
    title: "Sabai Grass Pen Stand",
    price: 299,
    discount: 10,
    rating: 4.0,
    images: [
      "https://media.istockphoto.com/id/104251612/photo/colour-pencils-in-a-basket.jpg?s=612x612&w=0&k=20&c=btWvMs0kCUHTHf3TAO7IjUNg7odkfDHkmva2zjrMGYc=",
      "https://media.istockphoto.com/id/179296088/photo/color-pencils.jpg?s=612x612&w=0&k=20&c=neksZA1aW2OepsRup6MiwRQPVO1AamFCTWfAOHVgyq0=",
      "https://media.istockphoto.com/id/900250056/photo/color-pencils-in-basket-isolated-white-background-horizontal-shot.jpg?s=612x612&w=0&k=20&c=TQ64gUXQuTA5gkEHJlq5f2UpMGTzFzYyt1LMpdbrU0Y=",
      "https://media.istockphoto.com/id/459333669/photo/colour-pencils-isolated-and-white-background.jpg?s=612x612&w=0&k=20&c=55xWd9GCwS9ibgF6nYicsVVn5I2Wzj2cFZg9RMaaZLo=",
      "https://img.freepik.com/free-photo/creativity-chalkboard-solution-background-white_1150-1612.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740"
    ],
    shortDescription:"Unique cylindrical pen stand handwoven from sabai grass.This handwoven Sabai Grass Pen Stand is a perfect mix of utility and traditional craftsmanship.",
    description: "Unique cylindrical pen stand handwoven from sabai grass.This handwoven Sabai Grass Pen Stand is a perfect mix of utility and traditional craftsmanship. Made by rural artisans using 100% natural Sabai grass, it adds a rustic, earthy charm to your workspace while keeping your pens, pencils, and brushes neatly organized.Perfect for work desks, study corners, or gift hampers — this little organizer is big on character and low on environmental impact.",
    features: [
      { icon: "Leaf", title: "Sustainably made with hand-harvested Sabai grass" },
      { icon: "Hand", title: "Handcrafted by artisans from Odisha, India" },
      { icon: "PenLine", title: "Multi-purpose – use it for pens, brushes, makeup tools, or cutlery" },
      { icon: "Box", title: "Compact yet spacious – ideal for desktops or dressers" },
      { icon: "Gift", title: "Thoughtful eco-gift for students, artists & stationery lovers" }
    ],
    specs: {
      Material: "Sabai Grass",
      Dimensions: "10 x 10 x 12 cm",
      Weight: "150g",
      Color: "Green Beige",
      Care: "Keep away from wet areas."
    },
    reviews: [],
    faqs: [
       { question: "an it hold makeup brushes?", answer: " Yes, it's great for brushes, pens, and even spoons or markers!" },
        { question: " Is it washable?", answer: "Gently dust it or wipe with a dry cloth. Avoid water to maintain shape" },
          { question: "Where is it made?", answer: " Handwoven in rural Mayurbhanj, Odisha 🇮🇳" }
    ]
  },
  {
    id: "handloom-table-runner",
    title: "Handloom Cotton Table Runner",
    price: 649,
    discount: 14,
    rating: 4.3,
    images: [
      "https://img.freepik.com/premium-photo/colorful-table-setting-with-flowers_1198035-7343.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/peaceful-meditation-elements_23-2147621433.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/premium-photo/boho-macrame-table-runner-with-handwoven-patterns-fringe-details-bohemian-dining-elegance_1029473-308206.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/christmas-background-with-branches-mug_23-2147726095.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/slices-citrus-fruits-wooden-board-with-tablecloth_114579-32886.jpg?ga=GA1.1.791330827.1733070054&semt=ais_hybrid&w=740"
    ],
    shortDescription:"Traditional motifs meet modern dining with this runner.Add a touch of traditional charm and minimalist style to your dining or coffee table with this handloom cotton table runner. ",
    description: "Traditional motifs meet modern dining with this runner.Add a touch of traditional charm and minimalist style to your dining or coffee table with this handloom cotton table runner. Carefully woven by skilled weavers on wooden looms, this piece blends comfort, beauty, and utility in the most elegant way.The soft, breathable cotton fabric features subtle ethnic patterns and earthy tones — making it perfect for daily use, festive settings, or even rustic wedding tables.",
    features: [
      { icon: "Fabric", title: "Made from 100% pure handloom cotton" },
      { icon: "Hand", title: "Handwoven by rural artisans using age-old techniques" },
      { icon: "Utensils", title: "Protects and enhances your table surface" },
      { icon: "Washer", title: " Machine washable and easy to maintain" },
      { icon: "Flag", title: "Inspired by Indian Weaves" }
    ],
    specs: {
      Material: "Cotton",
      Dimensions: "180 x 35 cm",
      Weight: "300g",
      Color: "Red & White",
      Care: "Machine wash gentle."
    },
    reviews: [],
    faqs: [
      { question: "Color fades?", answer: "Colorfast in cold wash." },
      { question: " Is it suitable for daily use?", answer: " Yes, it’s durable enough for everyday meals and elegant enough for occasions." },
      { question: "Will it shrink after washing?", answer: "Minimal shrinkage, if any. Use cold water and gentle cycle for best care." },
      { question: "Is it handmade?", answer: "Absolutely — each runner is woven by hand on traditional looms by Indian artisans 🇮🇳" }
    ]
  }
];

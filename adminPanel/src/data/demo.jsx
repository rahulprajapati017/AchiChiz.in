import { Verified } from "lucide-react";

export const demoProducts = [
  // Original 3
  {
    id: "1",
    name: "Handmade Wooden Bowl",
    price: 599,
    category: "Wooden",
    subcategory: "Utility",
    stock: 12,
    artisan: "Ramesh Verma",
    material: "Sheesham Wood",
    description: "Beautifully crafted bowl from Sheesham wood, perfect for serving snacks.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1b9a314",
      "https://images.unsplash.com/photo-1606813908823-9f21f7b9185d"
    ],
    video: "",
    features: [{ icon: "FaLeaf", text: "Eco‑friendly" }],
    specifications: ["Diameter: 6 inches", "Weight: 300 g"]
  },
  {
    id: "2",
    name: "Brass Decorative Lamp",
    price: 1299,
    category: "Metal",
    subcategory: "Decor",
    stock: 5,
    artisan: "Sunita Devi",
    material: "Pure Brass",
    description: "Traditional brass lamp to elevate your interior aesthetics.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1629277094329-8c22152c7d16",
      "https://images.unsplash.com/photo-1617809589612-3f4e90a44a66"
    ],
    video: "",
    features: [{ icon: "FaLightbulb", text: "Rustic Shine" }],
    specifications: ["Height: 12 inches", "Weight: 800 g"]
  },
  {
    id: "3",
    name: "Bamboo Fruit Basket",
    price: 349,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 20,
    artisan: "Lakshmi Bai",
    material: "Bamboo",
    description: "Eco‑friendly bamboo basket for storing fruits or household items.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1582885793343-d4a7f4a6aa6d",
      "https://images.unsplash.com/photo-1582386802559-50f9f2677b6b"
    ],
    video: "",
    features: [{ icon: "FaRecycle", text: "Sustainable Material" }],
    specifications: ["Height: 8 inches", "Diameter: 10 inches"]
  },

  // 25 New Products (4 to 28)
  {
    id: "4",
    name: "Wooden Spice Box",
    price: 799,
    category: "Wooden",
    subcategory: "Utility",
    stock: 15,
    artisan: "Manoj Kumar",
    material: "Teak Wood",
    description: "Compartmental spice box with lid, teak wood finish.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1567442101687-4e16735fbf27",
      "https://images.unsplash.com/photo-1541430156185-bc165940d1f2"
    ],
    video: "",
    features: [{ icon: "FaCube", text: "Multiple Compartments" }],
    specifications: ["6 compartments", "Size: 8×6×2 inches"]
  },
  {
    id: "5",
    name: "Bamboo Coasters Set",
    price: 299,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 30,
    artisan: "Neeraj Singh",
    material: "Bamboo",
    description: "Set of 6 round bamboo coasters for table protection.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1502462041991-13ad936b5fc3",
      "https://images.unsplash.com/photo-1515165562835-4f6314a89fde"
    ],
    video: "",
    features: [{ icon: "FaCircle", text: "Heat Resistant" }],
    specifications: ["6 pieces", "Diameter: 4 inches"]
  },
  {
    id: "6",
    name: "Metal Wall Hanging",
    price: 1599,
    category: "Metal",
    subcategory: "Decor",
    stock: 7,
    artisan: "Poonam Agarwal",
    material: "Recycled Metal",
    description: "Artistic metal wall décor with rustic finish.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1599171222562-5f904b4625e8",
      "https://images.unsplash.com/photo-1584754441798-8afcebec2c46"
    ],
    video: "",
    features: [{ icon: "FaTree", text: "Nature Inspired" }],
    specifications: ["Diameter: 18 inches", "Weight: 2 kg"]
  },
  {
    id: "7",
    name: "Wooden Photo Frame",
    price: 499,
    category: "Wooden",
    subcategory: "Decor",
    stock: 25,
    artisan: "Rita Sharma",
    material: "Rosewood",
    description: "Hand-carved photo frame with glass.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1533691591954-d87f16cb3c81",
      "https://images.unsplash.com/photo-1578922867852-9a12f8616a1a"
    ],
    video: "",
    features: [{ icon: "FaImage", text: "Antique Look" }],
    specifications: ["Fits 5×7 photo", "Size: 10×8 inches"]
  },
  {
    id: "8",
    name: "Bamboo Serving Tray",
    price: 649,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 10,
    artisan: "Geeta Patel",
    material: "Bamboo",
    description: "Eco-friendly serving tray for snacks and drinks.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1601050690114-fabc18bd17e5",
      "https://images.unsplash.com/photo-1608221554333-1aacb64c4e28"
    ],
    video: "",
    features: [{ icon: "FaTray", text: "Non‑slip Base" }],
    specifications: ["16×12 inches", "Weight: 1 kg"]
  },
  {
    id: "9",
    name: "Wooden Jewelry Box",
    price: 999,
    category: "Wooden",
    subcategory: "Utility",
    stock: 8,
    artisan: "Meenakshi Lal",
    material: "Mango Wood",
    description: "Intricately carved jewelry box with mirror.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1589987600991-9b9d3c3d2e43",
      "https://images.unsplash.com/photo-1572352712323-f63205691437"
    ],
    video: "",
    features: [{ icon: "FaGem", text: "Elegant Carving" }],
    specifications: ["5×5×3 inches", "Mirror inside lid"]
  },
  {
    id: "10",
    name: "Bamboo Wind Chime",
    price: 399,
    category: "Bamboo",
    subcategory: "Decor",
    stock: 18,
    artisan: "Rekha Sharma",
    material: "Bamboo",
    description: "Natural bamboo wind chime for home décor.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1584037013316-5e4b2d9fbe66",
      "https://images.unsplash.com/photo-1544739313-7567bea14795"
    ],
    video: "",
    features: [{ icon: "FaWind", text: "Soothing Sound" }],
    specifications: ["Length: 24 inches", "Sound tubes bamboo"]
  },
  {
    id: "11",
    name: "Metal Candle Holder",
    price: 549,
    category: "Metal",
    subcategory: "Utility",
    stock: 22,
    artisan: "Vikas Rao",
    material: "Wrought Iron",
    description: "Handcrafted candle holder for tea lights.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6f7",
      "https://images.unsplash.com/photo-1494178274901-3ff7a6beaf7f"
    ],
    video: "",
    features: [{ icon: "FaFire", text: "Rustic Charm" }],
    specifications: ["Holds 4 tea lights", "Diameter: 8 inches"]
  },
  {
    id: "12",
    name: "Wooden Key Holder",
    price: 399,
    category: "Wooden",
    subcategory: "Utility",
    stock: 30,
    artisan: "Anjali Deshpande",
    material: "Sandalwood",
    description: "Wall-mounted key holder with hooks.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1587825140708-9fc8f1ec7004",
      "https://images.unsplash.com/photo-1602524812808-13b4f28f770d"
    ],
    video: "",
    features: [{ icon: "FaKey", text: "With Hooks" }],
    specifications: ["5 hooks", "Size: 12×4 inches"]
  },
  {
    id: "13",
    name: "Bamboo Planter Box",
    price: 749,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 12,
    artisan: "Shruti Singh",
    material: "Bamboo",
    description: "Planter box for indoor plants made from bamboo.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1597635657334-4bb23b3eb9f5",
      "https://images.unsplash.com/photo-1614277991361-0d7ff87ba474"
    ],
    video: "",
    features: [{ icon: "FaSeedling", text: "Plant Friendly" }],
    specifications: ["Size: 10×10×8 inches"]
  },
  {
    id: "14",
    name: "Metal Desk Organizer",
    price: 899,
    category: "Metal",
    subcategory: "Utility",
    stock: 9,
    artisan: "Arun Mishra",
    material: "Steel",
    description: "Desk organizer with pen & accessory slots.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b6",
      "https://images.unsplash.com/photo-1590487988604-f360a5409f07"
    ],
    video: "",
    features: [{ icon: "FaPen", text: "Durable Design" }],
    specifications: ["Pen slots + tray", "Size: 10×6×4 inches"]
  },
  {
    id: "15",
    name: "Wooden Coaster Set",
    price: 349,
    category: "Wooden",
    subcategory: "Utility",
    stock: 40,
    artisan: "Priya Menon",
    material: "Acacia Wood",
    description: "Set of 4 eco‑friendly wooden coasters.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1583759137425-766db3049b7f",
      "https://images.unsplash.com/photo-1583777619872-b39f85af83d5"
    ],
    video: "",
    features: [{ icon: "FaShieldAlt", text: "Heat Protective" }],
    specifications: ["4 pieces", "Diameter: 4 inches"]
  },
  {
    id: "16",
    name: "Bamboo Utensil Holder",
    price: 799,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 14,
    artisan: "Kavita Gupta",
    material: "Bamboo",
    description: "Holder for utensils, stylish bamboo finish.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1589182386175-474032e8ca57",
      "https://images.unsplash.com/photo-1598300052476-8dd1288eb3c8"
    ],
    video: "",
    features: [{ icon: "FaUtensilSpoon", text: "Kitchen Friendly" }],
    specifications: ["Size: 6×6×6 inches"]
  },
  {
    id: "17",
    name: "Metal Hanging Planter",
    price: 999,
    category: "Metal",
    subcategory: "Decor",
    stock: 11,
    artisan: "Deepak Kumar",
    material: "Iron",
    description: "Hanging planter for indoor plants.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1582737921038-d6d528b1fee2",
      "https://images.unsplash.com/photo-1601758123927-6e47fd8e17dd"
    ],
    video: "",
    features: [{ icon: "FaLeaf", text: "Plant Friendly" }],
    specifications: ["Diameter: 8 inches"]
  },
  {
    id: "18",
    name: "Wooden Cutting Board",
    price: 649,
    category: "Wooden",
    subcategory: "Utility",
    stock: 20,
    artisan: "Rajesh Sharma",
    material: "Acacia Wood",
    description: "Large wooden cutting board for kitchen.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1592928306166-4efa0b0ef0d0",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
    ],
    video: "",
    features: [{ icon: "FaCut", text: "Food Safe" }],
    specifications: ["Size: 16×12×1 inches"]
  },
  {
    id: "19",
    name: "Bamboo Toothbrush Holder",
    price: 399,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 28,
    artisan: "Neha Patel",
    material: "Bamboo",
    description: "Eco‑friendly toothbrush holder.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1598308607337-3b2e5f9bc0c9",
      "https://images.unsplash.com/photo-1587036360627-3af8e1978e7a"
    ],
    video: "",
    features: [{ icon: "FaTooth", text: "Eco Bathroom" }],
    specifications: ["Holds 4 brushes"]
  },
  {
    id: "20",
    name: "Metal Book Stand",
    price: 699,
    category: "Metal",
    subcategory: "Utility",
    stock: 16,
    artisan: "Anil Yadav",
    material: "Steel",
    description: "Foldable metal book stand for reading.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7"
    ],
    video: "",
    features: [{ icon: "FaBook", text: "Adjustable" }],
    specifications: ["Adjustable angle"]
  },
  {
    id: "21",
    name: "Wooden Serving Spoons",
    price: 349,
    category: "Wooden",
    subcategory: "Utility",
    stock: 22,
    artisan: "Sonia Kapoor",
    material: "Teak Wood",
    description: "Set of 2 handcrafted wooden serving spoons.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1601078389230-ec65e4f0a3cd",
      "https://images.unsplash.com/photo-1587316745620-60656f20206d"
    ],
    video: "",
    features: [{ icon: "FaUtensils", text: "Food Friendly" }],
    specifications: ["Length: 10 inches"]
  },
  {
    id: "22",
    name: "Bamboo Desk Mat",
    price: 799,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 14,
    artisan: "Reema Joshi",
    material: "Bamboo",
    description: "Desk mat made of bamboo strips.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1583799165768-1fce89aeb773",
      "https://images.unsplash.com/photo-1605199481732-6e059b2b6ae0"
    ],
    video: "",
    features: [{ icon: "FaLaptop", text: "Workspace Essential" }],
    specifications: ["Size: 24×12 inches"]
  },
  {
    id: "23",
    name: "Metal Jewelry Dish",
    price: 449,
    category: "Metal",
    subcategory: "Utility",
    stock: 27,
    artisan: "Kamal Singh",
    material: "Brass",
    description: "Handmade jewelry dish for rings.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1582537271797-6b9dd2c8b6f7",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
    ],
    video: "",
    features: [{ icon: "FaRing", text: "Gentle Glow" }],
    specifications: ["Diameter: 5 inches"]
  },
  {
    id: "24",
    name: "Wooden Tea Box",
    price: 899,
    category: "Wooden",
    subcategory: "Utility",
    stock: 10,
    artisan: "Deepa Rao",
    material: "Rosewood",
    description: "Tea sachet organizer box with lid.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1590031905476-16f887764a14",
      "https://images.unsplash.com/photo-1602710038919-1b039416b502"
    ],
    video: "",
    features: [{ icon: "FaLeaf", text: "Aromatic Storage" }],
    specifications: ["10 compartments"]
  },
  {
    id: "25",
    name: "Bamboo Napkin Holder",
    price: 499,
    category: "Bamboo",
    subcategory: "Utility",
    stock: 21,
    artisan: "Priyanka Gupta",
    material: "Bamboo",
    description: "Simple bamboo napkin holder.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1583267745260-244b229dad2f",
      "https://images.unsplash.com/photo-1556911073-52527ac43768"
    ],
    video: "",
    features: [{ icon: "FaTissue", text: "Table Essential" }],
    specifications: ["Size fits 4×6 napkins"]
  },
  {
    id: "26",
    name: "Metal Serving Tray",
    price: 1199,
    category: "Metal",
    subcategory: "Utility",
    stock: 8,
    artisan: "Rahul Desai",
    material: "Stainless Steel",
    description: "Polished metal serving tray.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1589187154818-78b7168d9c79",
      "https://images.unsplash.com/photo-1599058917210-abb4a3c2bbc7"
    ],
    video: "",
    features: [{ icon: "FaBox", text: "Elegant Serveware" }],
    specifications: ["Size: 18×12 inches"]
  },
  {
    id: "27",
    name: "Wooden Candle Stand",
    price: 699,
    category: "Wooden",
    subcategory: "Decor",
    stock: 13,
    artisan: "Mehul Shah",
    material: "Teak Wood",
    description: "Handcrafted wooden stand for pillar candles.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1585275328793-6b2b8e14f195",
      "https://images.unsplash.com/photo-1598309315165-83e84a4c938c"
    ],
    video: "",
    features: [{ icon: "FaCandleHolder", text: "Rustic Decor" }],
    specifications: ["Height: 8 inches"]
  },
  {
    id: "28",
    name: "Wooden Desk Organizer",
    price: 899,
    category: "Wooden",
    subcategory: "Utility",
    stock: 18,
    artisan: "Akash Rao",
    material: "Teak Wood",
    description: "Desktop organizer with pen holders and slots.",
    handmade: true,
    images: [
      "https://images.unsplash.com/photo-1581276879432-15a6e43c8b03",
      "https://images.unsplash.com/photo-1593642634443-44adaa06623a"
    ],
    video: "",
    features: [{ icon: "FaPen", text: "Multiple Slots" }],
    specifications: ["5 sections", "Size: 12×6×4 inches"]
  }
];


export const demoOrders = [
  {
    id: "O123",
    user: "Amar Sharma",
    products: ["Handmade Wooden Bowl", "Brass Decorative Lamp"],
    total: 1898,
    status: "Pending",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-08" }
    ]
  },
  {
    id: "O124",
    user: "Riya Jain",
    products: ["Bamboo Fruit Basket"],
    total: 349,
    status: "Shipped",
    paymentStatus: "Unpaid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-07" },
      { status: "Shipped", date: "2025-07-08" }
    ]
  },
  {
    id: "O125",
    user: "Arjun Mehta",
    products: ["Brass Decorative Lamp", "Bamboo Fruit Basket"],
    total: 1648,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-06" },
      { status: "Shipped", date: "2025-07-07" },
      { status: "Delivered", date: "2025-07-09" }
    ]
  },
  {
    id: "O126",
    user: "Neha Verma",
    products: ["Handmade Wooden Bowl"],
    total: 599,
    status: "Cancelled",
    paymentStatus: "Refunded",
    refunded: true,
    refund: { amount: 599, date: "2025-07-09" },
    statusHistory: [
      { status: "Pending", date: "2025-07-07" },
      { status: "Cancelled", date: "2025-07-08" }
    ]
  },
  {
    id: "O127",
    user: "Nikita Thakur",
    products: ["Wooden Tray"],
    total: 799,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-04" },
      { status: "Shipped", date: "2025-07-05" },
      { status: "Delivered", date: "2025-07-06" }
    ]
  },
  {
    id: "O128",
    user: "Mohit Garg",
    products: ["Bamboo Coasters", "Decorative Plate"],
    total: 1249,
    status: "Shipped",
    paymentStatus: "Unpaid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-08" },
      { status: "Shipped", date: "2025-07-09" }
    ]
  },
  {
    id: "O129",
    user: "Poonam Yadav",
    products: ["Handcrafted Photo Frame"],
    total: 699,
    status: "Cancelled",
    paymentStatus: "Refunded",
    refunded: true,
    refund: { amount: 699, date: "2025-07-10" },
    statusHistory: [
      { status: "Pending", date: "2025-07-08" },
      { status: "Cancelled", date: "2025-07-09" }
    ]
  },
  {
    id: "O130",
    user: "Ajay Chauhan",
    products: ["Clay Mug", "Wooden Pen Holder"],
    total: 1120,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-07" },
      { status: "Shipped", date: "2025-07-08" },
      { status: "Delivered", date: "2025-07-10" }
    ]
  },
  {
    id: "O131",
    user: "Swati Bansal",
    products: ["Woven Basket"],
    total: 499,
    status: "Pending",
    paymentStatus: "Unpaid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-09" }
    ]
  },
  {
    id: "O132",
    user: "Aditya Singh",
    products: ["Copper Water Bottle"],
    total: 1349,
    status: "Shipped",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-08" },
      { status: "Shipped", date: "2025-07-09" }
    ]
  },
  {
    id: "O133",
    user: "Kritika Mehra",
    products: ["Handmade Rug"],
    total: 2499,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-05" },
      { status: "Shipped", date: "2025-07-06" },
      { status: "Delivered", date: "2025-07-08" }
    ]
  },
  {
    id: "O134",
    user: "Dhruv Jain",
    products: ["Terracotta Vase"],
    total: 899,
    status: "Cancelled",
    paymentStatus: "Refunded",
    refunded: true,
    refund: { amount: 899, date: "2025-07-09" },
    statusHistory: [
      { status: "Pending", date: "2025-07-07" },
      { status: "Cancelled", date: "2025-07-08" }
    ]
  },
  {
    id: "O135",
    user: "Tina Kapoor",
    products: ["Brass Tray", "Handwoven Mat"],
    total: 1999,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-06" },
      { status: "Shipped", date: "2025-07-07" },
      { status: "Delivered", date: "2025-07-09" }
    ]
  },
  {
    id: "O136",
    user: "Ramesh Thakur",
    products: ["Wooden Wall Clock"],
    total: 1290,
    status: "Pending",
    paymentStatus: "Unpaid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-09" }
    ]
  },
  {
    id: "O137",
    user: "Divya Joshi",
    products: ["Ceramic Plate Set"],
    total: 1799,
    status: "Shipped",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-08" },
      { status: "Shipped", date: "2025-07-09" }
    ]
  },
  {
    id: "O138",
    user: "Ravi Khandelwal",
    products: ["Bamboo Wind Chime"],
    total: 399,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-07" },
      { status: "Shipped", date: "2025-07-08" },
      { status: "Delivered", date: "2025-07-09" }
    ]
  },
  {
    id: "O139",
    user: "Sonal Verma",
    products: ["Handwoven Basket"],
    total: 599,
    status: "Cancelled",
    paymentStatus: "Refunded",
    refunded: true,
    refund: { amount: 599, date: "2025-07-10" },
    statusHistory: [
      { status: "Pending", date: "2025-07-08" },
      { status: "Cancelled", date: "2025-07-09" }
    ]
  },
  {
    id: "O140",
    user: "Manish Agarwal",
    products: ["Copper Glass Set"],
    total: 1599,
    status: "Delivered",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-05" },
      { status: "Shipped", date: "2025-07-06" },
      { status: "Delivered", date: "2025-07-08" }
    ]
  },
  {
    id: "O141",
    user: "Preeti Sinha",
    products: ["Terracotta Sculpture"],
    total: 2199,
    status: "Pending",
    paymentStatus: "Unpaid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-09" }
    ]
  },
  {
    id: "O142",
    user: "Kunal Batra",
    products: ["Clay Flower Pot"],
    total: 749,
    status: "Shipped",
    paymentStatus: "Paid",
    refunded: false,
    statusHistory: [
      { status: "Pending", date: "2025-07-08" },
      { status: "Shipped", date: "2025-07-09" }
    ]
  }
];



export const demoUsers = [
  { id: "U1", name: "Riya Jain", email: "riya@email.com", verified: true, blocked: false },
  { id: "U2", name: "Arjun Mehta", email: "arjun@email.com", verified: true, blocked: false },
  { id: "U3", name: "Neha Verma", email: "neha@email.com", verified: false, blocked: true },
  { id: "U4", name: "Amit Singh", email: "amit@email.com", verified: true, blocked: false },
  { id: "U5", name: "Priya Kumari", email: "priya@email.com", verified: false, blocked: false },
  { id: "U6", name: "Karan Patel", email: "karan@email.com", verified: true, blocked: true },
  { id: "U7", name: "Sneha Reddy", email: "sneha@email.com", verified: true, blocked: false },
  { id: "U8", name: "Rohit Yadav", email: "rohit@email.com", verified: false, blocked: false },
  { id: "U9", name: "Divya Sharma", email: "divya@email.com", verified: false, blocked: true },
  { id: "U10", name: "Harshit Chauhan", email: "harshit@email.com", verified: false, blocked: false },
  { id: "U11", name: "Meera Joshi", email: "meera@email.com", verified: true, blocked: false },
  { id: "U12", name: "Nikhil Bansal", email: "nikhil@email.com", verified: true, blocked: false },
  { id: "U13", name: "Tanvi Gupta", email: "tanvi@email.com", verified: true, blocked: false },
  { id: "U14", name: "Sameer Khan", email: "sameer@email.com", verified: false, blocked: false },
  { id: "U15", name: "Aarav Kapoor", email: "aarav@email.com", verified: true, blocked: true },
  { id: "U16", name: "Simran Kaur", email: "simran@email.com", verified: true, blocked: false },
  { id: "U17", name: "Vikram Raj", email: "vikram@email.com", verified: false, blocked: false },
  { id: "U18", name: "Jaya Desai", email: "jaya@email.com", verified: true, blocked: false },
  { id: "U19", name: "Deepak Sinha", email: "deepak@email.com", verified: false, blocked: true },
  { id: "U20", name: "Ishita Modi", email: "ishita@email.com", verified: true, blocked: false },
  { id: "U21", name: "Yash Malhotra", email: "yash@email.com", verified: false, blocked: false },
  { id: "U22", name: "Tanya Rao", email: "tanya@email.com", verified: false, blocked: false },
  { id: "U23", name: "Mohit Goel", email: "mohit@email.com", verified: true, blocked: true },
  { id: "U24", name: "Pooja Nair", email: "pooja@email.com", verified: true, blocked: false }
];



export const demoReviews = [
  { id: "R1", product: "Handmade Wooden Bowl", user: "Riya", text: "Nice and sturdy!" },
  { id: "R2", product: "Brass Decorative Lamp", user: "Arjun", text: "Looks premium!" },
  { id: "R3", product: "Bamboo Fruit Basket", user: "Neha", text: "Very handy and lightweight." },
  { id: "R4", product: "Handmade Wooden Bowl", user: "Amit", text: "Perfect for snacks!" },
  { id: "R5", product: "Brass Decorative Lamp", user: "Priya", text: "Beautiful design and quality." },
  { id: "R6", product: "Bamboo Fruit Basket", user: "Karan", text: "Great for kitchen use!" },
  { id: "R7", product: "Handmade Wooden Bowl", user: "Sneha", text: "Authentic and well made." },
  { id: "R8", product: "Brass Decorative Lamp", user: "Rohit", text: "Adds charm to my living room." },
  { id: "R9", product: "Bamboo Fruit Basket", user: "Divya", text: "Eco-friendly and stylish." },
  { id: "R10", product: "Handmade Wooden Bowl", user: "Harshit", text: "Good size and polish." },
  { id: "R11", product: "Brass Decorative Lamp", user: "Meera", text: "Perfect for festivals!" },
  { id: "R12", product: "Bamboo Fruit Basket", user: "Nikhil", text: "Spacious and light." },
  { id: "R13", product: "Handmade Wooden Bowl", user: "Tanvi", text: "Loved the rustic look." },
  { id: "R14", product: "Brass Decorative Lamp", user: "Sameer", text: "Works well as a showpiece." },
  { id: "R15", product: "Bamboo Fruit Basket", user: "Aarav", text: "Better than expected." },
  { id: "R16", product: "Handmade Wooden Bowl", user: "Simran", text: "Very smooth and solid." },
  { id: "R17", product: "Brass Decorative Lamp", user: "Vikram", text: "Bright and elegant." },
  { id: "R18", product: "Bamboo Fruit Basket", user: "Jaya", text: "Beautiful craftsmanship!" },
  { id: "R19", product: "Handmade Wooden Bowl", user: "Deepak", text: "Highly recommended." },
  { id: "R20", product: "Brass Decorative Lamp", user: "Ishita", text: "Stunning antique vibe." },
  { id: "R21", product: "Bamboo Fruit Basket", user: "Yash", text: "Natural and sturdy." },
  { id: "R22", product: "Handmade Wooden Bowl", user: "Tanya", text: "Traditional and useful." },
  { id: "R23", product: "Brass Decorative Lamp", user: "Mohit", text: "Exactly what I needed!" },
  { id: "R24", product: "Bamboo Fruit Basket", user: "Pooja", text: "Nice weave and finish." }
];

export const demoRevenueTrend = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 17000 },
  { month: "Mar", revenue: 14500 },
  { month: "Apr", revenue: 19000 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 25000 },
];

export const demoOrderStatus = [
  { name: "Pending", value: 25 },
  { name: "Processing", value: 40 },
  { name: "Shipped", value: 20 },
  { name: "Delivered", value: 50 },
  { name: "Cancelled", value: 5 },
];

export const demoTopProducts = [
  { name: "Lamp", sales: 120 },
  { name: "Bag", sales: 98 },
  { name: "Clock", sales: 86 },
  { name: "Decor", sales: 65 },
  { name: "Vase", sales: 45 },
];

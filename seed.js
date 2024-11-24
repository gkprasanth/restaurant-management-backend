const mongoose = require("mongoose");
const User = require("./models/User");
const Order = require("./models/Order");

// Connect to the database
mongoose.connect("mongodb+srv://gkpc2004:nMOAkDVkGqkmzaNG@cluster0.0z063.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample users
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123", // Plain text; hash it in production
    role: "customer",
    tableNumber: 1,
  },
  {
    name: "Kitchen Staff",
    email: "kitchen.staff@example.com",
    password: "password123",
    role: "kitchen",
  },
  {
    name: "Reception Staff",
    email: "reception.staff@example.com",
    password: "password123",
    role: "reception",
  },
];

// Sample menu items with images
const menuItems = [
    // Starters
    {
      category: "Starters",
      name: "Spring Rolls",
      price: 599,
      description: "Crispy rolls filled with veggies and served with dipping sauce.",
      image: "https://images.unsplash.com/photo-1669340781012-ae89fbac9fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Starters",
      name: "Garlic Bread",
      price: 399,
      description: "Toasted bread topped with garlic and butter.",
      image: "https://images.unsplash.com/photo-1676976198546-18595f0796f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Starters",
      name: "Mozzarella Sticks",
      price: 649,
      description: "Crispy on the outside, gooey mozzarella on the inside.",
      image: "https://plus.unsplash.com/premium_photo-1726804917125-0d86aaefad09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Starters",
      name: "Chicken Wings",
      price: 799,
      description: "Spicy buffalo wings served with a side of ranch.",
      image: "https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Starters",
      name: "Hummus and Pita",
      price: 499,
      description: "Classic hummus served with freshly baked pita bread.",
      image: "https://images.unsplash.com/photo-1580217593620-c6ba702b5217?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Starters",
      name: "Onion Rings",
      price: 549,
      description: "Golden fried onion rings with a tangy dipping sauce.",
      image: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Starters",
      name: "Chicken Tikka",
      price: 679,
      description: "Jalapeños stuffed with cheese and deep fried.",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chicken-tikka-kebab-480x270.jpg",
    },
    {
      category: "Starters",
      name: "Apollo Fish",
      price: 899,
      description: "Chilled shrimp served with tangy cocktail sauce.",
      image: "https://currynwok.com/wp-content/uploads/2023/09/Apollo-Fish.jpeg",
    },
    {
      category: "Starters",
      name: "Bruschetta",
      price: 599,
      description: "Grilled bread topped with tomatoes, garlic, and basil.",
      image: "https://www.allrecipes.com/thmb/YnD6s0OqDK6Mt4jqcflf7cVXn9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54165-Balsamic-Bruschetta-mfs_001-e2cfc398086842038eeb634eab588ef4.jpg",
    },
    
  
    // Main Course
    {
      category: "Main Course",
      name: "Margherita Pizza",
      price: 1299,
      description: "Classic pizza with fresh tomato sauce and mozzarella.",
      image: "https://images.unsplash.com/photo-1573821663912-6df460f9c684?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Main Course",
      name: "Grilled Chicken",
      price: 1599,
      description: "Juicy grilled chicken served with a side of veggies.",
      image: "https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Main Course",
      name: "Spaghetti Bolognese",
      price: 1499,
      description: "Pasta served with a rich tomato and meat sauce.",
      image: "https://food-images.files.bbci.co.uk/food/recipes/easy_spaghetti_bolognese_93639_16x9.jpg",
    },
    {
      category: "Main Course",
      name: "Beef Steak",
      price: 1999,
      description: "Tender beef steak cooked to your liking.",
      image: "https://mojo.generalmills.com/api/public/content/LASaPpVD5E6LGty8lf97zA_webp_base.webp?v=0971028d&t=e724eca7b3c24a8aaa6e089ed9e611fd",
    },
    {
      category: "Main Course",
      name: "Vegetable Stir Fry",
      price: 1349,
      description: "Stir-fried vegetables served with rice.",
      image: "https://www.inspiredtaste.net/wp-content/uploads/2022/04/Veggie-Stir-Fry-Recipe-3-1200-1200x800.jpg",
    },
    {
      category: "Main Course",
      name: "Seafood Paella",
      price: 2299,
      description: "Spanish rice dish with shrimp, clams, and mussels.",
      image: "https://i0.wp.com/rimmersrecipes.co.uk/wp-content/uploads/2019/05/Spanish-Paella.jpg?resize=960%2C641",
    },
    {
      category: "Main Course",
      name: "Chicken Alfredo",
      price: 1649,
      description: "Pasta with creamy Alfredo sauce and grilled chicken.",
      image: "https://hips.hearstapps.com/hmg-prod/images/chicken-alfredo-index-64ee1026c82a9.jpg?crop=0.9994472084024323xw:1xh;center,top&resize=1200:*",
    },
    {
      category: "Main Course",
      name: "BBQ Ribs",
      price: 1899,
      description: "Tender ribs served with a smoky BBQ sauce.",
      image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2024-09-slow-cooker-ribs%2Fslow-cooker-ribs-227_14820e-crop1",
    },
    {
      category: "Main Course",
      name: "Lamb Chops",
      price: 2499,
      description: "Juicy lamb chops served with mint sauce.",
      image: "https://www.seriouseats.com/thmb/7krlJdfnpXB53aqHg-vBSHjiDPc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfectly-grilled-lamb-rib-or-loin-chops-recipe-hero-03-262fe2defc7c491688cb2d363dad3446.JPG",
    },
    {
      category: "Main Course",
      name: "Vegetable Curry",
      price: 1399,
      description: "Spicy curry with mixed vegetables served with naan bread.",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/06/Courgette-curry-c295fa0.jpg?resize=768,574",
    },
  
    // Desserts
    {
      category: "Desserts",
      name: "Chocolate Lava Cake",
      price: 699,
      description: "Warm chocolate cake with molten chocolate center.",
      image: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes7.jpg",
    },
    {
      category: "Desserts",
      name: "Ice Cream Sundae",
      price: 499,
      description: "Vanilla ice cream topped with hot fudge and nuts.",
      image: "https://www.brit.co/media-library/ice-cream-sundaes-in-a-pink-bowl-with-sprinkles.jpg?id=21919567&width=980",
    },
    {
      category: "Desserts",
      name: "Cheesecake",
      price: 599,
      description: "Classic cheesecake with a buttery graham cracker crust.",
      image: "https://www.allrecipes.com/thmb/DHosjm3NundSDP1q6wWEEECYwr8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8419-easy-sour-cream-cheesecake-DDMFS-beauty-4x3-BG-2747-44b427d330aa41aa876269b1249698a0.jpg",
    },
    {
      category: "Desserts",
      name: "Tiramisu",
      price: 749,
      description: "Italian coffee-flavored dessert made with layers of sponge cake.",
      image: "https://www.culinaryhill.com/wp-content/uploads/2021/01/Tiramisu-Culinary-Hill-1200x800-1.jpg",
    },
    {
      category: "Desserts",
      name: "Apple Pie",
      price: 449,
      description: "Warm apple pie with a flaky crust.",
      image: "https://www.inspiredtaste.net/wp-content/uploads/2019/11/Homemade-Apple-Pie-From-Scratch-1200.jpg",
    },
    {
      category: "Desserts",
      name: "Cupcakes",
      price: 399,
      description: "Delicious vanilla cupcakes topped with buttercream frosting.",
      image: "https://assets.epicurious.com/photos/661d915ebb018778412bb00a/4:3/w_3864,h_2898,c_limit/chocolate-cupcakes_RECIPE_V1_041124_4498_VOG_final.jpg",
    },
    {
      category: "Desserts",
      name: "Brownies",
      price: 499,
      description: "Rich and fudgy brownies served with a scoop of vanilla ice cream.",
      image: "https://www.inspiredtaste.net/wp-content/uploads/2024/01/Brownies-Recipe-Video.jpg",
    },
    {
      category: "Desserts",
      name: "Panna Cotta",
      price: 649,
      description: "Italian cream dessert topped with berry compote.",
      image: "https://pescetarian.kitchen/wp-content/uploads/2017/01/IMG_1061.jpg",
    },
    {
      category: "Desserts",
      name: "Fruit Salad",
      price: 549,
      description: "A refreshing mix of seasonal fruits.",
      image: "https://www.allrecipes.com/thmb/mGecJKNyVR8falSfCUfnK1-PS7Q=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/214947-perfect-summer-fruit-salad-ddmfs-3x4-0663-30f68a9db5a442b9a860d88ba5ec6f78.jpg",
    },
    {
      category: "Desserts",
      name: "Lemon Meringue Pie",
      price: 629,
      description: "Tangy lemon curd topped with fluffy meringue.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxz-xbeoE4fgbiAu6v7rD4WlqR7t8ECvtPfg&s",
    },
  
    // Beverages
    {
      category: "Beverages",
      name: "Lemonade",
      price: 299,
      description: "Freshly squeezed lemonade served chilled.",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2022/06/lemonade.jpg",
    },
    {
      category: "Beverages",
      name: "Iced Tea",
      price: 249,
      description: "Chilled black tea with a splash of lemon.",
      image: "https://www.thespruceeats.com/thmb/jk3sZ3Jtq2WPnd31DrB-FR1qfs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/summer-peach-tea-cocktail-recipe-761506-hero-01-f949acc1ed22404da03ce72648412bcf.jpg",
    },
    {
      category: "Beverages",
      name: "Cappuccino",
      price: 399,
      description: "Classic Italian espresso topped with steamed milk and foam.",
      image: "https://static01.nyt.com/images/2015/10/02/fashion/02CAPP3SUB/02CAPP3SUB-superJumbo.jpg",
    },
    {
      category: "Beverages",
      name: "Latte",
      price: 349,
      description: "Espresso with steamed milk and a light layer of foam.",
      image: "https://images.arla.com/recordid/F2DA5762-13BB-4FF4-88839FDE14DE1993/chocolate-latte.jpg?width=1200&height=630&mode=crop&format=jpg",
    },
    {
      category: "Beverages",
      name: "Mocha",
      price: 429,
      description: "A rich espresso drink with chocolate syrup and steamed milk.",
      image: "https://athome.starbucks.com/sites/default/files/2021-06/1_CAH_CaffeMocha_Hdr_2880x16602.jpg",
    },
    {
      category: "Beverages",
      name: "Espresso",
      price: 249,
      description: "Strong Italian coffee served black.",
      image: "https://www.tasteofhome.com/wp-content/uploads/2023/03/TOH-espresso-GettyImages-1291298315-JVcrop.jpg",
    },
    {
      category: "Beverages",
      name: "Hot Chocolate",
      price: 299,
      description: "Creamy hot chocolate topped with whipped cream.",
      image: "https://assets.bonappetit.com/photos/57accdd1f1c801a1038bc794/4:3/w_1440,h_1080,c_limit/Hot-Chocolate-2-of-5.jpg",
    },
    {
      category: "Beverages",
      name: "Iced Coffee",
      price: 349,
      description: "Chilled coffee with a touch of cream and sugar.",
      image: "https://www.allrecipes.com/thmb/8phuC-bVeBCob5yx4rBKM7ajBsw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21667-easy-iced-coffee-ddmfs-2x1-0091-18b743db97f5495e9e152b034e211b4c.jpg",
    },
    {
      category: "Beverages",
      name: "Smoothie",
      price: 449,
      description: "Fresh fruit smoothie made with yogurt and ice.",
      image: "https://hips.hearstapps.com/hmg-prod/images/delish-how-to-make-a-smoothie-horizontal-1542310071.png?crop=1xw:0.843328335832084xh;center,top&resize=1200:*",
    },
    {
      category: "Beverages",
      name: "Milkshake",
      price: 549,
      description: "Creamy milkshake made with vanilla ice cream.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4yujjblphOx09VopgqC8uhM6JGBtPoTFjAA&s",
    },
    {
      category: "Beverages",
      name: "Fruit Punch",
      price: 399,
      description: "Refreshing fruit punch made with tropical fruits.",
      image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Uyp-SXVRgi9uPUGFA1xm-Q573gtce1RPVg&s",
    },
  ];
  

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    console.log("Users collection cleared");

    // Hash passwords
    const bcrypt = require("bcrypt");
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Add users to the database
    await User.insertMany(users);
    console.log("Users added");

    // Create menu schema and model dynamically
    const MenuSchema = new mongoose.Schema({
      category: String,
      name: String,
      price: Number,
      description: String,
      image: String, // Added image field
    });

    const Menu = mongoose.model("Menu", MenuSchema);

    // Clear existing menu data
    await Menu.deleteMany({});
    console.log("Menu collection cleared");

    // Add menu items
    await Menu.insertMany(menuItems);
    console.log("Menu items added");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding the database:", err);
  }
};

seedDatabase();

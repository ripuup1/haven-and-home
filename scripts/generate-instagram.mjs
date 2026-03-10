import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const PRODUCTS_DIR = join(ROOT, "public", "images", "products");
const OUTPUT_DIR = join(ROOT, "public", "instagram");

// Load fonts
const playfairBold = readFileSync(join(ROOT, "scripts/fonts/PlayfairDisplay-Bold.ttf"));
const latoRegular = readFileSync(join(ROOT, "scripts/fonts/Lato-Regular.ttf"));
const latoBold = readFileSync(join(ROOT, "scripts/fonts/Lato-Bold.ttf"));

const fonts = [
  { name: "Playfair", data: playfairBold, weight: 700, style: "normal" },
  { name: "Lato", data: latoRegular, weight: 400, style: "normal" },
  { name: "Lato", data: latoBold, weight: 700, style: "normal" },
];

const COLORS = {
  cream: "#F5EDE0",
  charcoal: "#3D3D3D",
  terracotta: "#C67C5B",
  olive: "#6B7F4E",
  clay: "#B8866B",
  softWhite: "#FAF8F5",
};

// ============================================================
// POST DATA
// ============================================================
const POSTS = [
  {
    num: 1,
    title: "5 under-sink organizers that actually work",
    subtitle: "Say goodbye to cabinet chaos",
    blog: "havenandhome.live/blog/under-sink-organizers",
    hook: "That cabinet under your sink? It doesn't have to be a disaster zone.",
    products: [
      { name: "Stackable Under-Sink Shelf", price: "$22", img: "stackable_cabinet_shelf_riser.jpg", desc: "Creates two levels of storage instantly" },
      { name: "Pull-Out Drawer Organizer", price: "$28", img: "pull_out_under_sink_organizer_sliding_drawer.jpg", desc: "Slides out so you can see everything" },
      { name: "Tension Rod for Spray Bottles", price: "$10", img: "tension_rod_under_sink_spray_bottle_holder.jpg", desc: "Hang bottles, free up the floor" },
      { name: "Clear Storage Bins (2-Pack)", price: "$16", img: "stackable_under_sink_organizer_2_pack.jpg", desc: "See what you have without digging" },
      { name: "Door-Mounted Rack", price: "$18", img: "over_cabinet_door_organizer.jpg", desc: "Use wasted door space for sponges and gloves" },
    ],
  },
  {
    num: 2,
    title: "The $100 living room refresh",
    subtitle: "5 pieces that change everything",
    blog: "havenandhome.live/blog/cozy-living-room-decor",
    hook: "You don't need a full makeover. Just these 5 pieces.",
    products: [
      { name: "Textured Throw Pillow Covers", price: "$18", img: "textured_throw_pillow_covers_18x18_set_of_2_linen_neutral.jpg", desc: "Instant sofa upgrade, neutral tones" },
      { name: "Chunky Knit Throw Blanket", price: "$34", img: "chunky_knit_throw_blanket_machine_washable.jpg", desc: "The cozy factor is unmatched" },
      { name: "Ceramic Vase Set", price: "$24", img: "ceramic_vase_set_of_3_matte_white_minimalist.jpg", desc: "Three vases, endless styling options" },
      { name: "Flameless LED Candles", price: "$22", img: "flameless_LED_candles_with_remote_set.jpg", desc: "Ambiance without the fire risk" },
      { name: "Woven Storage Basket", price: "$26", img: "woven_storage_basket_large_living_room.jpg", desc: "Hides blankets, looks like decor" },
    ],
  },
  {
    num: 3,
    title: "Kitchen gadgets under $30 worth buying",
    subtitle: "No gimmicks, just things that work",
    blog: "havenandhome.live/blog/kitchen-gadgets-under-30",
    hook: "Not another avocado slicer. These are the ones you'll actually use.",
    products: [
      { name: "Compact Dish Drying Rack", price: "$28", img: "compact_dish_drying_rack.jpg", desc: "Drains into the sink, saves counter space" },
      { name: "Magnetic Spice Jars (12-Pack)", price: "$26", img: "magnetic_spice_jars_set.jpg", desc: "Mount on your fridge, see every spice" },
      { name: "Under-Shelf Basket", price: "$14", img: "under_shelf_wire_basket.jpg", desc: "Creates hidden shelf space instantly" },
      { name: "Bamboo Drawer Dividers", price: "$24", img: "adjustable_bamboo_drawer_dividers_set_of_4.jpg", desc: "Expandable to fit any drawer" },
      { name: "Silicone Utensil Set", price: "$22", img: "splatter_screen_frying_pan.jpg", desc: "Heat resistant, easy to clean" },
    ],
  },
  {
    num: 4,
    title: "How to make your bed look like a hotel",
    subtitle: "4 pieces, under $80",
    blog: "havenandhome.live/blog/hotel-bed-styling",
    hook: "4 pieces. Under $80. Hotel vibes every morning.",
    products: [
      { name: "White Duvet Cover Set", price: "$38", img: "white_duvet_cover_set_queen.jpg", desc: "Crisp, hotel-quality, wrinkle resistant" },
      { name: "Euro Pillow Shams (Set of 2)", price: "$24", img: "euro_pillow_shams_26x26_set_of_2_white.jpg", desc: "The layered look in 10 seconds" },
      { name: "Textured Throw Pillows", price: "$18", img: "textured_throw_pillow_covers_18x18_set_of_2_linen_neutral.jpg", desc: "Adds depth without looking fussy" },
      { name: "Bed Throw Blanket", price: "$34", img: "chunky_knit_throw_blanket.jpg", desc: "Draped at the foot for that hotel finish" },
    ],
  },
  {
    num: 5,
    title: "Closet organizers that triple your space",
    subtitle: "Stop fighting with your closet",
    blog: "havenandhome.live/blog/closet-organizers",
    hook: "Your closet isn't too small. It's just not organized right.",
    products: [
      { name: "Velvet Hangers (50 Pack)", price: "$22", img: "velvet_hangers_50_pack_non_slip.jpg", desc: "Slim profile, clothes never slip" },
      { name: "Acrylic Shelf Dividers", price: "$18", img: "acrylic_shelf_dividers_closet_4_pack.jpg", desc: "Keep folded stacks from toppling" },
      { name: "Hanging Closet Organizer", price: "$16", img: "hanging_closet_organizer_6_shelf.jpg", desc: "Six shelves of vertical storage" },
      { name: "Clear Stackable Shoe Boxes", price: "$28", img: "clear_stackable_shoe_boxes.jpg", desc: "See every pair, stack to the ceiling" },
    ],
  },
  {
    num: 6,
    title: "Bathroom finds that look way more expensive",
    subtitle: "Everything here is under $20",
    blog: "havenandhome.live/blog/bathroom-essentials-under-20",
    hook: "Everything here is under $20. Nobody will believe you.",
    products: [
      { name: "Ceramic Soap Dispenser Set", price: "$18", img: "ceramic_soap_dispenser_set_bathroom.jpg", desc: "Matte finish, instant counter upgrade" },
      { name: "Bamboo Towel Rack", price: "$16", img: "bamboo_towel_rack_wall_mount_with_shelf.jpg", desc: "Wall-mount with a shelf on top" },
      { name: "Glass Apothecary Jars", price: "$19", img: "glass_apothecary_jars_bathroom_set_3_pack.jpg", desc: "Spa vibes for cotton balls and salts" },
      { name: "Adhesive Towel Hooks", price: "$12", img: "adhesive_towel_hooks_brushed_gold_4_pack.jpg", desc: "Gold finish, no drilling required" },
      { name: "Shower Clock (Waterproof)", price: "$14", img: "waterproof_shower_clock.jpg", desc: "Never lose track of time in there" },
    ],
  },
  {
    num: 7,
    title: "Studio apartment storage secrets",
    subtitle: "Big solutions for tiny spaces",
    blog: "havenandhome.live/blog/studio-apartment-storage",
    hook: "Small space? These 6 products create storage where you thought there was none.",
    products: [
      { name: "Bed Risers with USB", price: "$29", img: "bed_risers_with_USB_outlets_power.jpg", desc: "3 inches of under-bed storage + charging" },
      { name: "Over-Door Pantry Organizer", price: "$28", img: "over_door_pantry_organizer_9_tier.jpg", desc: "Nine tiers, zero floor space" },
      { name: "Floating Shelves (Set of 3)", price: "$29", img: "floating_shelves_set_of_3_rustic_wood.jpg", desc: "Vertical storage that looks like decor" },
      { name: "Storage Ottoman", price: "$34", img: "storage_ottoman_with_lid_foldable.jpg", desc: "Seating, storage, and a footrest in one" },
      { name: "Vacuum Storage Bags", price: "$18", img: "vacuum_storage_bags_10_pack.jpg", desc: "Shrink seasonal clothes to nothing" },
    ],
  },
  {
    num: 8,
    title: "Best desk setup for working from home",
    subtitle: "A clean desk changes everything",
    blog: "havenandhome.live/blog/desk-organizers-clean-workspace",
    hook: "A clean desk changes how your whole day feels.",
    products: [
      { name: "Bamboo Desk Organizer", price: "$28", img: "bamboo_desk_organizer_with_drawers.jpg", desc: "Compartments for everything on your desk" },
      { name: "Cable Management Tray", price: "$16", img: "under_desk_cable_management_tray.jpg", desc: "Hides every cord under the desk" },
      { name: "Monitor Stand with Storage", price: "$32", img: "monitor_stand_riser_with_storage.jpg", desc: "Ergonomic height + hidden drawers" },
      { name: "Leather Desk Pad", price: "$16", img: "leather_desk_pad.jpg", desc: "Protects surface, looks expensive" },
    ],
  },
  {
    num: 9,
    title: "Amazon home finds under $20",
    subtitle: "Boutiqueworth looks, Amazon prices",
    blog: "havenandhome.live/blog/amazon-home-finds-under-20",
    hook: "These look like they came from a boutique. They came from Amazon.",
    products: [
      { name: "Linen Tissue Box Cover", price: "$12", img: "rattan_tissue_box_cover_woven.jpg", desc: "Hides the ugly cardboard box" },
      { name: "Natural Table Runner", price: "$14", img: "linen_table_runner_neutral_beige.jpg", desc: "Instant dining table upgrade" },
      { name: "Decorative Book Stack", price: "$22", img: "decorative_book_stack_set_coffee_table.jpg", desc: "Coffee table styling made easy" },
      { name: "Scalloped Decorative Tray", price: "$17", img: "scalloped_decorative_tray.jpg", desc: "Groups random items into a vignette" },
    ],
  },
  {
    num: 10,
    title: "Pantry organization that actually lasts",
    subtitle: "Set it up once, enjoy it forever",
    blog: "havenandhome.live/blog/pantry-organization-ideas",
    hook: "Most pantry makeovers fall apart in 2 weeks. These products don't.",
    products: [
      { name: "Clear Pantry Bins", price: "$24", img: "clear_storage_bins_with_lids.jpg", desc: "See everything at a glance" },
      { name: "Bamboo Lazy Susan", price: "$18", img: "bamboo_lazy_susan_turntable_kitchen_cabinet_10_inch.jpg", desc: "Spin to find what you need" },
      { name: "Handheld Label Maker", price: "$20", img: "handheld_label_maker.jpg", desc: "Clean labels for every container" },
      { name: "Can Rack Organizer", price: "$16", img: "can_rack_organizer_pantry.jpg", desc: "Stacks cans, auto-rotates oldest forward" },
      { name: "Airtight Food Containers", price: "$28", img: "airtight_food_storage_containers.jpg", desc: "Keeps flour, rice, cereal fresh" },
    ],
  },
  {
    num: 11,
    title: "Laundry room upgrades under $30",
    subtitle: "Make chore day less painful",
    blog: "havenandhome.live/blog/laundry-room-upgrades",
    hook: "Nobody loves laundry. But your laundry room doesn't have to be depressing.",
    products: [
      { name: "3-Section Sorting Hamper", price: "$28", img: "laundry_sorting_hamper_3_section.jpg", desc: "Sort as you go, save time later" },
      { name: "Collapsible Drying Rack", price: "$24", img: "wall_mounted_drying_rack.jpg", desc: "Folds flat, holds a full load" },
      { name: "Magnetic Lint Roller Holder", price: "$14", img: "magnetic_lint_roller_holder.jpg", desc: "Grab on your way out the door" },
      { name: "Over-Washer Shelf", price: "$26", img: "rolling_cart_3_tier.jpg", desc: "Uses the space above your machines" },
    ],
  },
  {
    num: 12,
    title: "The perfect entryway drop zone",
    subtitle: "No mudroom? No problem.",
    blog: "havenandhome.live/blog/entryway-organizers-small-homes",
    hook: "No mudroom? No problem. Here's how to fake one.",
    products: [
      { name: "Wall-Mount Key Holder", price: "$16", img: "wall_key_holder_with_shelf.jpg", desc: "Keys, wallet, sunglasses - one spot" },
      { name: "Bamboo Shoe Bench", price: "$38", img: "bamboo_shoe_rack_bench.jpg", desc: "Seating on top, shoe storage below" },
      { name: "Over-Door Hooks (Set of 6)", price: "$14", img: "over_door_hooks_heavy_duty_brushed_nickel.jpg", desc: "Coats, bags, scarves - handled" },
      { name: "Mail Organizer", price: "$18", img: "wall_mounted_mail_organizer.jpg", desc: "No more counter pile-up" },
    ],
  },
  {
    num: 13,
    title: "Turn your bathroom into a spa",
    subtitle: "Self-care setup for under $50",
    blog: "havenandhome.live/blog/spa-bathroom-amazon-finds",
    hook: "Spa day at home for under $50. Yes, really.",
    products: [
      { name: "Bamboo Bath Caddy", price: "$28", img: "bamboo_bath_caddy_tray.jpg", desc: "Book, wine, phone, candle - all within reach" },
      { name: "Eucalyptus Shower Bundle", price: "$12", img: "eucalyptus_shower_bundle.jpg", desc: "Spa scent from steam, lasts weeks" },
      { name: "Turkish Cotton Towels", price: "$32", img: "white_cotton_towel_set.jpg", desc: "Hotel-thick, gets softer with each wash" },
      { name: "Flameless LED Candles", price: "$22", img: "flameless_LED_candles_with_remote_set.jpg", desc: "Set the mood with zero fire risk" },
      { name: "Bath Pillow", price: "$18", img: "spa_bath_pillow.jpg", desc: "Neck support for longer soaks" },
    ],
  },
  {
    num: 14,
    title: "Nightstand styling that's actually useful",
    subtitle: "Looks good AND works hard",
    blog: "havenandhome.live/blog/bedroom-nightstand-essentials",
    hook: "A styled nightstand that works as hard as it looks.",
    products: [
      { name: "LED Lamp with USB Charging", price: "$28", img: "led_desk_lamp_usb.jpg", desc: "Light + charging in one" },
      { name: "Ceramic Trinket Tray", price: "$12", img: "ceramic_trinket_tray.jpg", desc: "Corrals rings, watch, and chapstick" },
      { name: "Stone Coasters (Set of 4)", price: "$14", img: "absorbent_stone_coasters_set.jpg", desc: "No more water rings on wood" },
      { name: "White Noise Machine", price: "$24", img: "white_noise_machine.jpg", desc: "Better sleep, blocks everything" },
    ],
  },
  {
    num: 15,
    title: "Best throw blankets for every season",
    subtitle: "The right throw changes everything",
    blog: "havenandhome.live/blog/best-throw-blankets-amazon",
    hook: "The right throw blanket makes your whole couch look different.",
    products: [
      { name: "Chunky Knit Throw", price: "$34", img: "chunky_knit_throw_blanket_machine_washable.jpg", desc: "Statement piece, machine washable" },
      { name: "Muslin Throw Blanket", price: "$28", img: "muslin_cotton_throw_blanket.jpg", desc: "Lightweight, perfect for warm months" },
      { name: "Sherpa Fleece Blanket", price: "$26", img: "fleece_sherpa_throw_blanket.jpg", desc: "Cloud-soft for movie nights" },
      { name: "Waffle Weave Cotton Throw", price: "$32", img: "lightweight_throw_blanket_for_foot_of_bed.jpg", desc: "Year-round classic texture" },
      { name: "Weighted Throw Blanket", price: "$38", img: "weighted_throw_blanket.jpg", desc: "Calming pressure, cozy weight" },
    ],
  },
  {
    num: 16,
    title: "Fridge organization in 20 minutes",
    subtitle: "6 products, one organized fridge",
    blog: "havenandhome.live/blog/organized-fridge-essentials",
    hook: "20 minutes and 6 products. That's all it takes.",
    products: [
      { name: "Clear Fridge Bins (Set of 6)", price: "$24", img: "clear_fridge_storage_bins.jpg", desc: "Group items, see everything" },
      { name: "Fridge Lazy Susan", price: "$14", img: "bamboo_lazy_susan_turntable_kitchen_cabinet_10_inch.jpg", desc: "No more forgotten condiments" },
      { name: "Egg Holder (14 Count)", price: "$10", img: "egg_holder_container.jpg", desc: "Stackable, saves door space" },
      { name: "Can Dispenser", price: "$16", img: "can_rack_organizer_pantry.jpg", desc: "Auto-rolls to the front" },
      { name: "Produce Saver Containers", price: "$22", img: "produce_saver_containers.jpg", desc: "Keeps fruits and veggies fresh 2x longer" },
    ],
  },
  {
    num: 17,
    title: "Rental kitchen glow-up",
    subtitle: "No renovation required",
    blog: "havenandhome.live/blog/rental-kitchen-look-expensive",
    hook: "You can't renovate. But you CAN upgrade.",
    products: [
      { name: "Peel-and-Stick Backsplash", price: "$32", img: "peel_stick_backsplash_tiles.jpg", desc: "Biggest visual change, removable" },
      { name: "Cabinet Hardware Pulls", price: "$18", img: "cabinet_hardware_pulls_black.jpg", desc: "Swap handles, new kitchen in 20 min" },
      { name: "Shelf Risers", price: "$18", img: "stackable_cabinet_shelf_riser.jpg", desc: "Double your cabinet space" },
      { name: "LED Strip Lights", price: "$14", img: "under_cabinet_led_strip.jpg", desc: "Under-cabinet glow, plug and stick" },
    ],
  },
  {
    num: 18,
    title: "Floating shelves that hold real weight",
    subtitle: "Not the ones that sag on day one",
    blog: "havenandhome.live/blog/floating-shelves-hold-weight",
    hook: "Most floating shelves sag the second you put a book on them. Not these.",
    products: [
      { name: "Rustic Wood Set (3)", price: "$29", img: "floating_shelves_set_of_3_rustic_wood.jpg", desc: "15 lbs each, invisible brackets" },
      { name: "White Modern Shelves", price: "$24", img: "white_modern_floating_shelf.jpg", desc: "Clean look, solid mounting" },
      { name: "Corner Floating Shelf", price: "$18", img: "corner_floating_shelf.jpg", desc: "Uses dead corner space" },
      { name: "Bathroom Floating Shelf", price: "$22", img: "bathroom_floating_shelf_towel_bar.jpg", desc: "Shelf + towel bar combo" },
    ],
  },
  {
    num: 19,
    title: "Coffee station essentials",
    subtitle: "Your morning routine, upgraded",
    blog: "havenandhome.live/blog/coffee-station-essentials",
    hook: "A dedicated coffee corner changes your entire morning.",
    products: [
      { name: "Mug Tree Stand", price: "$18", img: "mug_tree_holder.jpg", desc: "Display your favorites, save cabinet space" },
      { name: "Airtight Coffee Canister", price: "$16", img: "airtight_food_storage_containers.jpg", desc: "Keeps beans fresh for weeks" },
      { name: "Sugar & Cream Set", price: "$14", img: "ceramic_soap_dispenser_set_bathroom.jpg", desc: "Matching set looks polished" },
      { name: "Wooden Serving Tray", price: "$22", img: "acacia_wood_serving_board.jpg", desc: "Corrals everything into one spot" },
      { name: "K-Cup Drawer Organizer", price: "$20", img: "kcup_storage_drawer.jpg", desc: "36 pods, slides under the machine" },
    ],
  },
  {
    num: 20,
    title: "Wall art under $30 for every room",
    subtitle: "Bare walls? Not anymore.",
    blog: "havenandhome.live/blog/affordable-wall-art-under-30",
    hook: "Bare walls make a room feel unfinished. These fix that for under $30.",
    products: [
      { name: "Abstract Print Set", price: "$24", img: "abstract_wall_art_print_set.jpg", desc: "Three prints, neutral tones, ready to frame" },
      { name: "Macrame Wall Hanging", price: "$22", img: "macrame_wall_hanging.jpg", desc: "Adds texture and warmth to any wall" },
      { name: "Gallery Frame Set (5)", price: "$28", img: "gallery_wall_frame_set.jpg", desc: "Instant gallery wall, templates included" },
      { name: "Botanical Print Set", price: "$18", img: "botanical_print_set_framed.jpg", desc: "Pre-framed, botanical illustrations" },
    ],
  },
];

// ============================================================
// HASHTAG SETS
// ============================================================
const HASHTAG_SETS = [
  "#homedecor #homeorganization #amazonfinds #amazonfavorites #amazonhome #homeinspo #homefinds #cozyhome #organizationideas #declutter #tidyhome #homehacks #budgethomedecor #affordablehomedecor #renterfriendly #smallspaceliving #apartmenttherapy",
  "#amazonfinds #amazonhome #amazonmusthaves #founditonamazon #homedecor #homestyle #interiordesign #neutralhome #modernhome #homeorganizing #organizedhome #storageideas #homedecortips #homeideas #budgethomedecor #cozyhome",
  "#amazonfavorites #amazonhomefinds #amazondeals #homeorganization #declutter #organizingtips #homeinspo #homefinds #tidyhome #homehacks #apartmenttherapy #affordablehomedecor #renterfriendly #smallspaceliving #neutralhome #cozyhome",
  "#homedecor #amazonfavorites #amazonhome #founditonamazon #homestyle #interiordesign #homeinspo #modernhome #cozyhome #organizationideas #homeorganizing #storageideas #budgethomedecor #homedecortips #homeideas #organizedhome",
];

// ============================================================
// CAPTION GENERATOR
// ============================================================
function generateCaption(post, hashIndex) {
  const productList = post.products.map((p) => `${p.name} - ${p.price}`).join("\n");
  const hashtags = HASHTAG_SETS[hashIndex % HASHTAG_SETS.length];

  const bodies = {
    1: `The space under your sink is either organized or a disaster. There's no in-between.\n\nThese 5 products are designed specifically for the awkward pipes and limited space under kitchen and bathroom sinks. The pull-out drawer alone is a game changer - no more getting on your hands and knees to find the dish soap.\n\nThe total cost is under $95, and the whole project takes about 30 minutes. That's a pretty good return for turning your most chaotic cabinet into one that makes sense.\n\nProducts featured:\n${productList}\n\nSave this post for your next organizing weekend. Link in bio for all our favorites.\n\nTag someone whose under-sink cabinet needs help.\n\n${hashtags}`,
    2: `A living room refresh doesn't need to cost thousands. These 5 pieces add up to about $100 and they completely change how a room feels.\n\nThe trick is layering textures. A knit throw on the sofa, linen pillow covers, a woven basket on the floor, ceramic vases on the shelf, and candles for warm light in the evening. None of these are big purchases. Together, they're a transformation.\n\nEvery piece here is from Amazon and ships fast. Swap out what you have, donate the old stuff, and enjoy the upgrade.\n\nProducts featured:\n${productList}\n\nSave this for your next refresh. Link in bio for all product links.\n\n${hashtags}`,
    3: `There are thousands of kitchen gadgets on Amazon. Most of them are useless. These are the ones that actually earn their counter space.\n\nEvery product here is under $30 and solves a real problem. The magnetic spice jars free up an entire drawer. The drawer dividers stop the utensil chaos. The dish rack drains directly into the sink so you never deal with standing water.\n\nNo gimmicks, no unitaskers, no things that end up in the donation pile six months later.\n\nProducts featured:\n${productList}\n\nSave this for your next Amazon order. Link in bio for the full list.\n\n${hashtags}`,
    4: `Hotels spend serious money making beds look incredible. You can get the same look for under $80.\n\nThe formula is simple: crisp white duvet, oversized Euro shams behind your sleeping pillows, one or two textured throw pillows, and a blanket draped across the foot. That's it. Four layers.\n\nIt takes about 3 minutes to make every morning, and it makes your entire bedroom feel like a retreat.\n\nProducts featured:\n${productList}\n\nSave this for your bedroom upgrade. Link in bio for everything shown.\n\nTag someone who needs this.\n\n${hashtags}`,
    5: `If your closet feels too small, the problem probably isn't the closet. It's the hangers, the stacking strategy, and the wasted vertical space.\n\nVelvet hangers alone create 30% more rod space compared to plastic ones. Shelf dividers keep sweater stacks from avalanching. A hanging organizer turns dead vertical space into six usable shelves.\n\nEvery one of these is under $30 and installs in minutes. No tools, no renovation, just better use of what you already have.\n\nProducts featured:\n${productList}\n\nSave this for your next closet cleanout. Link in bio.\n\n${hashtags}`,
    6: `Nobody needs to know your bathroom was styled entirely from Amazon. These five products look like they came from a design store, and they're all under $20.\n\nThe soap dispenser set alone makes your counter look more put together. Add gold towel hooks, glass apothecary jars for cotton balls, and a wall-mounted towel rack with a shelf, and you have a bathroom that feels intentional.\n\nBig bathroom energy on a small bathroom budget.\n\nProducts featured:\n${productList}\n\nSave this. Link in bio for all product links.\n\nTag someone who needs a bathroom upgrade.\n\n${hashtags}`,
    7: `Studio apartment living means every square inch matters. These products create storage in places you didn't know you had.\n\nBed risers give you 3 inches of under-bed storage plus USB charging. An over-door organizer adds nine tiers without using a single shelf. Vacuum bags shrink winter clothes to almost nothing.\n\nThe key is thinking vertically and using the backs of doors, the space under furniture, and furniture that doubles as storage.\n\nProducts featured:\n${productList}\n\nSave this for small space inspiration. Link in bio for everything.\n\n${hashtags}`,
    8: `Your desk is where you spend 8+ hours a day. It should be organized.\n\nA bamboo organizer corrals pens and supplies. A cable management tray hides every cord under the desk. A monitor stand raises your screen to eye level and adds storage drawers. A leather desk pad ties it all together.\n\nTotal investment: about $90. Total time to set up: 15 minutes. The productivity boost? Priceless.\n\nProducts featured:\n${productList}\n\nSave this for your home office setup. Link in bio.\n\n${hashtags}`,
    9: `Amazon has thousands of home decor items. Most look cheap. These don't.\n\nA linen tissue box cover replaces the ugly cardboard. A table runner adds instant warmth to a dining table. A scalloped tray turns random items into a styled vignette. Decorative books make any shelf or coffee table look curated.\n\nEverything here is under $22 and ships in two days.\n\nProducts featured:\n${productList}\n\nSave this for your next haul. Link in bio for all links.\n\n${hashtags}`,
    10: `Pantry makeovers that last aren't about aesthetics. They're about systems.\n\nClear bins so you can see what you have. A lazy Susan so nothing gets lost in the back. A label maker so everyone in the house knows where things go. Airtight containers so dry goods stay fresh.\n\nSet it up once and you'll open your pantry every day feeling like you have your life together.\n\nProducts featured:\n${productList}\n\nSave this for your pantry project. Link in bio.\n\nTag your pantry-obsessed friend.\n\n${hashtags}`,
    11: `Your laundry room might be the most neglected room in your house. These four products change that for under $100.\n\nA 3-section hamper means you're sorting as you go instead of spending 20 minutes before every load. A collapsible drying rack saves your delicates. A wall-mount lint roller holder is genius by the door.\n\nYou still have to do laundry. But at least the room won't depress you.\n\nProducts featured:\n${productList}\n\nSave this. Link in bio for all product links.\n\n${hashtags}`,
    12: `You don't need a big entryway to have an organized one. You just need the right products.\n\nA wall-mount key holder with a shelf catches everything when you walk in. A shoe bench handles footwear and gives you a place to sit. Over-door hooks multiply your hanging space. A mail organizer stops the counter pile.\n\nThis is the drop zone that stops your house from falling into chaos.\n\nProducts featured:\n${productList}\n\nSave this for your entryway project. Link in bio.\n\n${hashtags}`,
    13: `A spa-like bathroom is not about the size of the space. It's about what's in it.\n\nA bamboo bath caddy turns a regular bath into a ritual. Fresh eucalyptus releases spa scent from the steam. Thick Turkish towels feel like a hotel. Flameless candles set the mood without the worry.\n\nTotal investment: under $50. Return on relaxation: unlimited.\n\nProducts featured:\n${productList}\n\nSave this for self-care Sunday. Link in bio for everything shown.\n\n${hashtags}`,
    14: `Most nightstands are a mess of tangled chargers, old receipts, and random stuff. These four products fix that.\n\nA lamp with built-in USB means one less cable. A trinket tray corrals the small stuff. Stone coasters protect the wood. A white noise machine improves your sleep immediately.\n\nFunctional and styled. That's the goal.\n\nProducts featured:\n${productList}\n\nSave this. Link in bio for all products.\n\n${hashtags}`,
    15: `A throw blanket isn't just for warmth. It's a styling tool.\n\nDraped over a sofa arm, folded at the foot of a bed, or tossed in a basket, the right throw adds texture and color to any room.\n\nThis post covers a throw for every season and every mood. Chunky knit for winter cozy, muslin for summer lightweight, sherpa for movie nights, waffle weave for year-round, and a weighted option for calm.\n\nProducts featured:\n${productList}\n\nSave this. Link in bio for all favorites.\n\n${hashtags}`,
    16: `You can organize your entire fridge in 20 minutes. These 6 products make it happen.\n\nClear bins group items so you can see everything. A lazy Susan makes the back of the fridge accessible again. Produce savers keep fruits and veggies fresh twice as long. The egg holder frees up door space.\n\nDo it on grocery day and thank yourself all week.\n\nProducts featured:\n${productList}\n\nSave this for fridge clean-out day. Link in bio.\n\nTag someone who opens their fridge and sighs.\n\n${hashtags}`,
    17: `Renters: you can make your kitchen look expensive without touching anything permanent.\n\nPeel-and-stick backsplash tiles are the biggest visual change for the least effort. New matte black cabinet pulls replace builder-grade hardware in 20 minutes. LED strip lights under the cabinets add an expensive glow. Shelf risers double your cabinet space.\n\nAll removable, all under $30 each.\n\nProducts featured:\n${productList}\n\nSave this for your rental glow-up. Link in bio.\n\n${hashtags}`,
    18: `Floating shelves are great until they sag the second you put something on them.\n\nThese don't. Every shelf here holds at least 15 lbs and has proper mounting hardware. Rustic wood, modern white, corner options, and a bathroom combo with a towel bar.\n\nThe key is heavy-duty anchors and shelves that are actually thick enough to handle real stuff.\n\nProducts featured:\n${productList}\n\nSave this for your next wall project. Link in bio.\n\n${hashtags}`,
    19: `A coffee station isn't just convenient. It's a daily ritual spot that makes your morning better.\n\nA mug tree displays your favorite cups. An airtight canister keeps beans fresh. A wooden tray corrals everything into one styled area. A K-cup drawer slides under the machine and holds 36 pods.\n\nIt's a small corner of your kitchen that brings a lot of joy.\n\nProducts featured:\n${productList}\n\nSave this for your coffee corner plans. Link in bio.\n\n${hashtags}`,
    20: `Bare walls make a room feel unfinished, but you don't need to spend hundreds to fix that.\n\nAbstract prints add modern texture. A macrame hanging adds warmth and dimension. A gallery frame set gives you an instant photo wall with hanging templates. Botanical prints bring nature indoors.\n\nEverything here is under $30 and makes a room feel complete.\n\nProducts featured:\n${productList}\n\nSave this for your next room refresh. Link in bio.\n\nTag someone with empty walls.\n\n${hashtags}`,
  };

  return bodies[post.num] || `${post.hook}\n\n${productList}\n\nSave this post. Link in bio.\n\n${hashtags}`;
}

// ============================================================
// SLIDE RENDERERS (satori JSX)
// ============================================================
function titleSlide(post) {
  return {
    type: "div",
    props: {
      style: {
        width: 1080, height: 1080, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: 80,
        backgroundColor: COLORS.cream, textAlign: "center",
      },
      children: [
        { type: "div", props: { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }, children: [
          { type: "div", props: { style: { fontFamily: "Lato", fontSize: 22, fontWeight: 700, color: COLORS.olive, letterSpacing: 4, textTransform: "uppercase" }, children: "Haven & Home" } },
          { type: "div", props: { style: { width: 60, height: 2, backgroundColor: COLORS.terracotta } } },
          { type: "div", props: { style: { fontFamily: "Playfair", fontSize: 72, fontWeight: 700, color: COLORS.charcoal, lineHeight: 1.15, maxWidth: 800 }, children: post.title } },
          { type: "div", props: { style: { fontFamily: "Lato", fontSize: 28, color: COLORS.clay, marginTop: 8 }, children: post.subtitle } },
          { type: "div", props: { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 24 }, children: [
            { type: "div", props: { style: { fontFamily: "Lato", fontSize: 20, color: COLORS.terracotta, fontWeight: 700 }, children: "Swipe to see our picks  \u2192" } },
          ] } },
        ] } },
      ],
    },
  };
}

function productSlide(product, slideNum, totalSlides) {
  return {
    type: "div",
    props: {
      style: {
        width: 1080, height: 1080, display: "flex", flexDirection: "column",
        backgroundColor: COLORS.softWhite,
      },
      children: [
        // Product image area (top 60%)
        { type: "div", props: {
          style: { width: 1080, height: 600, backgroundColor: COLORS.cream, display: "flex", justifyContent: "center", alignItems: "center" },
          children: [
            { type: "div", props: { style: { fontFamily: "Lato", fontSize: 24, color: COLORS.clay }, children: `[ ${product.name} ]` } },
          ],
        } },
        // Product info (bottom 40%)
        { type: "div", props: {
          style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", gap: 16 },
          children: [
            { type: "div", props: { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
              { type: "div", props: { style: { fontFamily: "Lato", fontSize: 18, color: COLORS.olive, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }, children: `${slideNum} of ${totalSlides}` } },
              { type: "div", props: { style: { fontFamily: "Lato", fontSize: 42, fontWeight: 700, color: COLORS.terracotta }, children: product.price } },
            ] } },
            { type: "div", props: { style: { fontFamily: "Playfair", fontSize: 42, fontWeight: 700, color: COLORS.charcoal, lineHeight: 1.2 }, children: product.name } },
            { type: "div", props: { style: { fontFamily: "Lato", fontSize: 26, color: COLORS.clay, lineHeight: 1.5 }, children: product.desc } },
            { type: "div", props: { style: { fontFamily: "Lato", fontSize: 18, color: COLORS.clay, marginTop: 8 }, children: "Haven & Home  |  havenandhome.live" } },
          ],
        } },
      ],
    },
  };
}

function ctaSlide(post) {
  return {
    type: "div",
    props: {
      style: {
        width: 1080, height: 1080, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: 80,
        backgroundColor: COLORS.cream, textAlign: "center",
      },
      children: [
        { type: "div", props: { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }, children: [
          { type: "div", props: { style: { fontFamily: "Playfair", fontSize: 56, fontWeight: 700, color: COLORS.charcoal, lineHeight: 1.2 }, children: "Save this post\nfor later" } },
          { type: "div", props: { style: { width: 60, height: 2, backgroundColor: COLORS.terracotta } } },
          { type: "div", props: { style: { fontFamily: "Lato", fontSize: 26, color: COLORS.clay, lineHeight: 1.6 }, children: "Follow @homeandhavencompany for\nmore home finds and tips" } },
          { type: "div", props: { style: { display: "flex", alignItems: "center", gap: 16, marginTop: 16, padding: "16px 40px", backgroundColor: COLORS.terracotta, borderRadius: 12 }, children: [
            { type: "div", props: { style: { fontFamily: "Lato", fontSize: 24, fontWeight: 700, color: "white" }, children: "Link in bio for all products" } },
          ] } },
          { type: "div", props: { style: { fontFamily: "Lato", fontSize: 18, color: COLORS.clay, marginTop: 24 }, children: post.blog } },
          { type: "div", props: { style: { fontFamily: "Lato", fontSize: 20, fontWeight: 700, color: COLORS.olive, letterSpacing: 3, textTransform: "uppercase", marginTop: 24 }, children: "Haven & Home" } },
        ] } },
      ],
    },
  };
}

// ============================================================
// RENDER + SAVE
// ============================================================
async function renderSlide(jsx, outputPath) {
  const svg = await satori(jsx, {
    width: 1080,
    height: 1080,
    fonts,
  });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1080 } });
  const png = resvg.render().asPng();
  const jpg = await sharp(png).jpeg({ quality: 92 }).toBuffer();
  writeFileSync(outputPath, jpg);
}

// Render product slide with actual product photo composited in
async function renderProductSlide(product, slideNum, totalProducts, outputPath) {
  const imgPath = join(PRODUCTS_DIR, product.img);
  const hasImage = existsSync(imgPath);

  // 1) Render the text overlay (bottom info card) — full 1080x1080
  const jsx = productSlide(product, slideNum, totalProducts);
  const svg = await satori(jsx, { width: 1080, height: 1080, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1080 } });
  const textPng = resvg.render().asPng();

  if (!hasImage) {
    // No product image — just save the text slide as-is
    const jpg = await sharp(textPng).jpeg({ quality: 92 }).toBuffer();
    writeFileSync(outputPath, jpg);
    return;
  }

  // 2) Resize product image to fill the top area (1080x600) with cover crop
  const productImg = await sharp(imgPath)
    .resize(1080, 600, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  // 3) Composite: start with the text slide, overlay product image on top area
  const final = await sharp(textPng)
    .composite([{ input: productImg, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toBuffer();

  writeFileSync(outputPath, final);
}

async function generatePost(post) {
  const postDir = join(OUTPUT_DIR, `post_${String(post.num).padStart(2, "0")}`);
  mkdirSync(postDir, { recursive: true });

  const totalProducts = post.products.length;
  const slides = [];

  // Slide 1: Title
  console.log(`  Post ${post.num}: Title slide...`);
  await renderSlide(titleSlide(post), join(postDir, "slide_1_title.jpg"));
  slides.push("slide_1_title.jpg");

  // Slides 2-N: Products (with real product photos)
  for (let i = 0; i < totalProducts; i++) {
    const slideNum = i + 2;
    const fname = `slide_${slideNum}_${post.products[i].name.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40)}.jpg`;
    const hasImg = existsSync(join(PRODUCTS_DIR, post.products[i].img));
    console.log(`  Post ${post.num}: Product slide ${i + 1}/${totalProducts}${hasImg ? "" : " (no image)"}...`);
    await renderProductSlide(
      post.products[i], i + 1, totalProducts,
      join(postDir, fname)
    );
    slides.push(fname);
  }

  // Final slide: CTA
  const ctaNum = totalProducts + 2;
  console.log(`  Post ${post.num}: CTA slide...`);
  await renderSlide(ctaSlide(post), join(postDir, `slide_${ctaNum}_cta.jpg`));
  slides.push(`slide_${ctaNum}_cta.jpg`);

  // Caption file
  const caption = generateCaption(post, post.num - 1);
  const captionContent = `INSTAGRAM POST ${post.num}
============================
Title: ${post.title}
Blog URL: ${post.blog}
Slides: ${slides.length} images

PRODUCTS FEATURED:
${post.products.map((p) => `- ${p.name} (${p.price})`).join("\n")}

CAPTION:
${caption}
`;
  writeFileSync(join(postDir, "caption.txt"), captionContent);
  console.log(`  Post ${post.num}: Done! (${slides.length} slides + caption)`);
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log("=== Haven & Home Instagram Content Generator ===\n");
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const post of POSTS) {
    console.log(`\nGenerating Post ${post.num}: "${post.title}"`);
    await generatePost(post);
  }

  console.log("\n=== All 20 posts generated! ===");
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);

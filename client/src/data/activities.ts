// ============================================================
// LEBANON RUSH — ACTIVITY DATA
// ------------------------------------------------------------
// To replace with real data later: simply edit the `activities`
// array below. Each entry must follow the Activity type.
// ============================================================

import adrenalineCategoryImage from "@/assets/categories/adrenaline.jpg";
import groupsCategoryImage from "@/assets/categories/groups.jpg";
import natureAndAnimalsCategoryImage from "@/assets/categories/nature-and-animals.jpg";
import shootingCategoryImage from "@/assets/categories/shooting.jpg";
import skyCategoryImage from "@/assets/categories/sky.jpg";
import snowCategoryImage from "@/assets/categories/snow.jpg";
import waterCategoryImage from "@/assets/categories/water.jpg";

export type Difficulty = "Easy" | "Moderate" | "Hard" | "Extreme";
export type CategoryName =
  | "Water"
  | "Sky"
  | "Snow"
  | "Nature and Animals"
  | "Groups"
  | "Shooting"
  | "Adrenaline"
  | "Hidden Gems";

export type Review = {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
};

export type PricePackage = {
  name: string;
  price: number;
  features: string[];
};

export type Activity = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  city: string;
  region: string;
  price: number;
  pricePackages: PricePackage[];
  rating: number;
  reviewCount: number;
  difficulty: Difficulty;
  duration: string;
  providerName: string;
  providerInitials: string; // for fake provider logo
  providerColor: string;    // tailwind gradient base
  description: string;
  shortDescription: string;
  images: string[]; // gradient seed strings — rendered as gradient cards
  included: string[];
  whatToBring: string[];
  safetyNotes: string[];
  ageRequirement: string;
  minPeople: number;
  maxPeople: number;
  groupSize: string;
  availableDays: string[];
  cancellationPolicy: string;
  coordinates: { lat: number; lng: number };
  badges: string[];
  reviews: Review[];
  image: string;
};

const fakeReviews = (seed: number, count: number, providerName: string): Review[] => {
  const names = ["Karim H.", "Lana A.", "Rami S.", "Nour B.", "Joe K.", "Maya T.", "Tarek F.", "Yara N.", "Sami D.", "Lea M.", "Hadi Z.", "Rita E."];
  const comments = [
    "Absolute rush — the team was professional and the views were unreal.",
    "Hands down one of the best things I've done in Lebanon. Worth every dollar.",
    "Solid experience. Equipment was new, guide was friendly, vibes were elite.",
    "Great for a weekend escape. Will be back with friends!",
    "The adrenaline hit different. Safety briefing was clear, execution was smooth.",
    "Stunning location. The whole crew made us feel comfortable from start to finish.",
  ];
  const tagsPool = ["Fun", "Safe", "Worth it", "Great guide", "Family Friendly", "Adrenaline", "Scenic"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    user: names[(seed + i) % names.length],
    rating: 4 + ((seed + i) % 2 === 0 ? 1 : 0) - (i % 5 === 0 ? 1 : 0),
    date: `2026-0${(i % 5) + 1}-1${(i % 9)}`,
    comment: comments[(seed + i) % comments.length].replace("the team", providerName),
    tags: [tagsPool[(seed + i) % tagsPool.length], tagsPool[(seed + i + 2) % tagsPool.length]],
  }));
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const buildPackages = (base: number): PricePackage[] => [
  { name: "Basic", price: base, features: ["Standard session", "Group experience", "Basic gear"] },
  { name: "Standard", price: Math.round(base * 1.5), features: ["Extended session", "Photos included", "Premium gear"] },
  { name: "Premium", price: Math.round(base * 2.2), features: ["Private session", "Photo + video pack", "Top-tier gear", "Priority booking"] },
];

const COLORS = [
  "from-cyan-400 via-blue-500 to-indigo-700",
  "from-blue-400 via-indigo-500 to-blue-900",
  "from-sky-400 via-blue-600 to-indigo-800",
  "from-cyan-300 via-blue-500 to-blue-900",
  "from-blue-300 via-blue-500 to-indigo-800",
  "from-teal-400 via-cyan-500 to-blue-800",
  "from-indigo-200 via-blue-400 to-cyan-300",
  "from-blue-500 via-indigo-600 to-blue-900",
  "from-cyan-500 via-blue-700 to-indigo-900",
  "from-sky-300 via-cyan-500 to-blue-800",
];

// Pool of Unsplash images keyed by category for activity covers
const IMG: Record<string, string[]> = {
  "Water Sports": [
    "https://images.unsplash.com/photo-1530870110042-98b2cb110834?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=1200&q=80",
  ],
  "Sea & Boat Experiences": [
    "https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500627964684-141351970a7f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
  ],
  "Air Adventures": [
    "https://images.unsplash.com/photo-1601024445121-e5b82f020549?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1200&q=80",
  ],
  "Adrenaline & Extreme": [
    "https://images.unsplash.com/photo-1601024445121-e5b82f020549?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533310266094-8898a03807dd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
  ],
  "Mountain Activities": [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=1200&q=80",
  ],
  "Hiking & Nature": [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80",
  ],
  "Off-Road & Motorsports": [
    "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
  ],
  "Snow & Winter": [
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80",
  ],
  "Family & Group Activities": [
    "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
  ],
  "Wellness & Escape": [
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80",
  ],
};
const pickImages = (cat: string, idx: number) => {
  const pool = IMG[cat] ?? IMG["Adrenaline & Extreme"];
  return [pool[idx % pool.length], pool[(idx + 1) % pool.length], pool[(idx + 2) % pool.length]];
};

type Seed = {
  name: string; category: string; city: string; price: number;
  difficulty: Difficulty; duration: string; provider: string; rating: number;
  region: string; tagline: string; description: string;
};

const normalizeCategory = (seed: Seed): CategoryName => {
  if (seed.category === "Water Sports" || seed.category === "Sea & Boat Experiences") return "Water";
  if (seed.category === "Air Adventures") return "Sky";
  if (seed.category === "Snow & Winter") return "Snow";
  if (seed.category === "Adrenaline & Extreme" || seed.category === "Off-Road & Motorsports") return "Adrenaline";
  if (seed.category === "Family & Group Activities") {
    if (/paintball|archery/i.test(seed.name)) return "Shooting";
    return "Groups";
  }
  return "Nature and Animals";
};

const seeds: Seed[] = [
  { name: "Jet Ski Rush", category: "Water Sports", city: "Jounieh", price: 45, difficulty: "Moderate", duration: "30 min", provider: "SeaVolt Adventures", rating: 4.8, region: "Mount Lebanon", tagline: "Carve the bay at full throttle.", description: "Hop on a 1100cc jet ski and tear up the Jounieh bay with an instructor leading the line. Quick safety briefing, then you're off." },
  { name: "Batroun Sunset Kayak", category: "Water Sports", city: "Batroun", price: 25, difficulty: "Easy", duration: "1.5 hours", provider: "Coastline Kayak Club", rating: 4.7, region: "North", tagline: "Glide along the coast as the sun melts into the sea.", description: "A relaxed paddle along Batroun's old harbor, ending with a golden-hour swim stop. Beginners welcome." },
  { name: "Raouche Paddle Board", category: "Water Sports", city: "Beirut", price: 20, difficulty: "Easy", duration: "1 hour", provider: "Urban Waves", rating: 4.5, region: "Beirut", tagline: "SUP under Beirut's iconic Pigeon Rocks.", description: "A breezy session right under the Raouche cliffs. Great for first-timers and weekend warriors alike." },
  { name: "Tyre Snorkeling Trail", category: "Sea & Boat Experiences", city: "Tyre", price: 35, difficulty: "Easy", duration: "2 hours", provider: "Blue Reef Lebanon", rating: 4.6, region: "South", tagline: "Explore the protected reef of Tyre.", description: "A guided snorkel along the marine reserve. Expect parrotfish, sea grass meadows and ancient ruins underwater." },
  { name: "Byblos Boat Escape", category: "Sea & Boat Experiences", city: "Byblos", price: 60, difficulty: "Easy", duration: "2 hours", provider: "Byblos Sea Tours", rating: 4.8, region: "Mount Lebanon", tagline: "Cruise the oldest harbor in the world.", description: "A classic wooden boat tour along Byblos' coastline with swim stops, drinks and storytelling from local skippers." },
  { name: "Tripoli Island Boat Tour", category: "Sea & Boat Experiences", city: "Tripoli", price: 30, difficulty: "Easy", duration: "3 hours", provider: "Mina Explorers", rating: 4.4, region: "North", tagline: "Hop between Tripoli's hidden islands.", description: "Discover Palm Islands Reserve with locals who know every cove. Bring a swimsuit." },
  { name: "Paragliding Over Jounieh", category: "Air Adventures", city: "Jounieh", price: 95, difficulty: "Extreme", duration: "20 min", provider: "SkyPulse Lebanon", rating: 4.9, region: "Mount Lebanon", tagline: "Tandem flight with a 360° view of the bay.", description: "Take off from Harissa and soar above one of the most photographed bays in the Mediterranean. Instructors are FAI-certified." },
  { name: "Ghosta Sky Flight", category: "Air Adventures", city: "Ghosta", price: 90, difficulty: "Extreme", duration: "25 min", provider: "Cloud9 Flyers", rating: 4.8, region: "Mount Lebanon", tagline: "Launch from the cliffs of Ghosta.", description: "Higher launch, longer glide, smoother landings. Perfect intro to paragliding." },
  { name: "Cedars Zipline Flight", category: "Adrenaline & Extreme", city: "Bcharre", price: 40, difficulty: "Moderate", duration: "45 min", provider: "Cedar Rush", rating: 4.7, region: "North", tagline: "Fly between cedar trees at altitude.", description: "Multi-line zipline circuit through Lebanon's iconic cedar forest. Includes harness, helmet and instructor." },
  { name: "Laklouk Rock Climb", category: "Mountain Activities", city: "Laklouk", price: 55, difficulty: "Hard", duration: "3 hours", provider: "Vertical Lebanon", rating: 4.6, region: "Mount Lebanon", tagline: "Real rock, real ropes, real views.", description: "Outdoor climbing on bolted routes from 5b to 6c. Beginners get a bottom-up intro session." },
  { name: "Tannourine Cliff Hike", category: "Hiking & Nature", city: "Tannourine", price: 18, difficulty: "Moderate", duration: "4 hours", provider: "North Trails", rating: 4.8, region: "North", tagline: "Walk the edge of Tannourine reserve.", description: "A guided hike through the cedar reserve with cliff-top viewpoints over the valley." },
  { name: "Chouwen Lake Hike", category: "Hiking & Nature", city: "Jbeil", price: 22, difficulty: "Moderate", duration: "5 hours", provider: "Wild Path Lebanon", rating: 4.9, region: "Mount Lebanon", tagline: "Hike to the most photogenic lake in Lebanon.", description: "Descend through pine forest to the turquoise waters of Chouwen. Time for a swim before the climb back up." },
  { name: "Qadisha Valley Trek", category: "Hiking & Nature", city: "Bcharre", price: 25, difficulty: "Hard", duration: "6 hours", provider: "Valley Walkers", rating: 4.9, region: "North", tagline: "A UNESCO valley on foot.", description: "Full-day trek through monasteries, streams and caves carved into the holy valley." },
  { name: "Jezzine Waterfall Trail", category: "Hiking & Nature", city: "Jezzine", price: 20, difficulty: "Easy", duration: "3 hours", provider: "South Nature Club", rating: 4.6, region: "South", tagline: "Chase the falls of the south.", description: "Easy loop trail ending at the Jezzine waterfall lookout. Great for families." },
  { name: "Ehden Forest Escape", category: "Hiking & Nature", city: "Ehden", price: 24, difficulty: "Moderate", duration: "4 hours", provider: "Green North", rating: 4.8, region: "North", tagline: "Lose yourself in the Horsh Ehden reserve.", description: "Guided forest hike spotting endemic flora and fauna. Picnic stop included." },
  { name: "Faraya ATV Blast", category: "Off-Road & Motorsports", city: "Faraya", price: 50, difficulty: "Moderate", duration: "1 hour", provider: "Mountain Motors", rating: 4.7, region: "Mount Lebanon", tagline: "Rip the trails above Faraya.", description: "Ride a 450cc quad through pine trails and dirt switchbacks with a lead guide." },
  { name: "Zaarour Buggy Ride", category: "Off-Road & Motorsports", city: "Zaarour", price: 65, difficulty: "Hard", duration: "1.5 hours", provider: "DirtLine Adventures", rating: 4.6, region: "Mount Lebanon", tagline: "Two-seater buggy, no rules.", description: "Side-by-side buggies through Zaarour's offroad park. Mud guaranteed." },
  { name: "Bekaa Desert Quad Ride", category: "Off-Road & Motorsports", city: "Zahle", price: 55, difficulty: "Moderate", duration: "2 hours", provider: "Bekaa Riders", rating: 4.5, region: "Bekaa", tagline: "Open valley, full speed.", description: "Wide-open quad ride across the Bekaa plains. Sunset slot recommended." },
  { name: "Cedars Snowmobile Tour", category: "Snow & Winter", city: "Cedars", price: 80, difficulty: "Moderate", duration: "1 hour", provider: "SnowRush Cedars", rating: 4.8, region: "North", tagline: "Snowmobile through the cedar peaks.", description: "Guided tour on twin-track snowmobiles around the Cedars resort. Helmet and gear included." },
  { name: "Faraya Ski Day Pass", category: "Snow & Winter", city: "Faraya", price: 70, difficulty: "Moderate", duration: "Full day", provider: "Peak Snow Club", rating: 4.7, region: "Mount Lebanon", tagline: "Lifts, slopes, mountain coffee.", description: "Day lift pass at Mzaar Kfardebian. Add gear rental at checkout." },
  { name: "Laklouk Snowshoe Walk", category: "Snow & Winter", city: "Laklouk", price: 35, difficulty: "Easy", duration: "2 hours", provider: "WinterSteps", rating: 4.5, region: "Mount Lebanon", tagline: "Walk on snow like you're floating.", description: "A peaceful guided snowshoe trek across the Laklouk plateau. No experience needed." },
  { name: "Hammana Rope Course", category: "Adrenaline & Extreme", city: "Hammana", price: 30, difficulty: "Moderate", duration: "2 hours", provider: "HighRope Lebanon", rating: 4.6, region: "Mount Lebanon", tagline: "An aerial obstacle course in the trees.", description: "30+ obstacles between platforms, ending in a long zipline finish." },
  { name: "Karting Beirut Circuit", category: "Adrenaline & Extreme", city: "Beirut", price: 25, difficulty: "Moderate", duration: "20 min", provider: "Urban Kart", rating: 4.4, region: "Beirut", tagline: "Race weekly in Beirut's indoor track.", description: "Sodi karts, timed sessions, leaderboard. Bring competitive friends." },
  { name: "Paintball Forest Battle", category: "Family & Group Activities", city: "Aley", price: 28, difficulty: "Moderate", duration: "2 hours", provider: "BattleZone Lebanon", rating: 4.5, region: "Mount Lebanon", tagline: "Strategy. Sweat. Friendly fire.", description: "Forest battlefield with bunkers and capture-the-flag missions. Bring teams of 6+." },
  { name: "Escape Room Beirut", category: "Family & Group Activities", city: "Beirut", price: 18, difficulty: "Moderate", duration: "1 hour", provider: "MindLock Rooms", rating: 4.6, region: "Beirut", tagline: "60 minutes. One way out.", description: "Themed escape rooms ranging from heist to horror. Best with a team of 4." },
  { name: "Archery Mountain Camp", category: "Family & Group Activities", city: "Broumana", price: 22, difficulty: "Easy", duration: "1.5 hours", provider: "ArrowPoint Camp", rating: 4.5, region: "Mount Lebanon", tagline: "Recurve bows and pine air.", description: "Outdoor archery range with coaching. Suitable from age 10." },
  { name: "Horseback Ride in Deir El Qamar", category: "Mountain Activities", city: "Deir El Qamar", price: 35, difficulty: "Easy", duration: "1 hour", provider: "Cedar Saddle Club", rating: 4.7, region: "Mount Lebanon", tagline: "Trails, horses, history.", description: "Trail ride through the Chouf villages with calm, well-trained horses." },
  { name: "Mzaar Mountain Bike Trail", category: "Mountain Activities", city: "Mzaar", price: 45, difficulty: "Hard", duration: "3 hours", provider: "TrailRush Bikes", rating: 4.6, region: "Mount Lebanon", tagline: "Downhill, technical, electric.", description: "Guided MTB descent on the Mzaar bike park trails. Full-suspension bike included." },
  { name: "Baskinta Sunrise Hike", category: "Hiking & Nature", city: "Baskinta", price: 16, difficulty: "Moderate", duration: "4 hours", provider: "Sunrise Trails", rating: 4.8, region: "Mount Lebanon", tagline: "Chase the first light over Sannine.", description: "Pre-dawn ascent to a summit ridge with breakfast at the top." },
  { name: "Anfeh Coastal Swim Day", category: "Water Sports", city: "Anfeh", price: 15, difficulty: "Easy", duration: "3 hours", provider: "SaltLife Anfeh", rating: 4.4, region: "North", tagline: "Crystal water, salt pans, slow vibes.", description: "Guided swim and chill day along Anfeh's salt-pan coast. Includes lounger." },
  { name: "Batroun Wakeboarding", category: "Water Sports", city: "Batroun", price: 70, difficulty: "Hard", duration: "30 min", provider: "WakeLab Lebanon", rating: 4.7, region: "North", tagline: "Carve wakes behind a tournament boat.", description: "Sessions for first-timers and seasoned riders. Coaches on board." },
  { name: "Damour River Rafting", category: "Adrenaline & Extreme", city: "Damour", price: 45, difficulty: "Hard", duration: "2 hours", provider: "RiverRush LB", rating: 4.6, region: "South", tagline: "Class III rapids, Lebanese style.", description: "Spring-only rafting on the Damour river. Helmet, paddle and certified guides included." },
  { name: "Nahr Ibrahim Canyoning", category: "Adrenaline & Extreme", city: "Nahr Ibrahim", price: 75, difficulty: "Extreme", duration: "5 hours", provider: "CanyonX Lebanon", rating: 4.9, region: "Mount Lebanon", tagline: "Jumps, slides, abseils, repeat.", description: "Full canyoning descent with abseils and natural water slides. Wetsuit and harness provided." },
  { name: "Akoura Stargazing Camp", category: "Wellness & Escape", city: "Akoura", price: 38, difficulty: "Easy", duration: "Overnight", provider: "StarCamp Lebanon", rating: 4.8, region: "Mount Lebanon", tagline: "Tents, telescopes, zero light pollution.", description: "Overnight camp with telescope sessions, fire pit and warm dinner." },
  { name: "Chouf Wellness Forest Day", category: "Wellness & Escape", city: "Chouf", price: 32, difficulty: "Easy", duration: "4 hours", provider: "Forest Reset", rating: 4.7, region: "Mount Lebanon", tagline: "Forest bathing in the cedar reserve.", description: "Slow walk, breathing exercises and herbal tea inside the Chouf cedars." },
  { name: "Yoga by the Sea", category: "Wellness & Escape", city: "Batroun", price: 18, difficulty: "Easy", duration: "1 hour", provider: "Flow Coast", rating: 4.6, region: "North", tagline: "Sunrise vinyasa with the waves.", description: "All-levels yoga session right on the rocks of Batroun. Mats provided." },
  { name: "Beirut Night Bike Tour", category: "Family & Group Activities", city: "Beirut", price: 20, difficulty: "Easy", duration: "2 hours", provider: "NightRide Beirut", rating: 4.5, region: "Beirut", tagline: "See Beirut after dark, on two wheels.", description: "Easy ride through downtown, Mar Mikhael and the corniche, with stops for street food." },
  { name: "Harissa Scenic Hike", category: "Hiking & Nature", city: "Harissa", price: 14, difficulty: "Easy", duration: "2.5 hours", provider: "ViewPoint Trails", rating: 4.5, region: "Mount Lebanon", tagline: "Walk to the Lady of Lebanon viewpoint.", description: "Easy ascent ending at one of the most iconic viewpoints in the country." },
  { name: "Zaarour Camping Weekend", category: "Mountain Activities", city: "Zaarour", price: 55, difficulty: "Easy", duration: "Weekend", provider: "CampRush Lebanon", rating: 4.7, region: "Mount Lebanon", tagline: "Two days off-grid in the mountains.", description: "Tents, fire, food and morning hike included. Bring layers, leave the laptop." },
  { name: "Saida Sea Discovery Tour", category: "Sea & Boat Experiences", city: "Saida", price: 28, difficulty: "Easy", duration: "2 hours", provider: "South Coast Tours", rating: 4.4, region: "South", tagline: "Boat the historic Saida coastline.", description: "Easy boat ride past the sea castle with snorkel and swim stops." },

  // ---------- BATROUN SPOTLIGHT (extended) ----------
  { name: "Jet Ski at BlueBay Batroun", category: "Water Sports", city: "Batroun", price: 55, difficulty: "Moderate", duration: "30 min", provider: "BlueBay Batroun", rating: 4.9, region: "North", tagline: "Lebanon's most hyped jetski spot.", description: "Open the throttle on a turquoise stretch of Batroun coast. Singles and doubles available, lifeguards on-site." },
  { name: "Routes Barbara MTB Ride", category: "Mountain Activities", city: "Batroun", price: 35, difficulty: "Moderate", duration: "2 hours", provider: "Routes Barbara Bikes", rating: 4.8, region: "North", tagline: "Hill trails, sea views, e-bike option.", description: "Guided ride through Batroun hills with optional e-bike upgrade and a coastal coffee stop on the way back." },
  { name: "Batroun Coastal Cycling", category: "Family & Group Activities", city: "Batroun", price: 18, difficulty: "Easy", duration: "1.5 hours", provider: "Coast Cycle Batroun", rating: 4.6, region: "North", tagline: "Easy ride along the old Batroun corniche.", description: "Hybrid bikes, slow pace, plenty of photo stops. Great for couples and groups." },
  { name: "Batroun Paddleboard Sunrise", category: "Water Sports", city: "Batroun", price: 22, difficulty: "Easy", duration: "1 hour", provider: "Flow Coast", rating: 4.7, region: "North", tagline: "Glass-flat water and pink skies.", description: "Glassy morning SUP session along the harbor. Beginners get a 10-min coaching intro." },
  { name: "Batroun Sailing Half-Day", category: "Sea & Boat Experiences", city: "Batroun", price: 80, difficulty: "Easy", duration: "4 hours", provider: "North Sails LB", rating: 4.8, region: "North", tagline: "A real sailing yacht out of Batroun marina.", description: "Hands-on sailing experience with a skipper. Swim stop, snacks and music on board." },
  { name: "Batroun Beach Day at Pierre & Friends", category: "Family & Group Activities", city: "Batroun", price: 25, difficulty: "Easy", duration: "Full day", provider: "Pierre & Friends", rating: 4.5, region: "North", tagline: "Iconic beach club, full-day pass.", description: "Lounger, towel and access to the famous Batroun beach club. Add a paddle session." },
  { name: "Batroun Diving Discovery", category: "Sea & Boat Experiences", city: "Batroun", price: 70, difficulty: "Moderate", duration: "3 hours", provider: "Deep Batroun", rating: 4.7, region: "North", tagline: "First dive on the Batroun reef.", description: "PADI Discover Scuba session with full gear, briefing and an open-water dive on the reef." },
  { name: "Batroun Sunset Boat Cruise", category: "Sea & Boat Experiences", city: "Batroun", price: 45, difficulty: "Easy", duration: "2 hours", provider: "Marina Cruises", rating: 4.8, region: "North", tagline: "Golden hour, music, drinks, sea spray.", description: "Group cruise out of Batroun marina at sunset. Music, drinks and a swim stop." },
  { name: "Batroun Beach Yoga", category: "Wellness & Escape", city: "Batroun", price: 15, difficulty: "Easy", duration: "1 hour", provider: "Flow Coast", rating: 4.6, region: "North", tagline: "Beach mat, ocean breeze, all levels.", description: "Sunrise vinyasa flow on the rocks of Batroun. Mats and water provided." },
  { name: "Batroun Old Souk Food Walk", category: "Family & Group Activities", city: "Batroun", price: 28, difficulty: "Easy", duration: "2.5 hours", provider: "Heritage Walks", rating: 4.7, region: "North", tagline: "Eat through the old souk like a local.", description: "Six-stop walking food tour through Batroun old town with stories and tastings." },

  // ---------- LEBANON-WIDE ADDITIONS ----------
  { name: "Tyre Beach Horseback Ride", category: "Family & Group Activities", city: "Tyre", price: 30, difficulty: "Easy", duration: "1 hour", provider: "South Saddle", rating: 4.6, region: "South", tagline: "Ride along Tyre's white sand beach.", description: "Calm trail horses for a beach ride at golden hour. Beginners welcome." },
  { name: "Tripoli Old City Walking Tour", category: "Family & Group Activities", city: "Tripoli", price: 18, difficulty: "Easy", duration: "3 hours", provider: "Heritage Walks", rating: 4.7, region: "North", tagline: "Markets, mamlouk monuments, sweets.", description: "Guided walk through Tripoli's old souks ending at the iconic Hallab patisserie." },
  { name: "Bekaa Wine Tour", category: "Wellness & Escape", city: "Zahle", price: 60, difficulty: "Easy", duration: "Full day", provider: "Vine & Valley", rating: 4.9, region: "Bekaa", tagline: "Three vineyards in one valley.", description: "Full-day tasting tour across iconic Bekaa wineries with lunch in a vineyard." },
  { name: "Bcharre E-Bike Loop", category: "Mountain Activities", city: "Bcharre", price: 50, difficulty: "Moderate", duration: "3 hours", provider: "North Pedal", rating: 4.7, region: "North", tagline: "E-bike between cedars and clouds.", description: "Loop ride through Bcharre and the cedar reserve with photo stops." },
  { name: "Akoura Climbing School", category: "Adrenaline & Extreme", city: "Akoura", price: 65, difficulty: "Hard", duration: "Half day", provider: "Vertical Lebanon", rating: 4.8, region: "Mount Lebanon", tagline: "Bolted routes, real Lebanese rock.", description: "Half-day intro climbing course on the Akoura crag with certified instructors." },
  { name: "Nahr Ibrahim Cliff Jump Tour", category: "Adrenaline & Extreme", city: "Nahr Ibrahim", price: 40, difficulty: "Hard", duration: "3 hours", provider: "CanyonX Lebanon", rating: 4.7, region: "Mount Lebanon", tagline: "Jumps of 3, 6 and 12 meters.", description: "Guided river hike with progressive jumps in turquoise pools." },
  { name: "Mzaar Snowboarding Day", category: "Snow & Winter", city: "Mzaar", price: 75, difficulty: "Moderate", duration: "Full day", provider: "Peak Snow Club", rating: 4.7, region: "Mount Lebanon", tagline: "Lift pass + park access.", description: "All-day snowboarding pass at Mzaar Kfardebian. Park sessions in the afternoon." },
  { name: "Cedars Off-Piste Ski Tour", category: "Snow & Winter", city: "Cedars", price: 110, difficulty: "Hard", duration: "Full day", provider: "SnowRush Cedars", rating: 4.9, region: "North", tagline: "Ski touring above the cedars.", description: "Backcountry ski tour for advanced skiers with avalanche-trained guide." },
  { name: "Beirut Rooftop Yoga", category: "Wellness & Escape", city: "Beirut", price: 14, difficulty: "Easy", duration: "1 hour", provider: "Flow Coast", rating: 4.5, region: "Beirut", tagline: "Skyline + breath + flow.", description: "Sunset rooftop session in Mar Mikhael. All levels welcome." },
  { name: "Aley Forest Camping", category: "Wellness & Escape", city: "Aley", price: 45, difficulty: "Easy", duration: "Overnight", provider: "CampRush Lebanon", rating: 4.6, region: "Mount Lebanon", tagline: "Sleep under pine trees.", description: "Set-up tents, fire pit, breakfast, and morning hike." },
  { name: "Broumana Adventure Park", category: "Family & Group Activities", city: "Broumana", price: 22, difficulty: "Moderate", duration: "2 hours", provider: "HighRope Lebanon", rating: 4.5, region: "Mount Lebanon", tagline: "Trees, ropes, big slides.", description: "All-ages adventure park with rope obstacles and zipline finishes." },
  { name: "Jbeil Sea Kayak", category: "Water Sports", city: "Jbeil", price: 25, difficulty: "Easy", duration: "1.5 hours", provider: "Coastline Kayak Club", rating: 4.7, region: "Mount Lebanon", tagline: "Paddle past the Crusader castle.", description: "Easy sea kayak loop along Byblos / Jbeil coast." },
  { name: "Faraya Snowshoe Sunrise", category: "Snow & Winter", city: "Faraya", price: 38, difficulty: "Moderate", duration: "3 hours", provider: "WinterSteps", rating: 4.7, region: "Mount Lebanon", tagline: "Snowshoe to the Faraya peaks at sunrise.", description: "Pre-dawn ascent on snowshoes ending with breakfast at altitude." },
  { name: "Bekaa Hot Air Balloon", category: "Air Adventures", city: "Zahle", price: 180, difficulty: "Easy", duration: "1 hour", provider: "Cloud9 Flyers", rating: 4.9, region: "Bekaa", tagline: "Float over Lebanon's vineyards.", description: "Sunrise hot-air balloon flight over the Bekaa valley with a champagne toast." },
  { name: "Ehden Bike Park", category: "Mountain Activities", city: "Ehden", price: 40, difficulty: "Hard", duration: "3 hours", provider: "TrailRush Bikes", rating: 4.6, region: "North", tagline: "Downhill in the green north.", description: "Lift-served downhill MTB park near Ehden. Full-suspension bike included." },
  { name: "Anfeh Sailing Day", category: "Sea & Boat Experiences", city: "Anfeh", price: 65, difficulty: "Easy", duration: "4 hours", provider: "North Sails LB", rating: 4.7, region: "North", tagline: "Sail the salt-pan coast.", description: "Half-day sailing trip out of Anfeh with swim stop." },
  { name: "Damour Beach SUP", category: "Water Sports", city: "Damour", price: 22, difficulty: "Easy", duration: "1 hour", provider: "Urban Waves", rating: 4.5, region: "South", tagline: "Calm bay, smooth board, friendly crew.", description: "Beginner SUP session with coach in Damour." },
  { name: "Chouf Cedar Sunset Hike", category: "Hiking & Nature", city: "Chouf", price: 22, difficulty: "Moderate", duration: "3.5 hours", provider: "Wild Path Lebanon", rating: 4.8, region: "Mount Lebanon", tagline: "Sunset over the cedar reserve.", description: "Late-afternoon hike to a cedar viewpoint, dinner stop afterwards." },
  { name: "Jezzine Paragliding", category: "Air Adventures", city: "Jezzine", price: 100, difficulty: "Extreme", duration: "25 min", provider: "SkyPulse Lebanon", rating: 4.8, region: "South", tagline: "Tandem flight over the falls.", description: "Tandem paragliding launch above Jezzine waterfall." },
  { name: "Saida Old Souks Discovery", category: "Family & Group Activities", city: "Saida", price: 16, difficulty: "Easy", duration: "2 hours", provider: "Heritage Walks", rating: 4.6, region: "South", tagline: "Walk the old caravan routes.", description: "Guided walk through Saida souks, soap museum and sea castle." },
  { name: "Tannourine Off-Road Tour", category: "Off-Road & Motorsports", city: "Tannourine", price: 70, difficulty: "Hard", duration: "3 hours", provider: "DirtLine Adventures", rating: 4.6, region: "North", tagline: "4x4 through the cedar reserve.", description: "4x4 off-road experience around Tannourine cedars." },
];

const cityCoords: Record<string, { lat: number; lng: number }> = {
  Beirut: { lat: 33.8938, lng: 35.5018 },
  Jounieh: { lat: 33.9808, lng: 35.6178 },
  Batroun: { lat: 34.2553, lng: 35.6581 },
  Byblos: { lat: 34.1232, lng: 35.6519 },
  Tripoli: { lat: 34.4367, lng: 35.8497 },
  Tyre: { lat: 33.2733, lng: 35.1939 },
  Saida: { lat: 33.5631, lng: 35.3698 },
  Anfeh: { lat: 34.3506, lng: 35.7344 },
  Faraya: { lat: 33.9833, lng: 35.8167 },
  Cedars: { lat: 34.2497, lng: 36.0492 },
  Bcharre: { lat: 34.2511, lng: 36.0103 },
  Tannourine: { lat: 34.2061, lng: 35.9275 },
  Ehden: { lat: 34.2997, lng: 35.9667 },
  Jezzine: { lat: 33.5447, lng: 35.5847 },
  Jbeil: { lat: 34.1232, lng: 35.6519 },
  Laklouk: { lat: 34.1372, lng: 35.9089 },
  Hammana: { lat: 33.8267, lng: 35.7331 },
  Aley: { lat: 33.8103, lng: 35.6028 },
  Broumana: { lat: 33.8836, lng: 35.6406 },
  "Deir El Qamar": { lat: 33.6936, lng: 35.5683 },
  Mzaar: { lat: 33.9833, lng: 35.8167 },
  Baskinta: { lat: 33.9583, lng: 35.7889 },
  Damour: { lat: 33.7297, lng: 35.4564 },
  "Nahr Ibrahim": { lat: 34.0667, lng: 35.6500 },
  Akoura: { lat: 34.1167, lng: 35.8833 },
  Chouf: { lat: 33.7000, lng: 35.6500 },
  Harissa: { lat: 33.9833, lng: 35.6500 },
  Zaarour: { lat: 33.9000, lng: 35.7833 },
  Zahle: { lat: 33.8463, lng: 35.9019 },
  Ghosta: { lat: 34.0050, lng: 35.6789 },
};

const badgesFor = (s: Seed, idx: number): string[] => {
  const b: string[] = [];
  if (s.rating >= 4.8) b.push("Top Rated");
  if (s.price <= 20) b.push("Best Value");
  if (s.difficulty === "Extreme") b.push("Extreme");
  if (["Family & Group Activities", "Wellness & Escape"].includes(s.category)) b.push("Family Friendly");
  if (s.duration.includes("Weekend") || s.duration.includes("Full")) b.push("Weekend Pick");
  if (idx % 7 === 0) b.push("New");
  return b;
};

const peopleBoundsFor = (s: Seed): { minPeople: number; maxPeople: number } => {
  if (s.category === "Air Adventures") return { minPeople: 1, maxPeople: 2 };
  if (s.category === "Water Sports") return { minPeople: 1, maxPeople: 6 };
  if (s.category === "Sea & Boat Experiences") return { minPeople: 2, maxPeople: 12 };
  if (s.category === "Hiking & Nature") return { minPeople: 1, maxPeople: 16 };
  if (s.category === "Family & Group Activities") return { minPeople: 2, maxPeople: 20 };
  if (s.category === "Wellness & Escape") return { minPeople: 1, maxPeople: 14 };
  if (s.category === "Off-Road & Motorsports") return { minPeople: 1, maxPeople: 8 };
  if (s.category === "Snow & Winter") return { minPeople: 1, maxPeople: 10 };
  if (s.difficulty === "Extreme") return { minPeople: 1, maxPeople: 6 };
  return { minPeople: 1, maxPeople: 10 };
};

export const activities: Activity[] = seeds.map((s, idx) => {
  const id = idx + 1;
  const { minPeople, maxPeople } = peopleBoundsFor(s);
  const category = normalizeCategory(s);
  return {
    id,
    slug: slugify(s.name),
    name: s.name,
    tagline: s.tagline,
    category,
    city: s.city,
    region: s.region,
    price: s.price,
    pricePackages: buildPackages(s.price),
    rating: s.rating,
    reviewCount: 12 + ((id * 7) % 60),
    difficulty: s.difficulty,
    duration: s.duration,
    providerName: s.provider,
    providerInitials: s.provider.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase(),
    providerColor: COLORS[id % COLORS.length],
    description: s.description + " Our crew has been operating in Lebanon for years and prioritises safety and good vibes equally.",
    shortDescription: s.tagline,
    images: pickImages(s.category, idx),
    image: pickImages(s.category, idx)[0],
    included: ["Professional guide", "All required gear", "Safety briefing", "Insurance"],
    whatToBring: ["Water bottle", "Sunscreen", "Comfortable shoes", "ID / passport copy"],
    safetyNotes: ["Briefing is mandatory before start", "Activity may be canceled in extreme weather", "Follow instructor signals at all times"],
    ageRequirement: s.difficulty === "Extreme" ? "16+" : s.difficulty === "Hard" ? "14+" : "8+",
    minPeople,
    maxPeople,
    groupSize: `${minPeople} - ${maxPeople} people`,
    availableDays: ["Wed", "Thu", "Fri", "Sat", "Sun"],
    cancellationPolicy: "Free cancellation up to 24 hours before the activity.",
    coordinates: cityCoords[s.city] ?? { lat: 33.8547, lng: 35.8623 },
    badges: badgesFor(s, idx),
    reviews: fakeReviews(id, 3 + (id % 3), s.provider),
  };
});

export const hiddenGemCities = ["Akoura", "Tannourine", "Ehden", "Jezzine", "Anfeh", "Baskinta", "Nahr Ibrahim"];

export const categories = [
  { name: "Water", icon: "Waves", color: "from-cyan-400 to-blue-700", image: waterCategoryImage, position: "center center" },
  { name: "Sky", icon: "Plane", color: "from-sky-400 to-indigo-700", image: skyCategoryImage, position: "center 68%" },
  { name: "Snow", icon: "Snowflake", color: "from-blue-300 to-indigo-700", image: snowCategoryImage, position: "center center" },
  { name: "Nature and Animals", icon: "Trees", color: "from-emerald-500 to-blue-800", image: natureAndAnimalsCategoryImage, position: "center center" },
  { name: "Hidden Gems", icon: "Leaf", color: "from-emerald-500 to-cyan-800", image: natureAndAnimalsCategoryImage, position: "center center" },
  { name: "Groups", icon: "Users", color: "from-blue-400 to-indigo-700", image: groupsCategoryImage, position: "center center" },
  { name: "Shooting", icon: "Zap", color: "from-amber-500 to-blue-900", image: shootingCategoryImage, position: "center center" },
  { name: "Adrenaline", icon: "Zap", color: "from-blue-500 to-indigo-700", image: adrenalineCategoryImage, position: "center 68%" },
];

export const cities = [
  "Beirut", "Jounieh", "Batroun", "Byblos", "Faraya", "Cedars",
  "Zahle", "Jezzine", "Tyre", "Tripoli", "Chouf", "Zaarour",
  "Bcharre", "Tannourine", "Ehden", "Jbeil", "Laklouk", "Hammana",
  "Aley", "Broumana", "Deir El Qamar", "Mzaar", "Baskinta", "Damour",
  "Nahr Ibrahim", "Akoura", "Harissa", "Anfeh", "Saida", "Ghosta",
];

export const appReviews: Review[] = [
  { id: "a1", user: "Karim H.", rating: 5, date: "2026-04-12", comment: "Finally a clean, fast way to find activities in Lebanon. Love the dark UI." },
  { id: "a2", user: "Lana A.", rating: 5, date: "2026-04-09", comment: "Discovered three places I never knew existed in one evening. 10/10." },
  { id: "a3", user: "Joe K.", rating: 4, date: "2026-04-04", comment: "Smooth, fast, and the filters actually work. Would love a map view next." },
  { id: "a4", user: "Maya T.", rating: 5, date: "2026-03-28", comment: "The hero section made me actually want to go outside. Solid execution." },
];

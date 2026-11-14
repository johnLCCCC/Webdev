// ====== WEAPONS DATA ======
// Complete dataset of all 19 Valorant weapons (including custom weapons Bandit & Warden) with categories, stats, images, and tactical descriptions.

window.weaponsData = {
  // --- SIDEARMS ---
  "classic": {
    name: "Classic",
    category: "sidearms",
    cost: "Free (0)",
    fireRate: "6.75/s",
    wallPenetration: "Low",
    magazine: "12",
    damage: "Head: 78 | Body: 26 | Leg: 22",
    desc: "Standard issue sidearm with a burst-fire secondary mode.",
    tips: "Right-click burst fire is devastating at close range when peeking angles.",
    img: "weapons_image/Sidearms/Classic.webp"
  },
  "shorty": {
    name: "Shorty",
    category: "sidearms",
    cost: "300",
    fireRate: "3.33/s",
    wallPenetration: "Low",
    magazine: "2",
    damage: "Head: 24 | Body: 12 | Leg: 10 (per pellet)",
    desc: "Double-barrel shotgun ideal for tight corner holds and eco rounds.",
    tips: "Hold close corners and fire both barrels point-blank for instant kills.",
    img: "weapons_image/Sidearms/Shorty.webp"
  },
  "frenzy": {
    name: "Frenzy",
    category: "sidearms",
    cost: "450",
    fireRate: "10/s",
    wallPenetration: "Low",
    magazine: "13",
    damage: "Head: 78 | Body: 26 | Leg: 22",
    desc: "Fully automatic machine pistol with high fire rate in close quarters.",
    tips: "Crouch-spray at close range during pistol rounds to overwhelm opponents.",
    img: "weapons_image/Sidearms/Frenzy.webp"
  },
  "ghost": {
    name: "Ghost",
    category: "sidearms",
    cost: "500",
    fireRate: "6.75/s",
    wallPenetration: "Medium",
    magazine: "15",
    damage: "Head: 105 | Body: 30 | Leg: 25",
    desc: "Suppressed, highly accurate semi-automatic pistol for precise tapping.",
    tips: "Take your time with headshots; the suppressor hides bullet tracers through smokes.",
    img: "weapons_image/Sidearms/Ghost.webp"
  },
  "bandit": {
    name: "Bandit",
    category: "sidearms",
    cost: "600",
    fireRate: "8/s",
    wallPenetration: "Medium",
    magazine: "14",
    damage: "Head: 120 | Body: 35 | Leg: 30",
    desc: "Custom sidearm engineered for rapid follow-up shots and high mobility.",
    tips: "Great for mobile duelists who prefer mid-range pistol combat.",
    img: "weapons_image/Sidearms/Bandit.webp"
  },
  "sheriff": {
    name: "Sheriff",
    category: "sidearms",
    cost: "800",
    fireRate: "4/s",
    wallPenetration: "High",
    magazine: "6",
    damage: "Head: 159 | Body: 55 | Leg: 47",
    desc: "Powerful heavy revolver capable of one-shot headshots at close to medium range.",
    tips: "High mastery weapon. Excellent for eco rounds and anti-sniper duels.",
    img: "weapons_image/Sidearms/Sheriff.webp"
  },

  // --- SMGS ---
  "stinger": {
    name: "Stinger",
    category: "smgs",
    cost: "1,100",
    fireRate: "16/s",
    wallPenetration: "Low",
    magazine: "20",
    damage: "Head: 67 | Body: 27 | Leg: 23",
    desc: "High fire-rate SMG with an alt-fire 3-round burst mode.",
    tips: "Use alt-fire burst at medium ranges for better accuracy.",
    img: "weapons_image/SMGs/Stinger.webp"
  },
  "spectre": {
    name: "Spectre",
    category: "smgs",
    cost: "1,600",
    fireRate: "13.33/s",
    wallPenetration: "Medium",
    magazine: "30",
    damage: "Head: 78 | Body: 26 | Leg: 22",
    desc: "Versatile suppressed SMG with balanced running accuracy and magazine size.",
    tips: "Great for force buys, run-and-gun pushes, and eco round conversions.",
    img: "weapons_image/SMGs/Spectre.webp"
  },

  // --- SHOTGUNS ---
  "bucky": {
    name: "Bucky",
    category: "shotguns",
    cost: "850",
    fireRate: "1.1/s",
    wallPenetration: "Low",
    magazine: "5",
    damage: "Head: 44 | Body: 22 | Leg: 18 (per pellet)",
    desc: "Pump-action shotgun with primary close-range spread and alt-fire air-burst slug.",
    tips: "Use primary fire inside 8m; use alt-fire to soften targets at medium range.",
    img: "weapons_image/Shotguns/Bucky.png"
  },
  "judge": {
    name: "Judge",
    category: "shotguns",
    cost: "1,850",
    fireRate: "3.5/s",
    wallPenetration: "Medium",
    magazine: "7",
    damage: "Head: 34 | Body: 17 | Leg: 14 (per pellet)",
    desc: "Fully automatic shotgun devastating when holding tight angles or smokes.",
    tips: "Combine with Omen or Viper smokes to ambush attackers holding sites.",
    img: "weapons_image/Shotguns/Judge.png"
  },

  // --- RIFLES ---
  "bulldog": {
    name: "Bulldog",
    category: "rifles",
    cost: "2,050",
    fireRate: "9.15/s (10/s burst)",
    wallPenetration: "Medium",
    magazine: "24",
    damage: "Head: 116 | Body: 35 | Leg: 30",
    desc: "Affordable assault rifle with a 3-round burst ADS secondary mode.",
    tips: "Fantastic budget rifle for bonus rounds after winning pistol round.",
    img: "weapons_image/Rifles/Bulldog.png"
  },
  "guardian": {
    name: "Guardian",
    category: "rifles",
    cost: "2,250",
    fireRate: "6.5/s",
    wallPenetration: "High",
    magazine: "12",
    damage: "Head: 195 | Body: 65 | Leg: 49",
    desc: "Semi-automatic precision rifle capable of one-tap headshots at any range.",
    tips: "Aim for the head and pace your shots. Exceptional wall-banging power.",
    img: "weapons_image/Rifles/Guardian.webp"
  },
  "warden": {
    name: "Warden",
    category: "rifles",
    cost: "2,700",
    fireRate: "8.5/s",
    wallPenetration: "High",
    magazine: "25",
    damage: "Head: 150 | Body: 38 | Leg: 32",
    desc: "Custom tactical rifle featuring integrated thermal scoping and steady recoil control.",
    tips: "Ideal for holding long anchor angles with tactical precision.",
    img: "weapons_image/Rifles/Warden.webp"
  },
  "phantom": {
    name: "Phantom",
    category: "rifles",
    cost: "2,900",
    fireRate: "11/s",
    wallPenetration: "Medium",
    magazine: "30",
    damage: "Head: 140 | Body: 35 | Leg: 30 (0-15m)",
    desc: "Suppressed automatic rifle with high fire rate, zero bullet tracers, and no damage dropoff through smokes.",
    tips: "Great for spamming smokes and controlling tight choke points.",
    img: "weapons_image/Rifles/Phantom.webp"
  },
  "vandal": {
    name: "Vandal",
    category: "rifles",
    cost: "2,900",
    fireRate: "9.75/s",
    wallPenetration: "Medium",
    magazine: "25",
    damage: "Head: 160 | Body: 40 | Leg: 34 (All ranges)",
    desc: "Devastating assault rifle that deals consistent damage and one-tap headshots at any distance.",
    tips: "Master tap-firing and burst control for precise long-range duels.",
    img: "weapons_image/Rifles/Vandal.webp"
  },

  // --- SNIPER RIFLES ---
  "marshal": {
    name: "Marshal",
    category: "snipers",
    cost: "950",
    fireRate: "1.5/s",
    wallPenetration: "Medium",
    magazine: "5",
    damage: "Head: 202 | Body: 101 | Leg: 85",
    desc: "Lightweight sniper rifle capable of one-shot body kills against unshielded enemies.",
    tips: "Highly mobile; can no-scope or quick-scope effectively in eco rounds.",
    img: "weapons_image/Snipers/Marshal.webp"
  },
  "outlaw": {
    name: "Outlaw",
    category: "snipers",
    cost: "2,400",
    fireRate: "2.75/s",
    wallPenetration: "Medium",
    magazine: "2",
    damage: "Head: 238 | Body: 140 | Leg: 119",
    desc: "Double-barreled sniper rifle designed to punish half-armor buys with one-shot body kills.",
    tips: "Fire both shots in quick succession to clean up wounded opponents.",
    img: "weapons_image/Snipers/Outlaw.webp"
  },
  "operator": {
    name: "Operator",
    category: "snipers",
    cost: "4,700",
    fireRate: "0.6/s",
    wallPenetration: "High",
    magazine: "5",
    damage: "Head: 255 | Body: 150 | Leg: 127",
    desc: "Heavy sniper rifle capable of one-shot kills anywhere above the waist.",
    tips: "Hold power angles, reposition after firing, and rely on team utility to cover your flanks.",
    img: "weapons_image/Snipers/Operator.webp"
  },

  // --- HEAVY ---
  "ares": {
    name: "Ares",
    category: "heavy",
    cost: "1,600",
    fireRate: "13/s",
    wallPenetration: "High",
    magazine: "50",
    damage: "Head: 72 | Body: 30 | Leg: 25",
    desc: "Light machine gun with ramping fire rate and massive magazine capacity.",
    tips: "Excellent for wall-banging common choke points and suppressing rushes.",
    img: "weapons_image/Heavy/Ares.webp"
  },
  "odin": {
    name: "Odin",
    category: "heavy",
    cost: "3,200",
    fireRate: "12 to 15.6/s",
    wallPenetration: "High",
    magazine: "100",
    damage: "Head: 95 | Body: 38 | Leg: 32",
    desc: "Heavy machine gun with extreme suppression, high fire rate, and penetration.",
    tips: "Devastating when shooting through thin walls on maps like Ascent and Bind.",
    img: "weapons_image/Heavy/Odin.webp"
  }
};

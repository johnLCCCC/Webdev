// ====== TYPEWRITER ANIMATION (copied from Agents.js) ======
function typewriterEffect(element, text, speed = 18) {
  return new Promise(resolve => {
    element.textContent = "";
    element.style.width = "0";
    element.classList.add("typing");

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        element.classList.remove("typing");
        element.style.width = "auto";
        element.style.borderRight = "none";
        resolve();
      }
    }, speed);
  });
}

function playTypeSound() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = 1200;
    oscillator.type = "sine";
    gainNode.gain.value = 0.02;
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Audio not supported or blocked - silently ignore
  }
}

function typewriterWithSound(element, text, speed = 18) {
  return new Promise(resolve => {
    element.textContent = "";
    element.style.width = "0";
    element.classList.add("typing");

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        if (text.charAt(i) !== " ") playTypeSound();
        i++;
      } else {
        clearInterval(timer);
        element.classList.remove("typing");
        element.classList.add("typing-done");
        element.style.width = "auto";
        element.style.borderRight = "none";
        resolve();
      }
    }, speed);
  });
}

function resetTypewriterAnimations() {
  const passiveEl = document.getElementById("agent-passive");
  const playstyleEl = document.getElementById("agent-playstyle");
  [passiveEl, playstyleEl].forEach(el => {
    if (el) {
      el.classList.remove("typing", "typing-done");
      el.style.width = "auto";
      el.style.borderRight = "none";
    }
  });
}

// ====== GUIDES DATA ======
// Role guide data
const roleGuidesData = {
  "role-duelist": {
    title: "Duelist",
    subtitle: "Entry Fraggers / Space Creators",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    iconClass: "duelist-icon",
    color: "var(--role-duelist)",
    overview: "Duelists are the tip of the spear. Their job is to create space for the team by taking aggressive duels, entering sites first, and punishing opponents who overextend. They have self-sufficient kits with mobility, flashes, or sustain that let them survive entry attempts.",
    responsibilities: [
      "Entry fragging — be the first one in, trade or die",
      "Creating space for teammates to follow up",
      "Finding opening picks to swing round advantage",
      "Playing off-contact — isolate 1v1s using utility",
      "Secondary caller for site execution timing"
    ],
    concepts: [
      "First Contact Principle — you choose when and where the fight happens",
      "Trade Fragging — if you die, your teammate must kill your killer immediately",
      "Movement > Aim — unpredictable movement wins duels more than raw aim",
      "Economy Awareness — Duelists often buy first; know when to force vs save"
    ],
    agents: [
      { id: "agent-jett", name: "Jett", role: "duelist" },
      { id: "agent-raze", name: "Raze", role: "duelist" },
      { id: "agent-reyna", name: "Reyna", role: "duelist" },
      { id: "agent-phoenix", name: "Phoenix", role: "duelist" },
      { id: "agent-yoru", name: "Yoru", role: "duelist" },
      { id: "agent-neon", name: "Neon", role: "duelist" },
      { id: "agent-iso", name: "Iso", role: "duelist" },
      { id: "agent-waylay", name: "Waylay", role: "duelist" },
      { id: "agent-hush", name: "Hush", role: "duelist" }
    ],
    checklist: [
      "Practice entry routes on every map",
      "Learn 2-3 agent-specific lineups for common angles",
      "Drill crosshair placement at head level",
      "Review your death replays — were you trading?",
      "Communicate entry timing with your team"
    ]
  },
  "role-initiator": {
    title: "Initiator",
    subtitle: "Info Gatherers / Playmakers",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    iconClass: "initiator-icon",
    color: "var(--role-initiator)",
    overview: "Initiators set the stage. They gather information, disrupt enemy positions, and enable the team to execute onto sites. Their utility creates opportunities — without good initiator play, entries become guesses.",
    responsibilities: [
      "Information gathering — reveal enemy positions",
      "Clearing angles and forcing rotations with utility",
      "Setting up executes (flashes, stuns, reveals)",
      "Post-plant utility for retake denial",
      "Mid-round intel for caller decision-making"
    ],
    concepts: [
      "Utility First — use abilities before peeking, not after",
      "Info Trading — if you reveal one enemy, call it immediately",
      "Layered Executes — combine multiple utilities (flash + stun + reveal)",
      "Default Control — use utility to take map control without committing"
    ],
    agents: [
      { id: "agent-sova", name: "Sova", role: "initiator" },
      { id: "agent-skye", name: "Skye", role: "initiator" },
      { id: "agent-kay-o", name: "KAY/O", role: "initiator" },
      { id: "agent-fade", name: "Fade", role: "initiator" },
      { id: "agent-breach", name: "Breach", role: "initiator" },
      { id: "agent-gekko", name: "Gekko", role: "initiator" },
      { id: "agent-tejo", name: "Tejo", role: "initiator" }
    ],
    checklist: [
      "Learn standard lineups for every map",
      "Practice flashing for teammates (not yourself)",
      "Time utility with team executes — count down",
      "Save one utility piece for post-plant",
      "Call info immediately and concisely"
    ]
  },
  "role-controller": {
    title: "Controller",
    subtitle: "Smoke Specialists / Pace Setters",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    iconClass: "controller-icon",
    color: "var(--role-controller)",
    overview: "Controllers dictate the pace of the round. Their smokes cut vision, allowing the team to take space safely, execute onto sites, or defend retakes. A good Controller makes the enemy play blind; a bad one smokes their own team.",
    responsibilities: [
      "Smoking off angles for entries and executes",
      "Denying enemy info (blocking sightlines, Heaven, CT)",
      "Post-plant smoke setups for retake denial",
      "Secondary entry on execute (often lurk/flank)",
      "Economy management — Controllers often buy utility first"
    ],
    concepts: [
      "One-Way Smokes — see enemies while they can't see you",
      "Smoke Timing — deploy as team moves, not 10 seconds early",
      "Retake Denial — save smokes for post-plant, don't waste all on entry",
      "Map Control — use smokes to take territory without fighting"
    ],
    agents: [
      { id: "agent-omen", name: "Omen", role: "controller" },
      { id: "agent-brimstone", name: "Brimstone", role: "controller" },
      { id: "agent-viper", name: "Viper", role: "controller" },
      { id: "agent-astra", name: "Astra", role: "controller" },
      { id: "agent-harbor", name: "Harbor", role: "controller" },
      { id: "agent-clove", name: "Clove", role: "controller" },
      { id: "agent-miks", name: "Miks", role: "controller" }
    ],
    checklist: [
      "Memorize 3+ smoke lineups per map",
      "Practice one-way smokes in custom games",
      "Learn post-plant smoke setups for every site",
      "Don't smoke your own team's vision",
      "Track enemy utility — bait their pushes"
    ]
  },
  "role-sentinel": {
    title: "Sentinel",
    subtitle: "Anchors / Flank Watchers",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    iconClass: "sentinel-icon",
    color: "var(--role-sentinel)",
    overview: "Sentinels are the backbone of defense. They lock down sites, watch flanks, and provide utility that slows or stops enemy pushes. On attack, they lurk for flanks and provide post-plant value. Patience and game sense matter more than aim.",
    responsibilities: [
      "Site anchoring — hold angles, delay pushes",
      "Flank watching — prevent rotations and backstabs",
      "Delay utility — traps, walls, slows to stall executes",
      "Post-plant setups — traps, alarms, walls for retake",
      "Economy preservation — Sentinels survive late rounds"
    ],
    concepts: [
      "Crossfire Positioning — set up 2v1s with teammates",
      "Utility Delay — waste enemy time, don't just damage",
      "Info Denial — destroy enemy drones/cams, play off info",
      "Clutch Fundamentals — isolate 1v1s, play time, don't overpeek"
    ],
    agents: [
      { id: "agent-sage", name: "Sage", role: "sentinel" },
      { id: "agent-cypher", name: "Cypher", role: "sentinel" },
      { id: "agent-killjoy", name: "Killjoy", role: "sentinel" },
      { id: "agent-chamber", name: "Chamber", role: "sentinel" },
      { id: "agent-deadlock", name: "Deadlock", role: "sentinel" },
      { id: "agent-vyse", name: "Vyse", role: "sentinel" },
      { id: "agent-veto", name: "Veto", role: "sentinel" }
    ],
    checklist: [
      "Learn default anchor spots per map/site",
      "Practice post-plant trap placements",
      "Don't over-rotate — trust your utility",
      "Save utility for retake, don't spam on defense",
      "Communicate flank timing — 'rotating now'"
    ]
  }
};

// Agent guide data (extends agentsData from Agents.js)
const agentGuidesData = {
  "agent-jett": {
    name: "Jett",
    role: "duelist",
    difficulty: 4,
    playstyle: "High-mobility entry fragger who creates space with vertical movement and dash resets. Excels at aggressive peeks, off-angles, and solo entries. High skill ceiling — rewards precision and game sense.",
    abilities: [
      { key: "C", name: "Cloudburst", desc: "Throws a vision-blocking smoke cloud that can be curved mid-flight. Use for one-ways, entry cover, or post-plant." },
      { key: "Q", name: "Updraft", desc: "Propels Jett upward. Combine with Tailwind for vertical angles or to reach high ground (boxes, Heaven)." },
      { key: "E", name: "Tailwind", desc: "Signature. Instant dash in movement direction. Resets on 2 kills. Core engagement/disengage tool." },
      { key: "X", name: "Blade Storm", desc: "Ultimate. Equips 5 throwing knives. Alt-fire throws all remaining. Kills restore all knives. Headshot kill = 1 knife." }
    ],
    combos: [
      "Dash + Knife (E → X) — dash onto site, instantly pull knives for close-range duels",
      "Updraft + Dash (Q → E) — reach unexpected vertical angles (Heaven, boxes, rafters)",
      "Curve Smoke + Dash — smoke off angle, dash through for surprise entry",
      "Knife Juggling — alt-fire 2-3 knives at grouped enemies, reset on kill"
    ],
    mistakes: [
      "Dashing in without info — entry blindly gets you traded instantly",
      "Wasting Updraft for no reason — save for vertical plays or escape",
      "Holding knives too long in ult — fire them, they reset on kill",
      "Predictable dash patterns — vary timing, direction, and whether you dash at all"
    ],
    maps: ["Bind", "Haven", "Ascent", "Pearl", "Sunset", "Lotus", "Abyss"]
  },
  "agent-raze": {
    name: "Raze",
    role: "duelist",
    difficulty: 3,
    playstyle: "Explosive entry specialist who clears space with AoE damage and saturation. Forces enemies out of position with Boom Bot and Paint Shells. Satchel mobility enables aggressive angles and quick escapes.",
    abilities: [
      { key: "C", name: "Boom Bot", desc: "Deploys a bot that hunts enemies, revealing and damaging. Great for clearing corners, checking flanks, or post-plant info." },
      { key: "Q", name: "Blast Pack", desc: "Throws a satchel that sticks to surfaces. Detonate to damage + propel. Two charges. Core mobility and damage tool." },
      { key: "E", name: "Paint Shells", desc: "Signature. Cluster grenade. Two charges. Bounces and explodes into sub-munitions. Clears tight angles and post-plant." },
      { key: "X", name: "Showstopper", desc: "Ultimate. Rocket launcher. Massive AoE damage. Use to clear site, stop defuse, or finish low enemies." }
    ],
    combos: [
      "Double Satchel Jump (Q + Q) — launch high/far for aggressive angles or escape",
      "Boom Bot + Peek — send bot, peek where it looks for free info/damage",
      "Paint Shells Bounce — bank off walls into common spots (Heaven, default, CT)",
      "Ult Execute — Showstopper onto site entry, team follows explosions"
    ],
    mistakes: [
      "Wasting both satchels on damage — save one for mobility/escape",
      "Predictable Paint Shell throws — vary bounce angles",
      "Boom Bot into nothing — always have a purpose (clear angle, check flank)",
      "Ulting with teammates in line of fire — comms before rocket"
    ],
    maps: ["Bind", "Split", "Ascent", "Pearl", "Sunset", "Lotus", "Abyss"]
  },
  "agent-reyna": {
    name: "Reyna",
    role: "duelist",
    difficulty: 2,
    playstyle: "Selfish snowball duelist who lives on kills. No team utility — pure 1v1 machine. Leer blinds, Devour heals, Dismiss makes her invulnerable. Feast or famine: wins rounds single-handedly or feeds.",
    abilities: [
      { key: "C", name: "Leer", desc: "Throws a destructible eye that Nearsights enemies looking at it. Two charges. Can be placed through walls." },
      { key: "Q", name: "Devour", desc: "Consumes a Soul Orb (from kills) to rapidly heal to 150 HP (overheal). Shareable with teammates if they have orb." },
      { key: "E", name: "Dismiss", desc: "Signature. Consumes Soul Orb to become invulnerable + invisible for 2s. Reposition, escape, or bait utility." },
      { key: "X", name: "Empress", desc: "Ultimate. Fire rate + reload speed + auto-Devour on kill + unlimited Dismiss. Duration extends on kills." }
    ],
    combos: [
      "Leer + Peek — throw eye high/low, swing opposite side for free peek",
      "Kill → Devour (Q) — instant heal to stay in fight for multi-kill",
      "Kill → Dismiss (E) — reposition for next angle or escape trade",
      "Empress + Aggression — ult, take space, every kill resets sustain"
    ],
    mistakes: [
      "Leering teammates — always call Leer placement",
      "No orbs = no utility — play for first kill, don't force bad duels",
      "Dismissing too early — wait for trade attempt, then reposition",
      "Over-extending in Empress — you're not immortal, trades still happen"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-phoenix": {
    name: "Phoenix",
    role: "duelist",
    difficulty: 2,
    playstyle: "Self-sustaining entry with fire-based kit. Heals in own utility, flashes around corners, ult gives a free life. Great for learning entry fundamentals — forgiving but capped ceiling.",
    abilities: [
      { key: "C", name: "Blaze", desc: "Fire wall that blocks vision, damages enemies, heals Phoenix. Bendable. Two charges." },
      { key: "Q", name: "Hot Hands", desc: "Fire orb that explodes into zone. Damages enemies, heals Phoenix. Two charges." },
      { key: "E", name: "Curveball", desc: "Signature. Flare that flashes around corners. Left/right curve. Two charges." },
      { key: "X", name: "Run It Back", desc: "Ultimate. Places marker. If killed (or timer expires), revive at marker with full HP. 10s duration." }
    ],
    combos: [
      "Curveball + Swing — flash around corner, immediate peek",
      "Blaze Wall Entry — bend wall to cover angle, walk through healing",
      "Hot Hands Self-Heal — throw at feet mid-fight for sustain",
      "Ult Entry — Run It Back, aggressive entry, if you die: info + retry"
    ],
    mistakes: [
      "Flashing teammates — Curveball has friendly fire (blind)",
      "Walling off own team — bend Blaze carefully",
      "Ulting with no info — Run It Back is info tool, not just life",
      "Predictable flashes — vary left/right, height, timing"
    ],
    maps: ["Bind", "Haven", "Split", "Ascent", "Pearl", "Sunset", "Lotus"]
  },
  "agent-yoru": {
    name: "Yoru",
    role: "duelist",
    difficulty: 5,
    playstyle: "Deception-based duelist. Creates chaos with fakes, teleports, and invisibility. Highest skill floor — requires game sense to sell fakes and read enemy reactions. Mind games > aim.",
    abilities: [
      { key: "C", name: "Fakeout", desc: "Clone that walks forward. Flashes enemies when destroyed. Two charges. Sell fakes, bait utility." },
      { key: "Q", name: "Blindside", desc: "Fragment that flashes after bouncing. Two charges. Pop-flash around corners." },
      { key: "E", name: "Gatecrash", desc: "Signature. Tether teleport. Place tether, activate to teleport. Can fake teleport (press E again to cancel)." },
      { key: "X", name: "Dimensional Drift", desc: "Ultimate. Invisible + invulnerable in alternate dimension. See enemies, can't shoot. 10s. Reposition freely." }
    ],
    combos: [
      "Fakeout + Peek — send clone one way, peek other",
      "Gatecrash Bait — place tether, fake teleport (cancel), peek when they shoot tether",
      "Drift + Flank — ult, walk behind enemies, exit for free backstab",
      "Blindside Pop-Flash — bounce off wall for instant flash on angle"
    ],
    mistakes: [
      "Obvious fakes — enemies ignore bad clones. Sell it: move like you're peeking",
      "Predictable Gatecrash — vary teleport timing, use cancel mind game",
      "Ulting into stacked enemies — Drift gives info, not combat. Exit safely.",
      "No comms — Yoru lives on info. Call everything."
    ],
    maps: ["Bind", "Split", "Ascent", "Pearl", "Lotus", "Abyss"]
  },
  "agent-neon": {
    name: "Neon",
    role: "duelist",
    difficulty: 4,
    playstyle: "Speed-based entry. High Gear sprint + slide for instant angle changes. Fast Lane walls cut vision. Relentless pressure — run at enemies until they break. Requires tracking aim and movement mastery.",
    abilities: [
      { key: "C", name: "Fast Lane", desc: "Two parallel electric walls. Block vision, damage enemies. Long duration. Great for execute entries." },
      { key: "Q", name: "Relay Bolt", desc: "Bouncing bolt that stuns two areas. Two charges. Clear corners, check angles." },
      { key: "E", name: "High Gear", desc: "Signature. Toggle sprint. Slide (crouch while sprinting) for instant direction change. Reset on kill." },
      { key: "X", name: "Overdrive", desc: "Ultimate. Lightning beam while sprinting. High damage, infinite ammo. Slide to recharge beam. 6s duration." }
    ],
    combos: [
      "Fast Lane Entry — walls on execute, team runs through, Neon slides through gaps",
      "High Gear Slide Peek — sprint, slide around corner, shoot while sliding",
      "Relay Bolt + Swing — stun angle, immediate peek",
      "Overdrive Aggression — ult, sprint onto site, beam everything, slide to recharge"
    ],
    mistakes: [
      "Sliding predictably — vary slide timing, direction, and whether you slide",
      "Fast Lane blocking team — place walls for team, not just yourself",
      "Overdrive at range — beam is close-range. Sprint in first.",
      "No slide reset management — track kills for slide reset"
    ],
    maps: ["Bind", "Haven", "Ascent", "Pearl", "Sunset", "Lotus", "Abyss"]
  },
  "agent-iso": {
    name: "Iso",
    role: "duelist",
    difficulty: 4,
    playstyle: "1v1 specialist. Double Tap shield rewards aggressive trades. Contingency wall blocks vision. Undercut applies vulnerable. Kill Contract isolates a 1v1. Pure mechanical duelist — win your duel, win the round.",
    abilities: [
      { key: "C", name: "Contingency", desc: "Moving bulletproof wall. Blocks vision and bullets. Two charges. Great for entry cover or post-plant." },
      { key: "Q", name: "Undercut", desc: "Bolt through walls applies Fragile (2x damage) + Suppress. Two charges. Pre-fight debuff." },
      { key: "E", name: "Double Tap", desc: "Signature. Kill/assist grants 1-hit shield (absorbs any damage). 12s duration. Snowball tool." },
      { key: "X", name: "Kill Contract", desc: "Ultimate. Pulls nearest enemy into 1v1 arena. Winner returns with shield. 10s arena." }
    ],
    combos: [
      "Undercut + Contingency — debuff through wall, wall for entry, swing",
      "Double Tap Aggression — get first kill, shield tanks trade, chain kills",
      "Kill Contract Isolation — ult their best player, win 1v1, return with shield",
      "Contingency Post-Plant — wall off defuse angle, force checkmate"
    ],
    mistakes: [
      "Wasting Double Tap shield on chip damage — save for trade attempt",
      "Contingency placement — don't wall your own team's vision",
      "Kill Contract without info — can pull wrong enemy. Call target.",
      "Undercut on empty angles — only use when you know enemy is there"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-waylay": {
    name: "Waylay",
    role: "duelist",
    difficulty: 3,
    playstyle: "Light-based mobility duelist. Saturate hinders, Lightspeed dashes (can go up), Refract teleports back to beacon invulnerable. Convergent Paths speeds allies/hinders foes. Vertical mobility specialist.",
    abilities: [
      { key: "C", name: "Saturate", desc: "Light cluster that Hinders (slow + weapon equip delay) in area. Two charges. Zone control." },
      { key: "Q", name: "Lightspeed", desc: "Dash forward up to 2x. First dash can go upward. Two charges. Vertical + horizontal mobility." },
      { key: "E", name: "Refract", desc: "Signature. Place beacon. Reactivate to teleport back invulnerable. Safe entry/exit." },
      { key: "X", name: "Convergent Paths", desc: "Ultimate. Beam speeds allies, Hinders enemies in path. Team fight accelerator." }
    ],
    combos: [
      "Refract Entry — place beacon safe, Lightspeed in, Refract out if traded",
      "Saturate + Swing — hinder angle, peek while they're slowed",
      "Lightspeed Vertical — dash up to Heaven/boxes, catch off-guard",
      "Ult Team Execute — Convergent Paths onto site, team runs faster"
    ],
    mistakes: [
      "Refract beacon in bad spot — place where you want to return TO",
      "Lightspeed both charges instantly — save one for escape",
      "Saturate on teammates — friendly fire hinder. Call it.",
      "Ult without team follow-up — Convergent Paths needs team speed"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-hush": {
    name: "Hush",
    role: "duelist",
    difficulty: 5,
    playstyle: "Telekinesis duelist. Flow dash with hover, Flashbulb steerable flash, Displacement gravity pull + concuss, Suspension lifts enemies disabling weapons. High execution, high reward. Spatial control master.",
    abilities: [
      { key: "C", name: "Flow", desc: "Place anchor, dash to it. Airborne = hover first. Two charges. Mobility + reposition." },
      { key: "Q", name: "Flashbulb", desc: "Steerable flash orb. Blinds on impact or delay. Two charges. Pop-flash around corners." },
      { key: "E", name: "Displacement", desc: "Steerable gravity orb. Pulls enemies inward, concusses on wall collision. Resets per 2 kills." },
      { key: "X", name: "Suspension", desc: "Ultimate. Steerable orb explodes, lifts enemies 4s, disables weapons/abilities. Fight ender." }
    ],
    combos: [
      "Displacement + Swing — pull enemies out of cover, peek while concussed",
      "Flow Hover + Flash — hover mid-air, steer Flashbulb for off-angle pop",
      "Suspension Execute — ult onto site, enemies float helpless, team cleans",
      "Flashbulb Delay — throw, wait, enemies turn back, flash pops"
    ],
    mistakes: [
      "Displacement without follow-up — pull does nothing if you don't peek",
      "Suspension missing — steer carefully, it's slow. Predict movement.",
      "Flow predictable — vary anchor placement and dash timing",
      "Flashbulb self-blind — steer away from yourself"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-sova": {
    name: "Sova",
    role: "initiator",
    difficulty: 4,
    playstyle: "Precision info gatherer. Recon Bolt reveals, Shock Bolt damages, Owl Drone scouts, Hunter's Fury crosses map. Lineup master — rewards preparation and map knowledge. Anchor initiator.",
    abilities: [
      { key: "C", name: "Owl Drone", desc: "Controllable drone. Shoot dart to reveal. Two charges. Safe info, bait utility." },
      { key: "Q", name: "Shock Bolt", desc: "Explosive arrow. Two charges. Bounce for damage. Clear utility, stop defuse, chip damage." },
      { key: "E", name: "Recon Bolt", desc: "Signature. Sonar arrow reveals enemies in radius. Two charges. Bounce for lineups. Core info tool." },
      { key: "X", name: "Hunter's Fury", desc: "Ultimate. 3 wall-piercing beams. Massive damage, reveals hit enemies. Cross-map execute/retake." }
    ],
    combos: [
      "Recon Bolt Lineups — memorize 3+ per map for standard spots",
      "Drone + Shock — drone spots, shock damages revealed",
      "Double Shock — two charges, same spot for kill on low HP",
      "Ult Execute — Hunter's Fury through site walls, team entries on reveal"
    ],
    mistakes: [
      "Recon Bolt with no lineup — random bolt = random info. Learn lineups.",
      "Droning into death — drone safely, don't feed free intel",
      "Ulting blind — always have info before Hunter's Fury",
      "Shock Bolt waste — save for post-plant or known enemies"
    ],
    maps: ["All maps — lineup dependent"]
  },
  "agent-skye": {
    name: "Skye",
    role: "initiator",
    difficulty: 3,
    playstyle: "Team-support initiator. Trailblazer clears, Guiding Light flashes, Regrowth heals, Seekers hunt. Flexible — can entry, support, or lurk. Healing makes her sustain pick. Pop-flash mastery required.",
    abilities: [
      { key: "C", name: "Regrowth", desc: "Heal all teammates in range. Hold to channel. Pool-based. Self-heal included. Two charges." },
      { key: "Q", name: "Trailblazer", desc: "Control Tasmanian tiger. Leap = concuss. Two charges. Clear angles, check flanks." },
      { key: "E", name: "Guiding Light", desc: "Signature. Hawk flash. Control flight. Pop-flash around corners. Three charges. Best flash in game." },
      { key: "X", name: "Seekers", desc: "Ultimate. 3 trackers seek nearest enemies. Nearsight on hit. Global info + pressure." }
    ],
    combos: [
      "Guiding Light Pop-Flash — master 2-3 per map. Flash for teammates, not self.",
      "Trailblazer + Swing — tiger clears, you peek behind",
      "Seekers + Execute — ult on execute, trackers reveal rotations",
      "Regrowth Management — heal between fights, save pool for post-plant"
    ],
    mistakes: [
      "Flashing teammates — Guiding Light has friendly fire. Call flashes.",
      "Trailblazer suicide — don't send tiger to die for no info",
      "Seekers too early — save for execute or retake",
      "Healing self only — Regrowth is team sustain. Share the pool."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-kay-o": {
    name: "KAY/O",
    role: "initiator",
    difficulty: 3,
    playstyle: "Suppression specialist. ZERO/point knife suppresses abilities. FRAG/ment clears. FLASH/drive pops. NULL/cmd ult suppresses large area + self-revive. Anti-utility pick. Shuts down ability-heavy comps.",
    abilities: [
      { key: "C", name: "FRAG/ment", desc: "Multi-pulse grenade. Two charges. Bounce for damage. Clear corners, post-plant." },
      { key: "Q", name: "FLASH/drive", desc: "High-power flash. Short fuse. Two charges. Right-click = lob, left = throw. Pop-flash king." },
      { key: "E", name: "ZERO/point", desc: "Signature. Suppression knife. Throw to suppress abilities in radius. Two charges. Shuts down exec/retake." },
      { key: "X", name: "NULL/cmd", desc: "Ultimate. Massive suppression pulse. Enemies suppressed. KAY/O gains combat stim. Downed? Allies can stabilize." }
    ],
    combos: [
      "ZERO/point Execute — knife site, team enters while abilities suppressed",
      "FLASH/drive Pop — right-click lob over wall, instant peek",
      "FRAG/ment Post-Plant — bounce onto defuse, multiple pulses",
      "NULL/cmd Retake — ult, suppress entire site, team enters, self-revive insurance"
    ],
    mistakes: [
      "ZERO/point too early — suppress duration short. Time with entry.",
      "FLASH/drive friendly fire — call it. Short fuse = no reaction time.",
      "Ult without team — NULL/cmd needs follow-up. Solo ult = waste.",
      "Knife placement — throw where abilities come from (Heaven, CT, default)"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-fade": {
    name: "Fade",
    role: "initiator",
    difficulty: 3,
    playstyle: "Hunter initiator. Prowler chases, Seize tethers, Haunt reveals, Nightfall marks globally. Terror Trail tracks marked enemies. Info + pressure. Great for clearing and post-plant.",
    abilities: [
      { key: "C", name: "Prowler", desc: "Creature chases nearest enemy/Trail. Nearsights on contact. Two charges. Clear angles, check flanks." },
      { key: "Q", name: "Seize", desc: "Tether zone. Deafens + decays. Two charges. Stop pushes, lock down defuse." },
      { key: "E", name: "Haunt", desc: "Signature. Throw watcher orb. Reveals + marks enemies in radius. Two charges. Core info." },
      { key: "X", name: "Nightfall", desc: "Ultimate. Wave marks, deafens, decays all enemies in massive radius. Global pressure." }
    ],
    combos: [
      "Haunt + Prowler — Haunt marks, Prowler chases marked (faster, longer)",
      "Seize Defuse — tether defuse, enemies can't defuse without leaving zone",
      "Nightfall Execute — ult, team pushes marked/deafened enemies",
      "Terror Trail Tracking — follow trails for free flanks/info"
    ],
    mistakes: [
      "Haunt too close — orb destroyed easily. Throw from safety.",
      "Prowler without Trail — slower, shorter. Prioritize marked targets.",
      "Seize on empty site — only use when you know enemy position",
      "Nightfall too early — save for execute/retake, not round start"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-breach": {
    name: "Breach",
    role: "initiator",
    difficulty: 3,
    playstyle: "Through-wall initiator. Aftershock damages, Flashpoint blinds, Fault Line concusses, Rolling Thunder massive concuss. No lineups needed — point and click. Team execute enabler. Low mechanical floor, high team reliance.",
    abilities: [
      { key: "C", name: "Aftershock", desc: "Slow explosive charge through walls. Two charges. Damage + clear angles." },
      { key: "Q", name: "Flashpoint", desc: "Blinding charge through walls. Two charges. Pop-flash through walls." },
      { key: "E", name: "Fault Line", desc: "Signature. Concussive quake through walls. Charge for distance. Two charges. Stun + slow." },
      { key: "X", name: "Rolling Thunder", desc: "Ultimate. Massive multi-hit concussive wave. Knocks up, concusses. Cross-site." }
    ],
    combos: [
      "Fault Line + Flash — concuss, then flash through wall, team enters",
      "Aftershock Clear — known angle, Aftershock forces move or die",
      "Rolling Thunder Execute — ult site, team runs in on concuss",
      "Double Fault Line — two charges, wider area or deeper distance"
    ],
    mistakes: [
      "Flashing teammates — Flashpoint has huge radius. Call every flash.",
      "Fault Line too close — concuss affects teammates. Distance it.",
      "Rolling Thunder without comms — team must be ready to enter",
      "Aftershock on empty — only use with info or standard clear"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-gekko": {
    name: "Gekko",
    role: "initiator",
    difficulty: 2,
    playstyle: "Creature initiator. Mosh Pit damages, Wingman flashes/plants, Dizzy flashes, Thrash detains. Creatures retrievable (cooldown). Flexible, forgiving, great for learning initiator fundamentals. Wingman plants spike!",
    abilities: [
      { key: "C", name: "Mosh Pit", desc: "Place area damage device. Expands, damages. Retrievable. Two charges." },
      { key: "Q", name: "Wingman", desc: "Creature seeks enemy, flashes OR plants/defuses spike. Retrievable. One charge." },
      { key: "E", name: "Dizzy", desc: "Signature. Creature flashes enemies in cone. Retrievable. Two charges. Easy pop-flash." },
      { key: "X", name: "Thrash", desc: "Ultimate. Control creature. Detonate to detain enemies in radius. Retrievable if not detonated." }
    ],
    combos: [
      "Dizzy + Swing — easy pop-flash, immediate peek",
      "Wingman Plant — post-plant, Wingman defuses. Buy time.",
      "Mosh Pit Clear — place on angle, expands, forces move",
      "Thrash Retake — ult onto site, detain, team enters"
    ],
    mistakes: [
      "Not retrieving — creatures have cooldown. Pick them up!",
      "Wingman waste — save for plant/defuse or known enemy",
      "Thrash detonate early — wait for max enemies in radius",
      "Dizzy friendly fire — flashes teammates. Call it."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-tejo": {
    name: "Tejo",
    role: "initiator",
    difficulty: 3,
    playstyle: "Missile initiator. Stealth Drone suppresses/reveals, Special Delivery sticky concuss, Guided Salvo area denial, Armageddon massive airstrike. High damage, area control. Post-plant monster. Requires map knowledge for Salvo/Armageddon.",
    abilities: [
      { key: "C", name: "Stealth Drone", desc: "Controllable drone. Suppresses + reveals. Two charges. Safe info + suppress." },
      { key: "Q", name: "Special Delivery", desc: "Sticky grenade. Concusses after impact. Two charges. Clear angles, stop defuse." },
      { key: "E", name: "Guided Salvo", desc: "Signature. Tactical map. Fire missiles at target locations. Two charges. Area denial king." },
      { key: "X", name: "Armageddon", desc: "Ultimate. Massive airstrike wave. Long range, high damage. Cross-map execute/retake." }
    ],
    combos: [
      "Guided Salvo Post-Plant — missiles on defuse, impossible to defuse",
      "Special Delivery + Peek — stick angle, concuss, peek",
      "Armageddon Execute — ult site, team enters on explosions",
      "Drone Suppress — drone suppresses, team pushes ability-less enemies"
    ],
    mistakes: [
      "Salvo without map knowledge — learn missile positions per map/site",
      "Armageddon friendly fire — massive radius. Call it. Team must know.",
      "Special Delivery miss — sticky has travel time. Lead targets.",
      "Drone into death — suppress from safety"
    ],
    maps: ["All maps — lineup dependent"]
  },
  "agent-omen": {
    name: "Omen",
    role: "controller",
    difficulty: 3,
    playstyle: "Misdirection controller. Shrouded Step teleports, Paranoia nearsights through walls, Dark Cover global smokes, From the Shadows map-wide teleport. Lurk king. Flexible — can entry, lurk, or anchor. Mind games.",
    abilities: [
      { key: "C", name: "Shrouded Step", desc: "Short-range teleport after channel. Two charges. Reposition, escape, fake." },
      { key: "Q", name: "Paranoia", desc: "Shadow projectile through walls. Nearsights + deafens. Two charges. Info + blind." },
      { key: "E", name: "Dark Cover", desc: "Signature. Global smoke spheres. Two charges. Place anywhere on map. Core smoke tool." },
      { key: "X", name: "From the Shadows", desc: "Ultimate. Teleport anywhere. Can cancel. Enemies see shade. Destroyable. Reposition king." }
    ],
    combos: [
      "Dark Cover Execute — smoke site from map, team enters",
      "Paranoia + Swing — blind through wall, peek",
      "Shrouded Step Fake — channel, cancel, peek where they think you TP'd",
      "Ult Lurk — TP behind enemies, exit shade, backstab"
    ],
    mistakes: [
      "Smoking without info — Dark Cover global but limited charges. Don't waste.",
      "Paranoia friendly fire — huge radius. Call it always.",
      "Ult shade destroyed — place shade safe, not in open",
      "Shrouded Step predictable — vary: TP, fake TP, don't TP"
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-brimstone": {
    name: "Brimstone",
    role: "controller",
    difficulty: 1,
    playstyle: "Tactical controller. Stim Beacon buffs, Incendiary damages, Sky Smoke global smokes (3 at once), Orbital Strike massive beam. Simplest controller — point, click, smoke. Great for learning fundamentals. Low mobility.",
    abilities: [
      { key: "C", name: "Stim Beacon", desc: "Field granting fire rate + move speed. Two charges. Team fight win condition." },
      { key: "Q", name: "Incendiary", desc: "Bouncing incendiary grenade. Two charges. Clear corners, stop defuse, zone." },
      { key: "E", name: "Sky Smoke", desc: "Signature. Tactical map. 3 smokes simultaneously. Global. Three charges. Easiest smokes in game." },
      { key: "X", name: "Orbital Strike", desc: "Ultimate. Massive laser beam. High damage, long duration. Zone denial, stop defuse." }
    ],
    combos: [
      "Sky Smoke Execute — 3 smokes instantly, team runs in",
      "Stim Beacon Fight — drop before team fight, win aim duels",
      "Incendiary Defuse — molly defuse, forces off spike",
      "Orbital Strike Retake — beam on spike, impossible defuse"
    ],
    mistakes: [
      "Sky Smoke all 3 at once — sometimes save 1 for post-plant",
      "Stim Beacon in open — enemies benefit too. Place for team only.",
      "Orbital Strike friendly fire — massive. Call it. Team clear.",
      "No mobility — Brimstone walks. Play safe, don't over-extend."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-viper": {
    name: "Viper",
    role: "controller",
    difficulty: 4,
    playstyle: "Toxic controller. Snake Bite damages, Poison Cloud smoke, Toxic Screen wall, Viper's Pit massive zone. Fuel management unique mechanic. High control, post-plant goddess. Requires fuel discipline and lineups.",
    abilities: [
      { key: "C", name: "Snake Bite", desc: "Acid pool. Damages + applies Decay + Fragile. Two charges. Zone denial, stop defuse." },
      { key: "Q", name: "Poison Cloud", desc: "Deployable smoke orb. Pick up/redeploy. Fuel cost. Two charges. Flexible smoke." },
      { key: "E", name: "Toxic Screen", desc: "Signature. Gas wall. Place via map. Fuel cost. Two charges. Wall smoke." },
      { key: "X", name: "Viper's Pit", desc: "Ultimate. Massive toxic zone. Enemies Decay + Fragile. Viper sees through. Fuel drain." }
    ],
    combos: [
      "Toxic Screen Execute — wall splits site, team enters one side",
      "Poison Cloud One-Way — place orb for one-way angle",
      "Viper's Pit Post-Plant — ult on spike, enemies die defusing",
      "Snake Bite Defuse — acid on spike, Decay + Fragile = no defuse"
    ],
    mistakes: [
      "Fuel starvation — manage fuel! Don't hold Screen + Cloud + Pit simultaneously.",
      "Screen placement — learn lineups. Bad wall = wasted fuel.",
      "Pit too early — fuel drains fast. Ult late round/post-plant.",
      "No lineups — Viper lives on lineups. Learn them."
    ],
    maps: ["Bind, Haven, Split, Ascent, Pearl, Sunset, Lotus, Abyss — all but Breeze/Icebox (no Screen)"]
  },
  "agent-astra": {
    name: "Astra",
    role: "controller",
    difficulty: 5,
    playstyle: "Astral controller. Gravity Well pulls, Nova Pulse concusses, Nebula/Dissipate smokes (retrievable), Cosmic Divide massive wall. Astral Form = global placement. Highest macro skill. Stars = limited resource. Pre-round planning essential.",
    abilities: [
      { key: "C", name: "Gravity Well", desc: "Star pulls enemies, applies Vulnerable. Retrievable. Two charges." },
      { key: "Q", name: "Nova Pulse", desc: "Star concusses area. Retrievable. Two charges." },
      { key: "E", name: "Nebula / Dissipate", desc: "Signature. Star = smoke (Nebula) or recall (Dissipate). Retrievable. 5 stars total. Core smoke." },
      { key: "X", name: "Cosmic Divide", desc: "Ultimate. Infinite wall. Blocks vision + bullets + sound. Map-wide. Two charges." }
    ],
    combos: [
      "Nebula Pre-Round — place stars in Astral Form during buy phase",
      "Gravity Well + Swing — pull enemies out of cover, peek",
      "Cosmic Divide Execute — wall splits site, team enters one side",
      "Star Management — track stars. Dissipate to recycle. Don't starve."
    ],
    mistakes: [
      "No pre-round stars — Astra loses rounds before they start. Place in buy phase.",
      "Star starvation — 5 stars max. Dissipate aggressively. Recycle.",
      "Astral Form too long — vulnerable body. Enter, place, exit fast.",
      "Divide friendly fire — wall blocks team shots. Call placement."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-harbor": {
    name: "Harbor",
    role: "controller",
    difficulty: 3,
    playstyle: "Water controller. Temporal nearsights, High Tide guided wall, Cove shielded smoke, Reckoning massive wave. Flexible walls, shielded smoke unique. High Tide = best execute wall. Cove = safe plant smoke.",
    abilities: [
      { key: "C", name: "Temporal", desc: "Projectile nearsights enemies in area. Two charges. Info + blind." },
      { key: "Q", name: "High Tide", desc: "Guided water wall. Controllable path. Two charges. Best execute wall in game." },
      { key: "E", name: "Cove", desc: "Signature. Shielded smoke sphere. Shield blocks bullets. Pick up/redeploy. Two charges." },
      { key: "X", name: "Reckoning", desc: "Ultimate. Advancing wave. Nearsight + Slow. Massive radius. Cross-site pressure." }
    ],
    combos: [
      "High Tide Execute — guide wall through site, team follows",
      "Cove Plant — smoke on spike, shield blocks defuse shots",
      "Reckoning Retake — wave pushes enemies off site",
      "Temporal + Swing — nearsight angle, peek"
    ],
    mistakes: [
      "High Tide bad path — practice wall paths. Wall must block key angles.",
      "Cove shield waste — shield has HP. Don't place in spam.",
      "Reckoning friendly — massive radius slows teammates. Call it.",
      "No wall lineups — Harbor lives on High Tide. Learn per map."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-clove": {
    name: "Clove",
    role: "controller",
    difficulty: 3,
    playstyle: "Post-death controller. Pick-Me-Up heals/speeds on kill, Meddle decays, Ruse smokes (usable dead), Not Dead Yet self-revive. Plays for trades, smokes after death. Aggressive controller. High risk, high reward.",
    abilities: [
      { key: "C", name: "Pick-Me-Up", desc: "Kill/assist grants heal + speed. Two charges. Snowball sustain." },
      { key: "Q", name: "Meddle", desc: "Fragment applies Decay. Two charges. Pre-fight debuff." },
      { key: "E", name: "Ruse", desc: "Signature. Smoke clouds. Usable WHILE DEAD. Two charges. Post-death value." },
      { key: "X", name: "Not Dead Yet", desc: "Ultimate. Self-revive. Must get kill/assist soon or die. Second life." }
    ],
    combos: [
      "Ruse Post-Death — die, smoke for team, they trade",
      "Meddle + Swing — decay enemy, peek while weakened",
      "Pick-Me-Up Chain — kill, heal/speed, kill again",
      "Not Dead Yet Aggression — ult, entry, if trade: revive, keep fighting"
    ],
    mistakes: [
      "Ruse while alive only — Clove's unique value is DEAD smokes. Die for team.",
      "Not Dead Yet no kill — you die permanently. Only ult with trade potential.",
      "Meddle on empty — only use with info",
      "Over-aggression — Clove feeds if trades don't happen. Play smart."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-miks": {
    name: "Miks",
    role: "controller",
    difficulty: 4,
    playstyle: "Sound controller. M-pulse toggles Concuss/Heal, Harmonize combat stim, Waveform map smokes, Bassquake massive knockback. Unique toggle mechanic. High utility, team fight oriented. Requires mode awareness.",
    abilities: [
      { key: "C", name: "M-pulse", desc: "Toggle Concuss (stun) / Heal mode. Throw device pulses sound. Two charges." },
      { key: "Q", name: "Harmonize", desc: "Combat Stim (speed + fire rate) to self + ally. Refreshes on kills. Two charges." },
      { key: "E", name: "Waveform", desc: "Tactical map. Place hollow sound-wave smokes. Two charges. Flexible smokes." },
      { key: "X", name: "Bassquake", desc: "Ultimate. Massive shockwave. Knockback + slow + deafen. Cross-site." }
    ],
    combos: [
      "Waveform Execute — map smokes, team enters",
      "Harmonize Duel — stim self + entry, win aim duel, refresh",
      "M-pulse Concuss + Swing — stun angle, peek",
      "Bassquake Retake — knockback enemies off site"
    ],
    mistakes: [
      "Wrong M-pulse mode — check toggle! Heal when need concuss = death.",
      "Harmonize self only — share with entry. Team value > solo.",
      "Waveform bad placement — learn map smoke positions",
      "Bassquake friendly — massive knockback affects team. Call it."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-sage": {
    name: "Sage",
    role: "sentinel",
    difficulty: 2,
    playstyle: "Team sustain anchor. Barrier Orb wall, Slow Orb zone, Healing Orb heal, Resurrection revive. Pure support. Wall enables executes, heal sustains, rez wins rounds. Low mechanical skill, high game sense. Selfless playstyle.",
    abilities: [
      { key: "C", name: "Barrier Orb", desc: "Large ice wall. Blocks vision + movement. Two charges. Wall execute, block push, boost." },
      { key: "Q", name: "Slow Orb", desc: "Slow field. Enemies slowed, noise when moving. Two charges. Delay pushes, flank watch." },
      { key: "E", name: "Healing Orb", desc: "Signature. Heal teammate or self. 60 HP. Two charges. Sustain anchor." },
      { key: "X", name: "Resurrection", desc: "Ultimate. Revive dead teammate full HP. One charge. Round swing." }
    ],
    combos: [
      "Wall Execute — wall splits site, team enters, Sage heals entry",
      "Slow Orb Flank — slow on flank route, hear rotations",
      "Heal Management — save heals for post-plant / late round",
      "Resurrection Timing — rez late round, not early. Max impact."
    ],
    mistakes: [
      "Walling teammates — wall blocks team vision/movement. Place carefully.",
      "Healing self early — Sage heals team. Self-heal only when safe.",
      "Rez in open — rez behind cover. Revived player is vulnerable.",
      "Slow Orb on site — slows retake. Place on flank/routes, not site."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-cypher": {
    name: "Cypher",
    role: "sentinel",
    difficulty: 3,
    playstyle: "Info sentinel. Cyber Cage blocks, Spycam watches, Tripwire traps, Neural Theft corpse intel. Camera = free info. Tripwire = flank watch. Cage = one-way or delay. Neural Theft = round info. Lurker anchor.",
    abilities: [
      { key: "C", name: "Cyber Cage", desc: "Cage blocks vision, slows. Two charges. One-way, delay, fake defuse." },
      { key: "Q", name: "Spycam", desc: "Place camera. Dart reveals. Pick up/redeploy. One charge. Free info." },
      { key: "E", name: "Tripwire", desc: "Signature. Wire between walls. Restrains + reveals. Two charges. Flank watch." },
      { key: "X", name: "Neural Theft", desc: "Ultimate. Corpse reveals all enemy locations. One charge. Round-winning info." }
    ],
    combos: [
      "Camera Placement — learn cam spots per map. Cam = free info all round.",
      "Tripwire Flank — wire flank routes. Call when triggered.",
      "Cage One-Way — cage on box/angle, see out, they can't see in",
      "Neural Theft Timing — use on fresh corpse. Call all locations."
    ],
    mistakes: [
      "Camera destroyed early — place safe, not obvious. Pick up if pushed.",
      "Tripwire visible — place at edge of wall, not center. Hide it.",
      "Cage waste — two charges. Save for post-plant or retake.",
      "No Neural Theft — ult wins rounds. Don't forget to use it."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-killjoy": {
    name: "Killjoy",
    role: "sentinel",
    difficulty: 3,
    playstyle: "Area denial sentinel. Nanoswarm damages, Alarmbot chases, Turret watches, Lockdown detains. Setup anchor. Turret = free info + damage. Swarm = post-plant god. Lockdown = retake win. Requires setup time.",
    abilities: [
      { key: "C", name: "Nanoswarm", desc: "Hidden grenade. Activate for damage. Two charges. Post-plant, defuse denial." },
      { key: "Q", name: "Alarmbot", desc: "Bot chases, applies Vulnerable. Pick up/redeploy. One charge. Flank watch." },
      { key: "E", name: "Turret", desc: "Signature. Auto-turret shoots enemies. 180° view. Pick up/redeploy. One charge. Info + chip." },
      { key: "X", name: "Lockdown", desc: "Ultimate. Device detains all enemies in massive radius. 13s windup. Retake king." }
    ],
    combos: [
      "Turret + Alarmbot — turret watches site, bot watches flank",
      "Nanoswarm Defuse — swarm on spike, activate when defuse starts",
      "Lockdown Retake — ult, enemies detained, team pushes free",
      "Setup Recycling — pick up turret/bot/swarm when rotating"
    ],
    mistakes: [
      "Setup destroyed — place hidden. Pick up when rotating.",
      "Lockdown too early — 13s windup. Enemies leave. Time it.",
      "Swarm on empty — only activate with info or defuse sound",
      "Turret in bad spot — 180° view. Place covering entry + site."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-chamber": {
    name: "Chamber",
    role: "sentinel",
    difficulty: 4,
    playstyle: "Weapon sentinel. Trademark trap, Headhunter pistol, Rendezvous teleport, Tour De Force sniper. Aggressive anchor. Takes off-angles with Headhunter/TP. Trademark = flank watch. Tour De Force = eco sniper. High aim dependency.",
    abilities: [
      { key: "C", name: "Trademark", desc: "Trap scans, slows. Two charges. Flank watch, delay push." },
      { key: "Q", name: "Headhunter", desc: "Heavy pistol. ADS, high damage, 8 bullets. Buy instead of Sheriff. Eight charges." },
      { key: "E", name: "Rendezvous", desc: "Signature. Two anchors. Teleport between. Pick up/redeploy. Aggressive angles." },
      { key: "X", name: "Tour De Force", desc: "Ultimate. Sniper. Kill = slowing field. 5 bullets. One-shot body. Eco god." }
    ],
    combos: [
      "Rendezvous Aggression — anchor A, TP to B, take off-angle, TP back",
      "Headhunter Eco — buy Headhunter + light armor, win aim duels",
      "Trademark Flank — trap flank route, slow + info",
      "Tour De Force Eco — sniper round, one-shot, slowing field on kill"
    ],
    mistakes: [
      "Rendezvous predictable — vary anchor positions. Don't TP same way.",
      "Headhunter miss — 8 bullets. Make shots count. ADS for accuracy.",
      "Trademark on site — flank watch > site watch. Place on rotation.",
      "Tour De Force waste — 5 bullets. Only shoot confirmed kills."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-deadlock": {
    name: "Deadlock",
    role: "sentinel",
    difficulty: 3,
    playstyle: "Area denial sentinel. Barrier Mesh blocks movement, Sonic Sensor concusses noise, GravNet forces crouch/slow, Annihilation captures. Pure denial. Mesh = physical wall. GravNet = ultimate delay. Annihilation = 1v1 removal. Low info, high stop power.",
    abilities: [
      { key: "C", name: "Barrier Mesh", desc: "X-shaped wall blocks movement. Two charges. Physical block, not vision." },
      { key: "Q", name: "Sonic Sensor", desc: "Sensor concusses noisy enemies. Two charges. Flank watch, entry deny." },
      { key: "E", name: "GravNet", desc: "Signature. Grenade forces crouch + slow. Two charges. Delay + expose." },
      { key: "X", name: "Annihilation", desc: "Ultimate. Nano-wire captures first enemy. Deadly cocoon. 1v1 removal." }
    ],
    combos: [
      "Mesh + GravNet — block path, net forces crouch in open",
      "Sensor Flank — sensor on flank route, concuss rotators",
      "Annihilation Target — ult their best player, remove from round",
      "Mesh Retake — wall off defuse angles, force checkmate"
    ],
    mistakes: [
      "Mesh blocking team — X-wall blocks movement both ways. Place carefully.",
      "GravNet waste — only use with info or standard delay spots",
      "Annihilation miss — wire has travel time. Lead target.",
      "Sensor sensitivity — concusses on noise (shoot, run, ability). Place smart."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-vyse": {
    name: "Vyse",
    role: "sentinel",
    difficulty: 4,
    playstyle: "Trap sentinel. Razorvine slows/damages, Shear indestructible wall, Arc Rose stealth flash, Steel Garden weapon jam. High control, trap mastery. Shear = unique wall behind enemies. Steel Garden = anti-utility ult. Requires prediction.",
    abilities: [
      { key: "C", name: "Razorvine", desc: "Nest slows + damages moving enemies. Two charges. Area denial." },
      { key: "Q", name: "Shear", desc: "Trap places indestructible wall BEHIND enemy. Two charges. Cut off retreat." },
      { key: "E", name: "Arc Rose", desc: "Signature. Stealthed flash. Activates on proximity. Two charges. Trap flash." },
      { key: "X", name: "Steel Garden", desc: "Ultimate. Jams primary weapons in large area. Enemies pistol only." }
    ],
    combos: [
      "Shear Cutoff — trap behind pushing enemies, wall blocks retreat",
      "Arc Rose Entry — stealth flash on entry path, blind pushers",
      "Steel Garden Retake — ult site, enemies pistol only, easy kills",
      "Razorvine Delay — nest on push route, slow + damage"
    ],
    mistakes: [
      "Shear prediction — must anticipate push. Place where they WILL be.",
      "Arc Rose visible — stealthed but detectable. Place off-angle.",
      "Steel Garden friendly — jams team weapons too. Call it. Team switch secondary.",
      "Razorvine on site — slows retake. Place on entry routes."
    ],
    maps: ["All maps — flexible pick"]
  },
  "agent-veto": {
    name: "Veto",
    role: "sentinel",
    difficulty: 4,
    playstyle: "Disruption sentinel. Crosscut teleport, Chokehold trap deafens/decays/holds, Interceptor destroys utility, Evolution immune to debuffs + stim. Anti-utility specialist. Interceptor = unique utility denial. Evolution = unstoppable anchor.",
    abilities: [
      { key: "C", name: "Crosscut", desc: "Teleport to placed beacon. Two charges. Reposition, escape." },
      { key: "Q", name: "Chokehold", desc: "Trap deafens + decays + holds. Two charges. Lockdown area." },
      { key: "E", name: "Interceptor", desc: "Signature. Device destroys incoming enemy utility. Two charges. Anti-utility." },
      { key: "X", name: "Evolution", desc: "Ultimate. Immune to debuffs. Stim + regen. Unstoppable anchor." }
    ],
    combos: [
      "Interceptor Anti-Util — place, enemy util destroyed, push free",
      "Chokehold Lockdown — trap site entry, hold + decay pushers",
      "Crosscut Escape — beacon safe, teleport when pushed",
      "Evolution Anchor — ult, hold angle immune to flash/concuss/decay"
    ],
    mistakes: [
      "Interceptor placement — destroys ALL util (friendly too). Place carefully.",
      "Chokehold visible — trap detectable. Place off-angle.",
      "Crosscut predictable — vary beacon. Don't TP same spot.",
      "Evolution overconfidence — immune to debuffs, not bullets. Don't overpeek."
    ],
    maps: ["All maps — flexible pick"]
  }
};

// Featured guide data
const featuredGuidesData = {
  "featured-economy": {
    title: "Economy Management",
    tag: "Mechanics",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><path d="M18 20v-8"/><path d="M6 20v-4"/></svg>`,
    overview: "Valorant's economy system is the backbone of competitive play. Understanding when to buy, force, save, or eco can win you rounds before a single shot is fired. Each round you earn credits based on kills, plants, defuses, and round outcome. Managing your team's economy collectively is just as important as your own.",
    concepts: [
      "Full Buy — 4500+ credits: Rifle + Heavy Armor + Utility",
      "Force Buy — 3000-4400 credits: Best possible with current credits, usually Spectre/Marshal + Light Armor + some utility",
      "Light Buy / Semi-Buy — 2000-2900 credits: SMG + Light Armor + minimal utility",
      "Eco / Save — <2000 credits: Classic/Shorty only, save for next round",
      "Bonus Round — After winning eco: Minimal buy to bank credits for next full buy"
    ],
    tips: [
      "Track enemy economy — if they lost 2 rounds, they likely eco",
      "Communicate buy type every round — 'Full buy', 'Force', 'Eco'",
      "Don't overbuy utility on eco — save for next full buy",
      "Dropping weapons saves team credits — drop rifles to teammates with less money",
      "Plant Spike on eco rounds — 300 credits per player adds up"
    ],
    mistakes: [
      "Buying every round — leads to permanent eco disadvantage",
      "Not dropping for teammates — selfish economy loses rounds",
      "Force buying with 3500 credits — either full buy or eco",
      "Ignoring enemy economy — free info for reading their buys",
      "Buying Heavy Armor on half-buy — Light Armor is often enough"
    ],
    drills: [
      "Practice: Play 10 unrated rounds tracking only economy (no aim focus)",
      "Drill: Calculate team total credits at start of each round",
      "Exercise: Watch pro VOD, pause at buy phase, predict their buys"
    ]
  },
  "featured-crosshair": {
    title: "Crosshair Placement",
    tag: "Mechanics",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    overview: "Crosshair placement is the single most impactful mechanical skill in Valorant. Good crosshair placement means your aim is already on the enemy before they appear — you only need to click, not flick. This reduces reaction time, increases consistency, and lets you win duels against mechanically superior opponents.",
    concepts: [
      "Head Level — Keep crosshair at enemy head height at all times",
      "Pre-Aim Common Angles — Default, Heaven, CT, Corners, Site entries",
      "Off-Angle Positioning — Stand where enemies don't pre-aim",
      "Clearing Angles Sequentially — One angle at a time, don't swing wide",
      "Crosshair Reset — After movement, instantly reset to head level"
    ],
    tips: [
      "Use custom crosshair: Small gap (1-2), thin lines (1-2), no center dot, cyan/green for visibility",
      "Deathmatch focusing ONLY on crosshair placement — ignore score",
      "Pre-aim head level while walking, not just when holding angles",
      "Learn map-specific head heights (boxes, ropes, stairs change height)",
      "Counter-strafe: Stop completely before shooting for accuracy"
    ],
    mistakes: [
      "Aiming at ground/floor while moving — crosshair should always be head level",
      "Swinging wide and clearing multiple angles at once",
      "Not resetting crosshair after killing — next enemy appears at different angle",
      "Holding angles too close — gives enemy reaction time advantage",
      "Crosshair too thick/large — obscures enemy head at distance"
    ],
    drills: [
      "Drill: 10 min DM, only score = headshots. Track HS%",
      "Exercise: Custom game, walk map pre-aiming every angle",
      "Practice: Aim Lab / KovaaK 'Head Level' and 'Pre-fire' tasks"
    ]
  },
  "featured-callouts": {
    title: "Map Callouts",
    tag: "Maps",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    overview: "Standardized callouts are the language of competitive Valorant. Precise, concise communication lets your team react instantly — 'One Heaven A' is infinitely better than 'Guy up there on the right'. Every competitive map has established callouts used by pros globally. Learning them is free Elo.",
    concepts: [
      "Universal Directions — 'Heaven' (high), 'Hell' (low), 'CT' (defender spawn), 'T/Attacker' side",
      "Site Anatomy — 'Default' (standard plant), 'Safe' (behind cover), 'Open' (exposed), 'Corner'",
      "Map Control — 'Main', 'Lobby', 'Mid', 'Courtyard', 'Market', 'Garage', 'Sewers'",
      "Timing Calls — 'Rotating', 'Pushing', 'Holding', 'Flanking', 'Lurking'",
      "Info Format — Count + Location + Action (e.g., 'Two Heaven A, pushing site')"
    ],
    tips: [
      "Learn ONE map's callouts perfectly before moving to next",
      "Use short forms: 'A Main' → 'Main', 'B Heaven' → 'B Heaven'",
      "Call DEAD enemies too — 'One down Heaven A' = team can push",
      "Avoid relative terms: 'Left/Right' depends on perspective. Use map names.",
      "Say 'Unknown' if unsure — wrong info is worse than no info"
    ],
    mistakes: [
      "Using 'Left/Right' instead of map callouts",
      "Over-communicating — 'I think maybe one guy near the box thing' wastes time",
      "Not calling when YOU die — your death info is valuable",
      "Calling 'They're rotating' without count or direction",
      "Only learning your main map — you'll queue others eventually"
    ],
    drills: [
      "Exercise: Load each map in custom, walk and say every callout aloud",
      "Practice: Watch pro match with map overlay, repeat their calls",
      "Drill: Queue with 5-stack, enforce 'callout only' comms for 5 games"
    ]
  },
  "featured-compositions": {
    title: "Team Compositions",
    tag: "Strategy",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    overview: "Team composition (comp) determines how you play the map, execute sites, and win rounds. A balanced comp covers all roles: Entry (Duelist), Info/Setup (Initiator), Vision/Pace (Controller), Anchor (Sentinel). Meta comps shift each patch, but fundamentals remain: synergy > individual picks.",
    concepts: [
      "Standard Comp — 1 Duelist, 1 Initiator, 1 Controller, 1 Sentinel, 1 Flex",
      "Double Controller — Viper + Omen/Astra/Harbor (Split, Bind, Pearl)",
      "Double Initiator — Sova + Skye/KAY/O/Fade (Ascent, Haven, Lotus)",
      "No Duelist — Controller/Initiator entry (rare, requires coordination)",
      "Map-Specific — Bind: Double Controller; Ascent: Double Initiator; Icebox: Viper mandatory"
    ],
    tips: [
      "Pick for MAP, not just comfort — Viper on Breeze, Neon on Fracture",
      "Flex slot adapts: 2nd Controller (smoke-heavy), 2nd Initiator (info-heavy), 2nd Duelist (aggro)",
      "Agent synergy: Sova + Shock Bolt agents, Skye + Flash followers, Viper + Post-plant agents",
      "Economy synergy: Agents with cheap utility (Brimstone, Cypher) enable team eco rounds",
      "Comfort > Meta in solo queue — play what you know, not what pros play"
    ],
    mistakes: [
      "4 Duelists + 1 Controller — no info, no anchor, no post-plant",
      "No Controller on smoke-heavy maps (Bind, Split, Pearl)",
      "Double Sentinel on attack — wastes flank watch utility",
      "Picking 'meta' agents you can't play — 30% winrate Jett < 55% winrate Reyna",
      "Ignoring enemy comp — adapt your playstyle to counter their weaknesses"
    ],
    drills: [
      "Exercise: For each map, write your ideal 5-agent comp and why",
      "Practice: 5-stack scrims testing specific comps vs standard",
      "Study: Pro team comps per map per patch (vlr.gg stats)"
    ]
  }
};

// ====== DOM ELEMENTS (cached after DOM ready) ======
let agentGuidesGrid = null;
let filterBtns = null;
let roleGuideModal = null;
let agentGuideModal = null;
let featuredGuideModal = null;
let roleModalClose = null;
let agentModalClose = null;
let featuredModalClose = null;

// ====== RENDER AGENT GUIDE CARDS ======
let currentFilter = "all";
let previousFilter = "all";
let isFiltering = false;

function createAgentCard(id, agent, index = 0) {
  const card = document.createElement("article");
  card.className = "agent-guide-card";
  card.dataset.agentId = id;
  card.dataset.agentRole = agent.role;
  card.tabIndex = 0;
  card.role = "listitem";
  card.style.setProperty("--card-index", index);

  const difficulty = agent.difficulty || 3;
  const dots = Array.from({ length: 5 }, (_, i) =>
    `<span class="difficulty-dot${i < difficulty ? " filled" : ""}"></span>`
  ).join("");

  card.innerHTML = `
    <div class="agent-guide-card-thumb">
      <img src="${agent.img || `agents photo/${id.replace("agent-", "")}.webp`}" alt="${agent.name} portrait" loading="lazy">
    </div>
    <div class="agent-guide-card-body">
      <h4 class="agent-guide-card-name">${agent.name}</h4>
      <span class="agent-guide-card-role ${agent.role}">${agent.role.charAt(0).toUpperCase() + agent.role.slice(1)}</span>
      <div class="agent-guide-card-difficulty">
        <span>Difficulty</span>
        <div class="difficulty-dots">${dots}</div>
      </div>
    </div>
  `;

  // Click handler
  card.addEventListener("click", () => openAgentGuideModal(id));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAgentGuideModal(id);
    }
  });

  return card;
}

function renderAgentGuides(filter = "all") {
  if (!agentGuidesGrid) return;

  // Safety: if stuck filtering for too long, force reset
  if (isFiltering) {
    console.warn("[Guides] Filter stuck, forcing reset");
    forceFilterReset();
    // After reset, re-run with new filter
    if (filter !== currentFilter) {
      setTimeout(() => renderAgentGuides(filter), 0);
    }
    return;
  }

  // Track previous filter for directional fill animation
  if (filter !== currentFilter) {
    previousFilter = currentFilter;
  }
  currentFilter = filter;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const newFilter = filter;
  const cards = Array.from(agentGuidesGrid.children);
  const currentCards = cards.filter(card => card.classList.contains("agent-guide-card"));

  // Determine which cards stay, leave, and enter
  const stayingCards = [];
  const leavingCards = [];
  const enteringData = [];

  Object.entries(agentGuidesData).forEach(([id, agent]) => {
    const matches = newFilter === "all" || agent.role === newFilter;
    const existingCard = currentCards.find(c => c.dataset.agentId === id);

    if (matches && existingCard) {
      stayingCards.push(existingCard);
    } else if (!matches && existingCard) {
      leavingCards.push(existingCard);
    } else if (matches && !existingCard) {
      enteringData.push({ id, agent });
    }
  });

  // If no changes, just update filter state
  if (leavingCards.length === 0 && enteringData.length === 0) {
    currentFilter = newFilter;
    updateFilterButtonState(newFilter);
    return;
  }

  isFiltering = true;
  agentGuidesGrid.classList.add("filtering");

  // Safety: force reset after max expected time + buffer
  const safetyTimeout = setTimeout(() => {
    if (isFiltering) {
      console.warn("[Guides] Safety timeout triggered, forcing reset");
      forceFilterReset();
    }
  }, 3000);

  // ============================================================
  // CROSS-FADE + STAGGER IMPLEMENTATION
  // ============================================================

  // Calculate stagger delays - reduced for snappier feel
  const exitStaggerMs = 8;    // leaving cards: faster sweep
  const enterStaggerMs = 18;  // entering cards: quicker settle

  // Phase 1: Start exit animations immediately (overlapped with enter prep)
  const exitPromises = leavingCards.map((card, i) => {
    return new Promise(resolve => {
      if (prefersReducedMotion) {
        card.remove();
        resolve();
        return;
      }

      // Stagger the START of each exit
      setTimeout(() => {
        // Guard: card might already be removed
        if (!card.parentElement) {
          resolve();
          return;
        }

        card.classList.add("exiting");

        // Wait for transition to complete
        const onTransitionEnd = (e) => {
          // Only respond to our properties
          if (e && e.propertyName !== "opacity" && e.propertyName !== "transform") return;

          card.removeEventListener("transitionend", onTransitionEnd);
          if (card.parentElement) card.remove();
          resolve();
        };
        card.addEventListener("transitionend", onTransitionEnd, { once: true });

        // Safety timeout in case transitionend doesn't fire
        setTimeout(() => {
          card.removeEventListener("transitionend", onTransitionEnd);
          if (card.parentElement) card.remove();
          resolve();
        }, 400);
      }, i * exitStaggerMs);
    });
  });

  // Phase 2: Prepare entering cards (start after brief overlap)
  // This creates the "cross-fade" - enter starts while exit still running
  const enterDelay = Math.min(leavingCards.length * exitStaggerMs, 120);

  setTimeout(() => {
    // Create and append entering cards with initial state
    const enteringCards = enteringData.map((data, i) => {
      const card = createAgentCard(data.id, data.agent, i);
      card.classList.add("entering");
      // Set stagger delay via CSS custom property
      card.style.setProperty("--stagger-delay", `${i * enterStaggerMs}ms`);
      agentGuidesGrid.appendChild(card);
      return card;
    });

    // Reorder ALL cards (staying + entering) to maintain data order
    const allCards = [...stayingCards, ...enteringCards];
    const sortedCards = [];
    Object.keys(agentGuidesData).forEach(id => {
      const card = allCards.find(c => c.dataset.agentId === id);
      if (card && (newFilter === "all" || card.dataset.agentRole === newFilter)) {
        sortedCards.push(card);
      }
    });

    // Re-append in correct order (this is a no-op for layout, just DOM order)
    sortedCards.forEach(card => agentGuidesGrid.appendChild(card));

    // Phase 3: Trigger enter animations (double rAF for reliable reflow)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        enteringCards.forEach(card => {
          if (card.parentElement) {
            card.classList.remove("entering");
            card.classList.add("animate-in");
          }
        });
      });
    });

    // Phase 4: Cleanup after all animations complete
    const maxExitTime = leavingCards.length * exitStaggerMs + 200;
    const maxEnterTime = enterDelay + enteringCards.length * enterStaggerMs + 250;
    const totalTime = Math.max(maxExitTime, maxEnterTime);

    setTimeout(() => {
      clearTimeout(safetyTimeout);
      agentGuidesGrid.classList.remove("filtering");
      isFiltering = false;
      currentFilter = newFilter;
      updateFilterButtonState(newFilter);
    }, totalTime);

  }, enterDelay);
}

function forceFilterReset() {
  if (!agentGuidesGrid) return;

  // Remove all animation classes
  agentGuidesGrid.querySelectorAll(".agent-guide-card").forEach(card => {
    card.classList.remove("exiting", "entering", "animate-in");
  });

  // Re-render current filter from scratch
  agentGuidesGrid.innerHTML = "";
  renderAgentGuides(currentFilter);
}

function updateFilterButtonState(filter) {
  // Determine directional fill origin: "left" or "right"
  // Based on filter order: all, duelist, initiator, controller, sentinel
  const filterOrder = ["all", "duelist", "initiator", "controller", "sentinel"];
  const prevIndex = filterOrder.indexOf(previousFilter);
  const newIndex = filterOrder.indexOf(filter);
  const direction = newIndex > prevIndex ? "left" : "right";

  filterBtns?.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive);

    // Set fill origin for directional animation
    // Active button expands FROM the direction of the previous filter
    if (isActive) {
      btn.style.setProperty("--fill-origin", direction === "left" ? "left" : "right");
    } else {
      // Non-active buttons collapse TOWARD the new active button
      btn.style.setProperty("--fill-origin", direction === "left" ? "right" : "left");
    }
  });
}

// ====== FILTER HANDLING ======
function initFilterHandlers() {
  filterBtns?.forEach(btn => {
    btn.addEventListener("click", () => {
      // Pre-set the directional fill origin on the clicked button
      // This ensures the animation starts correctly even before renderAgentGuides runs
      const filterOrder = ["all", "duelist", "initiator", "controller", "sentinel"];
      const prevIndex = filterOrder.indexOf(currentFilter);
      const newIndex = filterOrder.indexOf(btn.dataset.filter);
      const direction = newIndex > prevIndex ? "left" : "right";

      // Set origin on the target button immediately for responsive feel
      btn.style.setProperty("--fill-origin", direction === "left" ? "left" : "right");

      // Don't update button UI here - let renderAgentGuides handle it on success
      // This prevents UI flicker when forceFilterReset reverts to currentFilter
      renderAgentGuides(btn.dataset.filter);
    });
  });
}

// ====== ROLE GUIDE MODAL ======
function openRoleGuideModal(roleId) {
  const data = roleGuidesData[roleId];
  if (!data) return;

  // Header
  roleGuideModal.querySelector(".guide-modal-icon").innerHTML = data.icon;
  roleGuideModal.querySelector(".guide-modal-icon").className = `guide-modal-icon ${data.iconClass}`;
  roleGuideModal.querySelector("#role-modal-title").textContent = data.title;
  roleGuideModal.querySelector(".guide-modal-subtitle").textContent = data.subtitle;

  // Body
  document.getElementById("role-overview").textContent = data.overview;

  const respList = document.getElementById("role-responsibilities");
  respList.innerHTML = data.responsibilities.map(r => `<li>${r}</li>`).join("");

  const conceptsList = document.getElementById("role-concepts");
  conceptsList.innerHTML = data.concepts.map(c => `<li>${c}</li>`).join("");

  const agentsGrid = document.getElementById("role-agents");
  agentsGrid.innerHTML = data.agents.map(a => `
    <div class="role-agent-mini" data-agent-id="${a.id}" tabindex="0" role="button" aria-label="View ${a.name} guide">
      <div class="role-agent-mini-name">${a.name}</div>
      <span class="role-agent-mini-role ${a.role}">${a.role.charAt(0).toUpperCase() + a.role.slice(1)}</span>
    </div>
  `).join("");

  // Add click handlers to mini agent cards
  agentsGrid.querySelectorAll(".role-agent-mini").forEach(mini => {
    mini.addEventListener("click", () => {
      closeRoleGuideModal();
      setTimeout(() => openAgentGuideModal(mini.dataset.agentId), 150);
    });
    mini.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeRoleGuideModal();
        setTimeout(() => openAgentGuideModal(mini.dataset.agentId), 150);
      }
    });
  });

  const checklistList = document.getElementById("role-checklist");
  checklistList.innerHTML = data.checklist.map(c => `<li>${c}</li>`).join("");

  roleGuideModal.classList.add("open");
  roleGuideModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  roleModalClose.focus();
}

function closeRoleGuideModal() {
  roleGuideModal.classList.remove("open");
  roleGuideModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openAgentGuideModal(agentId) {
  const agent = agentGuidesData[agentId];
  if (!agent) return;

  // Check if we have the image from agentsData (loaded from Agents page)
  // Fallback to constructed path if not available
  const agentsDataGlobal = window.agentsData;
  const imgSrc = (agentsDataGlobal && agentsDataGlobal[agentId]?.img)
    ? agentsDataGlobal[agentId].img
    : `agents photo/${agentId.replace("agent-", "")}.webp`;

  // Get passive from agentsData
  const passiveText = agentsDataGlobal && agentsDataGlobal[agentId]?.passive
    ? "Passive: " + agentsDataGlobal[agentId].passive
    : "";

  // Header
  const modalImg = document.getElementById("agent-modal-img");
  modalImg.src = imgSrc;
  modalImg.alt = `${agent.name} portrait`;

  document.getElementById("agent-modal-title").textContent = agent.name;
  document.getElementById("agent-modal-role").textContent = `${agent.role} • Difficulty: ${"★".repeat(agent.difficulty || 3)}${"☆".repeat(5 - (agent.difficulty || 3))}`;

  // Difficulty bars
  const difficulty = agent.difficulty || 3;
  const diffContainer = document.getElementById("agent-modal-difficulty");
  diffContainer.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<div class="difficulty-bar${i < difficulty ? " filled" : ""}"></div>`
  ).join("");

  // Reset any previous typewriter animations
  resetTypewriterAnimations();

  // Passive with typewriter
  const passiveEl = document.getElementById("agent-passive");
  if (passiveText) {
    passiveEl.textContent = "";
    typewriterWithSound(passiveEl, passiveText, 15);
  } else {
    passiveEl.textContent = "No passive data available";
  }

  // Playstyle with typewriter
  const playstyleEl = document.getElementById("agent-playstyle");
  playstyleEl.textContent = "";
  typewriterWithSound(playstyleEl, agent.playstyle, 15);

  // Abilities
  const abilitiesContainer = document.getElementById("agent-abilities");
  abilitiesContainer.innerHTML = agent.abilities.map(ability => `
    <div class="agent-ability-item">
      <div class="agent-ability-key">${ability.key}</div>
      <div class="agent-ability-info">
        <div class="agent-ability-name">${ability.name}</div>
        <p class="agent-ability-desc">${ability.desc}</p>
      </div>
    </div>
  `).join("");

  // Combos
  document.getElementById("agent-combos").innerHTML = agent.combos.map(c => `<li>${c}</li>`).join("");

  // Mistakes
  document.getElementById("agent-mistakes").innerHTML = agent.mistakes.map(m => `<li>${m}</li>`).join("");

  // Maps
  document.getElementById("agent-maps").innerHTML = agent.maps.map(m => `<span class="agent-map-tag">${m}</span>`).join("");

  agentGuideModal.classList.add("open");
  agentGuideModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  agentModalClose.focus();
}

function closeAgentGuideModal() {
  agentGuideModal.classList.remove("open");
  agentGuideModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ====== ROLE CARD CLICK HANDLERS ======
function initRoleCardHandlers() {
  document.querySelectorAll(".role-card").forEach(card => {
    card.addEventListener("click", () => openRoleGuideModal(card.dataset.guideId));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openRoleGuideModal(card.dataset.guideId);
      }
    });
  });
}

// ====== FEATURED GUIDE CARD HANDLERS ======
function initFeaturedGuideHandlers() {
  document.querySelectorAll(".featured-guide-card").forEach(card => {
    card.addEventListener("click", () => openFeaturedGuideModal(card.dataset.guideId));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFeaturedGuideModal(card.dataset.guideId);
      }
    });
  });
}

// ====== MODAL CLOSE EVENTS ======
function initModalCloseHandlers() {
  roleModalClose?.addEventListener("click", closeRoleGuideModal);
  agentModalClose?.addEventListener("click", closeAgentGuideModal);
  featuredModalClose?.addEventListener("click", closeFeaturedGuideModal);

  [roleGuideModal, agentGuideModal, featuredGuideModal].forEach(modal => {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        if (modal === roleGuideModal) closeRoleGuideModal();
        else if (modal === agentGuideModal) closeAgentGuideModal();
        else closeFeaturedGuideModal();
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (roleGuideModal?.classList.contains("open")) closeRoleGuideModal();
      if (agentGuideModal?.classList.contains("open")) closeAgentGuideModal();
      if (featuredGuideModal?.classList.contains("open")) closeFeaturedGuideModal();
    }
  });
}

// ====== FEATURED GUIDE MODAL ======
function openFeaturedGuideModal(guideId) {
  const data = featuredGuidesData[guideId];
  if (!data) return;

  // Header
  featuredGuideModal.querySelector(".featured-modal-icon").innerHTML = data.icon;
  document.getElementById("featured-modal-title").textContent = data.title;
  document.getElementById("featured-modal-tag").textContent = data.tag;

  // Body
  document.getElementById("featured-overview").textContent = data.overview;

  document.getElementById("featured-concepts").innerHTML = data.concepts.map(c => `<li>${c}</li>`).join("");
  document.getElementById("featured-tips").innerHTML = data.tips.map(t => `<li>${t}</li>`).join("");
  document.getElementById("featured-mistakes").innerHTML = data.mistakes.map(m => `<li>${m}</li>`).join("");
  document.getElementById("featured-drills").innerHTML = data.drills.map(d => `<li>${d}</li>`).join("");

  featuredGuideModal.classList.add("open");
  featuredGuideModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  featuredModalClose.focus();
}

function closeFeaturedGuideModal() {
  featuredGuideModal.classList.remove("open");
  featuredGuideModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ====== INITIALIZE ======
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements after they exist
  agentGuidesGrid = document.getElementById("agent-guides-grid");
  filterBtns = document.querySelectorAll(".filter-btn");
  roleGuideModal = document.getElementById("role-guide-modal");
  agentGuideModal = document.getElementById("agent-guide-modal");
  featuredGuideModal = document.getElementById("featured-guide-modal");
  roleModalClose = roleGuideModal?.querySelector(".guide-modal-close");
  agentModalClose = agentGuideModal?.querySelector(".guide-modal-close");
  featuredModalClose = featuredGuideModal?.querySelector(".guide-modal-close");

  renderAgentGuides("all");
  initRoleCardHandlers();
  initFilterHandlers();
  initFeaturedGuideHandlers();
  initModalCloseHandlers();
});
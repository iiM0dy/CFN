import { prisma } from "./lib/prisma"

async function seed() {
  const gamesData = [
    {
      name: "Valorant",
      slug: "valorant",
      description: "Rank Boost, Coaching",
      href: "/games/valorant/services",
      bgImage: "/assets/val-cat-bg.png",
      charImage: "/assets/val-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Rank Boosting",
          description: "Reclaim your ELO with our professional boosters.",
          basePrice: 10.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo", "Duo"],
        },
        {
          name: "Placement Matches",
          description: "Get the best start to your season.",
          basePrice: 15.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo", "Duo"],
        }
      ]
    },
    {
      name: "League of Legends",
      slug: "lol",
      description: "Rank, Duo Queue",
      href: "/games/lol/services",
      bgImage: "/assets/lol-cat-bg.png",
      charImage: "/assets/lol-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Ranked Solo/Duo",
          description: "Climb the ladder in Summoner's Rift.",
          basePrice: 8.00,
          platforms: ["PC"],
          completionMethods: ["Solo", "Duo"],
        }
      ]
    },
    {
      name: "World of Warcraft",
      slug: "wow",
      description: "Gold, Powerleveling",
      href: "/games/wow/services",
      bgImage: "/assets/wow-cat-bg.png",
      charImage: "/assets/wow-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Powerleveling 1-70",
          description: "Reach max level in no time.",
          basePrice: 50.00,
          platforms: ["PC"],
          completionMethods: ["Solo"],
        }
      ]
    },
    {
      name: "Throne and Liberty",
      slug: "throne-and-liberty",
      description: "Account, Currency",
      href: "/games/throne-and-liberty/services",
      bgImage: "/assets/TAL-cat-bg.png",
      charImage: "/assets/TAL-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Leveling Service",
          description: "Quickly level up your character.",
          basePrice: 30.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo"],
        }
      ]
    },
    {
      name: "ARC Raiders",
      slug: "arc-raiders",
      description: "Rank Boost, Loot Farming",
      href: "/games/arc-raiders/services",
      bgImage: "/assets/arc-cat-bg.png",
      charImage: "/assets/arc-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Rank Boosting",
          description: "Climb the ranks with our elite ARC Raiders players.",
          basePrice: 12.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo", "Duo"],
          options: [
            {
              label: "Current Rank",
              type: "select",
              required: true,
              order: 1,
              values: [
                { label: "Bronze", value: "bronze", priceModifier: 0, order: 1 },
                { label: "Silver", value: "silver", priceModifier: 5, order: 2 },
                { label: "Gold", value: "gold", priceModifier: 10, order: 3 },
                { label: "Platinum", value: "platinum", priceModifier: 15, order: 4 },
                { label: "Diamond", value: "diamond", priceModifier: 25, order: 5 },
              ]
            },
            {
              label: "Desired Rank",
              type: "select",
              required: true,
              order: 2,
              values: [
                { label: "Silver", value: "silver", priceModifier: 10, order: 1 },
                { label: "Gold", value: "gold", priceModifier: 20, order: 2 },
                { label: "Platinum", value: "platinum", priceModifier: 35, order: 3 },
                { label: "Diamond", value: "diamond", priceModifier: 50, order: 4 },
                { label: "Master", value: "master", priceModifier: 80, order: 5 },
              ]
            },
            {
              label: "Priority Queue",
              type: "checkbox",
              required: false,
              order: 3,
              values: [
                { label: "Start within 1 hour", value: "priority", priceModifier: 15, order: 1 },
              ]
            }
          ]
        },
        {
          name: "Blueprints",
          description: "Get the best gear and resources efficiently.",
          basePrice: 20.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Self-play (In-raid trade)", "Piloted"],
          maxQuantity: 3,
          options: [
            {
              label: "Blueprints",
              type: "checkbox",
              required: true,
              order: 1,
              values: [
                { label: "Anvil", value: "anvil", priceModifier: 2.98, order: 1 },
                { label: "Aphelion", value: "aphelion", priceModifier: 2.98, order: 2 },
                { label: "Bobcat", value: "bobcat", priceModifier: 2.98, order: 3 },
                { label: "Burletta", value: "burletta", priceModifier: 4.98, order: 4 },
                { label: "Il Toro", value: "il_toro", priceModifier: 2.98, order: 5 },
                { label: "Osprey", value: "osprey", priceModifier: 2.98, order: 6 },
                { label: "Torrente", value: "torrente", priceModifier: 2.98, order: 7 },
                { label: "Venator", value: "venator", priceModifier: 2.98, order: 8 },
                { label: "Bettina", value: "bettina", priceModifier: 2.98, order: 9 },
                { label: "Vulcano", value: "vulcano", priceModifier: 2.98, order: 10 },
                { label: "Tempest", value: "tempest", priceModifier: 2.98, order: 11 },
                { label: "Equalizer", value: "equalizer", priceModifier: 2.98, order: 12 },
                { label: "Jupiter", value: "jupiter", priceModifier: 2.98, order: 13 },
                { label: "Hullcracker", value: "hullcracker", priceModifier: 3.98, order: 14 },
                { label: "Deadline", value: "deadline", priceModifier: 2.98, order: 15 },
                { label: "Seeker Grenade", value: "seeker_grenade", priceModifier: 2.98, order: 16 },
                { label: "Fireworks Box", value: "fireworks_box", priceModifier: 2.98, order: 17 },
                { label: "Trailblazer", value: "trailblazer", priceModifier: 2.98, order: 18 },
                { label: "Pulse Mine", value: "pulse_mine", priceModifier: 2.98, order: 19 },
                { label: "Gas Mine", value: "gas_mine", priceModifier: 2.98, order: 20 },
                { label: "Snap Hook", value: "snap_hook", priceModifier: 2.98, order: 21 },
                { label: "Barricade Kit", value: "barricade_kit", priceModifier: 2.98, order: 22 },
                { label: "Explosive Mine", value: "explosive_mine", priceModifier: 2.98, order: 23 },
                { label: "Blaze Grenade", value: "blaze_grenade", priceModifier: 2.98, order: 24 },
                { label: "Defibrillator", value: "defibrillator", priceModifier: 2.98, order: 25 },
                { label: "Jolt Mine", value: "jolt_mine", priceModifier: 2.98, order: 26 },
                { label: "Lure Grenade", value: "lure_grenade", priceModifier: 7.98, order: 27 },
                { label: "Tagging Grenade", value: "tagging_grenade", priceModifier: 2.98, order: 28 },
                { label: "Smoke Grenade", value: "smoke_grenade", priceModifier: 2.98, order: 29 },
                { label: "Vita Shot", value: "vita_shot", priceModifier: 2.98, order: 30 },
                { label: "Trigger Nade", value: "trigger_nade", priceModifier: 2.98, order: 31 },
                { label: "Vita Spray", value: "vita_spray", priceModifier: 2.98, order: 32 },
                { label: "Wolfpack", value: "wolfpack", priceModifier: 2.98, order: 33 },
                { label: "Showstopper", value: "showstopper", priceModifier: 2.98, order: 34 },
                { label: "Blue Light Stick", value: "blue_light_stick", priceModifier: 2.98, order: 35 },
                { label: "Green Light Stick", value: "green_light_stick", priceModifier: 2.98, order: 36 },
                { label: "Red Light Stick", value: "red_light_stick", priceModifier: 2.98, order: 37 },
              ]
            }
          ]
        },
        {
          name: "Materials",
          description: "Farm essential materials and resources for crafting and upgrades.",
          basePrice: 15.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Self-play (In-raid trade)", "Piloted"],
          options: [
            {
              label: "Materials",
              type: "checkbox",
              required: true,
              order: 1,
              values: [
                { label: "Queen Reactor x10", value: "queen_reactor", priceModifier: 2.98, order: 1 },
                { label: "Matriarch Reactor x10", value: "matriarch_reactor", priceModifier: 2.98, order: 2 },
                { label: "Bastion Cell x15", value: "bastion_cell", priceModifier: 2.98, order: 3 },
                { label: "Bombardier Cell x15", value: "bombardier_cell", priceModifier: 2.98, order: 4 },
                { label: "Leaper Pulse Unit x6", value: "leaper_pulse_unit", priceModifier: 2.98, order: 5 },
                { label: "Rocketeer Driver x10", value: "rocketeer_driver", priceModifier: 2.98, order: 6 },
                { label: "Surveyor Vault x6", value: "surveyor_vault", priceModifier: 2.98, order: 7 },
                { label: "Sentinel Firing Core x6", value: "sentinel_firing_core", priceModifier: 2.98, order: 8 },
                { label: "Spotter Relay x6", value: "spotter_relay", priceModifier: 2.98, order: 9 },
                { label: "Snitch Scanner x10", value: "snitch_scanner", priceModifier: 2.98, order: 10 },
                { label: "ARC Powercell x60", value: "arc_powercell", priceModifier: 2.98, order: 11 },
                { label: "Advanced ARC Powercell x30", value: "advanced_arc_powercell", priceModifier: 2.98, order: 12 },
                { label: "ARC Coolant x12", value: "arc_coolant", priceModifier: 2.98, order: 13 },
                { label: "ARC Circuitry x10", value: "arc_circuitry", priceModifier: 2.98, order: 14 },
                { label: "ARC Motion Core x30", value: "arc_motion_core", priceModifier: 2.98, order: 15 },
                { label: "ARC Performance Steel x15", value: "arc_performance_steel", priceModifier: 2.98, order: 16 },
                { label: "ARC Synthetic Resin x10", value: "arc_synthetic_resin", priceModifier: 2.98, order: 17 },
                { label: "Hornet Driver x12", value: "hornet_driver", priceModifier: 2.98, order: 18 },
                { label: "Wasp Driver x12", value: "wasp_driver", priceModifier: 2.98, order: 19 },
                { label: "Shredder Gyro x10", value: "shredder_gyro", priceModifier: 2.98, order: 20 },
                { label: "Pop Trigger x15", value: "pop_trigger", priceModifier: 2.98, order: 21 },
                { label: "Tick Pod x10", value: "tick_pod", priceModifier: 2.98, order: 22 },
                { label: "Simple Gun Parts x70", value: "simple_gun_parts", priceModifier: 2.98, order: 23 },
                { label: "Light Gun Parts x15", value: "light_gun_parts", priceModifier: 2.98, order: 24 },
                { label: "Medium Gun Parts x15", value: "medium_gun_parts", priceModifier: 2.98, order: 25 },
                { label: "Heavy Gun Parts x15", value: "heavy_gun_parts", priceModifier: 2.98, order: 26 },
                { label: "Complex Gun Parts x20", value: "complex_gun_parts", priceModifier: 2.98, order: 27 },
                { label: "Magnetic Accelerator x20", value: "magnetic_accelerator", priceModifier: 2.98, order: 28 },
                { label: "Ion Sputter x5", value: "ion_sputter", priceModifier: 2.98, order: 29 },
                { label: "Power Rod x15", value: "power_rod", priceModifier: 2.98, order: 30 },
                { label: "Exodus Modules x9", value: "exodus_modules", priceModifier: 2.98, order: 31 },
                { label: "Assorted Seeds x250", value: "assorted_seeds", priceModifier: 2.98, order: 32 },
                { label: "Metal Parts x360", value: "metal_parts", priceModifier: 2.98, order: 33 },
                { label: "Plastic Parts x360", value: "plastic_parts", priceModifier: 2.98, order: 34 },
                { label: "Rubber Parts x360", value: "rubber_parts", priceModifier: 2.98, order: 35 },
                { label: "Chemicals x360", value: "chemicals", priceModifier: 2.98, order: 36 },
                { label: "ARC Alloy x100", value: "arc_alloy", priceModifier: 2.98, order: 37 },
                { label: "Durable Cloth x100", value: "durable_cloth", priceModifier: 2.98, order: 38 },
                { label: "Wires x90", value: "wires", priceModifier: 2.98, order: 39 },
                { label: "Electrical Components x60", value: "electrical_components", priceModifier: 2.98, order: 40 },
                { label: "Advanced Electrical Components x20", value: "advanced_electrical_components", priceModifier: 2.98, order: 41 },
                { label: "Cooling Fan x10", value: "cooling_fan", priceModifier: 2.98, order: 42 },
                { label: "Cooling Coil x5", value: "cooling_coil", priceModifier: 2.98, order: 43 },
                { label: "Flow controller x6", value: "flow_controller", priceModifier: 2.98, order: 44 },
                { label: "Geiger Counter x3", value: "geiger_counter", priceModifier: 2.98, order: 45 },
                { label: "Lightbulb x10", value: "lightbulb", priceModifier: 2.98, order: 46 },
                { label: "Battery x20", value: "battery", priceModifier: 2.98, order: 47 },
                { label: "Sensors x60", value: "sensors", priceModifier: 2.98, order: 48 },
                { label: "Humidifier x10", value: "humidifier", priceModifier: 2.98, order: 49 },
                { label: "Power Cable x10", value: "power_cable", priceModifier: 2.98, order: 50 },
                { label: "Frequency Modulation Box x5", value: "frequency_modulation_box", priceModifier: 2.98, order: 51 },
                { label: "Rusted Gear x5", value: "rusted_gear", priceModifier: 2.98, order: 52 },
                { label: "Rusted Shut Medical Kit x5", value: "rusted_shut_medical_kit", priceModifier: 2.98, order: 53 },
                { label: "Antiseptic x20", value: "antiseptic", priceModifier: 2.98, order: 54 },
                { label: "Industrial Battery x10", value: "industrial_battery", priceModifier: 2.98, order: 55 },
                { label: "Laboratory Reagents x12", value: "laboratory_reagents", priceModifier: 2.98, order: 56 },
                { label: "Explosive Compound x12", value: "explosive_compound", priceModifier: 2.98, order: 57 },
                { label: "Fried Motherboard x9", value: "fried_motherboard", priceModifier: 2.98, order: 58 },
                { label: "Very Comfortable Pillow x8", value: "very_comfortable_pillow", priceModifier: 2.98, order: 59 },
                { label: "Mechanical Components x100", value: "mechanical_components", priceModifier: 2.98, order: 60 },
                { label: "Advanced Mechanical Components x15", value: "advanced_mechanical_components", priceModifier: 2.98, order: 61 },
                { label: "Motor x10", value: "motor", priceModifier: 2.98, order: 62 },
                { label: "Fireball Burner x20", value: "fireball_burner", priceModifier: 2.98, order: 63 },
                { label: "Mushroom x15", value: "mushroom", priceModifier: 2.98, order: 64 },
                { label: "Apricots x15", value: "apricots", priceModifier: 2.98, order: 65 },
                { label: "Lemons x15", value: "lemons", priceModifier: 2.98, order: 66 },
                { label: "Moss x6", value: "moss", priceModifier: 2.98, order: 67 },
                { label: "Olives x15", value: "olives", priceModifier: 2.98, order: 68 },
                { label: "Great Mullein x30", value: "great_mullein", priceModifier: 2.98, order: 69 },
                { label: "Pricky Pear x15", value: "pricky_pear", priceModifier: 2.98, order: 70 },
                { label: "Mod Components x20", value: "mod_components", priceModifier: 2.98, order: 71 },
                { label: "Processor x30", value: "processor", priceModifier: 2.98, order: 72 },
                { label: "Rope x10", value: "rope", priceModifier: 2.98, order: 73 },
                { label: "Toaster x12", value: "toaster", priceModifier: 2.98, order: 74 },
                { label: "Steel Spring x50", value: "steel_spring", priceModifier: 2.98, order: 75 },
                { label: "Magnet x50", value: "magnet", priceModifier: 2.98, order: 76 },
                { label: "Duct Tape x30", value: "duct_tape", priceModifier: 2.98, order: 77 },
                { label: "Guitar x3", value: "guitar", priceModifier: 2.98, order: 78 },
                { label: "Shaker x3", value: "shaker", priceModifier: 2.98, order: 79 },
                { label: "Rusted Bolts x6", value: "rusted_bolts", priceModifier: 2.98, order: 80 },
                { label: "Expired Respirator x6", value: "expired_respirator", priceModifier: 2.98, order: 81 },
                { label: "Synthesized Fuel x10", value: "synthesized_fuel", priceModifier: 2.98, order: 82 },
                { label: "Magnetron x3", value: "magnetron", priceModifier: 2.98, order: 83 },
                { label: "Oil x30", value: "oil", priceModifier: 2.98, order: 84 },
                { label: "Canister x30", value: "canister", priceModifier: 2.98, order: 85 },
              ]
            }
          ]
        },
        {
          name: "Coins",
          description: "Purchase in-game currency for ARC Raiders. Fast and secure delivery.",
          basePrice: 0.0159, // Price per 1K coins - will calculate as (basePrice * coins) / 1000
          platforms: ["PC", "PlayStation", "Xbox"],
          completionMethods: ["Self-play (In-raid trade)", "Piloted"],
          options: [
            {
              label: "Coins",
              type: "number",
              required: true,
              order: 1,
              minValue: 100000, // 100K
              maxValue: 10000000, // 10M
              step: 1000,
              values: []
            }
          ]
        },
        {
          name: "Custom Loadout",
          description: "Get a fully customized loadout with your choice of weapons, augments, shields, mods, ammo, and quick use items.",
          basePrice: 5.99,
          platforms: ["PC", "PlayStation", "Xbox"],
          completionMethods: ["Self-play (In-raid trade)", "Piloted"],
          options: [
            {
              label: "Augment & Shield",
              type: "dropdown",
              required: true,
              order: 1,
              values: [
                { label: "None", value: "none", priceModifier: 0, order: 1 },
                { label: "Combat Mk. 3 (Flanking) + Light Shield", value: "combat_flanking_light", priceModifier: 0, order: 2 },
                { label: "Combat Mk. 3 (Aggressive) + Heavy Shield", value: "combat_aggressive_heavy", priceModifier: 0, order: 3 },
                { label: "Looting Mk. 3 (Survivor) + Medium Shield", value: "looting_survivor_medium", priceModifier: 0, order: 4 },
                { label: "Tactical Mk. 3 (Defensive) + Heavy Shield", value: "tactical_defensive_heavy", priceModifier: 0, order: 5 },
                { label: "Tactical Mk. 3 (Healing) + Medium Shield", value: "tactical_healing_medium", priceModifier: 0, order: 6 },
                { label: "Looting MK. 3 (Cautious) + Light Shield", value: "looting_cautious_light", priceModifier: 0, order: 7 },
                { label: "Tactical Mk. 3 (Revival) + Light Shield", value: "tactical_revival_light", priceModifier: 0, order: 8 },
                { label: "Looting Mk. 3 (Safekeeper) + Medium Shield", value: "looting_safekeeper_medium", priceModifier: 0, order: 9 },
              ]
            },
            {
              label: "First weapon",
              type: "dropdown",
              required: true,
              order: 2,
              values: [
                { label: "Anvil IV", value: "anvil_iv", priceModifier: 0, order: 1 },
                { label: "Arpeggio IV", value: "arpeggio_iv", priceModifier: 0, order: 2 },
                { label: "Burletta IV", value: "burletta_iv", priceModifier: 0, order: 3 },
                { label: "Il Toro IV", value: "il_toro_iv", priceModifier: 0, order: 4 },
                { label: "Osprey IV", value: "osprey_iv", priceModifier: 0, order: 5 },
                { label: "Renegade IV", value: "renegade_iv", priceModifier: 0, order: 6 },
                { label: "Torrente IV", value: "torrente_iv", priceModifier: 0, order: 7 },
                { label: "Venator IV", value: "venator_iv", priceModifier: 0, order: 8 },
                { label: "Bettina IV", value: "bettina_iv", priceModifier: 0, order: 9 },
                { label: "Bobcat IV", value: "bobcat_iv", priceModifier: 0, order: 10 },
                { label: "Hullcracker IV", value: "hullcracker_iv", priceModifier: 0, order: 11 },
                { label: "Vulcano IV", value: "vulcano_iv", priceModifier: 0, order: 12 },
                { label: "Tempest IV", value: "tempest_iv", priceModifier: 0, order: 13 },
                { label: "Equalizer", value: "equalizer", priceModifier: 0, order: 14 },
                { label: "Jupiter", value: "jupiter", priceModifier: 0, order: 15 },
                { label: "Aphelion", value: "aphelion", priceModifier: 0, order: 16 },
              ]
            },
            {
              label: "Second weapon",
              type: "dropdown",
              required: true,
              order: 3,
              values: [
                { label: "Arpeggio IV", value: "arpeggio_iv", priceModifier: 0, order: 1 },
                { label: "Anvil IV", value: "anvil_iv", priceModifier: 0, order: 2 },
                { label: "Burletta IV", value: "burletta_iv", priceModifier: 0, order: 3 },
                { label: "Il Toro IV", value: "il_toro_iv", priceModifier: 0, order: 4 },
                { label: "Osprey IV", value: "osprey_iv", priceModifier: 0, order: 5 },
                { label: "Renegade IV", value: "renegade_iv", priceModifier: 0, order: 6 },
                { label: "Torrente IV", value: "torrente_iv", priceModifier: 0, order: 7 },
                { label: "Venator IV", value: "venator_iv", priceModifier: 0, order: 8 },
                { label: "Bettina IV", value: "bettina_iv", priceModifier: 0, order: 9 },
                { label: "Bobcat IV", value: "bobcat_iv", priceModifier: 0, order: 10 },
                { label: "Hullcracker IV", value: "hullcracker_iv", priceModifier: 0, order: 11 },
                { label: "Vulcano IV", value: "vulcano_iv", priceModifier: 0, order: 12 },
                { label: "Tempest IV", value: "tempest_iv", priceModifier: 0, order: 13 },
                { label: "Equalizer", value: "equalizer", priceModifier: 0, order: 14 },
                { label: "Jupiter", value: "jupiter", priceModifier: 0, order: 15 },
                { label: "Aphelion", value: "aphelion", priceModifier: 0, order: 16 },
              ]
            },
            {
              label: "Weapon mods",
              type: "checkbox",
              required: false,
              order: 4,
              values: [
                { label: "Add recommended mods for the 1st weapon", value: "mods_weapon_1", priceModifier: 3.00, order: 1 },
                { label: "Add recommended mods for the 2nd weapon", value: "mods_weapon_2", priceModifier: 3.00, order: 2 },
              ]
            },
            {
              label: "Ammo",
              type: "checkbox",
              required: false,
              order: 5,
              values: [
                { label: "Light Ammo x150", value: "light_ammo", priceModifier: 0, order: 1 },
                { label: "Medium Ammo x100", value: "medium_ammo", priceModifier: 0, order: 2 },
                { label: "Heavy Ammo x60", value: "heavy_ammo", priceModifier: 0, order: 3 },
                { label: "Shotgun Ammo x40", value: "shotgun_ammo", priceModifier: 0, order: 4 },
                { label: "Launcher Ammo x20", value: "launcher_ammo", priceModifier: 0, order: 5 },
                { label: "Energy Clip x5", value: "energy_clip", priceModifier: 0, order: 6 },
              ]
            },
            {
              label: "Quick use",
              type: "checkbox",
              required: false,
              order: 6,
              values: [
                { label: "Surge Shield Recharger x5", value: "surge_shield_recharger", priceModifier: 0, order: 1 },
                { label: "Vita shot x5", value: "vita_shot", priceModifier: 0, order: 2 },
                { label: "Vita spray x1", value: "vita_spray", priceModifier: 1.00, order: 3 },
                { label: "Photoelectric Cloak x1", value: "photoelectric_cloak", priceModifier: 1.00, order: 4 },
                { label: "Snap Hook x1", value: "snap_hook", priceModifier: 1.00, order: 5 },
                { label: "Wolfpack x2", value: "wolfpack", priceModifier: 2.00, order: 6 },
                { label: "Showstopper x5", value: "showstopper", priceModifier: 1.50, order: 7 },
                { label: "Heavy Fuze Grenade x5", value: "heavy_fuze_grenade", priceModifier: 1.00, order: 8 },
                { label: "Trailblazer Grenade x5", value: "trailblazer_grenade", priceModifier: 1.00, order: 9 },
              ]
            }
          ]
        },
        {
          name: "Rubber Ducks",
          description: "Collect rare and exotic rubber ducks for your hideout. Show off your collection!",
          basePrice: 2.99,
          platforms: ["PC", "PlayStation", "Xbox"],
          completionMethods: ["Self-play (In-raid trade)", "Piloted"],
          maxQuantity: 10,
          options: [
            {
              label: "Duck packs",
              type: "checkboxes",
              required: true,
              order: 1,
              values: [
                { label: "Rubber Duck (Common) x10", value: "rubber_duck_common", priceModifier: 2.98, order: 1 },
                { label: "Tropical Duck (Uncommon) x7", value: "tropical_duck_uncommon", priceModifier: 2.98, order: 2 },
                { label: "Gentle Duck (Uncommon) x7", value: "gentle_duck_uncommon", priceModifier: 2.98, order: 3 },
                { label: "Alien Duck (Uncommon) x7", value: "alien_duck_uncommon", priceModifier: 2.98, order: 4 },
                { label: "Doodly Duck (Rare) x7", value: "doodly_duck_rare", priceModifier: 2.98, order: 5 },
                { label: "Flashy Duck (Rare) x5", value: "flashy_duck_rare", priceModifier: 2.98, order: 6 },
                { label: "Familiar Duck (Epic) x2", value: "familiar_duck_epic", priceModifier: 2.98, order: 7 },
              ]
            }
          ]
        }
      ]
    },
  ]

  console.log("Seeding games and services...")

  for (const game of gamesData) {
    const { services, ...gameInfo } = game
    const upsertedGame = await prisma.gameService.upsert({
      where: { name: game.name },
      update: gameInfo,
      create: gameInfo,
    })

    if (services) {
      for (const service of services) {
        const { options, ...serviceData } = service as any
        
        // Find or create service
        let upsertedService = await prisma.service.findFirst({
          where: { name: service.name, gameId: upsertedGame.id }
        })

        if (upsertedService) {
          upsertedService = await prisma.service.update({
            where: { id: upsertedService.id },
            data: { ...serviceData, gameId: upsertedGame.id }
          })
        } else {
          upsertedService = await prisma.service.create({
            data: { ...serviceData, gameId: upsertedGame.id }
          })
        }

        // Handle options if they exist
        if (options && options.length > 0) {
          // Delete existing options for this service to avoid duplicates
          await prisma.serviceOption.deleteMany({
            where: { serviceId: upsertedService.id }
          })

          // Create new options
          for (const option of options) {
            const { values, ...optionData } = option
            const createdOption = await prisma.serviceOption.create({
              data: {
                ...optionData,
                serviceId: upsertedService.id
              }
            })

            // Create option values
            if (values && values.length > 0) {
              for (const value of values) {
                await prisma.serviceOptionValue.create({
                  data: {
                    ...value,
                    optionId: createdOption.id
                  }
                })
              }
            }
          }
        }
      }
    }
  }

  console.log("Seeding completed.")
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

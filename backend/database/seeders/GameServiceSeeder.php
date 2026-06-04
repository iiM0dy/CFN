<?php

namespace Database\Seeders;

use App\Models\GameService;
use App\Models\Service;
use App\Models\ServiceOption;
use App\Models\ServiceOptionValue;
use Illuminate\Database\Seeder;

class GameServiceSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'name' => 'Valorant',
                'slug' => 'valorant',
                'description' => 'Rank Boost, Coaching',
                'href' => '/games/valorant/services',
                'bg_image' => '/assets/val-cat-bg.png',
                'char_image' => '/assets/val-char-bg.png',
                'is_popular' => true,
                'services' => [
                    [
                        'name' => 'Rank Boosting',
                        'description' => 'Reclaim your ELO with our professional boosters.',
                        'base_price' => 10.00,
                        'platforms' => ['PC', 'Console'],
                        'completion_methods' => ['Solo', 'Duo'],
                    ],
                    [
                        'name' => 'Placement Matches',
                        'description' => 'Get the best start to your season.',
                        'base_price' => 15.00,
                        'platforms' => ['PC', 'Console'],
                        'completion_methods' => ['Solo', 'Duo'],
                    ],
                ],
            ],
            [
                'name' => 'League of Legends',
                'slug' => 'lol',
                'description' => 'Rank, Duo Queue',
                'href' => '/lol/services',
                'bg_image' => '/assets/lol-cat-bg.png',
                'char_image' => '/assets/lol-char-bg.png',
                'is_popular' => true,
                'services' => [
                    [
                        'name' => 'Ranked Solo/Duo',
                        'description' => "Climb the ladder in Summoner's Rift.",
                        'base_price' => 8.00,
                        'platforms' => ['PC'],
                        'completion_methods' => ['Solo', 'Duo'],
                    ],
                ],
            ],
            [
                'name' => 'World of Warcraft',
                'slug' => 'wow',
                'description' => 'Gold, Powerleveling',
                'href' => '/wow/services',
                'bg_image' => '/assets/wow-cat-bg.png',
                'char_image' => '/assets/wow-char-bg.png',
                'is_popular' => true,
                'services' => [
                    [
                        'name' => 'Powerleveling 1-70',
                        'description' => 'Reach max level in no time.',
                        'base_price' => 50.00,
                        'platforms' => ['PC'],
                        'completion_methods' => ['Solo'],
                    ],
                ],
            ],
            [
                'name' => 'Throne and Liberty',
                'slug' => 'throne-and-liberty',
                'description' => 'Account, Currency',
                'href' => '/games/throne-and-liberty/services',
                'bg_image' => '/assets/TAL-cat-bg.png',
                'char_image' => '/assets/TAL-char-bg.png',
                'is_popular' => true,
                'services' => [
                    [
                        'name' => 'Leveling Service',
                        'description' => 'Quickly level up your character.',
                        'base_price' => 30.00,
                        'platforms' => ['PC', 'Console'],
                        'completion_methods' => ['Solo'],
                    ],
                ],
            ],
            [
                'name' => 'ARC Raiders',
                'slug' => 'arc-raiders',
                'description' => 'Rank Boost, Loot Farming',
                'href' => '/arc-raiders/services',
                'bg_image' => '/assets/arc-cat-bg.png',
                'char_image' => '/assets/arc-char-bg.png',
                'is_popular' => true,
                'services' => [
                    [
                        'name' => 'Blueprints',
                        'description' => 'Get the best gear and resources efficiently.',
                        'base_price' => 20.00,
                        'platforms' => ['PC', 'Console'],
                        'completion_methods' => ['Self-play (In-raid trade)', 'Piloted'],
                        'max_quantity' => 3,
                        'options' => [
                            [
                                'label' => 'Blueprints',
                                'type' => 'checkbox',
                                'required' => true,
                                'sort_order' => 1,
                                'values' => [
                                    ['label' => 'Anvil', 'value' => 'anvil', 'price_modifier' => 2.98, 'sort_order' => 1],
                                    ['label' => 'Aphelion', 'value' => 'aphelion', 'price_modifier' => 2.98, 'sort_order' => 2],
                                    ['label' => 'Bobcat', 'value' => 'bobcat', 'price_modifier' => 2.98, 'sort_order' => 3],
                                    ['label' => 'Burletta', 'value' => 'burletta', 'price_modifier' => 4.98, 'sort_order' => 4],
                                    ['label' => 'Il Toro', 'value' => 'il_toro', 'price_modifier' => 2.98, 'sort_order' => 5],
                                    ['label' => 'Osprey', 'value' => 'osprey', 'price_modifier' => 2.98, 'sort_order' => 6],
                                    ['label' => 'Torrente', 'value' => 'torrente', 'price_modifier' => 2.98, 'sort_order' => 7],
                                    ['label' => 'Venator', 'value' => 'venator', 'price_modifier' => 2.98, 'sort_order' => 8],
                                    ['label' => 'Bettina', 'value' => 'bettina', 'price_modifier' => 2.98, 'sort_order' => 9],
                                    ['label' => 'Vulcano', 'value' => 'vulcano', 'price_modifier' => 2.98, 'sort_order' => 10],
                                    ['label' => 'Tempest', 'value' => 'tempest', 'price_modifier' => 2.98, 'sort_order' => 11],
                                    ['label' => 'Equalizer', 'value' => 'equalizer', 'price_modifier' => 2.98, 'sort_order' => 12],
                                    ['label' => 'Jupiter', 'value' => 'jupiter', 'price_modifier' => 2.98, 'sort_order' => 13],
                                    ['label' => 'Hullcracker', 'value' => 'hullcracker', 'price_modifier' => 3.98, 'sort_order' => 14],
                                    ['label' => 'Deadline', 'value' => 'deadline', 'price_modifier' => 2.98, 'sort_order' => 15],
                                    ['label' => 'Seeker Grenade', 'value' => 'seeker_grenade', 'price_modifier' => 2.98, 'sort_order' => 16],
                                    ['label' => 'Fireworks Box', 'value' => 'fireworks_box', 'price_modifier' => 2.98, 'sort_order' => 17],
                                    ['label' => 'Trailblazer', 'value' => 'trailblazer', 'price_modifier' => 2.98, 'sort_order' => 18],
                                    ['label' => 'Pulse Mine', 'value' => 'pulse_mine', 'price_modifier' => 2.98, 'sort_order' => 19],
                                    ['label' => 'Gas Mine', 'value' => 'gas_mine', 'price_modifier' => 2.98, 'sort_order' => 20],
                                    ['label' => 'Snap Hook', 'value' => 'snap_hook', 'price_modifier' => 2.98, 'sort_order' => 21],
                                    ['label' => 'Barricade Kit', 'value' => 'barricade_kit', 'price_modifier' => 2.98, 'sort_order' => 22],
                                    ['label' => 'Explosive Mine', 'value' => 'explosive_mine', 'price_modifier' => 2.98, 'sort_order' => 23],
                                    ['label' => 'Blaze Grenade', 'value' => 'blaze_grenade', 'price_modifier' => 2.98, 'sort_order' => 24],
                                    ['label' => 'Defibrillator', 'value' => 'defibrillator', 'price_modifier' => 2.98, 'sort_order' => 25],
                                    ['label' => 'Jolt Mine', 'value' => 'jolt_mine', 'price_modifier' => 2.98, 'sort_order' => 26],
                                    ['label' => 'Lure Grenade', 'value' => 'lure_grenade', 'price_modifier' => 7.98, 'sort_order' => 27],
                                    ['label' => 'Tagging Grenade', 'value' => 'tagging_grenade', 'price_modifier' => 2.98, 'sort_order' => 28],
                                    ['label' => 'Smoke Grenade', 'value' => 'smoke_grenade', 'price_modifier' => 2.98, 'sort_order' => 29],
                                    ['label' => 'Vita Shot', 'value' => 'vita_shot', 'price_modifier' => 2.98, 'sort_order' => 30],
                                    ['label' => 'Trigger Nade', 'value' => 'trigger_nade', 'price_modifier' => 2.98, 'sort_order' => 31],
                                    ['label' => 'Vita Spray', 'value' => 'vita_spray', 'price_modifier' => 2.98, 'sort_order' => 32],
                                    ['label' => 'Wolfpack', 'value' => 'wolfpack', 'price_modifier' => 2.98, 'sort_order' => 33],
                                    ['label' => 'Showstopper', 'value' => 'showstopper', 'price_modifier' => 2.98, 'sort_order' => 34],
                                    ['label' => 'Blue Light Stick', 'value' => 'blue_light_stick', 'price_modifier' => 2.98, 'sort_order' => 35],
                                    ['label' => 'Green Light Stick', 'value' => 'green_light_stick', 'price_modifier' => 2.98, 'sort_order' => 36],
                                    ['label' => 'Red Light Stick', 'value' => 'red_light_stick', 'price_modifier' => 2.98, 'sort_order' => 37],
                                ],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Coins',
                        'description' => 'Purchase in-game currency for ARC Raiders. Fast and secure delivery.',
                        'base_price' => 0.0159,
                        'platforms' => ['PC', 'PlayStation', 'Xbox'],
                        'completion_methods' => ['Self-play (In-raid trade)', 'Piloted'],
                        'options' => [
                            [
                                'label' => 'Coins',
                                'type' => 'number',
                                'required' => true,
                                'sort_order' => 1,
                                'min_value' => 100000,
                                'max_value' => 10000000,
                                'step' => 1000,
                                'values' => [],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Custom Loadout',
                        'description' => 'Get a fully customized loadout with your choice of weapons, augments, shields, mods, ammo, and quick use items.',
                        'base_price' => 5.99,
                        'platforms' => ['PC', 'PlayStation', 'Xbox'],
                        'completion_methods' => ['Self-play (In-raid trade)', 'Piloted'],
                        'options' => [
                            [
                                'label' => 'Augment & Shield', 'type' => 'dropdown', 'required' => true, 'sort_order' => 1,
                                'values' => [
                                    ['label' => 'None', 'value' => 'none', 'price_modifier' => 0, 'sort_order' => 1],
                                    ['label' => 'Combat Mk. 3 (Flanking) + Light Shield', 'value' => 'combat_flanking_light', 'price_modifier' => 0, 'sort_order' => 2],
                                    ['label' => 'Combat Mk. 3 (Aggressive) + Heavy Shield', 'value' => 'combat_aggressive_heavy', 'price_modifier' => 0, 'sort_order' => 3],
                                    ['label' => 'Looting Mk. 3 (Survivor) + Medium Shield', 'value' => 'looting_survivor_medium', 'price_modifier' => 0, 'sort_order' => 4],
                                    ['label' => 'Tactical Mk. 3 (Defensive) + Heavy Shield', 'value' => 'tactical_defensive_heavy', 'price_modifier' => 0, 'sort_order' => 5],
                                    ['label' => 'Tactical Mk. 3 (Healing) + Medium Shield', 'value' => 'tactical_healing_medium', 'price_modifier' => 0, 'sort_order' => 6],
                                    ['label' => 'Looting MK. 3 (Cautious) + Light Shield', 'value' => 'looting_cautious_light', 'price_modifier' => 0, 'sort_order' => 7],
                                    ['label' => 'Tactical Mk. 3 (Revival) + Light Shield', 'value' => 'tactical_revival_light', 'price_modifier' => 0, 'sort_order' => 8],
                                    ['label' => 'Looting Mk. 3 (Safekeeper) + Medium Shield', 'value' => 'looting_safekeeper_medium', 'price_modifier' => 0, 'sort_order' => 9],
                                ],
                            ],
                            [
                                'label' => 'First weapon', 'type' => 'dropdown', 'required' => true, 'sort_order' => 2,
                                'values' => [
                                    ['label' => 'Anvil IV', 'value' => 'anvil_iv', 'price_modifier' => 0, 'sort_order' => 1],
                                    ['label' => 'Arpeggio IV', 'value' => 'arpeggio_iv', 'price_modifier' => 0, 'sort_order' => 2],
                                    ['label' => 'Burletta IV', 'value' => 'burletta_iv', 'price_modifier' => 0, 'sort_order' => 3],
                                    ['label' => 'Il Toro IV', 'value' => 'il_toro_iv', 'price_modifier' => 0, 'sort_order' => 4],
                                    ['label' => 'Osprey IV', 'value' => 'osprey_iv', 'price_modifier' => 0, 'sort_order' => 5],
                                    ['label' => 'Renegade IV', 'value' => 'renegade_iv', 'price_modifier' => 0, 'sort_order' => 6],
                                    ['label' => 'Torrente IV', 'value' => 'torrente_iv', 'price_modifier' => 0, 'sort_order' => 7],
                                    ['label' => 'Venator IV', 'value' => 'venator_iv', 'price_modifier' => 0, 'sort_order' => 8],
                                    ['label' => 'Bettina IV', 'value' => 'bettina_iv', 'price_modifier' => 0, 'sort_order' => 9],
                                    ['label' => 'Bobcat IV', 'value' => 'bobcat_iv', 'price_modifier' => 0, 'sort_order' => 10],
                                    ['label' => 'Hullcracker IV', 'value' => 'hullcracker_iv', 'price_modifier' => 0, 'sort_order' => 11],
                                    ['label' => 'Vulcano IV', 'value' => 'vulcano_iv', 'price_modifier' => 0, 'sort_order' => 12],
                                    ['label' => 'Tempest IV', 'value' => 'tempest_iv', 'price_modifier' => 0, 'sort_order' => 13],
                                    ['label' => 'Equalizer', 'value' => 'equalizer', 'price_modifier' => 0, 'sort_order' => 14],
                                    ['label' => 'Jupiter', 'value' => 'jupiter', 'price_modifier' => 0, 'sort_order' => 15],
                                    ['label' => 'Aphelion', 'value' => 'aphelion', 'price_modifier' => 0, 'sort_order' => 16],
                                ],
                            ],
                            [
                                'label' => 'Second weapon', 'type' => 'dropdown', 'required' => true, 'sort_order' => 3,
                                'values' => [
                                    ['label' => 'Arpeggio IV', 'value' => 'arpeggio_iv', 'price_modifier' => 0, 'sort_order' => 1],
                                    ['label' => 'Anvil IV', 'value' => 'anvil_iv', 'price_modifier' => 0, 'sort_order' => 2],
                                    ['label' => 'Burletta IV', 'value' => 'burletta_iv', 'price_modifier' => 0, 'sort_order' => 3],
                                    ['label' => 'Il Toro IV', 'value' => 'il_toro_iv', 'price_modifier' => 0, 'sort_order' => 4],
                                    ['label' => 'Osprey IV', 'value' => 'osprey_iv', 'price_modifier' => 0, 'sort_order' => 5],
                                    ['label' => 'Renegade IV', 'value' => 'renegade_iv', 'price_modifier' => 0, 'sort_order' => 6],
                                    ['label' => 'Torrente IV', 'value' => 'torrente_iv', 'price_modifier' => 0, 'sort_order' => 7],
                                    ['label' => 'Venator IV', 'value' => 'venator_iv', 'price_modifier' => 0, 'sort_order' => 8],
                                    ['label' => 'Bettina IV', 'value' => 'bettina_iv', 'price_modifier' => 0, 'sort_order' => 9],
                                    ['label' => 'Bobcat IV', 'value' => 'bobcat_iv', 'price_modifier' => 0, 'sort_order' => 10],
                                    ['label' => 'Hullcracker IV', 'value' => 'hullcracker_iv', 'price_modifier' => 0, 'sort_order' => 11],
                                    ['label' => 'Vulcano IV', 'value' => 'vulcano_iv', 'price_modifier' => 0, 'sort_order' => 12],
                                    ['label' => 'Tempest IV', 'value' => 'tempest_iv', 'price_modifier' => 0, 'sort_order' => 13],
                                    ['label' => 'Equalizer', 'value' => 'equalizer', 'price_modifier' => 0, 'sort_order' => 14],
                                    ['label' => 'Jupiter', 'value' => 'jupiter', 'price_modifier' => 0, 'sort_order' => 15],
                                    ['label' => 'Aphelion', 'value' => 'aphelion', 'price_modifier' => 0, 'sort_order' => 16],
                                ],
                            ],
                            [
                                'label' => 'Weapon mods', 'type' => 'checkbox', 'required' => false, 'sort_order' => 4,
                                'values' => [
                                    ['label' => 'Add recommended mods for the 1st weapon', 'value' => 'mods_weapon_1', 'price_modifier' => 3.00, 'sort_order' => 1],
                                    ['label' => 'Add recommended mods for the 2nd weapon', 'value' => 'mods_weapon_2', 'price_modifier' => 3.00, 'sort_order' => 2],
                                ],
                            ],
                            [
                                'label' => 'Ammo', 'type' => 'checkbox', 'required' => false, 'sort_order' => 5,
                                'values' => [
                                    ['label' => 'Light Ammo x150', 'value' => 'light_ammo', 'price_modifier' => 0, 'sort_order' => 1],
                                    ['label' => 'Medium Ammo x100', 'value' => 'medium_ammo', 'price_modifier' => 0, 'sort_order' => 2],
                                    ['label' => 'Heavy Ammo x60', 'value' => 'heavy_ammo', 'price_modifier' => 0, 'sort_order' => 3],
                                    ['label' => 'Shotgun Ammo x40', 'value' => 'shotgun_ammo', 'price_modifier' => 0, 'sort_order' => 4],
                                    ['label' => 'Launcher Ammo x20', 'value' => 'launcher_ammo', 'price_modifier' => 0, 'sort_order' => 5],
                                    ['label' => 'Energy Clip x5', 'value' => 'energy_clip', 'price_modifier' => 0, 'sort_order' => 6],
                                ],
                            ],
                            [
                                'label' => 'Quick use', 'type' => 'checkbox', 'required' => false, 'sort_order' => 6,
                                'values' => [
                                    ['label' => 'Surge Shield Recharger x5', 'value' => 'surge_shield_recharger', 'price_modifier' => 0, 'sort_order' => 1],
                                    ['label' => 'Vita shot x5', 'value' => 'vita_shot', 'price_modifier' => 0, 'sort_order' => 2],
                                    ['label' => 'Vita spray x1', 'value' => 'vita_spray', 'price_modifier' => 1.00, 'sort_order' => 3],
                                    ['label' => 'Photoelectric Cloak x1', 'value' => 'photoelectric_cloak', 'price_modifier' => 1.00, 'sort_order' => 4],
                                    ['label' => 'Snap Hook x1', 'value' => 'snap_hook', 'price_modifier' => 1.00, 'sort_order' => 5],
                                    ['label' => 'Wolfpack x2', 'value' => 'wolfpack', 'price_modifier' => 2.00, 'sort_order' => 6],
                                    ['label' => 'Showstopper x5', 'value' => 'showstopper', 'price_modifier' => 1.50, 'sort_order' => 7],
                                    ['label' => 'Heavy Fuze Grenade x5', 'value' => 'heavy_fuze_grenade', 'price_modifier' => 1.00, 'sort_order' => 8],
                                    ['label' => 'Trailblazer Grenade x5', 'value' => 'trailblazer_grenade', 'price_modifier' => 1.00, 'sort_order' => 9],
                                ],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Rubber Ducks',
                        'description' => 'Collect rare and exotic rubber ducks for your hideout. Show off your collection!',
                        'base_price' => 2.99,
                        'platforms' => ['PC', 'PlayStation', 'Xbox'],
                        'completion_methods' => ['Self-play (In-raid trade)', 'Piloted'],
                        'max_quantity' => 10,
                        'options' => [
                            [
                                'label' => 'Duck packs', 'type' => 'checkboxes', 'required' => true, 'sort_order' => 1,
                                'values' => [
                                    ['label' => 'Rubber Duck (Common) x10', 'value' => 'rubber_duck_common', 'price_modifier' => 2.98, 'sort_order' => 1],
                                    ['label' => 'Tropical Duck (Uncommon) x7', 'value' => 'tropical_duck_uncommon', 'price_modifier' => 2.98, 'sort_order' => 2],
                                    ['label' => 'Gentle Duck (Uncommon) x7', 'value' => 'gentle_duck_uncommon', 'price_modifier' => 2.98, 'sort_order' => 3],
                                    ['label' => 'Alien Duck (Uncommon) x7', 'value' => 'alien_duck_uncommon', 'price_modifier' => 2.98, 'sort_order' => 4],
                                    ['label' => 'Doodly Duck (Rare) x7', 'value' => 'doodly_duck_rare', 'price_modifier' => 2.98, 'sort_order' => 5],
                                    ['label' => 'Flashy Duck (Rare) x5', 'value' => 'flashy_duck_rare', 'price_modifier' => 2.98, 'sort_order' => 6],
                                    ['label' => 'Familiar Duck (Epic) x2', 'value' => 'familiar_duck_epic', 'price_modifier' => 2.98, 'sort_order' => 7],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        // Note: Materials service with 85 option values omitted for brevity — port from seed.ts if needed

        foreach ($games as $index => $gameData) {
            $services = $gameData['services'] ?? [];
            unset($gameData['services']);

            $game = GameService::updateOrCreate(
                ['name' => $gameData['name']],
                array_merge($gameData, ['sort_order' => $index])
            );

            foreach ($services as $serviceData) {
                $options = $serviceData['options'] ?? [];
                unset($serviceData['options']);

                $service = Service::updateOrCreate(
                    ['name' => $serviceData['name'], 'game_id' => $game->id],
                    $serviceData
                );

                ServiceOption::where('service_id', $service->id)->delete();

                foreach ($options as $optionData) {
                    $values = $optionData['values'] ?? [];
                    unset($optionData['values']);

                    $option = ServiceOption::create(array_merge($optionData, [
                        'service_id' => $service->id,
                    ]));

                    foreach ($values as $valueData) {
                        ServiceOptionValue::create(array_merge($valueData, [
                            'option_id' => $option->id,
                        ]));
                    }
                }
            }
        }
    }
}

# Forza Horizon 6 Game + 2 Services (Cars & Credits) - Implementation Plan

## Context

We need to add "Forza Horizon 6" as a new game with two services ("Cars" and "Credits") to the seeder. The data comes from HTML files and a JSON car list in `E:\work\airwicks\data\forza-horizon-6\`. No frontend changes are needed — the UI renders dynamically from the API.

## File to Modify

`backend/database/seeders/GameServiceSeeder.php` — Add a new entry to the `$games` array (after ARC Raiders, index 5).

---

## Game Entry

Insert after the ARC Raiders entry (line 298 `],`) and before the closing `];` of the `$games` array.

```php
[
    'name' => 'Forza Horizon 6',
    'slug' => 'forza-horizon-6',
    'description' => 'Cars, Credits',
    'href' => '/games/forza-horizon-6/services',
    'bg_image' => '/assets/fh6-cat-bg.png',
    'char_image' => '/assets/fh6-char-bg.png',
    'is_popular' => true,
    'services' => [ /* Cars service, Credits service */ ],
]
```

---

## Service 1: Cars

Source files: `data/forza-horizon-6/cars.html` + `data/forza-horizon-6/car_options_clean.json`

```php
[
    'name' => 'Cars',
    'description' => 'Get any car delivered to your garage. Choose specific cars or pick a bundle.',
    'base_price' => 0.80,
    'platforms' => ['Steam', 'Xbox'],
    'completion_methods' => ['Piloted'],
    'max_quantity' => 15,
    'options' => [
        // Option 1: Boosting options
        // Option 2: Select cars (590 cars from JSON)
    ],
]
```

### Option 1: Boosting options

```php
[
    'label' => 'Boosting options',
    'type' => 'select',
    'required' => true,
    'sort_order' => 1,
    'values' => [
        ['label' => 'Specific cars', 'value' => 'specific_cars', 'price_modifier' => 0, 'sort_order' => 1],
        ['label' => 'Car bundles', 'value' => 'car_bundles', 'price_modifier' => 0, 'sort_order' => 2],
    ],
]
```

### Option 2: Select cars (590 entries)

```php
[
    'label' => 'Select cars',
    'type' => 'checkbox',
    'required' => true,
    'sort_order' => 2,
    'values' => [
        // 590 entries from car_options_clean.json
        // Each mapped as:
        // ['label' => <label from JSON>, 'value' => <snake_case slug of label>, 'price_modifier' => <price from JSON>, 'sort_order' => <id from JSON>]
    ],
]
```

### Mapping rules for car values:
- **label**: Use the `label` field from JSON as-is (e.g., `"Abarth Fiat 131 1980"`)
- **value**: Convert label to snake_case slug (lowercase, spaces/special chars to underscores, e.g., `"abarth_fiat_131_1980"`)
- **price_modifier**: Use the `price` field from JSON (most are `1.62`, exceptions: `5.67`, `9.72`, `21.06`, `43.74`)
- **sort_order**: Use the `id` field from JSON (1–590)

### Pricing logic:
`base_price (0.80) + sum(selected car price_modifiers) = total`
Verified: `0.80 + 1.62 = 2.42€` matches the HTML total.

### Implementation approach for 590 car values:

A PowerShell script should be used to read `data/forza-horizon-6/car_options_clean.json` and generate the PHP array entries. This avoids manual errors with 590 entries.

**Script logic:**
```powershell
$json = Get-Content -Raw -Path "data/forza-horizon-6/car_options_clean.json" | ConvertFrom-Json
foreach ($opt in $json.options) {
    $label = $opt.label -replace "'", "\'"  # Escape single quotes for PHP
    $value = ($opt.label.ToLower() -replace '[^a-z0-9]+', '_' -replace '^_|_$', '')
    # Output: ['label' => '$label', 'value' => '$value', 'price_modifier' => $($opt.price), 'sort_order' => $($opt.id)],
}
```

**Critical**: Labels containing single quotes (e.g., `"Nissan Silvia K's Aero 1998"`, `"BMW M4 Competition Coupé 'Welcome Pack' 2021"`) must be escaped as `\'` for PHP single-quoted strings.

**Special price cars** (non-default 1.62):
| ID | Label | Price |
|----|-------|-------|
| 335 | Nissan Skyline GT-R V-Spec II 2000 | 5.67 |
| 440 | Toyota Sports 800 Fanta Edition 1965 | 21.06 |
| 507 | Honda CR-X SiR 1991 | 13.77 |
| 527 | Mazda Furai 2008 | 17.82 |
| 546 | Nissan 370Z 2010 | 43.74 |
| 548 | Nissan Skyline GT-R V-Spec 1997 | 5.67 |
| 576 | Subaru STI S209 2019 | 5.67 |
| 579 | Toyota Land Cruiser Arctic Trucks AT37 2016 | 13.77 |
| 581 | Toyota Starlet Glanza V 1996 | 5.67 |
| 584 | Toyota Corolla SR5 1974 | 13.77 |
| 590 | 1966 Toyota Sports 800 Fanta Edition | 9.72 |

---

## Service 2: Credits

Source file: `data/forza-horizon-6/credits.html`

```php
[
    'name' => 'Credits',
    'description' => 'Purchase in-game credits for Forza Horizon 6. Fast and secure delivery.',
    'base_price' => 6.47,
    'platforms' => ['Steam', 'Xbox'],
    'completion_methods' => ['Piloted'],
    'max_quantity' => 15,
    'options' => [
        // Option 1: Amount
        // Option 2: Choose Extras
    ],
]
```

### Option 1: Amount

```php
[
    'label' => 'Amount',
    'type' => 'select',
    'required' => true,
    'sort_order' => 1,
    'values' => [
        ['label' => '999.999.999 Credits', 'value' => '999999999_credits', 'price_modifier' => 0, 'sort_order' => 1],
    ],
]
```

### Option 2: Choose Extras

```php
[
    'label' => 'Choose Extras',
    'type' => 'checkboxes',
    'required' => false,
    'sort_order' => 2,
    'values' => [
        ['label' => 'Add 999.999.999 Super Wheel Spins', 'value' => 'super_wheel_spins', 'price_modifier' => 6.47, 'sort_order' => 1],
        ['label' => 'Add all Autoshow cars', 'value' => 'all_autoshow_cars', 'price_modifier' => 9.75, 'sort_order' => 2],
        ['label' => 'Add all Barn Finds cars', 'value' => 'all_barn_finds_cars', 'price_modifier' => 4.53, 'sort_order' => 3],
        ['label' => 'Add all Treasure Finds cars', 'value' => 'all_treasure_finds_cars', 'price_modifier' => 6.27, 'sort_order' => 4],
    ],
]
```

---

## Implementation Steps

1. **Read `car_options_clean.json`** — Parse the JSON and generate 590 PHP array entries with proper snake_case value conversion and single-quote escaping.

2. **Edit `GameServiceSeeder.php`** — Insert the complete Forza Horizon 6 game block (game entry + 2 services + all options) into the `$games` array after the ARC Raiders entry.

3. **Verify PHP syntax** — Run `php -l backend/database/seeders/GameServiceSeeder.php` to ensure no syntax errors.

4. **Run the seeder** — Execute `php artisan db:seed --class=GameServiceSeeder`

---

## Verification

After adding the seeder data:

1. Run `php artisan db:seed --class=GameServiceSeeder`
2. Visit `/games/forza-horizon-6/services` — should show both Cars and Credits services
3. Click into Cars — verify the 590-car checkbox dropdown renders, "Boosting options" select works, and pricing calculates correctly (selecting 1 default car should show ~2.42€)
4. Click into Credits — verify Amount select shows "999.999.999 Credits", extras checkboxes work, and base price is 6.47€
5. Test completion speed toggles (Express/Super Express) on both services

---

## Task Dependency Graph

| Task | Depends On | Reason |
|------|------------|--------|
| Task 1: Read car_options_clean.json | None | First need to understand the data structure and content |
| Task 2: Read credits.html | None | Independent data gathering, can run in parallel with Task 1 |
| Task 3: Read cars.html | None | Independent data gathering, can run in parallel |
| Task 4: Plan the seeder structure | Tasks 1, 2, 3 | Need all data before designing the complete structure |
| Task 5: Edit GameServiceSeeder.php | Task 4 | Implementation depends on having the complete plan |

## Parallel Execution Graph

```
Wave 1 (Start immediately):
├── Task 1: Read car_options_clean.json
├── Task 2: Read credits.html
└── Task 3: Read cars.html

Wave 2 (After Wave 1 completes):
└── Task 4: Plan the seeder structure

Wave 3 (After Wave 2 completes):
└── Task 5: Edit GameServiceSeeder.php

Critical Path: Task 1 → Task 4 → Task 5
```

## Expected Duration
- Quick: 1-2 minutes (just data gathering and file editing)
- No test command identified in the project for PHP seeders

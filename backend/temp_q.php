<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$service = App\Models\Service::with(['options.values'])->get()->first(function ($s) {
    $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $s->name));
    return trim($slug, '-') === 'account-leveling';
});
$gameName = App\Models\GameService::find($service->game_id)?->name ?? 'unknown';
echo "Service: {$service->name} (game: {$gameName})\n";
echo "max_quantity: {$service->max_quantity}\n";
echo "Options:\n";
foreach ($service->options()->orderBy('sort_order')->get() as $opt) {
    echo "  {$opt->sort_order}. {$opt->label} ({$opt->type})";
    if ($opt->min_value !== null) echo " min={$opt->min_value} max={$opt->max_value}";
    echo "\n";
    foreach ($opt->values()->orderBy('sort_order')->get() as $v) {
        echo "    - {$v->label} (\${$v->price_modifier})\n";
    }
}

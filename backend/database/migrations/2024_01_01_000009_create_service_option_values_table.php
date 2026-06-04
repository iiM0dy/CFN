<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('service_option_values', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('option_id');
            $table->string('label');
            $table->string('value');
            $table->decimal('price_modifier', 10, 2)->default(0);
            $table->integer('sort_order')->default(0);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
            $table->foreign('option_id')->references('id')->on('service_options')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_option_values');
    }
};

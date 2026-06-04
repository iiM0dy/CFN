<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('base_price', 10, 4);
            $table->string('image')->nullable();
            $table->uuid('game_id');
            $table->json('platforms');
            $table->json('completion_methods');
            $table->integer('max_quantity')->default(15);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->foreign('game_id')->references('id')->on('game_services')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};

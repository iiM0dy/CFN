<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('service_options', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('service_id');
            $table->string('label');
            $table->string('type');
            $table->boolean('required')->default(true);
            $table->integer('sort_order')->default(0);
            $table->integer('min_value')->nullable();
            $table->integer('max_value')->nullable();
            $table->integer('step')->nullable();
            $table->timestamps();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_options');
    }
};

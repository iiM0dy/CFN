<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('service_orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable();
            $table->uuid('service_id');
            $table->string('status')->default('pending');
            $table->decimal('total_price', 10, 2);
            $table->integer('quantity');
            $table->string('platform')->nullable();
            $table->string('completion_method')->nullable();
            $table->string('completion_speed')->nullable();
            $table->string('promo_code')->nullable();
            $table->decimal('discount', 10, 2)->default(0);
            $table->json('selected_options')->nullable();
            $table->string('guest_email')->nullable();
            $table->text('order_notes')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services');
            $table->index('user_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_orders');
    }
};

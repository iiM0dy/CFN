<?php

use App\Http\Controllers\Admin\AdminAnnouncementController;
use App\Http\Controllers\Admin\AdminChatController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminGameController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\Auth\GuestLoginController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SetPasswordController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FeaturedServiceController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

// ── PUBLIC AUTH (rate limited) ───────────────────────────────────
Route::middleware('throttle:auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'store']);
    Route::post('/login', [LoginController::class, 'store']);
    Route::post('/guest-login', [GuestLoginController::class, 'store']);
});

// ── OAUTH ────────────────────────────────────────────────────────
Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirect']);
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'callback']);

// ── GAMES & SERVICES ─────────────────────────────────────────────
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{gameSlug}/services', [GameController::class, 'services']);
Route::get('/services/search', [ServiceController::class, 'search']);
Route::get('/services/{serviceId}', [ServiceController::class, 'show']);

// ── FEATURED, BLOG, ANNOUNCEMENTS ────────────────────────────────
Route::get('/featured-services', [FeaturedServiceController::class, 'index']);
Route::get('/blog', [BlogController::class, 'index']);
Route::get('/blog/{slug}', [BlogController::class, 'show']);
Route::get('/announcement', [AnnouncementController::class, 'index']);

// ── CHECKOUT & WEBHOOK ───────────────────────────────────────────
Route::post('/checkout/session', [CheckoutController::class, 'createSession']);
Route::get('/checkout/retrieve-session', [CheckoutController::class, 'retrieveSession']);
Route::post('/webhook/stripe', [WebhookController::class, 'handleStripe']);

// ── PUBLIC ENDPOINTS ─────────────────────────────────────────────
Route::get('/orders/track', [OrderController::class, 'track']);
Route::post('/promo-codes/validate', [PromoCodeController::class, 'validate']);

// ── CHAT (public) ────────────────────────────────────────────────
Route::post('/chat/session', [ChatController::class, 'createOrGetSession']);
Route::get('/chat/session/{id}', [ChatController::class, 'show']);
Route::get('/chat/sessions', [ChatController::class, 'index']);
Route::post('/chat/message', [ChatController::class, 'sendMessage']);

// ── AUTHENTICATED ────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/set-password', [SetPasswordController::class, 'store']);
    Route::post('/logout', [LogoutController::class, 'destroy']);
    Route::get('/user', [UserController::class, 'show']);
    Route::patch('/user/profile', [UserProfileController::class, 'update']);
    Route::post('/user/change-password', [UserProfileController::class, 'changePassword']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites', [FavoriteController::class, 'destroy']);
});

// ── ADMIN ────────────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard-stats', [AdminDashboardController::class, 'index']);

    Route::get('/services', [AdminServiceController::class, 'index']);
    Route::post('/services', [AdminServiceController::class, 'store']);
    Route::patch('/services/{id}', [AdminServiceController::class, 'update']);
    Route::delete('/services/{id}', [AdminServiceController::class, 'destroy']);

    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
    Route::delete('/orders/{id}', [AdminOrderController::class, 'destroy']);

    Route::get('/users', [AdminUserController::class, 'index']);
    Route::patch('/users/{id}', [AdminUserController::class, 'update']);
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);

    Route::get('/games', [AdminGameController::class, 'index']);
    Route::post('/games', [AdminGameController::class, 'store']);
    Route::patch('/games/{id}', [AdminGameController::class, 'update']);
    Route::post('/games/reorder', [AdminGameController::class, 'reorder']);
    Route::delete('/games/{id}', [AdminGameController::class, 'destroy']);

    Route::get('/chat/sessions', [AdminChatController::class, 'index']);
    Route::patch('/chat/{id}/status', [AdminChatController::class, 'updateStatus']);

    Route::post('/announcement', [AnnouncementController::class, 'store']);
    Route::delete('/announcement', [AnnouncementController::class, 'destroy']);

    Route::get('/announcements', [AdminAnnouncementController::class, 'index']);
    Route::post('/announcements', [AdminAnnouncementController::class, 'store']);
    Route::patch('/announcements/{id}', [AdminAnnouncementController::class, 'update']);
    Route::delete('/announcements/{id}', [AdminAnnouncementController::class, 'destroy']);

    Route::get('/reviews', [AdminReviewController::class, 'index']);
    Route::patch('/reviews/{id}', [AdminReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [AdminReviewController::class, 'destroy']);
});

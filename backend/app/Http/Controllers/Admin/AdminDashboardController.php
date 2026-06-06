<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceOrderResource;
use App\Models\ChatSession;
use App\Models\GameService;
use App\Models\Order;
use App\Models\Service;
use App\Models\ServiceOrder;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'orderCount' => Order::count(),
            'serviceOrderCount' => ServiceOrder::count(),
            'pendingOrderCount' => Order::where('status', 'PENDING')->count(),
            'pendingServiceOrderCount' => ServiceOrder::where('status', 'pending')->count(),
            'activeOrderCount' => ServiceOrder::where('status', 'in_progress')->count(),
            'completedOrderCount' => ServiceOrder::where('status', 'completed')->count(),
            'totalRevenue' => (float) Order::sum('total'),
            'totalServiceRevenue' => (float) ServiceOrder::sum('total_price'),
            'userCount' => User::count(),
            'openChats' => ChatSession::where('status', 'open')->count(),
            'gamesCount' => GameService::count(),
            'servicesCount' => Service::count(),
            'featuredCount' => Service::where('is_featured', true)->count(),
            'missingPriceCount' => Service::whereNull('base_price')->orWhere('base_price', 0)->count(),
            'missingImageCount' => Service::whereNull('image')->orWhere('image', '')->count(),
            'latestOrders' => ServiceOrderResource::collection(
                ServiceOrder::with(['user', 'service.game'])->orderBy('created_at', 'desc')->take(7)->get()
            ),
        ]);
    }
}

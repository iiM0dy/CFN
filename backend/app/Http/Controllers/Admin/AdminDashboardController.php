<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceOrderResource;
use App\Models\Order;
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
            'totalRevenue' => (float) Order::sum('total'),
            'totalServiceRevenue' => (float) ServiceOrder::sum('total_price'),
            'userCount' => User::count(),
            'latestOrders' => ServiceOrderResource::collection(
                ServiceOrder::with(['user', 'service.game'])->orderBy('created_at', 'desc')->take(7)->get()
            ),
        ]);
    }
}

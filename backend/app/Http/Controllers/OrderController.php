<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Resources\ServiceOrderResource;
use App\Models\ServiceOrder;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = ServiceOrder::where('user_id', $request->user()->id)
            ->with(['service.game'])
            ->orderBy('created_at', 'desc');

        if ($request->query('status')) {
            $query->where('status', $request->query('status'));
        }

        return ServiceOrderResource::collection($query->get());
    }

    public function store(CreateOrderRequest $request)
    {
        $order = ServiceOrder::create([
            'user_id' => $request->user()->id,
            'service_id' => $request->input('serviceId'),
            'total_price' => $request->input('totalPrice'),
            'quantity' => $request->input('quantity'),
            'platform' => $request->input('platform'),
            'completion_method' => $request->input('completionMethod'),
            'completion_speed' => $request->input('completionSpeed'),
            'order_notes' => $request->input('orderNotes'),
            'promo_code' => $request->input('promoCode'),
            'discount' => $request->input('discount', 0),
            'selected_options' => $request->input('selectedOptions'),
            'status' => 'pending',
        ]);

        $order->load(['service.game']);
        return new ServiceOrderResource($order);
    }

    public function track(Request $request)
    {
        $orderId = $request->query('orderId');
        $email = $request->query('email');

        if ($orderId) {
            $order = ServiceOrder::with(['service.game'])->find($orderId);
            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
            }
            return response()->json($this->formatTrackOrder($order));
        }

        if ($email) {
            $orders = ServiceOrder::with(['service.game'])
                ->where('guest_email', $email)
                ->orWhereHas('user', fn($q) => $q->where('email', $email))
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($orders->map(fn($o) => $this->formatTrackOrder($o)));
        }

        return response()->json(['error' => 'orderId or email is required'], 400);
    }

    private function formatTrackOrder(ServiceOrder $order): array
    {
        return [
            'id' => $order->id,
            'status' => $order->status,
            'totalPrice' => $order->total_price,
            'createdAt' => $order->created_at,
            'serviceName' => $order->service?->name,
            'gameName' => $order->service?->game?->name,
            'gameSlug' => $order->service?->game?->slug,
            'image' => $order->service?->image,
            'guestEmail' => $order->guest_email,
        ];
    }
}

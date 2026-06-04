<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutSessionRequest;
use App\Models\ServiceOrder;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function __construct(private StripeService $stripe) {}

    public function createSession(CheckoutSessionRequest $request)
    {
        $user = Auth::guard('sanctum')->user();
        $items = $request->input('items');
        $metadata = $request->input('metadata', []);

        $serviceOrder = ServiceOrder::create([
            'user_id' => $user?->id,
            'service_id' => $items[0]['id'],
            'status' => 'pending',
            'total_price' => collect($items)->sum(fn($item) => $item['price'] * ($item['quantity'] ?? 1)),
            'quantity' => $items[0]['quantity'] ?? 1,
            'platform' => $metadata['platform'] ?? null,
            'completion_method' => $metadata['completionMethod'] ?? null,
            'completion_speed' => $metadata['completionSpeed'] ?? null,
            'selected_options' => isset($metadata['selectedOptions'])
                ? (is_string($metadata['selectedOptions']) ? json_decode($metadata['selectedOptions'], true) : $metadata['selectedOptions'])
                : null,
            'order_notes' => $metadata['orderNotes'] ?? null,
            'guest_email' => $request->input('customerEmail'),
        ]);

        $lineItems = array_map(fn($item) => [
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => $item['name'],
                    'description' => $item['description'] ?? null,
                    'images' => !empty($item['image']) ? [$item['image']] : [],
                ],
                'unit_amount' => (int) round($item['price'] * 100),
            ],
            'quantity' => $item['quantity'] ?? 1,
        ], $items);

        $session = $this->stripe->createCheckoutSession(
            $lineItems,
            ['serviceOrderId' => $serviceOrder->id, 'userId' => $user?->id ?? ''],
            $request->input('customerEmail'),
            $request->input('successUrl', config('app.frontend_url') . '/checkout/success?session_id={CHECKOUT_SESSION_ID}'),
            $request->input('cancelUrl', config('app.frontend_url')),
        );

        return response()->json(['sessionId' => $session->id, 'url' => $session->url]);
    }

    public function retrieveSession(Request $request)
    {
        $sessionId = $request->query('sessionId');
        if (!$sessionId) {
            return response()->json(['error' => 'sessionId is required'], 400);
        }

        $session = $this->stripe->retrieveSession($sessionId);

        return response()->json([
            'orderId' => $session->metadata->serviceOrderId ?? null,
            'email' => $session->customer_details->email ?? null,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ServiceOrder;
use App\Services\StripeService;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function __construct(private StripeService $stripe) {}

    public function handleStripe(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');

        try {
            $event = $this->stripe->constructWebhookEvent($payload, $signature);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $metadata = $session->metadata;

            if (isset($metadata->serviceOrderId)) {
                ServiceOrder::where('id', $metadata->serviceOrderId)->update(['status' => 'paid']);
            }
            if (isset($metadata->orderId)) {
                Order::where('id', $metadata->orderId)->update(['status' => 'PAID']);
            }
        }

        return response()->json(['received' => true]);
    }
}

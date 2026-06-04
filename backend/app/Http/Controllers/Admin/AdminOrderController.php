<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderStatusRequest;
use App\Http\Resources\ServiceOrderResource;
use App\Models\ServiceOrder;

class AdminOrderController extends Controller
{
    public function index()
    {
        return ServiceOrderResource::collection(
            ServiceOrder::with(['user', 'service.game'])->orderBy('created_at', 'desc')->get()
        );
    }

    public function updateStatus(string $id, UpdateOrderStatusRequest $request)
    {
        $order = ServiceOrder::findOrFail($id);

        $data = ['status' => $request->input('status')];
        if ($request->input('status') === 'completed') {
            $data['completed_at'] = now();
        }

        $order->update($data);
        return new ServiceOrderResource($order->load(['user', 'service.game']));
    }

    public function destroy(string $id)
    {
        ServiceOrder::findOrFail($id)->delete();
        return response()->noContent();
    }
}

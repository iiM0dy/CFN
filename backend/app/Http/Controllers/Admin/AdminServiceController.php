<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;

class AdminServiceController extends Controller
{
    public function index()
    {
        return ServiceResource::collection(Service::with('game')->get());
    }

    public function update(string $id, UpdateServiceRequest $request)
    {
        $service = Service::findOrFail($id);

        $data = [];
        if ($request->has('name')) $data['name'] = $request->input('name');
        if ($request->has('description')) $data['description'] = $request->input('description');
        if ($request->has('basePrice')) $data['base_price'] = $request->input('basePrice');
        if ($request->has('image')) $data['image'] = $request->input('image');
        if ($request->has('platforms')) $data['platforms'] = $request->input('platforms');
        if ($request->has('completionMethods')) $data['completion_methods'] = $request->input('completionMethods');
        if ($request->has('maxQuantity')) $data['max_quantity'] = $request->input('maxQuantity');
        if ($request->has('isFeatured')) $data['is_featured'] = $request->input('isFeatured');

        $service->update($data);
        return new ServiceResource($service->load('game'));
    }

    public function destroy(string $id)
    {
        Service::findOrFail($id)->delete();
        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Resources\AdminUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;

class AdminUserController extends Controller
{
    public function index()
    {
        return AdminUserResource::collection(User::withCount('serviceOrders')->orderBy('created_at', 'desc')->get());
    }

    public function update(string $id, UpdateUserRequest $request)
    {
        $user = User::findOrFail($id);
        $user->update($request->validated());
        return new UserResource($user);
    }

    public function destroy(string $id)
    {
        User::findOrFail($id)->delete();
        return response()->noContent();
    }
}

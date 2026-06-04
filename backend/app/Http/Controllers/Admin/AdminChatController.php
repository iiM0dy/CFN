<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateChatStatusRequest;
use App\Http\Resources\ChatSessionResource;
use App\Models\ChatSession;

class AdminChatController extends Controller
{
    public function index()
    {
        return ChatSessionResource::collection(
            ChatSession::with('messages')->orderBy('updated_at', 'desc')->get()
        );
    }

    public function updateStatus(string $id, UpdateChatStatusRequest $request)
    {
        $session = ChatSession::findOrFail($id);
        $session->update(['status' => $request->input('status')]);
        return new ChatSessionResource($session->load('messages'));
    }
}

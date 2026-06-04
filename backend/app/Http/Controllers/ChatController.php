<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateChatSessionRequest;
use App\Http\Requests\SendChatMessageRequest;
use App\Http\Resources\ChatMessageResource;
use App\Http\Resources\ChatSessionResource;
use App\Models\ChatMessage;
use App\Models\ChatSession;

class ChatController extends Controller
{
    public function createOrGetSession(CreateChatSessionRequest $request)
    {
        $query = ChatSession::where('status', 'active');

        if ($request->input('userId')) {
            $query->where('user_id', $request->input('userId'));
        } elseif ($request->input('userEmail')) {
            $query->where('user_email', $request->input('userEmail'));
        }

        $session = $query->first();

        if (!$session) {
            $session = ChatSession::create([
                'user_id' => $request->input('userId'),
                'user_email' => $request->input('userEmail'),
                'user_name' => $request->input('userName'),
            ]);
        }

        $session->load(['messages' => fn($q) => $q->orderBy('created_at', 'asc')]);

        return new ChatSessionResource($session);
    }

    public function show(string $id)
    {
        $session = ChatSession::with(['messages' => fn($q) => $q->orderBy('created_at', 'asc')])->find($id);
        if (!$session) {
            return response()->json(['error' => 'Session not found'], 404);
        }
        return new ChatSessionResource($session);
    }

    public function index()
    {
        $sessions = ChatSession::with(['messages' => fn($q) => $q->latest('created_at')->limit(1)])
            ->orderBy('updated_at', 'desc')
            ->get();

        return ChatSessionResource::collection($sessions);
    }

    public function sendMessage(SendChatMessageRequest $request)
    {
        $message = ChatMessage::create([
            'session_id' => $request->input('sessionId'),
            'text' => $request->input('text'),
            'sender' => $request->input('sender'),
            'is_admin' => $request->input('isAdmin', false),
        ]);

        ChatSession::where('id', $request->input('sessionId'))->update(['updated_at' => now()]);

        return new ChatMessageResource($message);
    }
}

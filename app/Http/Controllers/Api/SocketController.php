<?php

namespace App\Http\Controllers\Api;

use App\Events\DemoMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SocketController extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function push()
    {
        $data = $this->request->only(["title", "body"]);
        broadcast(new DemoMessage($data));
        return response()->json($data);
    }
}

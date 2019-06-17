<?php

namespace App\Http\Controllers\Api;

use App\Events;
use App\Http\Resources\EventResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventsController extends Controller
{
    public function index()
    {
        return EventResource::collection(Events::all());
    }

    public function store() {
        Events::create([
            'title' => request('title'),
            'date' => date('Y-m-d', strtotime(request('date'))),
        ]);
    }

    public function destroy() {
        Events::truncate();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
use Carbon\Carbon;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->get('period', 'all');
        $value  = $request->get('value', null);

        $query = Goal::query()
            ->join('matches', 'goals.match_id', '=', 'matches.id')
            ->selectRaw("
                COALESCE(goals.scorer_name, goals.assistor_name) AS player_name,
                SUM(CASE WHEN goals.scorer_name IS NOT NULL THEN 1 ELSE 0 END) AS total_goals,
                SUM(CASE WHEN goals.assistor_name IS NOT NULL THEN 1 ELSE 0 END) AS total_assists
            ")
            ->groupBy('player_name');

        // 🗓 Apply filters
        if ($period === 'month' && $value) {
            $date = Carbon::parse($value);
            $query->whereMonth('matches.match_date', $date->month)
                  ->whereYear('matches.match_date', $date->year);
        } elseif ($period === 'year' && $value) {
            $query->whereYear('matches.match_date', $value);
        }

        $players = $query->get()
            ->sortByDesc(fn($p) => $p->total_goals + $p->total_assists)
            ->values()
            ->map(fn($p) => [
                ...$p->toArray(),
                'total_contrib' => $p->total_goals + $p->total_assists,
        ]);

        return Inertia::render('Leaderboard/Index', [
            'players' => $players,
            'filters' => [
                'period' => $period,
                'value' => $value,
            ],
        ]);
    }
}

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

        // 🧭 Date filter helper
        $applyDateFilter = function ($query) use ($period, $value) {
            if ($period === 'month' && $value) {
                $date = \Carbon\Carbon::parse($value);
                $query->whereMonth('matches.match_date', $date->month)
                    ->whereYear('matches.match_date', $date->year);
            } elseif ($period === 'year' && $value) {
                $query->whereYear('matches.match_date', $value);
            }
        };

        // ⚽ Scorers
        $scorers = \App\Models\Goal::query()
            ->join('matches', 'goals.match_id', '=', 'matches.id')
            ->selectRaw('LOWER(TRIM(goals.scorer_name)) AS player_name, COUNT(*) AS total_goals')
            ->whereNotNull('goals.scorer_name')
            ->where('goals.scorer_name', '!=', '')
            ->tap($applyDateFilter)
            ->groupBy('player_name')
            ->pluck('total_goals', 'player_name')
            ->toArray();

        // 🎯 Assistors
        $assistors = \App\Models\Goal::query()
            ->join('matches', 'goals.match_id', '=', 'matches.id')
            ->selectRaw('LOWER(TRIM(goals.assistor_name)) AS player_name, COUNT(*) AS total_assists')
            ->whereNotNull('goals.assistor_name')
            ->where('goals.assistor_name', '!=', '')
            ->tap($applyDateFilter)
            ->groupBy('player_name')
            ->pluck('total_assists', 'player_name')
            ->toArray();

        // 🔀 Merge both sets properly — include players in either
        $allPlayers = collect($scorers)->keys()
            ->merge(array_keys($assistors))
            ->unique();

        $players = $allPlayers->map(function ($name) use ($scorers, $assistors) {
            $goals = $scorers[$name] ?? 0;
            $assists = $assistors[$name] ?? 0;

            return [
                'player_name' => ucfirst($name),
                'total_goals' => $goals,
                'total_assists' => $assists,
                'total_contrib' => $goals + $assists,
            ];
        })
        ->sortByDesc('total_contrib')
        ->values();

        // 🕸 Detect bots for OG fallback
        $ua = $request->header('User-Agent', '');
        if (preg_match('/facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Discordbot|TelegramBot|WhatsApp|SkypeUriPreview/i', $ua)) {
            return response()->view('leaderboard-og');
        }

        return \Inertia\Inertia::render('Leaderboard/Index', [
            'players' => $players,
            'filters' => [
                'period' => $period,
                'value' => $value,
            ],
        ]);
    }

}

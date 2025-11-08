<?php

namespace App\Http\Controllers;

use App\Models\MatchModel; // we avoid using the reserved "Match"
use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MatchController extends Controller
{
    /**
     * Show list of recent matches (public homepage)
     */
    public function index()
    {
        $matches = MatchModel::orderByDesc('match_date')
            ->select('id', 'title', 'match_date', 'team1_name', 'team1_score', 'team2_name', 'team2_score', 'slug')
            ->get();

        return Inertia::render('Matches/Index', [
            'matches' => $matches,
        ]);
    }

    /**
     * Display a single match result page
     *  - normal users → Inertia (React)
     *  - social crawlers → Blade HTML
     */
    public function show(Request $request, string $slug)
    {
        $match = MatchModel::with('goals')->where('slug', $slug)->firstOrFail();

        // detect crawler user-agents (for OG preview)
        $ua = $request->header('User-Agent', '');
        if (preg_match('/facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Discordbot|TelegramBot|WhatsApp|SkypeUriPreview/i', $ua)) {
            return response()->view('match-share', compact('match'));
        }

        return Inertia::render('Matches/Show', [
            'match' => $match,
        ]);
    }

    /**
     * Store a new match result (admin form submission)
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'match_date'     => 'required|date',
            'team1_name'     => 'required|string|max:100',
            'team1_score'    => 'required|integer',
            'team2_name'     => 'required|string|max:100',
            'team2_score'    => 'required|integer',
            'team1_players'  => 'nullable|string',
            'team2_players'  => 'nullable|string',
            'social_title' => 'required|string|max:255',
            'social_description' => 'required|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // 2MB limit

            // ✅ Nested goal validation
            'goals' => 'nullable|array',
            'goals.*.team_side' => 'required_with:goals|string|in:team1,team2',
            'goals.*.scorer_name' => 'required_with:goals|string|max:100',
            'goals.*.assistor_name' => 'nullable|string|max:100',
            'goals.*.time' => 'nullable|string|max:10',
            'goals.*.score_type' => 'nullable|string|in:regular,own_goal,penalty',
        ]);

        // ✅ Convert comma-separated players into arrays
        $team1Players = $validated['team1_players']
            ? array_filter(array_map('trim', explode(',', $validated['team1_players'])))
            : [];

        $team2Players = $validated['team2_players']
            ? array_filter(array_map('trim', explode(',', $validated['team2_players'])))
            : [];

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('matches', 'public');
        } else {
            $validated['image'] = null;
        }

        // create match record
        $match = MatchModel::create([
            'title'         => $validated['title'],
            'match_date'    => $validated['match_date'],
            'team1_name'    => $validated['team1_name'],
            'team1_score'   => $validated['team1_score'],
            'team2_name'    => $validated['team2_name'],
            'team2_score'   => $validated['team2_score'],
            'social_title'  => $validated['social_title'],
            'social_description' => $validated['social_description'],
            'team1_players' => $team1Players ?? [],
            'team2_players' => $team2Players ?? [],
            'image_path' => $validated['image'],
            'slug'          => Str::random(6),
        ]);

        // create goal records if any
        if (!empty($validated['goals'])) {
            foreach ($validated['goals'] as $goal) {
                Goal::create([
                    'match_id'      => $match->id,
                    'team_side'     => $goal['team_side'] ?? 'team1',
                    'scorer_name'   => $goal['scorer_name'] ?? '',
                    'assistor_name' => $goal['assistor_name'] ?? null,
                    'time'          => $goal['time'] ?? null,
                    'score_type'    => $goal['score_type'] ?? 'regular',
                ]);
            }
        }

        // (optional) trigger image generation for OG preview here later
        // dispatch(new \App\Jobs\GenerateMatchPreview($match));

        return redirect()->route('matches.index')->with('success', 'Match created successfully.');
    }

    /**
     * Add a new match
     */
    public function create()
    {
        // later you can pass dropdown data here if needed
        return Inertia::render('Matches/Create');
    }

    /**
     * Edit existing match
     */
    public function edit(string $slug)
    {
        $match = MatchModel::with('goals')->where('slug', $slug)->firstOrFail();

        return Inertia::render('Matches/Edit', [
            'match' => $match,
        ]);
    }

    /**
     * Update existing match
     */
    public function update(Request $request, $slug)
    {
        // find the match by slug
        $match = MatchModel::where('slug', $slug)->firstOrFail();

        // validate input
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'match_date'     => 'required|date',
            'team1_name'     => 'required|string|max:100',
            'team1_score'    => 'required|integer',
            'team2_name'     => 'required|string|max:100',
            'team2_score'    => 'required|integer',
            'team1_players'  => 'nullable|string',
            'team2_players'  => 'nullable|string',
            'social_title' => 'required|string|max:255',
            'social_description' => 'required|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // 2MB limit

            // same nested validation as store()
            'goals' => 'nullable|array',
            'goals.*.team_side' => 'required_with:goals|string|in:team1,team2',
            'goals.*.scorer_name' => 'required_with:goals|string|max:100',
            'goals.*.assistor_name' => 'nullable|string|max:100',
            'goals.*.time' => 'nullable|string|max:10',
            'goals.*.score_type' => 'nullable|string|in:regular,own_goal,penalty',
        ]);

        // convert comma-separated players into arrays
        $team1Players = $validated['team1_players']
            ? array_filter(array_map('trim', explode(',', $validated['team1_players'])))
            : [];

        $team2Players = $validated['team2_players']
            ? array_filter(array_map('trim', explode(',', $validated['team2_players'])))
            : [];

        if ($request->hasFile('image')) {
            if ($match->image_path && Storage::disk('public')->exists($match->image_path)) {
                Storage::disk('public')->delete($match->image_path);
            }
            $match->image_path = $request->file('image')->store('matches', 'public');
        }

        // update existing match record
        $match->update([
            'title'         => $validated['title'],
            'match_date'    => $validated['match_date'],
            'team1_name'    => $validated['team1_name'],
            'team1_score'   => $validated['team1_score'],
            'team2_name'    => $validated['team2_name'],
            'team2_score'   => $validated['team2_score'],
            'team1_players' => $team1Players,
            'team2_players' => $team2Players,
            'social_title' => $validated['social_title'],
            'social_description' => $validated['social_description'],
        ]);

        // refresh goals (delete old ones first)
        $match->goals()->delete();

        if (!empty($validated['goals'])) {
            foreach ($validated['goals'] as $goal) {
                Goal::create([
                    'match_id'      => $match->id,
                    'team_side'     => $goal['team_side'] ?? 'team1',
                    'scorer_name'   => $goal['scorer_name'] ?? '',
                    'assistor_name' => $goal['assistor_name'] ?? null,
                    'time'          => $goal['time'] ?? null,
                    'score_type'    => $goal['score_type'] ?? 'regular',
                ]);
            }
        }

        // dispatch(new \App\Jobs\GenerateMatchPreview($match));

        return redirect()->route('matches.show', $match->slug)
                        ->with('success', 'Match updated successfully.');
    }

    /**
     * Share preview
     */    
    public function shareview($slug)
    {
        $match = MatchModel::with('goals')->where('slug', $slug)->firstOrFail();

        // ✅ Safely handle both array and JSON-string cases
        $match->team1_players = is_string($match->team1_players)
            ? json_decode($match->team1_players, true)
            : ($match->team1_players ?? []);

        $match->team2_players = is_string($match->team2_players)
            ? json_decode($match->team2_players, true)
            : ($match->team2_players ?? []);

        return view('shareview', compact('match'));
    }

    /**
     * Delete match
     */    
    public function destroy(string $slug)
    {
        $match = MatchModel::where('slug', $slug)->firstOrFail();
        $match->delete();

        return redirect()->route('matches.index')->with('success', 'Match deleted successfully.');
    }

}

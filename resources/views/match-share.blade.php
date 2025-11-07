<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ $match->social_title ?? $match->title }}</title>

  {{-- ✅ Open Graph & Twitter meta tags for social sharing --}}
  <meta property="og:title" content="{{ $match->social_title ?? $match->title }}" />
  <meta property="og:description" content="{{ $match->social_description ?? 'Check out the full-time result and match details.' }}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{{ route('matches.show', $match->slug) }}" />
  <meta property="og:site_name" content="Scoreline" />
  <meta property="og:image" content="{{ asset('storage/previews/'.$match->slug.'.jpg') }}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{ $match->social_title ?? $match->title }}" />
  <meta name="twitter:description" content="{{ $match->social_description ?? '' }}" />
  <meta name="twitter:image" content="{{ asset('storage/previews/'.$match->slug.'.jpg') }}" />

  {{-- ✅ Font + Styling --}}
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background: #f9fafb;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      padding: 40px 50px;
      width: 700px;
      text-align: center;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .team {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 20px;
    }

    .team svg {
      width: 22px;
      height: 22px;
    }

    .team.red { color: #dc2626; }
    .team.blue { color: #2563eb; }

    .score {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
    }

    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 20px 0;
    }

    .goals {
      display: flex;
      justify-content: space-between;
      text-align: left;
      font-size: 14px;
      color: #111827;
    }

    .goals .side { width: 48%; }

    .goal {
      margin-bottom: 6px;
      display: flex;
      align-items: baseline;
      justify-content: flex-start;
      gap: 4px;
    }

    .goal span.time { color: #9ca3af; font-size: 12px; }
    .goal span.assist { color: #6b7280; font-size: 14px; }

    .center-icon {
      text-align: center;
      font-size: 18px;
      color: #9ca3af;
      margin: 4px 0;
    }

    /* Optional - perfect screenshot fit (if not using clipSelector) */
    @media screen {
      body.preview-mode {
        background: #fff;
      }
      .card.fullscreen {
        width: 1200px;
        height: 630px;
        padding: 60px 80px;
        border-radius: 0;
        box-shadow: none;
      }
    }
  </style>
</head>

<body>
  <div class="card">
    {{-- Header Section --}}
    <div class="header">
      <div class="team red">
        {{-- Red shield icon --}}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>{{ $match->team1_name }}</span>
      </div>

      <div>
        <div style="font-weight: 600; font-size: 18px; color: #111827;">{{ $match->title }}</div>
        <div class="score">{{ $match->team1_score }} - {{ $match->team2_score }}</div>
      </div>

      <div class="team blue" style="justify-content: flex-end;">
        <span>{{ $match->team2_name }}</span>
        {{-- Blue shield icon --}}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
    </div>

    <div class="divider"></div>

    {{-- Goals Section --}}
    <div class="goals">
      {{-- Team 1 Goals --}}
      <div class="side">
        @foreach ($match->goals->where('team_side', 'team1') as $goal)
          <div class="goal">
            <span>
              <strong style="color:#111827;">{{ ucfirst($goal->scorer_name) }}</strong>
              @if ($goal->assistor_name)
                <span class="assist">({{ ucfirst($goal->assistor_name) }})</span>
              @elseif ($goal->score_type === 'penalty')
                <span class="assist">(Pen)</span>
              @elseif ($goal->score_type === 'own_goal')
                <span class="assist">(OG)</span>
              @endif
              @if ($goal->time)
                <span class="time">{{ $goal->time }}'</span>
              @endif
            </span>
          </div>
        @endforeach
      </div>

      {{-- Center icon --}}
      <div class="center-icon">⚽</div>

      {{-- Team 2 Goals --}}
      <div class="side" style="text-align: right;">
        @foreach ($match->goals->where('team_side', 'team2') as $goal)
          <div class="goal" style="justify-content: flex-end;">
            <span>
              @if ($goal->time)
                <span class="time">{{ $goal->time }}'</span>
              @endif
              <strong style="color:#111827;">{{ ucfirst($goal->scorer_name) }}</strong>
              @if ($goal->assistor_name)
                <span class="assist">({{ ucfirst($goal->assistor_name) }})</span>
              @elseif ($goal->score_type === 'penalty')
                <span class="assist">(Pen)</span>
              @elseif ($goal->score_type === 'own_goal')
                <span class="assist">(OG)</span>
              @endif
            </span>
          </div>
        @endforeach
      </div>
    </div>
  </div>
</body>
</html>

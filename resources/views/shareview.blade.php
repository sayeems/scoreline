<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ $match->title }}</title>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    html, body {
      margin: 0;
      padding: 0;
      width: 1200px;       /* fixed OG size */
      height: 630px;
      background: #f9fafb;
      font-family: 'Inter', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      width: 1120px;          /* slightly smaller than frame for breathing space */
      height: 560px;          /* fills most of 630px height */
      padding: 40px 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      font-size: 22px;
    }

    .team svg {
      width: 24px;
      height: 24px;
    }

    .team.red { color: #dc2626; }
    .team.blue { color: #2563eb; }

    .score {
      font-size: 42px;
      font-weight: 700;
      color: #111827;
    }

    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 24px 0;
    }

    .goals {
      display: flex;
      justify-content: space-between;
      text-align: left;
      font-size: 15px;
      color: #111827;
      flex-grow: 1;
      align-items: flex-start;
    }

    .goals .side {
      width: 46%;
    }

    .goal {
      margin-bottom: 6px;
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .goal span.time {
      color: #9ca3af;
      font-size: 12px;
    }

    .goal span.assist {
      color: #6b7280;
      font-size: 14px;
    }

    .center-icon {
      text-align: center;
      font-size: 20px;
      color: #9ca3af;
      margin: 6px 0;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="team red">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>{{ $match->team1_name }}</span>
      </div>

      <div class="score">{{ $match->team1_score }} - {{ $match->team2_score }}</div>

      <div class="team blue" style="justify-content: flex-end;">
        <span>{{ $match->team2_name }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
    </div>

    <div class="divider"></div>

    <div class="goals">
      {{-- Team 1 Goals --}}
      <div class="side">
        @foreach ($match->goals->where('team_side', 'team1') as $goal)
          <div class="goal">
            <span>
              <strong>{{ ucfirst($goal->scorer_name) }}</strong>
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

      <div class="center-icon">⚽</div>

      {{-- Team 2 Goals --}}
      <div class="side" style="text-align: right;">
        @foreach ($match->goals->where('team_side', 'team2') as $goal)
          <div class="goal" style="justify-content: flex-end;">
            <span>
              @if ($goal->time)
                <span class="time">{{ $goal->time }}'</span>
              @endif
              <strong>{{ ucfirst($goal->scorer_name) }}</strong>
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

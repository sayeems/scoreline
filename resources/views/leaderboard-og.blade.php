<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leaderboard</title>

  {{-- ✅ Universal Open Graph meta tags --}}
  <meta property="og:title" content="Scoreline Leaderboard" />
  <meta property="og:description" content="Check out who’s leading with goals and assists this month!" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="score.sayeem.com/leaderboard" />
  <meta property="og:site_name" content="Scoreline" />
    <meta property="og:image" content="/leaderboard-default-og.png" />
    <meta name="twitter:image" content="/leaderboard-default-og.png" />
    <meta property="og:image" content="/leaderboard-default-og.png" />
    <meta name="twitter:image" content="/leaderboard-default-og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="/leaderboard-default-og.png" />
  <meta name="twitter:description" content="Check out who’s leading with goals and assists this month!" />

  {{-- ✅ Extra tags recognized by Slack / Discord / Telegram --}}
  <meta name="description" content="Check out who’s leading with goals and assists this month!">
  <meta name="og:locale" content="en_US">
  <meta name="theme-color" content="#dc2626"> {{-- helps Discord embed color --}}

</head>

<body>
  <div class="card">
    {{-- Header Section --}}
    <div class="header">
      <div class="team red">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      <div class="team blue" style="justify-content: flex-end;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <h1>Leaderboard</h1>
    </div>
  </div>
</body>
</html>

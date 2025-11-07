<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ $match->title }}</title>

  {{-- ✅ Essential Open Graph tags --}}
  <meta property="og:title" content="{{ $match->title }} | {{ $match->team1_name }} {{ $match->team1_score }}–{{ $match->team2_score }} {{ $match->team2_name }}" />
  <meta property="og:description" content="Full-time result: {{ $match->team1_name }} {{ $match->team1_score }}–{{ $match->team2_score }} {{ $match->team2_name }} in {{ $match->title }}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{{ route('matches.show', $match->slug) }}" />

  {{-- ✅ The generated match preview image --}}
  <meta property="og:image" content="{{ asset('storage/previews/'.$match->slug.'.jpg') }}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {{-- Optional extras for Twitter/X --}}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{ $match->title }}" />
  <meta name="twitter:description" content="{{ $match->team1_name }} {{ $match->team1_score }}–{{ $match->team2_score }} {{ $match->team2_name }}" />
  <meta name="twitter:image" content="{{ asset('storage/previews/'.$match->slug.'.jpg') }}" />

  {{-- Small inline CSS (for human fallback view) --}}
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #f9fafb;
      text-align: center;
      padding: 60px;
      color: #111827;
    }
    h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
    p { color: #6b7280; font-size: 16px; }
  </style>
</head>
<body>
  <h1>{{ $match->team1_name }} {{ $match->team1_score }}–{{ $match->team2_score }} {{ $match->team2_name }}</h1>
  <p>{{ $match->title }}</p>
</body>
</html>

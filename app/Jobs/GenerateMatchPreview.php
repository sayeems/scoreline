<?php

namespace App\Jobs;

use App\Models\MatchModel;
use Spatie\Browsershot\Browsershot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class GenerateMatchPreview implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $match;

    public function __construct(MatchModel $match)
    {
        $this->match = $match;
    }

    public function handle(): void
    {
        $slug = $this->match->slug;
        $url = route('matches.shareview', $slug);

        $previewPath = storage_path("app/public/previews");

        // ✅ Ensure the directory exists
        if (!is_dir($previewPath)) {
            mkdir($previewPath, 0775, true);
        }

        $filePath = $previewPath . "/{$slug}.jpg";

        try {
            Browsershot::url($url)
            ->windowSize(1200, 630)
            ->deviceScaleFactor(2)
            ->waitUntilNetworkIdle()
            ->save($filePath);
        } catch (\Throwable $e) {
            \Log::error("Failed to generate preview for {$slug}: " . $e->getMessage());
        }
    }

}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_id')->constrained('matches')->onDelete('cascade');
            $table->enum('team_side', ['team1', 'team2']);
            $table->string('scorer_name');
            $table->string('assistor_name')->nullable();
            $table->string('time')->nullable(); // e.g. "23'"
            $table->enum('score_type', ['regular', 'own_goal', 'penalty'])->default('regular');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};

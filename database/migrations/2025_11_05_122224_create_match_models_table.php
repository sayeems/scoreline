<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('match_date');
            $table->string('team1_name');
            $table->integer('team1_score')->default(0);
            $table->string('team2_name');
            $table->integer('team2_score')->default(0);
            $table->json('team1_players')->nullable();
            $table->json('team2_players')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
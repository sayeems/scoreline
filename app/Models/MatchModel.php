<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchModel extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'title',
        'match_date',
        'team1_name',
        'team1_score',
        'team2_name',
        'team2_score',
        'team1_players',
        'team2_players',
        'slug',
    ];

    protected $casts = [
        'match_date' => 'date',
        'team1_players' => 'array',
        'team2_players' => 'array',
    ];

    public function goals()
    {
        return $this->hasMany(Goal::class, 'match_id');
    }

}

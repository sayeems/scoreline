<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'match_id',
        'team_side',
        'scorer_name',
        'assistor_name',
        'time',
        'score_type',
    ];

    public function match()
    {
        return $this->belongsTo(MatchModel::class, 'match_id');
    }

}
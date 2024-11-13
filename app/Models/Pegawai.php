<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;

    // Menentukan tabel yang digunakan pada model
    protected $table = 'pegawai';

    // Kolom-kolom yang bisa diisi 
    protected $fillable = [
        'nama',
        'jenis_kelamin',
        'alamat',
        'email',
        'status',
        'tanggal_masuk',
    ];
}

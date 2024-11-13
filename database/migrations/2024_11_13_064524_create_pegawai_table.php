<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Membuat tabel 'pegawai'
        Schema::create('pegawai', function (Blueprint $table) {
            $table->id(); // Kolom ID otomatis bertambah sebagai primary key
            $table->string('nama', 100); // Kolom nama pegawai
            $table->enum('jenis_kelamin', ['L', 'P']); // Kolom untuk jenis kelamin dengan nilai 'L' atau 'P'
            $table->text('alamat'); // Kolom untuk alamat pegawai
            $table->string('email', 100)->unique(); // Kolom untuk email pegawai 
            $table->enum('status', ['aktif', 'nonaktif']); // Kolom status pegawai dengan nilai 'aktif' atau 'nonaktif'
            $table->date('tanggal_masuk'); // Kolom untuk tanggal masuk kerja
            $table->timestamps(); // Kolom created_at dan updated_at otomatis
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
        Schema::dropIfExists('pegawai');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;
use Illuminate\Support\Facades\Validator;

class PegawaiController extends Controller
{
    // Menampilkan semua pegawai.
    public function index()
    {
        $pegawais = Pegawai::all();
        $data = [
            'message' => 'Get all pegawai',
            'data' => $pegawais
        ];

        return response()->json($data, 200);
    }

    // Menyimpan data pegawai baru.
    public function store(Request $request)
    {
        // Validasi data yang diterima dari request
        $validator = Validator::make($request->all(), [
            'nama' => 'required|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required',
            'email' => 'required|email|unique:pegawai,email',
            'status' => 'required|in:aktif,nonaktif',
            'tanggal_masuk' => 'required|date',
        ]);
    
        // Respons pesan error jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }
    
        // Buat data pegawai baru
        $pegawai = Pegawai::create($request->all());
    
        //  respons sukses jika pegawai berhasil disimpan
        return response()->json([
            'message' => 'Pegawai berhasil dibuat',
            'data' => $pegawai
        ], 201);
    }

    
     // Mengupdate data pegawai berdasarkan ID.
    public function update(Request $request, $id)
    {
        $pegawai = Pegawai::find($id);

        if ($pegawai) {
            // Validasi data yang diterima dari request
            $validator = Validator::make($request->all(), [
                'nama' => 'sometimes|required|max:100',
                'jenis_kelamin' => 'sometimes|required|in:L,P',
                'alamat' => 'sometimes|required',
                'email' => 'sometimes|required|email|unique:pegawai,email,' . $id,
                'status' => 'sometimes|required|in:aktif,nonaktif',
                'tanggal_masuk' => 'sometimes|required|date',
            ]);

            // Respons pesan error jika validasi gagal
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Perbarui data pegawai
            $pegawai->update($request->all());

            // Respons sukses setelah data diperbarui
            return response()->json([
                'message' => 'Pegawai berhasil diperbarui',
                'data' => $pegawai
            ], 200);
        } else {
            // Respon gagal jika pegawai tidak di temukan
            return response()->json([
                'message' => 'Pegawai tidak ditemukan'
            ], 404);
        }
    }

    // Menghapus data pegawai berdasarkan ID.
    public function destroy($id)
    {
        // Mencari pegawai berdasarkan ID
        $pegawai = Pegawai::find($id);

        // Jika pegawai ditemukan, hapus data pegawai
        if ($pegawai) {
            $pegawai->delete(); 

            // Respons sukses setelah data pegawai dihapus
            return response()->json([
                'message' => 'Pegawai berhasil dihapus' 
            ], 200);
        } else {
            // Jika pegawai tidak ditemukan, respons 404
            return response()->json([
                'message' => 'Pegawai tidak ditemukan' 
            ], 404);  
        }
    }
   
    public function show($id)
    {
        // Mencari pegawai berdasarkan ID
        $pegawai = Pegawai::find($id);

        // Jika pegawai ditemukan, menampilka data pegawai
        if ($pegawai) {
            return response()->json([
                'message' => 'Pegawai ditemukan',  
                'data' => $pegawai  
            ], 200); 
        } else {
            // Jika pegawai tidak ditemukan, respons 404
            return response()->json([
                'message' => 'Pegawai tidak ditemukan'  
            ], 404);
        }
    }
}
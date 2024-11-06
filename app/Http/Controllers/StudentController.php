<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index(){
        $students = Student::all();
        $data = [
            'message' => 'Get all students',
            'data' => $students
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        // Validasi data yang diterima dari request
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'nim' => 'required|numeric',
            'email' => 'required|email',
            'jurusan' => 'required',
        ]);
    
        // Respons pesan error jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }
    
        // Buat data mahasiswa baru
        $student = Student::create($request->all());
    
        //  respons sukses
        return response()->json([
            'message' => 'Mahasiswa berhasil dibuat',
            'data' => $student
        ], 201);
    }
    

public function update(Request $request, $id)
{
    $student = Student::find($id);

    if ($student) {
        // Validasi data yang diterima dari request
        $validator = Validator::make($request->all(), [
            'nama' => 'sometimes|required',
            'nim' => 'sometimes|numeric|required',
            'email' => 'sometimes|email|required',
            'jurusan' => 'sometimes|required'
        ]);

        //respons pesan error Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // Perbarui data mahasiswa
        $student->update($request->all());

        // respons sukses
        return response()->json([
            'message' => 'Mahasiswa berhasil diperbarui',
            'data' => $student
        ], 200);
    } else {
        return response()->json([
            'message' => 'Mahasiswa tidak ditemukan'
        ], 404);
    }
}

    public function destroy($id){
        $student = Student::find($id);

        if ($student) {
            $student->delete();

            $data = [
                'message' => 'Student is deleted successfully'
            ];
            return response()->json($data, 200);
        } else {
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }
    }

    public function show($id)
    {
        $student = Student::find($id);
    
        if ($student) {
            $data = [
                'message' => 'Student found',
                'data' => $student
            ];
    
            return response()->json($data, 200);
        } else {
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }
    }
    
}
    

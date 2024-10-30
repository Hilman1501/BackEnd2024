<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

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

    public function store(Request $request){
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan,
        ];

        $students = Student::create($input);
        $data = [
            'message' => 'Student is created successfully',
            'data' => $students
        ];

        return response()->json($data, 201);
    }

    public function update(Request $request, $id){
        $student = Student::find($id);
        
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update($request->all());
        $data = [
            'message' => 'Student is updated successfully',
            'data' => $student
        ];

        return response()->json($data, 200);
    }

    public function destroy($id){
        $student = Student::find($id);
        
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->delete();
        return response()->json(['message' => 'Student is deleted successfully'], 200);
    }
}

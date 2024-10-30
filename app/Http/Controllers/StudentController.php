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

        $student = Student::create($input);
        $data = [
            'message' => 'Student is created successfully',
            'data' => $student
        ];

        return response()->json($data, 201);
    }

    public function update(Request $request, $id){
        $student = Student::find($id);
        
        if ($student) {
            $input = [
                'nama' => $request->nama ?? $student->nama,
                'nim' => $request->nim ?? $student->nim,
                'email' => $request->email ?? $student->email,
                'jurusan' => $request->jurusan ?? $student->jurusan,
            ];   
            
            $student->update($input);
    
            $data =[
                'message' => 'Student is updated successfully',
                'data' => $student
            ];
            
            return response()->json($data, 200);
        } else {
            $data =[
                'message' => 'Student not found'
            ];
            
            return response()->json($data, 404);
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
            $data = [
                'message' => 'Student not found'
            ];
            return response()->json($data, 404);
        }
    }
}

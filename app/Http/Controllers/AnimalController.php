<?php
namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    // menampilkan semua data hewan
    public function index()
    {
        return Animal::all();
    }

    // Menyimpan data hewan baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            
        ]);

        $animal = Animal::create($request->all());
        return response()->json($animal, 201);
    }

    // Mengupdate data hewan 
    public function update(Request $request, $id)
    {
        $animal = Animal::findOrFail($id);
        $animal->update($request->all());
        return response()->json($animal, 200);
    }

    // Menghapus data hewan
    public function destroy($id)
    {
        Animal::destroy($id);
        return response()->json(null, 204);
    }
}

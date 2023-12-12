<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Carbon\Carbon;

class BooksController extends Controller
{
    public function bookForm(){
        return view('BookForm');
    }
    public function storeBook(Request $request){
        $book = new Book;
        $book->nombre = $request->nombre;
        $book->autor = $request->autor;
        $book->editorial = $request->editorial;
        $book->foto_portada = $request->foto_portada;
        $book->pdf = $request->pdf;
        $book->categoria = $request->categoria;
        $book->fecha_publicacion = Carbon::now();
    }
}

import React, {useState, useEffect}  from "react";
import  ReactDOM  from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

function BookForm() {

    const [data, setData] = useState({
        autor:'',
        editorial:'',
        nombre:'',
        libro:'',
        portada:'',
        fechaPublicacion:0,
        categorias:['']
    })

    const [category, setCategory] = useState()

    const handleChange = ({target:{value, name}}) => {
        setData(curr => curr = {
            ...data,
            [name]: value
        })
    }

    const handleNewCat= (e) => {
        e.preventDefault()
        let temp = data.categorias
        temp.push('')
        setData(curr => curr={
            ...data,
            categorias:temp
        })
    }

    const handleDeleteCat = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.name)
        let temp = data.categorias
        temp.splice(index, 1)
        setData(curr => curr ={
            ...data,
            categorias:temp
        })
    }

    const handleChangeCat = ({target:{value,name}}) => {
        const [route, index] = name.split('-')
        let temp = data[route]
        temp[index] = value
        setData(curr => curr = {
            ...data,
            [route]:temp
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/getCategories')
            .then(res => {
                setCategory(res.data.categories)
            })
    },[])

    return(
        <form className="container p-5">
            <h1>Guardar Libro</h1>
            <label htmlFor="autor" className="form-label fs-4">Autor</label>
            <input type="text" name="autor" className="form-control" id="autor" onChange={handleChange}/>
            <label htmlFor="editorial" className="form-label fs-4">Editorial</label>
            <input type="text" name='editorial' id='editorial' className="form-control" onChange={handleChange}/>
            <label htmlFor="nombre" className="form-label fs-4">Nombre</label>
            <input type="text" name='nombre' id='nombre' className="form-control" onChange={handleChange}/>
            <label htmlFor="libro" className="form-label fs-4">Libro</label>
            <input type="file" name='libro' id='libro' className="form-control"/>
            <label htmlFor="portada" className="form-label fs-4">Portada</label>
            <input type="file" name='protada' id='portada' className="form-control"/>
            <label htmlFor="categorias" className="form-label fs-4">Categoria</label>
            {
                data.categorias.length > 1 ? data.categorias.map((element, index)=>{
                    return(
                        <div className="input-group mt-3">
                            <input 
                                list="categorias-libros" 
                                name={`categorias-${index}`} 
                                id="categorias" 
                                className="form-control" 
                                value={element}
                                onChange={handleChangeCat}
                            />
                            <button 
                                className="btn btn-outline-danger pt-0"
                                name={`${index}`}
                                onClick={handleDeleteCat}
                            >
                                -
                            </button>
                        </div>
                    )
                }) : 
                <input 
                    list="categorias-libros" 
                    name={`categorias-0`} 
                    id="categorias" 
                    className="form-control mt-3"
                    value={data.categorias[0]}
                    onChange={handleChangeCat}
                /> 
            }
            <datalist id="categorias-libros">
                {
                    category && category.map(element =>{
                        return(
                            <option value={element.nombre}></option>
                        )
                    })
                }
            </datalist>
            <div className="mt-5">
                <button 
                    className="btn fs-2 rounded-4 border btn-outline-primary position-relative top-50 start-50 translate-middle mt-1 pt-0" 
                    onClick={handleNewCat}
                >
                    +
                </button>
            </div>
        </form>
    )
}

export default BookForm;

if (document.getElementById('form')) {
    const Index = ReactDOM.createRoot(document.getElementById("form"));

    Index.render(
        <React.StrictMode>
            <BookForm/>
        </React.StrictMode>
    )
}
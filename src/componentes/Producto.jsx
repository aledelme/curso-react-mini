import axios from "axios"
import { useQuery } from "react-query"

function getProductos(){
    return axios.get('http://localhost:8080/sql?sql=select * from products')
}

export function Producto(){
    const {data: productos, isLoading, isError, status, error} = useQuery(['productos'], getProductos)

    if(isLoading){
        return <div>Cargando...</div>
    }

    if(isError){
        return <div>{error.message}</div>
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {productos.data.map(producto => (
                    <tr key={producto.product_id}>
                        <td>{producto.product_id}</td>
                        <td>{producto.product_name}</td>
                        <td className="text-end">{producto.unit_price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
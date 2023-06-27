import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Home(){
    return (
        <div className='container d-flex flex-column justify-content-between todo'>
            <Header></Header>
            <div className='flex-grow-1'>
                {/* Outlet inyecta los Route hijos del Route padre */}
                <Outlet></Outlet> 
            </div>
            <Footer></Footer>
        </div>
    )
}
import './App.css'
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom"
import {Articles} from "./pages/Articles/Articles";
import {Admin} from "./pages/Admin/Admin";
import {CreateArticlePage} from "./pages/CreateArticlePage/CreateArticlePage";
import {CreateAdmin} from "./pages/CreateAdmin/CreateAdmin";
import {Login} from "./pages/Login/Login";

function App() {

    return (
        <>
            <Navbar/>
            <div className={'container'}>
                <Routes>
                    <Route path='/'
                           element={<Articles/>}/>
                    <Route path='/login'
                           element={<Login/>}/>
                    <Route path='/articles'
                           element={<Articles/>}/>
                    <Route path='/admin'
                           element={<Admin/>}/>
                    <Route path='/admin/create-admin'
                           element={<CreateAdmin/>}/>
                    <Route path='/admin/create-article'
                           element={<CreateArticlePage/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App

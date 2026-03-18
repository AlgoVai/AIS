import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './jsxf/home';

function pageLoader(){
return(


    <BrowserRouter>
    <Routes>
        <Route path="/Home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>

)
}
export default pageLoader


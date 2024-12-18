

import { Route, Routes } from "react-router-dom";
import Home  from '@/_root/page/Home';
import Mua from "@/_root/page/Mua";
import Nhiet from "./_root/page/Nhiet";
import Nhucau from "./_root/page/Nhucau";
import NK from "./_root/page/Nk";
import Xk from "./_root/page/Xk";




const App = () => {
  return (
    <main>
      <Routes>
        
        
        <Route>
          <Route index element={<Home />}/>
          <Route path='/mua' element={<Mua />}/>
          <Route path='/nhiet' element={<Nhiet />}/>
          <Route path='/nhucau' element={<Nhucau />}/>
          <Route path='/nk' element={<NK />}/>
          <Route path='/xk' element={<Xk />}/>
        </Route>
        
      </Routes>
    </main>
  )
}

export default App
import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import PageContent from './Components/PageContent';
import MyTeams from './Components/Teams/MyTeams'
import NoTeam from './Components/NotFound/NotFound';
import Details from './Components/Details/Details';
import NotFound from './Components/NotFound/NotFound';

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<PageContent/>} />
      <Route path='/my-teams' element={<MyTeams />}/>
      <Route path='/pokemons/:id' element={<Details/>}/>
      {/* * - wildcard */}
    <Route path="*" element={<NotFound/>} />
      
    </Routes>
    </>
  )
}

export default App;



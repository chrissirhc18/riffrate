import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import ReviewPage from './components/ReviewPage'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/ReviewPage" element={<ReviewPage/>}></Route>
    </Routes>
  </HashRouter>
}

export default App

import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";
import { Route, Routes } from "react-router";
import TopicPage from "./components/TopicPage";
import SingleArticle from "./components/SingleArticle";
import { useContext } from 'react';
import { ThemeContext } from './contexts/Theme';
import NotFound from "./components/NotFound";
function App() {
  const { theme } = useContext(ThemeContext)
 
  return (
    <div className={`app h-screen flex flex-col justify-between ${theme}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/article/:topic" element={<TopicPage/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

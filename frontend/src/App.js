import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import BookRecommendation from "./components/main/BookRecommendation";
import BookRecommList from "./components/main/BookRecommList";
import DailyQuote from "./components/main/DailyQuote";
import LowerGradesBookPick from "./components/main/LowerGradesBookPick";
import BookDetail from "./components/book/BookDetail";
import Navbar from "./components/navbar/Navbar";
import Mypage from "./components/mypage/Mypage";
import BookPrefer from "./components/book/BookPrefer";
import BookShelf from "./components/book/BookShelf";
import InsertBookReport from "./components/book/InsertBookReport";
import BookShelfDetail from "./components/book/BookShelfDetail";
import Profile from "./components/mypage/Profile";
import SignUp from "./components/member/SignUp";
import Login from "./components/member/Login";
import Rank from './components/rank/Rank';
import RankDetail from './components/rank/RankDetail';

import useAuthStore from "./store/authStore";

function App() {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 배경색 설정
    document.body.style.backgroundColor = "#FBF5F2";
  });

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <BookRecommendation />
                  <DailyQuote />
                  <LowerGradesBookPick />
                </>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {isAuthenticated ? (
            <>
              <Route path="/book-detail/:bookId" element={<BookDetail />} />
              <Route path="/book_recomm" element={<BookRecommList />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/mybook-shelf" element={<BookShelf />} />
              <Route path="/mybook-shelf/:detail" element={<BookShelfDetail />}/>
              <Route path="/insert_book_report/:detail" element={<InsertBookReport />}/>
              <Route path="/mybook-prefer" element={<BookPrefer />} />
              <Route path="/" element={<App />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/rank/:bookId" element={<RankDetail />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

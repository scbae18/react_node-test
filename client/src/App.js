import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>React - Button Click to Navigate Example</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-page" element={<NewPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function Home() {
  const [redirectPath, setRedirectPath] = useState('');
  const navigate = useNavigate(); // useNavigate로 변경

  // 버튼 클릭 시 서버에서 경로 받아오기
  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/navigate');
      const data = await response.json();
      setRedirectPath(data.redirectTo); // 서버에서 받은 경로 저장
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 경로가 설정되면 해당 경로로 이동
  if (redirectPath) {
    navigate(redirectPath); // navigate로 이동
  }

  return (
    <div>
      <p>Click the button below to go to the new page.</p>
      <button onClick={handleButtonClick}>Go to New Page</button>
    </div>
  );
}

function NewPage() {
  return (
    <div>
      <h2>Welcome to the new page!</h2>
      <p>This is the page you navigated to.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default App;

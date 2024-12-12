import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

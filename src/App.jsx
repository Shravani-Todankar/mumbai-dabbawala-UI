import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ChefsCorner from './pages/ChefsCorner';
import MenuCalendar from './pages/MenuCalendar';
import Waitlist from './pages/Waitlist';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/chefs-corner" element={<ChefsCorner />} />
          <Route path="/menu-calendar" element={<MenuCalendar />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

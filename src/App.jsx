import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import './App.css';

const PAGES = {
  '/': { component: Hero, name: 'main' },
  '/work': { component: Projects, name: 'work' },
  '/about': { component: About, name: 'about' },
  '/contact': { component: Contact, name: 'contact' },
};

export default function App() {
  const route = useHashRoute();
  const page = PAGES[route] ?? PAGES['/'];
  const Page = page.component;

  return (
    <div className="app-wrapper" data-page={page.name}>
      <Nav />

      <main id="main-content" className="main-content">
        <Page />
      </main>

      <Footer />
    </div>
  );
}

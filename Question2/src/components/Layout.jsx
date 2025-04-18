import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <Outlet />
      </main>
      <footer className="bg-white shadow mt-8 py-4">
        <div className="container mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} Social Media Analytics Dashboard
        </div>
      </footer>
    </div>
  );
}

export default Layout;
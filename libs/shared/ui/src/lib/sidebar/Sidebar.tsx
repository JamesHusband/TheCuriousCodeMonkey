import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

/* eslint-disable-next-line */
export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      className="fixed top-14 left-0 z-40 w-64 h-screen pt-4  bg-red  border-r border-black"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <Link to="/">
        <img
          src="https://i.ibb.co/RhnggMH/2.png"
          alt="Logo"
          className="mx-auto w-100 px-4"
        />
      </Link>

      <Navbar />
    </aside>
  );
}

export default Sidebar;

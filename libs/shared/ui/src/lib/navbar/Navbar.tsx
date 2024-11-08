import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon: IconDefinition;
  title: string;
}

interface IconItemProps {
  icon: IconDefinition;
}

/* eslint-disable-next-line */
export interface NavbarProps {}

const NavItem: React.FC<NavItemProps> = ({ icon, title }) => {
  // Convert title to URL-friendly format
  const href = `/${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <li>
      {/* Replace next/link with react-router-dom's Link component */}
      <Link to={href}>
        <button
          className="font-sans flex items-center p-2 py-4 w-full font-light uppercase tracking-normal bg-black text-white hover:text-gray text-sm"
          aria-expanded={true}
        >
          <FontAwesomeIcon icon={icon} className="h-8 w-8 mr-2 text-normal" />
          {title}
        </button>
      </Link>
    </li>
  );
};

const IconItem: React.FC<IconItemProps> = ({ icon }) => {
  return (
    <button className="text-center text-white hover:text-black transition duration-30 hover:mb-1">
      <FontAwesomeIcon icon={icon} className="h-10 w-10" />
    </button>
  );
};

export function Navbar(props: NavbarProps) {
  return (
    <div className="overflow-y-auto py-5 h-full">
      <ul>
        <NavItem title="ISO Standards" icon={faGithubSquare} />
        <NavItem title="EA Frameworks" icon={faGithubSquare} />
        <NavItem title="Methodologies" icon={faGithubSquare} />
        <NavItem title="Principles" icon={faGithubSquare} />
        <NavItem title="Functional Patterns" icon={faGithubSquare} />
      </ul>

      <nav className="flex space-x-2 py-4 justify-center items-center">
        <IconItem icon={faGithubSquare} />
        <IconItem icon={faGithubSquare} />
      </nav>
    </div>
  );
}

export default Navbar;

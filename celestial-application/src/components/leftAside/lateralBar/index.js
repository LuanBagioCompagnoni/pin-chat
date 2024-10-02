import { useAuth } from '@/context/AuthContext';

function LateralBar({ onSelectOptionUsersOrContacts }) {
  const { logout } = useAuth();

  return (
    <nav className="h-screen bg-[#292e3d] flex flex-col w-[4vw]">
      <ul className="h-full flex relative justify-center">
        <li>
          <a href="#" className="flex items-center justify-center p-4 text-gray-500 rounded hover:text-gray-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              ></path>
            </svg>
          </a>
          <li />
          <li>
            <a onClick={() => onSelectOptionUsersOrContacts(true)} className="flex items-center justify-center p-4 text-gray-500 rounded hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                className="bi bi-person-lines-fill w-8 h-8" viewBox="0 0 16 16">
                <path
                  d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
              </svg>
            </a>
          </li>
        </li>
        <li className="bottom-2 absolute">
          <a onClick={logout}
            className="flex items-center justify-center p-4 text-gray-500 rounded hover:text-gray-200 cursor-pointer">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default LateralBar;

import { useAuth } from '@/context/AuthContext';

function LateralBar() {
  const { logout } = useAuth();

  return (
    <nav className="h-screen bg-[#292e3d] flex flex-col w-[4vw]">
      <ul className="h-full flex relative justify-center">
        <li>
          <a href="#" className="flex items-center justify-center p-2 text-gray-500 rounded hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              ></path>
            </svg>
          </a>
        </li>
        <li className="bottom-2 absolute">
          <a onClick={logout} className="flex items-center justify-center p-2 text-gray-500 rounded hover:text-gray-200 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

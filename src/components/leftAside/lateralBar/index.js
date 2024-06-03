function lateralBar(){
  return(
    <nav className='h-screen bg-[#292e3d] flex flex-col w-[4vw]'>
      <ul>
        <li>
          <a href="#" class="flex items-center justify-center p-2 text-gray-500 rounded hover:text-gray-200 ">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default lateralBar;
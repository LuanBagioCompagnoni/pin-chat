import Services from './services'
import SearchInput from '../../basics/searchInput'

function asideChats(){
    return (
        <aside className='h-screen bg-purple-500 flex flex-col w-[22vw]'>
            <SearchInput />
            <Services />
            <Services />
            <Services />
            <Services />
            <Services />
            <Services />
            <Services />
            <Services />
            <Services />
        </aside>
    )
}

export default asideChats;
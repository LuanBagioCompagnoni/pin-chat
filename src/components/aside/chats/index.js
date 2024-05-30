import Services from './service'
import SearchInput from '../../basics/searchInput'

function asideChats(){
    return (
        <aside className='h-screen bg-[#373d4c] flex flex-col w-[22vw]'>
            <SearchInput />
            <div className='grid grid-cols-1 divide-y'>
                <Services />
                <Services />
                <Services />
                <Services />
                <Services />
                <Services />
                <Services />
                <Services />
                <Services />
            </div>
        </aside>
    )
}

export default asideChats;
import SearchInputSkeleton from '@/components/basics/searchInput/searchInputSkeleton';

import ContactItemSkeleton from './contactItemSkeleton'

export default function contactsBarSkeleton() {
  return (
    <div className="overflow-y-hidden">
      <SearchInputSkeleton />
      {Array.from({length: 20}).map((_, index) => (
        <ContactItemSkeleton key={index}/>
      ))}
    </div>
  )
}


        

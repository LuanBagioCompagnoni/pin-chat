import SearchInputSkeleton from '@/pages/chat/components/contactsBar/components/searchInputSkeleton';

import ContactItemSkeleton from './itemSkeleton'

export default function barSkeleton() {
  return (
    <div className="overflow-y-hidden">
      <SearchInputSkeleton />
      {Array.from({length: 20}).map((_, index) => (
        <ContactItemSkeleton key={index}/>
      ))}
    </div>
  )
}




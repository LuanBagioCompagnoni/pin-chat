interface ContactsContainerProps {
    children: React.ReactNode;
}

export default function ContactsContainer({ children }: ContactsContainerProps) {
  return (
    <div
      className="grid grid-cols-1 w-full h-full overflow-y-auto scrollbar-custom justify-items-center content-start">
      {children}
    </div>
  )
}
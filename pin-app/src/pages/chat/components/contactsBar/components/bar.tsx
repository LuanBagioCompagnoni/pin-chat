interface sideContactsColumnProps {
    className?: string;
    children: React.ReactNode;
}

export default function bar({className, children}: sideContactsColumnProps) {
  return (
    <aside className={`${className} flex-col h-screen bg-[#FCFCFC] border-2 border-[#E8E8E8]`}>
      {children}
    </aside>
  )

}

const PageLayout = ({ children }) => (
  <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-top items-center justify-center flex flex-col brightness-90">
    {children}
  </div>
);

export default PageLayout;

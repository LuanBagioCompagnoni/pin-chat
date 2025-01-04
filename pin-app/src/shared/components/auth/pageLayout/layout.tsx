import React from 'react';

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <div
    style={{
      backgroundImage: 'url(/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    className="w-full h-full flex flex-col items-center justify-center brightness-90"
  >
    {children}
  </div>
);

export default PageLayout;

// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
// --> CAUSA PROBABLE DEL ERROR: Asegúrate de que esta línea de importación exista.
import ScrollToTopButton from './ScrollToTopButton'; 

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
      {/* Si el import de arriba falta, esta línea causará un error. */}
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
import React from 'react';

function Footer() {
  return (
    <footer className="text-light py-4" style={{ backgroundColor: "#99cc33" }}>
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Café Humanitas. Todos los derechos reservados.</p>
        <p className="mb-0">
          Desarrollado con ❤️ usando React y Bootstrap.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
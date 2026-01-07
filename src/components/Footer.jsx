import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-12 border-t border-brand-pink/10">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-600 font-medium font-serif">
                    &copy; 2026 Isa Crochet. Todos los derechos reservados.
                </p>
                <p className="text-gray-400 text-sm mt-2 font-light">
                    Diseñado y Desarrollado por{' '}
                    <a
                        href="https://www.linkedin.com/in/angel-mu%C3%B1oz-582b10301/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-pink transition-colors font-medium"
                    >
                        Ángel Muñoz
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;

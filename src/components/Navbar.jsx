import React from 'react';
import { ShoppingCart, Menu, Search } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* 1. Logo / Nombre de la Marca */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer">
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tighter">
                            ISA<span className="text-pink-600">CROCHET</span>
                        </h1>
                    </div>

                    {/* 2. Links de Navegación (Escritorio) */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition">Inicio</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition">Catálogo</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition">Nosotros</a>
                    </div>

                    {/* 3. Iconos de Acción (Carrito, Búsqueda) */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-blue-600 transition">
                            <Search className="h-6 w-6" />
                        </button>

                        <button className="relative text-gray-600 hover:text-blue-600 transition">
                            <ShoppingCart className="h-6 w-6" />
                            {/* Badge del contador del carrito */}
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                0
                            </span>
                        </button>

                        {/* Menú Hamburgesa (Solo visible en Móvil) */}
                        <button className="md:hidden text-gray-600">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
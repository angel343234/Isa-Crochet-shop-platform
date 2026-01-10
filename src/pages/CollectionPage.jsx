import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 'rubros',
        name: 'Ramos',
        description: 'Hermosos ramos de flores tejidas a mano.',
        image: '/images/ramo-tulipanes.jpg', // Placeholder, verify if exists or use a generic one if needed
        link: '/catalogo?cat=ramos'
    },
    {
        id: 'flores',
        name: 'Flores Individuales',
        description: 'Detalles únicos para regalar o decorar.',
        image: '/images/tulipan-rosa.jpg', // Placeholder
        link: '/catalogo?cat=flores'
    },
    {
        id: 'macetas',
        name: 'Macetas',
        description: 'Encantadoras macetas con tus flores favoritas.',
        image: '/images/maceta-girasol.jpg', // Placeholder
        link: '/catalogo?cat=macetas'
    },
    {
        id: 'especiales',
        name: 'Ediciones Especiales',
        description: 'Creaciones únicas para momentos inolvidables.',
        image: '/images/ramo-buchon.jpg', // Placeholder
        link: '/catalogo?cat=especiales'
    }
];

const CollectionPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-brand-pink/10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="relative max-w-7xl mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                        Nuestra Colección
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Explora nuestras categorías y encuentra el detalle perfecto tejido con amor.
                    </p>
                </div>
                {/* Decorative background elements could go here */}
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.link}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3] flex items-end"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            // Fallback color if image fails
                            >
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                                    {category.name}
                                </h2>
                                <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
                                    {category.description}
                                </p>
                                <div className="flex items-center text-white font-medium text-sm tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    VER PRODUCTOS <ArrowRight size={16} className="ml-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;

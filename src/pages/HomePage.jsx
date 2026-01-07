import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
    const categories = [
        { id: 1, title: 'Ramos Eternos', image: '/images/mixed-bouquet.jpg', link: '/catalogo?cat=ramos' },
        { id: 2, title: 'Ramos Especiales', image: '/images/red-roses.jpg', link: '/catalogo?cat=ramos' },
        { id: 3, title: 'Decoración', image: '/images/colorful-tulips.jpg', link: '/catalogo?cat=decoracion' },
        { id: 4, title: 'Regalos', image: '/images/tulips-macro.jpg', link: '/catalogo?cat=regalos' },
    ];

    return (
        <div className="font-sans">

            <div className="relative h-[80vh] w-full bg-stone-100 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/hero-bg.png"
                        alt="Hero Crochet"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-4 drop-shadow-md">
                        Arte en Hilo
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
                        Flores Que Perduran
                    </h1>
                    <Link
                        to="/catalogo"
                        className="bg-white text-gray-900 px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-brand-pink hover:text-white transition duration-300"
                    >
                        Ver Colección
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center py-20 px-6">
                <h3 className="text-brand-pink font-serif italic text-2xl mb-4">Bienvenidos a Isa Crochet</h3>
                <p className="text-gray-600 leading-relaxed text-lg font-light">
                    Creamos piezas únicas tejidas a mano con amor y dedicación.
                    Desde flores eternas que nunca se marchitan hasta pequeños compañeros de hilo,
                    cada creación cuenta una historia especial pensada para ti.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-20">
                <h2 className="text-center font-serif text-3xl text-gray-800 mb-12 relative inline-block w-full">
                    <span className="relative z-10 bg-gray-50 px-6">EXPLORA POR CATEGORÍA</span>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -z-0"></div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link to={cat.link} key={cat.id} className="group relative overflow-hidden h-96 cursor-pointer">
                            <div className="absolute inset-0 bg-gray-200">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>

                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <span className="bg-white text-gray-900 px-6 py-3 uppercase text-xs font-bold tracking-widest group-hover:bg-brand-pink group-hover:text-white transition duration-300">
                                    {cat.title}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bg-stone-50 py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <img
                            src="/images/purple-buds.jpg"
                            alt="Colección Especial"
                            className="w-full h-[500px] object-cover shadow-xl"
                        />
                    </div>
                    <div className="order-1 md:order-2 text-center md:text-left">
                        <span className="text-brand-pink font-bold tracking-widest text-xs uppercase mb-2 block">Tendencia</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Colección Girasoles</h2>
                        <p className="text-gray-600 font-light mb-8 max-w-md mx-auto md:mx-0">
                            Regala luz y alegría. Nuestros girasoles de crochet son el detalle perfecto para iluminar cualquier espacio y sacar una sonrisa eterna.
                        </p>
                        <Link to="/catalogo" className="inline-flex items-center gap-2 text-brand-pink border-b border-brand-pink pb-1 hover:text-brand-dark transition uppercase text-xs font-bold tracking-widest">
                            Comprar Ahora <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;

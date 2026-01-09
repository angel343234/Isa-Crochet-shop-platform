import React from 'react';
import { Heart, Sparkles, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <div className="relative bg-pink-50 py-20 px-4 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-300 blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-pink-400 blur-3xl"></div>
                </div>

                <h1 className="relative text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                    Sobre <span className="text-pink-600">Isa Crochet</span>
                </h1>
                <p className="relative text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Tejiendo sueños y creando momentos especiales con cada puntada.
                </p>
            </div>

            {/* Historia Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-pink-100 rounded-2xl transform rotate-2"></div>
                        <img
                            src="/images/logo-new.png"
                            alt="Nuestra Historia"
                            className="relative rounded-xl shadow-lg w-full h-96 object-contain bg-white p-4"
                        />
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                        <Sparkles className="text-pink-500" /> Nuestra Historia
                    </h2>
                    <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                        Isa Crochet nació del amor por lo hecho a mano y la belleza de los detalles. Lo que comenzó como un pasatiempo se convirtió en una pasión por crear piezas únicas que transmitan calidez y alegría.
                    </p>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Cada flor, cada amigurumi y cada tejido está hecho con dedicación absoluta, seleccionando los mejores materiales para asegurar que cada creación no solo sea hermosa, sino también duradera y especial.
                    </p>
                    <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
                        <p className="italic text-gray-700 font-medium">
                            "No es solo tejido, es amor convertido en arte."
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Lo Que Nos Define</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition duration-300 border border-transparent hover:border-pink-100">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Hecho con Amor</h3>
                            <p className="text-gray-600">
                                Cada pieza es única y tejida a mano con total dedicación, asegurando que recibas algo realmente especial.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition duration-300 border border-transparent hover:border-pink-100">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Calidad Premium</h3>
                            <p className="text-gray-600">
                                Utilizamos hilos y materiales de la mejor calidad para que tus tejidos mantengan su belleza por años.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition duration-300 border border-transparent hover:border-pink-100">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
                                <Coffee size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Diseños Únicos</h3>
                            <p className="text-gray-600">
                                Creamos diseños originales y personalizados que se adaptan a tus gustos y ocasiones especiales.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-pink-600 py-16 text-center text-white px-4">
                <h2 className="text-3xl font-bold mb-4">¡Encuentra el regalo perfecto!</h2>
                <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                    Explora nuestra colección y enamórate de nuestros tejidos hechos a mano.
                </p>
                <Link
                    to="/catalogo"
                    className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
                >
                    Ver Catálogo
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;

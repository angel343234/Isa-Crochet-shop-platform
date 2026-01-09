import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const categoryParam = searchParams.get('cat') || 'all';

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'ramos', label: 'Ramos' },
        { id: 'decoracion', label: 'Decoración' },
        { id: 'regalos', label: 'Regalos' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase.from('products').select('*');
                if (error) console.error('Error:', error);
                else setProducts(data);
            } catch (err) { console.error('Error de red:', err); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryParam === 'all' || (product.category && product.category.toLowerCase().includes(categoryParam.toLowerCase()));
        return matchesSearch && matchesCategory;
    });

    const handleCategoryChange = (catId) => {
        setSearchParams({ cat: catId });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestros Tejidos 🧶</h2>

            {/* Barra de Búsqueda y Filtros */}
            <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">

                {/* Categorías */}
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${categoryParam === cat.id
                                    ? 'bg-pink-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Buscador */}
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Buscar flores, amigurumis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-pink-500 outline-none shadow-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20"><p className="text-gray-500 animate-pulse">Cargando catálogo...</p></div>
            ) : (
                <>
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-lg">No encontramos productos con esa búsqueda 😢</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSearchParams({ cat: 'all' }); }}
                                className="mt-4 text-pink-600 font-bold hover:underline"
                            >
                                Ver todos los productos
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                    <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center relative group">
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (<span className="text-gray-400">Sin foto</span>)}

                                        {product.category && (
                                            <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-600 uppercase tracking-widest shadow-sm">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-pink-600 font-bold text-xl">${product.price}</span>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-pink-600 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-700 transition font-medium active:scale-95 shadow-md hover:shadow-lg"
                                            >
                                                Agregar 🛒
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CatalogPage;
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Nuestros Tejidos 🧶</h2>

            {loading ? (
                <div className="text-center py-20"><p className="text-gray-500 animate-pulse">Cargando catálogo...</p></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                ) : (<span className="text-gray-400">Sin foto</span>)}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{product.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-pink-600 font-bold text-lg">${product.price}</span>


                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 transition font-medium active:scale-95"
                                    >
                                        Agregar +
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;
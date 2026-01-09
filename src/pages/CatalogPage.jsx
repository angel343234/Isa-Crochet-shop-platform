import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

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
        const filteredProducts = products.filter(product => {
            if (product.publicado === false) return false;

            const normalizedCategory = product.categoria ? product.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
            if (normalizedCategory.includes('galeria')) return false;

            const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryParam === 'all' || (product.categoria && product.categoria.toLowerCase().includes(categoryParam.toLowerCase()));
            return matchesSearch && matchesCategory;
        });

        const handleCategoryChange = (catId) => {
            setSearchParams({ cat: catId });
        };

        const openProductModal = (product) => {
            setSelectedProduct(product);
            setSelectedProduct(product);
            const variations = product.variaciones ? product.variaciones.split(',').map(v => v.trim()) : [];
            setSelectedVariation(variations.length > 0 ? variations[0] : null);
            setActiveImage(product.imagen_portada);
        };

        const closeProductModal = () => {
            setSelectedProduct(null);
            setSelectedVariation(null);
            setActiveImage(null);
        };

        const handleAddToCartFromModal = () => {
            if (selectedProduct) {
                addToCart(selectedProduct, selectedVariation);
                closeProductModal();
            }
        };

        const formatText = (str) => {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestros Tejidos</h2>

                <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">

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
                                <p className="text-gray-500 text-lg">No encontramos productos con esa búsqueda</p>
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
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer group"
                                        onClick={() => openProductModal(product)}
                                    >
                                        <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center relative">
                                            {product.imagen_portada ? (
                                                <img src={product.imagen_portada} alt={product.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (<span className="text-gray-400">Sin foto</span>)}

                                            {product.categoria && (
                                                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-600 tracking-widest shadow-sm">
                                                    {formatText(product.categoria)}
                                                </span>
                                            )}


                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full font-medium text-sm shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">Ver Detalles</span>
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-1">{formatText(product.nombre)}</h3>
                                            <div className="flex justify-between items-center mt-auto pt-2">
                                                <span className="text-pink-600 font-bold text-xl">${product.precio}</span>
                                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Ver opciones</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeProductModal}>
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                            <button onClick={closeProductModal} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 z-10 transition">
                                <Search className="rotate-45" size={24} />
                            </button>

                            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col">
                                <div className="flex-grow relative h-64 md:h-auto overflow-hidden">
                                    {activeImage ? (
                                        <img src={activeImage} alt={selectedProduct.nombre} className="w-full h-full object-cover transition-all duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Imagen</div>
                                    )}
                                </div>

                                <div className="flex gap-2 p-4 overflow-x-auto">
                                    {[
                                        selectedProduct.imagen_portada,
                                        selectedProduct.imagen_extra_1,
                                        selectedProduct.imagen_extra_2,
                                        selectedProduct.imagen_extra_3,
                                        selectedProduct.imagen_extra_4,
                                        selectedProduct.imagen_extra_5
                                    ].filter(Boolean).map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(img)}
                                            className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImage === img ? 'border-pink-600 ring-2 ring-pink-200' : 'border-transparent hover:border-gray-300'}`}
                                        >
                                            <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col">
                                <span className="text-sm font-bold text-pink-500 tracking-widest mb-2">{formatText(selectedProduct.categoria)}</span>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">{formatText(selectedProduct.nombre)}</h2>
                                <p className="text-3xl font-light text-gray-600 mb-6">${selectedProduct.precio}</p>

                                <p className="text-gray-600 leading-relaxed mb-8 border-b pb-6">
                                    {selectedProduct.descripcion}
                                </p>

                                {selectedProduct.variaciones && (
                                    <div className="mb-8">
                                        <h4 className="text-sm font-bold text-gray-900 uppercase mb-3">Elige una opción:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProduct.variaciones.split(',').map(v => v.trim()).map((variant) => (
                                                <button
                                                    key={variant}
                                                    onClick={() => setSelectedVariation(variant)}
                                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedVariation === variant
                                                        ? 'border-pink-600 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-600'
                                                        : 'border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600'
                                                        }`}
                                                >
                                                    {variant}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto">
                                    <button
                                        onClick={handleAddToCartFromModal}
                                        className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-700 transform hover:scale-[1.02] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <span>Agregar al carrito</span>
                                        {selectedVariation && <span className="font-normal opacity-90">({selectedVariation})</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default CatalogPage;
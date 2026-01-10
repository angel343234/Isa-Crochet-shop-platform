import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [quantityToAdd, setQuantityToAdd] = useState(1);
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
                const [productsResponse, variantsResponse] = await Promise.all([
                    supabase.from('products').select('*'),
                    supabase.from('product_variants').select('*')
                ]);

                if (productsResponse.error) console.error('Error fetching products:', productsResponse.error);
                if (variantsResponse.error) console.error('Error fetching variants:', variantsResponse.error);

                const productsData = productsResponse.data || [];
                const variantsData = variantsResponse.data || [];

                // Merge variants into products
                const productsWithVariants = productsData.map(product => ({
                    ...product,
                    variants_data: variantsData.filter(v => v.product_sku === product.sku)
                }));

                setProducts(productsWithVariants);
            } catch (err) { console.error('Error de red:', err); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, []);

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
        const variations = product.variaciones ? product.variaciones.split(',').map(v => v.trim()) : [];
        setSelectedVariation(variations.length > 0 ? variations[0] : null);
        setActiveImage(product.imagen_portada);
        setQuantityToAdd(1);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
        setSelectedVariation(null);
        setActiveImage(null);
    };

    const handleAddToCartFromModal = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, selectedVariation, quantityToAdd);
            closeProductModal();
        }
    };

    const formatText = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // --- LOGIC FOR CAROUSELS/GRID CONDITIONAL VIEW ---

    // 1. Determine if we are in "Filtering Mode" (Search or specific Category selected)
    const [selectedCategory, setSelectedCategory] = useState('todos'); // Internal state for the quick filter bar if needed, or sync with URL

    // Sync URL cat param with internal state if needed, or just use URL
    // Actually, the UI uses `selectedCategory` state in the buttons logic below. 
    // Let's make sure it works with the URL param too.
    useEffect(() => {
        if (categoryParam && categoryParam !== 'all') {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory('todos');
        }
    }, [categoryParam]);

    const isFiltered = searchTerm !== '' || (selectedCategory !== 'todos' && selectedCategory !== 'all');

    const simpleStockProducts = products;

    const bestSellers = products.slice(0, 6);

    const categoriesFound = [...new Set(products.map(p => {
        if (!p.categoria) return null;
        return p.categoria.trim().charAt(0).toUpperCase() + p.categoria.trim().slice(1).toLowerCase();
    }).filter(Boolean))].sort();

    const ProductCarousel = ({ title, items }) => {
        if (!items || items.length === 0) return null;

        const scrollContainerRef = useRef(null);
        const isScrollable = items.length > 4;

        const infiniteItems = isScrollable ? [...items, ...items, ...items, ...items, ...items] : items;

        useEffect(() => {
            if (isScrollable && scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const singleSetWidth = container.scrollWidth / 5;
                container.scrollLeft = singleSetWidth * 2;
            }
        }, [items, isScrollable]);

        const handleScroll = () => {
            if (!isScrollable || !scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const { scrollLeft, scrollWidth } = container;
            const singleSetWidth = scrollWidth / 5;

            if (scrollLeft < singleSetWidth) {
                container.scrollLeft += singleSetWidth * 2;
            }
            else if (scrollLeft > singleSetWidth * 4) {
                container.scrollLeft -= singleSetWidth * 2;
            }
        };

        const scroll = (direction) => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const scrollAmount = container.clientWidth / 2;

                container.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        };

        return (
            <div className="mb-16 relative group/carousel">
                <div className="flex justify-between items-end mb-8 px-4">
                    <h3 className="text-3xl font-black text-gray-800 relative inline-block tracking-tight">
                        {title}
                        <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-pink-500 rounded-full"></span>
                    </h3>
                </div>

                <div className="relative">
                    {isScrollable && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-110 transition-all duration-300 border border-pink-100 -ml-5 opacity-0 group-hover/carousel:opacity-100 flex items-center justify-center"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={28} strokeWidth={2.5} />
                        </button>
                    )}

                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className={`flex overflow-x-auto gap-4 px-4 pt-12 pb-12 hide-scrollbar ${isScrollable ? '' : 'justify-center'}`}
                        style={{ scrollSnapType: isScrollable ? 'x mandatory' : 'none' }}
                    >
                        {infiniteItems.map((product, index) => {
                            const uniqueKey = isScrollable ? `${product.id}-${index}` : product.id;

                            let isTotallyOutOfStock = false;
                            if (product.variants_data && product.variants_data.length > 0) {
                                isTotallyOutOfStock = product.variants_data.every(v => v.stock <= 0);
                            } else if (product.existencias !== undefined && product.existencias !== null) {
                                isTotallyOutOfStock = product.existencias <= 0;
                            }

                            return (
                                <div
                                    key={uniqueKey}
                                    className={`flex-shrink-0 ${isScrollable ? 'snap-start' : ''} w-[85vw] md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)]`}
                                >
                                    <div className="mx-auto h-full">
                                        <div
                                            className={`bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group/card h-full flex flex-col ${isTotallyOutOfStock ? 'opacity-80' : 'hover:-translate-y-2'}`}
                                            onClick={() => openProductModal(product)}
                                        >
                                            <div className="relative aspect-[4/5] overflow-hidden">
                                                {isTotallyOutOfStock && (
                                                    <div className="absolute inset-0 z-20 bg-gray-900/50 flex items-center justify-center backdrop-blur-[2px]">
                                                        <span className="bg-black/80 text-white border-2 border-white/30 px-8 py-3 rounded-xl font-black text-2xl tracking-[0.2em] uppercase transform -rotate-12 shadow-2xl skew-x-[-10deg]">
                                                            Agotado
                                                        </span>
                                                    </div>
                                                )}

                                                {product.imagen_portada ? (
                                                    <img
                                                        src={product.imagen_portada}
                                                        alt={product.nombre}
                                                        className={`w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 ${isTotallyOutOfStock ? 'grayscale contrast-125' : ''}`}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Sin foto</div>
                                                )}

                                                <div className="absolute top-4 right-4 z-10 translate-x-12 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-300 delay-100">
                                                    <button className="bg-white p-3 rounded-full shadow-lg text-pink-600 hover:bg-pink-50 hover:text-pink-700">
                                                        <Search size={20} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="p-6 flex-grow flex flex-col">
                                                <div className="mb-2">
                                                    <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-widest rounded-full">{formatText(product.categoria)}</span>
                                                </div>
                                                <h3 className={`text-xl font-bold text-gray-900 mb-3 leading-tight ${isTotallyOutOfStock ? 'text-gray-500 line-through' : ''}`}>{formatText(product.nombre)}</h3>
                                                <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Precio</span>
                                                        <span className={`font-black text-2xl ${isTotallyOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>${product.precio}</span>
                                                    </div>
                                                    {!isTotallyOutOfStock && (
                                                        <span className="text-sm font-bold text-pink-600 group-hover/card:underline cursor-pointer flex items-center gap-1">
                                                            Ver <ChevronRight size={16} />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {isScrollable && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-110 transition-all duration-300 border border-pink-100 -mr-5 opacity-0 group-hover/carousel:opacity-100 flex items-center justify-center"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={28} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-28">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">
                            Tienda <span className="text-pink-600">Isa Crochet</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Encuentra el regalo tejido perfecto</p>
                    </div>

                    <div className="w-full md:w-auto relative">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-2 p-4 mb-8 hide-scrollbar">
                    {['Todos', ...categoriesFound].map((catLabel) => {
                        const catId = catLabel === 'Todos' ? 'todos' : catLabel;
                        const isSelected = selectedCategory.toLowerCase() === catId.toLowerCase() || (selectedCategory === 'all' && catId === 'todos');

                        return (
                            <button
                                key={catLabel}
                                onClick={() => handleCategoryChange(catId)}
                                className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${isSelected
                                    ? 'bg-pink-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {formatText(catLabel)}
                            </button>
                        )
                    })}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
                    </div>
                ) : (
                    <>
                        {!isFiltered ? (
                            <div className="space-y-4">
                                <ProductCarousel title="Más Vendidos" items={bestSellers} />
                                {categoriesFound.map(catName => (
                                    <ProductCarousel
                                        key={catName}
                                        title={formatText(catName)}
                                        items={simpleStockProducts.filter(p => p.categoria === catName)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>
                                {filteredProducts.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-xl text-gray-500">No se encontraron productos.</p>
                                    </div>
                                ) : (
                                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                        {filteredProducts.map((product) => {
                                            let isTotallyOutOfStock = false;
                                            if (product.variants_data && product.variants_data.length > 0) {
                                                isTotallyOutOfStock = product.variants_data.every(v => v.stock <= 0);
                                            } else if (product.existencias !== undefined && product.existencias !== null) {
                                                isTotallyOutOfStock = product.existencias <= 0;
                                            }

                                            return (
                                                <div
                                                    key={product.id}
                                                    className={`break-inside-avoid bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group mb-6 block ${isTotallyOutOfStock ? 'opacity-75' : 'hover:-translate-y-1'
                                                        }`}
                                                    onClick={() => openProductModal(product)}
                                                >
                                                    <div className="relative">
                                                        {isTotallyOutOfStock && (
                                                            <div className="absolute inset-0 z-20 bg-gray-900/40 flex items-center justify-center backdrop-blur-[1px]">
                                                                <span className="bg-black/70 text-white border-2 border-white/50 px-6 py-2 rounded-lg font-bold text-xl tracking-widest uppercase transform -rotate-12 shadow-2xl">
                                                                    Agotado
                                                                </span>
                                                            </div>
                                                        )}

                                                        {product.imagen_portada ? (
                                                            <img
                                                                src={product.imagen_portada}
                                                                alt={product.nombre}
                                                                className={`w-full h-auto object-cover ${isTotallyOutOfStock ? 'grayscale opacity-60' : ''}`}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">Sin foto</div>
                                                        )}

                                                        {product.categoria && (
                                                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 tracking-wider shadow-sm border border-gray-100 z-10">
                                                                {formatText(product.categoria)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="p-5">
                                                        <h3 className={`text-lg font-bold mb-2 leading-tight ${isTotallyOutOfStock ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{formatText(product.nombre)}</h3>
                                                        <div className="flex justify-between items-end">
                                                            <span className={`font-bold text-xl ${isTotallyOutOfStock ? 'text-gray-400' : 'text-pink-600'}`}>${product.precio}</span>
                                                            {!isTotallyOutOfStock && (
                                                                <span className="text-xs text-brand-pink font-semibold uppercase tracking-wider group-hover:underline">Ver detalles</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeProductModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                        <button onClick={closeProductModal} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 z-10 transition">
                            <X className="" size={24} />
                        </button>

                        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col">
                            <div className="flex-grow relative h-64 md:h-[500px] flex items-center justify-center p-4">
                                {activeImage ? (
                                    <img src={activeImage} alt={selectedProduct.nombre} className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Imagen</div>
                                )}
                            </div>

                            <div className="flex gap-2 p-4 pt-0 overflow-x-auto justify-center">
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
                                        {selectedProduct.variaciones.split(',').map(v => v.trim()).map((variant) => {
                                            let isVariantOutOfStock = false;
                                            if (selectedProduct.variants_data && selectedProduct.variants_data.length > 0) {
                                                const variantData = selectedProduct.variants_data.find(v => v.variation_name === variant);
                                                if (variantData) {
                                                    isVariantOutOfStock = variantData.stock <= 0;
                                                } else if (selectedProduct.existencias <= 0) {
                                                    isVariantOutOfStock = true;
                                                }
                                            } else if (selectedProduct.variant_stock && selectedProduct.variant_stock[variant] !== undefined) {
                                                isVariantOutOfStock = selectedProduct.variant_stock[variant] <= 0;
                                            } else if (selectedProduct.existencias !== undefined && selectedProduct.existencias !== null) {
                                                if (selectedProduct.existencias <= 0) isVariantOutOfStock = true;
                                            }

                                            return (
                                                <button
                                                    key={variant}
                                                    onClick={() => !isVariantOutOfStock && (setSelectedVariation(variant), setQuantityToAdd(1))}
                                                    disabled={isVariantOutOfStock}
                                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all relative
                                                    ${selectedVariation === variant
                                                            ? 'border-pink-600 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-600'
                                                            : isVariantOutOfStock
                                                                ? 'border-gray-100 text-gray-400 bg-gray-50 cursor-not-allowed opacity-60 decoration-slice line-through'
                                                                : 'border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600'
                                                        }`}
                                                >
                                                    {variant}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {(() => {
                                const { cart } = useCart();
                                let currentStock = Infinity;
                                let isTracked = false;

                                if (selectedVariation && selectedProduct.variants_data && selectedProduct.variants_data.length > 0) {
                                    const variantData = selectedProduct.variants_data.find(v => v.variation_name === selectedVariation);
                                    if (variantData) {
                                        currentStock = variantData.stock;
                                        isTracked = true;
                                    }
                                }
                                else if (selectedVariation && selectedProduct.variant_stock && selectedProduct.variant_stock[selectedVariation] !== undefined) {
                                    currentStock = selectedProduct.variant_stock[selectedVariation];
                                    isTracked = true;
                                }
                                else if (selectedProduct.existencias !== undefined && selectedProduct.existencias !== null) {
                                    currentStock = selectedProduct.existencias;
                                    isTracked = true;
                                }

                                const cartItem = cart.find(item => item.id === selectedProduct.id && item.selectedVariation === selectedVariation);
                                const quantityInCart = cartItem ? cartItem.quantity : 0;
                                const availableToSelect = Math.max(0, currentStock - quantityInCart);
                                const isOutOfStock = isTracked && currentStock <= 0;
                                const isMaxReached = isTracked && (quantityInCart >= currentStock);

                                const incrementQuantity = () => {
                                    if (!isTracked || quantityToAdd < availableToSelect) {
                                        setQuantityToAdd(prev => prev + 1);
                                    }
                                };

                                const decrementQuantity = () => {
                                    if (quantityToAdd > 1) {
                                        setQuantityToAdd(prev => prev - 1);
                                    }
                                };

                                return (
                                    <>
                                        <div className="mb-6 flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                {isOutOfStock ? (
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">Agotado</span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                                                        Disponible
                                                    </span>
                                                )}
                                            </div>

                                            {!isOutOfStock && !isMaxReached && (
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-700 font-medium text-sm">Cantidad:</span>
                                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={decrementQuantity}
                                                            disabled={quantityToAdd <= 1}
                                                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 transition border-r"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-4 py-2 text-gray-800 font-bold min-w-[40px] text-center bg-white">
                                                            {quantityToAdd}
                                                        </span>
                                                        <button
                                                            onClick={incrementQuantity}
                                                            disabled={isTracked && quantityToAdd >= availableToSelect}
                                                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 transition border-l"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {isTracked && quantityToAdd >= availableToSelect && (
                                                        <span className="text-xs text-orange-500 font-medium">Max. disponible</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-auto">
                                            <button
                                                onClick={handleAddToCartFromModal}
                                                disabled={isOutOfStock || isMaxReached}
                                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2
                                                ${isOutOfStock || isMaxReached
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-pink-600 text-white hover:bg-pink-700 transform hover:scale-[1.02] active:scale-95'
                                                    }`}
                                            >
                                                {isOutOfStock ? (
                                                    <span>Agotado</span>
                                                ) : isMaxReached ? (
                                                    <span>Máximo disponible en carrito</span>
                                                ) : (
                                                    <>
                                                        <span>Agregar al carrito</span>
                                                        {selectedVariation && <span className="font-normal opacity-90">({selectedVariation})</span>}
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CatalogPage;
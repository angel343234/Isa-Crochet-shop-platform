import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const GalleryPage = () => {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchGalleryProducts = async () => {
            try {
                // Fetch relevant fields to filter client-side for robust accent/case handling
                // Fetch all columns to avoid typos in column names
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) {
                    console.error('Error fetching gallery items:', error);
                } else if (data) {
                    // Filter for 'galeria' (ignoring case and accents)
                    // e.g. 'Galería', 'GALERIA', 'galeria', 'Ramos, Galeria' -> all match 'galeria'
                    const galleryProducts = data.filter(item => {
                        if (!item.categoria) return false;
                        const normalized = item.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        return normalized.includes('galeria');
                    });

                    // Map DB items to gallery format
                    // Map DB items to gallery format - No span needed for Masonry
                    const dbItems = galleryProducts.map(item => ({
                        id: `db-${item.id}`,
                        src: item.imagen_portada,
                        alt: item.nombre
                    }));

                    setGalleryItems(dbItems);
                }
            } catch (err) {
                console.error('Network error:', err);
            }
        };

        fetchGalleryProducts();
    }, []);

    const formatText = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <span className="text-brand-pink tracking-widest text-xs uppercase font-bold">Nuestro Trabajo</span>
                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 mb-6">Galería de Momentos</h1>
                <p className="max-w-2xl mx-auto text-gray-500 font-light">
                    Cada puntada cuenta una historia. Aquí puedes ver algunas de nuestras creaciones más queridas,
                    hechas a mano con amor y dedicación.
                </p>
            </div>

            {/* Masonry Layout using CSS Columns */}
            <div className="columns-1 md:columns-3 gap-4 space-y-4">
                {galleryItems.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative rounded-lg overflow-hidden group break-inside-avoid mb-4"
                    >
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white font-serif text-lg">{formatText(photo.alt)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;

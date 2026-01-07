import React from 'react';

const GalleryPage = () => {
    const photos = [
        { id: 1, src: '/images/mixed-bouquet.jpg', alt: 'Mix de Flores', span: 'row-span-2' },
        { id: 2, src: '/images/purple-buds.jpg', alt: 'Detalles en Lila', span: 'col-span-1' },
        { id: 3, src: '/images/red-roses.jpg', alt: 'Rosas Rojas', span: 'row-span-1' },
        { id: 4, src: '/images/colorful-tulips.jpg', alt: 'Tulipanes de Colores', span: 'row-span-2' },
        { id: 5, src: '/images/tulips-macro.jpg', alt: 'Texturas Suaves', span: 'col-span-1' },
        { id: 6, src: '/images/gallery-sunflowers.jpg', alt: 'Girasoles Radiantes', span: 'row-span-1' },
        { id: 7, src: '/images/lily-tulip-bouquet.jpg', alt: 'Ramo de Lirios', span: 'col-span-1 md:col-span-2' },
        { id: 8, src: '/images/blue-purple-bouquet.jpg', alt: 'Tonos Fríos', span: 'col-span-1' },
        { id: 9, src: '/images/lily-rose-closeup.jpg', alt: 'Detalle Rosa y Lirio', span: 'row-span-1' },
        { id: 10, src: '/images/yarn-tulips.jpg', alt: 'Proceso Creativo', span: 'col-span-1' },
    ];

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className={`relative rounded-lg overflow-hidden group ${photo.span} ${index % 3 === 0 ? 'md:row-span-2' : ''}`}
                    >
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white font-serif text-lg">{photo.alt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;

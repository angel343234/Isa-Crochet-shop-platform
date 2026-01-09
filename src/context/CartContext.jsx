import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, variation = null) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id && item.selectedVariation === variation);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id && item.selectedVariation === variation
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1, selectedVariation: variation }];
        });
    };

    // NUEVO: Eliminar un producto (considerando variación)
    const removeFromCart = (productId, variation = null) => {
        setCart((prevCart) => prevCart.filter(item => !(item.id === productId && item.selectedVariation === variation)));
    };

    // NUEVO: Limpiar carrito al finalizar compra
    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
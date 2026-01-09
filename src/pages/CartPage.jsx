import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [finalTotal, setFinalTotal] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, phone: value }));
    };

    const handlePreSubmit = (e) => {
        e.preventDefault();

        const cleanPhone = formData.phone.replace(/\D/g, '');

        if (cleanPhone.length !== 10) {
            alert("El número de teléfono debe tener 10 dígitos exactamente.");
            return;
        }

        setShowModal(true);
    };

    const handleConfirmOrder = async () => {
        setLoading(true);

        // Generar ID aleatorio de 6 dígitos
        const generatedId = Math.floor(100000 + Math.random() * 900000);

        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([
                    {
                        id: generatedId,
                        customer_name: formData.name,
                        customer_address: formData.address,
                        customer_phone: formData.phone,
                        total_price: totalPrice,
                        customer_phone: formData.phone,
                        total_price: totalPrice,
                        items: cart.map(item => ({
                            id: item.id,
                            name: item.nombre,
                            price: item.precio,
                            quantity: item.quantity,
                            image_url: item.imagen_portada,
                            selectedVariation: item.selectedVariation
                        })),
                        user_id: user ? user.id : null
                    }
                ])
                .select();

            if (error) throw error;

            if (error) throw error;

            setFinalTotal(totalPrice); // Guardar el total antes de limpiar
            clearCart();
            setShowModal(false);
            if (data && data.length > 0) {
                setOrderId(data[0].id);
            }
            setOrderComplete(true);

        } catch (error) {
            console.error('Error al crear orden:', error);
            console.error('Error al crear orden:', error);
            alert('Error detallado: ' + (error.message || JSON.stringify(error)));
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="max-w-xl mx-auto px-4 py-20 text-center">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-8 rounded-lg inline-block mb-6 w-full shadow-sm">
                    <h2 className="text-3xl font-bold mb-4 text-yellow-700">¡Pedido Pendiente de Pago!</h2>

                    <p className="text-lg mb-2">
                        Tu orden <span className="font-bold">#{orderId}</span> ha sido recibida correctamente.
                    </p>

                    <div className="bg-white p-6 rounded-lg my-6 border border-yellow-100 shadow-sm text-left">
                        <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">Datos para Transferencia</h3>
                        <p className="mb-2"><span className="font-semibold">Banco:</span> BBVA</p>
                        <p className="mb-2"><span className="font-semibold">CLABE:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded select-all">XXXXXXXXXXX</span></p>
                        <p className="text-xl font-bold text-pink-600 mt-4 text-center">Monto: ${finalTotal}</p>
                    </div>

                    <p className="text-sm font-medium">
                        Por favor realiza tu transferencia y envíanos el comprobante por <span className="font-bold text-green-600">WhatsApp</span> o <span className="font-bold text-pink-500">Instagram</span> junto con tu número de orden para procesar tu envío.
                    </p>
                </div>
                <br />
                <Link to="/catalogo" className="text-pink-600 hover:underline font-bold">
                    ← Volver a la tienda
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
                <Link to="/catalogo" className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 relative">

            <div>
                <h2 className="text-2xl font-bold mb-6">Tu Pedido</h2>
                <div className="space-y-4">

                    {cart.map((item, index) => (
                        <div key={`${item.id}-${item.selectedVariation}-${index}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                    {item.imagen_portada ? (
                                        <img src={item.imagen_portada} alt={item.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-500">Sin foto</div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        {item.nombre.charAt(0).toUpperCase() + item.nombre.slice(1).toLowerCase()}
                                    </h3>
                                    {item.selectedVariation && (
                                        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-medium">
                                            {item.selectedVariation}
                                        </span>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">Cantidad: {item.quantity}</p>
                                    <p className="text-pink-600 font-medium">${item.precio * item.quantity}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id, item.selectedVariation)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>


                <div className="mt-6 flex justify-between items-center text-xl font-bold border-t pt-4">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg h-fit">
                <h2 className="text-2xl font-bold mb-6">Datos de Envío</h2>
                <form onSubmit={handlePreSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            required
                            name="name"
                            type="text"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="Ej. María Pérez"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Entrega</label>
                        <textarea
                            required
                            name="address"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-500 outline-none"
                            rows="3"
                            placeholder="Calle, Número, Colonia..."
                            value={formData.address}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (10 dígitos)</label>
                        <input
                            required
                            name="phone"
                            type="tel"
                            maxLength={10}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="4491234567"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Solo números, sin espacios ni guiones.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition mt-4"
                    >
                        Revisar Pedido
                    </button>
                </form>
            </div>

            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirmar Detalle</h3>

                            <div className="space-y-3 mb-6 text-gray-600">
                                <p><strong>Nombre:</strong> {formData.name}</p>
                                <p><strong>Dirección:</strong> {formData.address}</p>
                                <p><strong>Teléfono:</strong> {formData.phone}</p>
                                <div className="border-t pt-2 mt-2">
                                    <p className="font-bold text-lg text-pink-600 flex justify-between">
                                        <span>Total a Pagar:</span>
                                        <span>${totalPrice}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition disabled:opacity-50"
                                >
                                    {loading ? 'Enviando...' : 'Confirmar Compra'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default CartPage;
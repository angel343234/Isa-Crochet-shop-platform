import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Calendar, DollarSign } from 'lucide-react';

const OrdersPage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
            return;
        }

        if (user) {
            fetchOrders();
        }
    }, [user, loading]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setFetching(false);
        }
    };

    if (loading || fetching) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <div className="bg-gray-50 rounded-lg p-12 inline-block">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes pedidos aún</h2>
                    <p className="text-gray-500 mb-6">Parece que no has realizado ninguna compra con tu cuenta.</p>
                    <Link to="/catalogo" className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
                        Explorar Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Package className="text-pink-600" /> Mis Pedidos
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Orden #{order.id}</p>
                                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                    <Calendar size={14} />
                                    {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                                    Pendiente de Pago
                                </span>
                                <p className="text-xl font-bold text-gray-800 flex items-center">
                                    <DollarSign size={18} className="text-gray-400" />
                                    {order.total_price}
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-gray-500 mb-3">Productos:</h3>
                            <div className="space-y-3">
                                {order.items && order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">Cant: {item.quantity} x ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;

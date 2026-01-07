import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            alert('Contraseña actualizada correctamente. Por favor inicia sesión.');
            navigate('/login');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold mb-6">Nueva Contraseña</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="password"
                    placeholder="Escribe tu nueva contraseña"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-2 rounded font-bold"
                    disabled={loading}
                >
                    {loading ? 'Actualizando...' : 'Actualizar'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePasswordPage;

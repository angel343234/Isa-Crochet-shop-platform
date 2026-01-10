import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    // Formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleResetPassword = async (e) => {
        if (e) e.preventDefault();

        if (!email) return alert("Por favor escribe tu correo primero para enviarte el enlace de recuperación.");

        try {
            setLoading(true);
            console.log("Iniciando recuperación para:", email);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/update-password',
            });
            if (error) throw error;
            alert("Te hemos enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada (y spam).");
        } catch (error) {
            console.error("Error recuperación:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;
            if (isSignUp) {
                // REGISTRO
                result = await supabase.auth.signUp({
                    email,
                    password
                });
            } else {
                // LOGIN
                result = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
            }

            if (result.error) throw result.error;

            // Si es registro, a veces pide confirmar email
            if (isSignUp && result.data?.user && !result.data?.session) {
                alert('¡Registro exitoso! Por favor revisa tu correo para confirmar tu cuenta.');
            } else {
                // Login exitoso
                navigate('/catalogo');
            }

        } catch (error) {
            console.error(error);
            alert(error.message || 'Error en autenticación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100">

                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
                        <User className="h-8 w-8 text-pink-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {isSignUp ? 'Crear Cuenta' : 'Bienvenido'}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {isSignUp ? 'Únete a nuestra comunidad de tejidos' : 'Ingresa para ver tus pedidos'}
                    </p>
                </div>

                {/* Botón Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition mb-6"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                    Continuar con Google
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">O con correo</span>
                    </div>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition disabled:opacity-50 transform active:scale-95"
                    >
                        {loading ? 'Procesando...' : (isSignUp ? 'Registrarse' : 'Iniciar Sesión')}
                    </button>
                </form>

                {!isSignUp && (
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="text-sm text-pink-500 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-sm text-gray-600 hover:text-pink-600 font-medium transition"
                    >
                        {isSignUp
                            ? '¿Ya tienes cuenta? Inicia Sesión'
                            : '¿No tienes cuenta? Regístrate gratis'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;

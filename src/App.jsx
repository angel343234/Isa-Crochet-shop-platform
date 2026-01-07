import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Contenido temporal para ver que la Navbar es "sticky" */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a la Tienda</h2>
        <p className="text-gray-600">Aquí irá el Hero Section y los productos destacados.</p>

        {/* Generamos espacio para probar el scroll */}
        <div className="h-[150vh] mt-8">
          <p className="text-gray-400 text-sm">Scroll para probar la barra fija...</p>
        </div>
      </main>
    </div>
  )
}

export default App;

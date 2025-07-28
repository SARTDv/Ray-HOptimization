import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import NeuralNetworkForm from './components/NeuralNetworkForm';

function App() {
  const [mode, setMode] = useState('distribuido');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-black rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hyperparameter Optimization with Ray
              </h1>
              <p className="text-sm text-gray-600">Interfaz para busqueda de hiperparametros y pruebas de modelos de ML</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setMode('distribuido')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  mode === 'distribuido'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Modo Distribuido/Paralelo
              </button>
              <button
                onClick={() => setMode('secuencial')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  mode === 'secuencial'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Modo Secuencial
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content - Now stacked vertically */}
        <div className="space-y-8">
          <NeuralNetworkForm mode={mode}/>
        </div>
      </main>
    </div>
  );
}

export default App;
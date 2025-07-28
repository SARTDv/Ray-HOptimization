import React,  {useState, useEffect } from 'react';
import { Brain, Zap, Activity, Play } from 'lucide-react';
import { normalizeAndPrepareData } from './dataNormalizer'
import api from '../api/axiosConfig';

function NeuralNetworkForm() {
  // Model training state
  const [modelForm, setModelForm] = useState({
    hiddenLayerSize: '',
    activation: 'relu',
    algorithm: 'adam',
    alpha: '',
    maxIterations: ''
  });

  // Prediction state
  const [predictionInputs, setPredictionInputs] = useState([
      { 
        name: "age", 
        value: "", 
        label: "Edad", 
        type: "number",
        min: 18,
        max: 100,
        error: ""
      },
      { 
        name: "gender", 
        value: "", 
        label: "Género", 
        type: "select",
        options: ["Masculino", "Femenino"],
        error: ""
      },
      { 
        name: "education", 
        value: "", 
        label: "Educación", 
        type: "select",
        options: [
          "Deja la escuela antes de los 16", 
          "Deja la escuela despues de los 16", 
          "Deja la escuela a los 17", 
          "Deja la escuela a los 18", 
          "Entra a universidad sin certificado ni titulo",
          "diploma profesional",
          "Título universitario",
          "Máster",
          "Doctorado"
        ],
        error: ""
      },
      { 
        name: "country", 
        value: "", 
        label: "Pais", 
        type: "select",
        options: [
          "Australia", 
          "Canada", 
          "Nueva Zelanda", 
          "República de Irlanda",
          "Reino Unido",
          "EE.UU",
          "Otros"
        ],
        error: ""
      },
      { 
        name: "ethnicity", 
        value: "", 
        label: "Etnia", 
        type: "select",
        options: [
          "Asiático", 
          "Negro", 
          "Mestizo negro/asiático", 
          "Mestizo blanco/asiático",
          "Mestizo blanco/negro",
          "Blanco",
          "Otros"
        ],
        error: ""
      },
      { 
        name: "nscore", 
        value: "", 
        label: "Nscore", 
        type: "number",
        min: 12,
        max: 60,
        error: ""
      },
      { 
        name: "escore", 
        value: "", 
        label: "Escore", 
        type: "number",
        min: 16,
        max: 59,
        error: ""
      },
      { 
        name: "oscore", 
        value: "", 
        label: "Oscore", 
        type: "number",
        min: 24,
        max: 60,
        error: ""
      },
      { 
        name: "ascore", 
        value: "", 
        label: "Ascore", 
        type: "number",
        min: 12,
        max: 60,
        error: ""
      },
      { 
        name: "cscore", 
        value: "", 
        label: "Cscore", 
        type: "number",
        min: 17,
        max: 59,
        error: ""
      },
    ]);

  const [isFormValid, setIsFormValid] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (index, value) => {
    const newInputs = [...predictionInputs];
    const input = newInputs[index];
    
    input.value = value;
    input.error = validateInput(input.name, value);
    
    setPredictionInputs(newInputs);
  };

  const validateInput = (name, value) => {
    const input = predictionInputs.find(input => input.name === name);
    if (!input) return "";
    
    if (input.type === "number") {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return "Debe ser un número válido";
      if (input.min !== undefined && numValue < input.min) return `Mínimo ${input.min}`;
      if (input.max !== undefined && numValue > input.max) return `Máximo ${input.max}`;
    }
    
    return "";
  };

  useEffect(() => {
    const isModelValid = 
      modelForm.hiddenLayerSize && 
      modelForm.activation && 
      modelForm.algorithm && 
      modelForm.alpha && 
      modelForm.maxIterations;
    
    const arePredictionsValid = predictionInputs.every(input => 
      input.value && !input.error
    );
    
    setIsFormValid(isModelValid && arePredictionsValid);
  }, [modelForm, predictionInputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert('Por favor complete todos los campos correctamente antes de enviar');
      return;
    }
    
    setIsProcessing(true);
    
    const formData = {
      model: modelForm,
      prediction: predictionInputs.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {})
    };

    const requestData = normalizeAndPrepareData(formData);
    
    console.log('Datos para enviar:', requestData);
    const endpoint = mode === 'distribuido' ? '/parallel-search' : '/sequential-search';
    api.post(endpoint, requestData)
      .then(response => {
        console.log('Respuesta del servidor:', response);
        setIsProcessing(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsProcessing(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Training Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-black rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Configuración de busqueda</h2>
            <p className="text-gray-600">Define el espacio de busqueda de hiperparametros para el modelo</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Tamaño de Capas Ocultas */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="hiddenLayerSize" className="block text-sm font-medium text-gray-700">
                Arquitecturas de Capas Ocultas
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const newArchitecture = prompt("Agregar nueva arquitectura (ej: 2,5,10)");
                    if (newArchitecture) {
                      setModelForm({
                        ...modelForm,
                        hiddenLayerSize: modelForm.hiddenLayerSize
                          ? `${modelForm.hiddenLayerSize};${newArchitecture}`
                          : newArchitecture
                      });
                    }
                  }}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
                >
                  + Nueva Arquitectura
                </button>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              {modelForm.hiddenLayerSize?.split(';').filter(x => x).map((architecture, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={architecture}
                    onChange={(e) => {
                      const architectures = modelForm.hiddenLayerSize.split(';');
                      architectures[index] = e.target.value.replace(/[^0-9,]/g, '');
                      setModelForm({ ...modelForm, hiddenLayerSize: architectures.join(';') });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Ej: 2,5,10"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const architectures = modelForm.hiddenLayerSize.split(';');
                      architectures.splice(index, 1);
                      setModelForm({ ...modelForm, hiddenLayerSize: architectures.join(';') });
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-gray-500">
              Cada arquitectura debe ser números separados por comas.
            </p>
          </div>

          {/* Alpha */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="alpha" className="block text-sm font-medium text-gray-700">
                Valores de Alpha
              </label>
              <button
                type="button"
                onClick={() => {
                  const newValue = prompt("Agregar nuevo valor de Alpha (ej: 0.001)");
                  if (newValue) {
                    setModelForm({
                      ...modelForm,
                      alpha: modelForm.alpha
                        ? `${modelForm.alpha},${newValue}`
                        : newValue
                    });
                  }
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
              >
                + Agregar Valor
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {modelForm.alpha?.split(',').filter(x => x).map((value, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const values = modelForm.alpha.split(',');
                      values.splice(index, 1);
                      setModelForm({ ...modelForm, alpha: values.join(',') });
                    }}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <input
              type="text"
              id="alpha"
              value={modelForm.alpha}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.,]/g, '');
                setModelForm({ ...modelForm, alpha: value });
              }}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white text-lg"
              placeholder="0.001,0.0005"
            />
            <p className="text-xs text-gray-500 mt-1">Valores separados por comas. Ej: 0.001,0.0005,0.0001</p>
          </div>

          {/* Activación (multi-select) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Activación (selección múltiple)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['relu', 'identity', 'tanh', 'logistic'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`activation-${option}`}
                    checked={modelForm.activation?.includes(option)}
                    onChange={(e) => {
                      let newActivation = modelForm.activation ? modelForm.activation.split(',') : [];
                      if (e.target.checked) {
                        newActivation.push(option);
                      } else {
                        newActivation = newActivation.filter(item => item !== option);
                      }
                      setModelForm({ ...modelForm, activation: newActivation.join(',') });
                    }}
                    className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor={`activation-${option}`} className="ml-2 block text-sm text-gray-700 capitalize">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Algoritmo (multi-select) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Algoritmo (selección múltiple)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['adam', 'sgd', 'lbfgs'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`algorithm-${option}`}
                    checked={modelForm.algorithm?.includes(option)}
                    onChange={(e) => {
                      let newAlgorithm = modelForm.algorithm ? modelForm.algorithm.split(',') : [];
                      if (e.target.checked) {
                        newAlgorithm.push(option);
                      } else {
                        newAlgorithm = newAlgorithm.filter(item => item !== option);
                      }
                      setModelForm({ ...modelForm, algorithm: newAlgorithm.join(',') });
                    }}
                    className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor={`algorithm-${option}`} className="ml-2 block text-sm text-gray-700 capitalize">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Iteraciones Máximas */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="maxIterations" className="block text-sm font-medium text-gray-700">
                Iteraciones Máximas (separados por comas)
              </label>
              <button
                type="button"
                onClick={() => {
                  const newValue = prompt("Ingrese nuevos valores para Iteraciones (ej: 100,200)");
                  if (newValue) {
                    setModelForm({
                      ...modelForm,
                      maxIterations: modelForm.maxIterations 
                        ? `${modelForm.maxIterations},${newValue}` 
                        : newValue
                    });
                  }
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
              >
                + Agregar
              </button>
            </div>
            <input
              type="text"
              id="maxIterations"
              value={modelForm.maxIterations}
              onChange={(e) => {
                // Validar que solo sean números y comas
                const value = e.target.value.replace(/[^0-9,]/g, '');
                setModelForm({ ...modelForm, maxIterations: value });
              }}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white text-lg"
              placeholder="100,200,50"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Ejemplo: 100,200,50</p>
          </div>
        </div>
      </div>

      {/* Prediction Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-black rounded-xl">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Datos para Predicción</h2>
            <p className="text-gray-600">Ingrese los valores para realizar una predicción de prueba</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Variables de Entrada
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {predictionInputs.map((input, index) => (
              <div key={index}>
                <label htmlFor={`input-${input.name}`} className="block text-xs font-medium text-gray-600 mb-2">
                  {input.label}
                </label>
                
                {input.type === "select" ? (
                  <div>
                    <select
                      id={`input-${input.name}`}
                      value={input.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                      required
                    >
                      <option value="">Seleccione...</option>
                      {input.options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {input.error && <p className="text-xs text-red-500 mt-1">{input.error}</p>}
                  </div>
                ) : (
                  <div>
                    <input
                      type={input.type}
                      id={`input-${input.name}`}
                      value={input.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className={`w-full px-3 py-3 border ${input.error ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white`}
                      placeholder={input.type === "number" ? `${input.min || "0"} - ${input.max || "100"}` : ""}
                      min={input.min}
                      max={input.max}
                      step={input.type === "number" ? "any" : undefined}
                      required
                    />
                    {input.error && <p className="text-xs text-red-500 mt-1">{input.error}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-8 hover:shadow-2xl transition-all duration-300">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || isProcessing}
          className={`w-full ${isFormValid ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'} text-white py-5 px-8 rounded-xl font-semibold text-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl`}
        >
          {isProcessing ? (
            <>
              <Activity className="h-6 w-6 animate-pulse" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <Play className="h-6 w-6" />
              <span>Iniciar Proceso</span>
            </>
          )}
        </button>
        {!isFormValid && (
          <p className="text-sm text-red-500 mt-2 text-center">
            Por favor complete todos los campos correctamente antes de enviar
          </p>
        )}
      </div>
    </div>
  );
}

export default NeuralNetworkForm;
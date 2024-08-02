import React, { useState } from 'react';
//import materialesData from '../../utils/materiales.json'

interface CalculationOption {
  value: string;
  label: string;
}

interface Structure {
  type: string;
  dimensions: { largo: number; ancho: number; alto: number };
}

interface CalculationResult {
  structure: Structure;
  materials: { [key: string]: number };
}

const calculationOptions: CalculationOption[] = [
  { value: 'muroPortante', label: 'Muro Portante' },
  { value: 'tabiqueDivisorio', label: 'Tabique Divisorio' },
  { value: 'cimientoCorrido', label: 'Cimiento Corrido' },
  // Añade más opciones según sea necesario
];

const Calculator: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [structures, setStructures] = useState<Structure[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleAddStructure = () => {
    setStructures([...structures, { type: '', dimensions: { largo: 0, ancho: 0, alto: 0 } }]);
  };

  const handleStructureTypeChange = (index: number, value: string) => {
    const newStructures = [...structures];
    newStructures[index].type = value;
    setStructures(newStructures);
  };

  const handleDimensionChange = (index: number, dimension: string, value: number) => {
    const newStructures = [...structures];
    newStructures[index].dimensions[dimension as keyof typeof newStructures[typeof index]['dimensions']] = value;
    setStructures(newStructures);
  };

  const calculateMaterials = (structure: Structure): { [key: string]: number } => {
    // Esta es una función de ejemplo. Deberías implementar la lógica real de cálculo aquí.
    const area = structure.dimensions.largo * structure.dimensions.ancho;
    switch (structure.type) {
      case 'muroPortante':
        return { ladrillos: Math.ceil(area * 52), cemento: Number((area * 0.01).toFixed(2)), arena: Number((area * 0.05).toFixed(2)) };
      case 'tabiqueDivisorio':
        return { ladrillos: Math.ceil(area * 40), cemento: Number((area * 0.008).toFixed(2)), arena: Number((area * 0.04).toFixed(2)) };
      case 'cimientoCorrido':
        return { cemento: Number((area * 0.05).toFixed(2)), arena: Number((area * 0.1).toFixed(2)), grava: Number((area * 0.15).toFixed(2)) };
      default:
        return {};
    }
  };

  const handleFinalizeCalculation = () => {
    const newResults = structures.map(structure => ({
      structure,
      materials: calculateMaterials(structure)
    }));
    setResults(newResults);
  };

  return (
    <div className="calculator">
      <h1>enObra.app</h1>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Nombre del proyecto"
      />
      {structures.map((structure, index) => (
        <div key={index} className="estructura">
          <select
            value={structure.type}
            onChange={(e) => handleStructureTypeChange(index, e.target.value)}
          >
            <option value="">Seleccione una estructura...</option>
            {calculationOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <input
            type="number"
            value={structure.dimensions.largo}
            onChange={(e) => handleDimensionChange(index, 'largo', Number(e.target.value))}
            placeholder="Largo"
          />
          <input
            type="number"
            value={structure.dimensions.ancho}
            onChange={(e) => handleDimensionChange(index, 'ancho', Number(e.target.value))}
            placeholder="Ancho"
          />
          <input
            type="number"
            value={structure.dimensions.alto}
            onChange={(e) => handleDimensionChange(index, 'alto', Number(e.target.value))}
            placeholder="Alto/Prof"
          />
        </div>
      ))}
      <button onClick={handleAddStructure}>+ Añadir estructura</button>
      <button onClick={handleFinalizeCalculation}>Finalizar cálculo</button>

      {results.length > 0 && (
        <div className="results">
          <h2>Los materiales requeridos son los siguientes:</h2>
          {results.map((result, index) => (
            <div key={index}>
              <h3>Estructura {index + 1} ({calculationOptions.find(option => option.value === result.structure.type)?.label}):</h3>
              {Object.entries(result.materials).map(([material, cantidad]) => (
                <p key={material}>- {material}: {cantidad} {material === 'ladrillos' ? 'unidades' : 'm³'}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;
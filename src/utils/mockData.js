export const patients = [
  // Macros reference (DRI/WHO): protein 1.0-2.0g/kg, carbs 45-65% kcal, fat 20-35% kcal
  // F ~2000kcal/day | M ~2500kcal/day — adjusted per goal (emagrecimento↓carbs, hipertrofia↑protein+carbs)
  { id: 1, name: 'Ana Lima',       age: 32, goal: 'Emagrecimento', weight: 74, compliance: 87, lastVisit: '02/04/2026', status: 'Ativo',   water: 1500, waterGoal: 2000, macros: { protein: { actual: 112, target: 110 }, carbs: { actual: 165, target: 180 }, fat: { actual: 48, target: 55 } } },
  { id: 2, name: 'Carlos Mendes',  age: 28, goal: 'Hipertrofia',   weight: 78, compliance: 92, lastVisit: '01/04/2026', status: 'Ativo',   water: 2500, waterGoal: 3000, macros: { protein: { actual: 195, target: 200 }, carbs: { actual: 380, target: 400 }, fat: { actual: 88, target: 90  } } },
  { id: 3, name: 'Fernanda Costa', age: 45, goal: 'Manutenção',    weight: 63, compliance: 78, lastVisit: '28/03/2026', status: 'Ativo',   water: 1250, waterGoal: 2000, macros: { protein: { actual: 98,  target: 100 }, carbs: { actual: 245, target: 250 }, fat: { actual: 67, target: 70  } } },
  { id: 4, name: 'Pedro Alves',    age: 38, goal: 'Emagrecimento', weight: 96, compliance: 65, lastVisit: '25/03/2026', status: 'Inativo', water: 750,  waterGoal: 2500, macros: { protein: { actual: 88,  target: 130 }, carbs: { actual: 340, target: 220 }, fat: { actual: 95, target: 65  } } },
  { id: 5, name: 'Juliana Rocha',  age: 24, goal: 'Hipertrofia',   weight: 58, compliance: 95, lastVisit: '03/04/2026', status: 'Ativo',   water: 2000, waterGoal: 2500, macros: { protein: { actual: 148, target: 155 }, carbs: { actual: 275, target: 290 }, fat: { actual: 72, target: 75  } } },
  { id: 6, name: 'Roberto Silva',  age: 55, goal: 'Saúde',         weight: 83, compliance: 82, lastVisit: '30/03/2026', status: 'Ativo',   water: 1750, waterGoal: 2000, macros: { protein: { actual: 105, target: 110 }, carbs: { actual: 255, target: 270 }, fat: { actual: 68, target: 72  } } },
]

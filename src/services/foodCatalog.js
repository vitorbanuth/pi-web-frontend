/**
 * Catálogo local de alimentos — espelho do catálogo mobile (food_catalog.dart).
 * Valores aproximados por 100 g (fonte: TACO/IBGE).
 */

export const MEAL_TYPES = [
  { key: 'breakfast',      label: 'Café da manhã',    icon: '☀️' },
  { key: 'morningSnack',   label: 'Lanche da manhã',  icon: '🍎' },
  { key: 'lunch',          label: 'Almoço',           icon: '🍽️' },
  { key: 'afternoonSnack', label: 'Lanche da tarde',  icon: '🥗' },
  { key: 'dinner',         label: 'Jantar',           icon: '🌙' },
  { key: 'supper',         label: 'Ceia',             icon: '🌛' },
]

export function mealTypeLabel(key) {
  return MEAL_TYPES.find(m => m.key === key)?.label ?? key
}

// ── Café da manhã ──────────────────────────────────────────────────────────
const breakfast = [
  { name: 'Pão francês',              category: 'breakfast', kcal: 270, carbs: 54,   protein: 8,    fat: 3,    fiber: 2.3,  sodium: 490  },
  { name: 'Pão de forma integral',    category: 'breakfast', kcal: 247, carbs: 46,   protein: 9,    fat: 3,    fiber: 5.8,  sodium: 420  },
  { name: 'Tapioca',                  category: 'breakfast', kcal: 360, carbs: 88,   protein: 0.6,  fat: 0.4,  fiber: 0.9,  sodium: 10   },
  { name: 'Cuscuz nordestino',        category: 'breakfast', kcal: 134, carbs: 29,   protein: 2,    fat: 0.5,  fiber: 1.2,  sodium: 180  },
  { name: 'Leite integral',           category: 'breakfast', kcal: 61,  carbs: 4.8,  protein: 3.2,  fat: 3.3,  fiber: null, sodium: 49   },
  { name: 'Leite desnatado',          category: 'breakfast', kcal: 35,  carbs: 5,    protein: 3.5,  fat: 0.1,  fiber: null, sodium: 52   },
  { name: 'Queijo minas frescal',     category: 'breakfast', kcal: 264, carbs: 3,    protein: 17,   fat: 20,   fiber: null, sodium: 390  },
  { name: 'Queijo muçarela',          category: 'breakfast', kcal: 280, carbs: 2.2,  protein: 20,   fat: 21,   fiber: null, sodium: 480  },
  { name: 'Peito de peru defumado',   category: 'breakfast', kcal: 109, carbs: 0,    protein: 22,   fat: 2,    fiber: null, sodium: 1250 },
  { name: 'Presunto cozido',          category: 'breakfast', kcal: 130, carbs: 1.5,  protein: 19,   fat: 5.5,  fiber: null, sodium: 1100 },
  { name: 'Ovo cozido',               category: 'breakfast', kcal: 155, carbs: 1.1,  protein: 13,   fat: 11,   fiber: null, sodium: 124  },
  { name: 'Ovo mexido',               category: 'breakfast', kcal: 148, carbs: 1.6,  protein: 10,   fat: 11,   fiber: null, sodium: 180  },
  { name: 'Iogurte natural',          category: 'breakfast', kcal: 59,  carbs: 3.6,  protein: 10,   fat: 0.4,  fiber: null, sodium: 70   },
  { name: 'Iogurte grego integral',   category: 'breakfast', kcal: 97,  carbs: 3.6,  protein: 9,    fat: 5,    fiber: null, sodium: 45   },
  { name: 'Aveia em flocos',          category: 'breakfast', kcal: 389, carbs: 66,   protein: 17,   fat: 7,    fiber: 10.6, sodium: 2    },
  { name: 'Granola tradicional',      category: 'breakfast', kcal: 417, carbs: 70,   protein: 10,   fat: 12,   fiber: 5,    sodium: 35   },
  { name: 'Manteiga',                 category: 'breakfast', kcal: 717, carbs: 0,    protein: 0.9,  fat: 81,   fiber: null, sodium: 576  },
  { name: 'Mel',                      category: 'breakfast', kcal: 304, carbs: 82,   protein: 0.3,  fat: 0,    fiber: null, sodium: 4    },
  { name: 'Mamão papaia',             category: 'breakfast', kcal: 39,  carbs: 10,   protein: 0.6,  fat: 0.1,  fiber: 1.8,  sodium: 3    },
  { name: 'Banana',                   category: 'breakfast', kcal: 89,  carbs: 23,   protein: 1.1,  fat: 0.3,  fiber: 2.6,  sodium: 1    },
]

// ── Almoço ─────────────────────────────────────────────────────────────────
const lunch = [
  { name: 'Arroz branco cozido',      category: 'lunch', kcal: 130, carbs: 28,   protein: 2.7, fat: 0.3,  fiber: 1.6, sodium: 1   },
  { name: 'Arroz integral cozido',    category: 'lunch', kcal: 124, carbs: 26,   protein: 2.6, fat: 0.9,  fiber: 2.7, sodium: 2   },
  { name: 'Feijão carioca cozido',    category: 'lunch', kcal: 76,  carbs: 13.6, protein: 4.8, fat: 0.5,  fiber: 8.5, sodium: 2   },
  { name: 'Feijão preto cozido',      category: 'lunch', kcal: 77,  carbs: 14,   protein: 4.5, fat: 0.5,  fiber: 8.4, sodium: 2   },
  { name: 'Lentilha cozida',          category: 'lunch', kcal: 116, carbs: 20,   protein: 9,   fat: 0.4,  fiber: 8,   sodium: 2   },
  { name: 'Frango grelhado',          category: 'lunch', kcal: 165, carbs: 0,    protein: 31,  fat: 3.6,  fiber: null,sodium: 74  },
  { name: 'Peito de frango cozido',   category: 'lunch', kcal: 158, carbs: 0,    protein: 32,  fat: 2.7,  fiber: null,sodium: 65  },
  { name: 'Patinho bovino grelhado',  category: 'lunch', kcal: 219, carbs: 0,    protein: 32,  fat: 9,    fiber: null,sodium: 62  },
  { name: 'Alcatra grelhada',         category: 'lunch', kcal: 215, carbs: 0,    protein: 30,  fat: 10,   fiber: null,sodium: 59  },
  { name: 'Carne moída refogada',     category: 'lunch', kcal: 249, carbs: 0,    protein: 26,  fat: 16,   fiber: null,sodium: 70  },
  { name: 'Tilápia grelhada',         category: 'lunch', kcal: 96,  carbs: 0,    protein: 20,  fat: 1.7,  fiber: null,sodium: 52  },
  { name: 'Salmão grelhado',          category: 'lunch', kcal: 208, carbs: 0,    protein: 20,  fat: 13,   fiber: null,sodium: 59  },
  { name: 'Atum em água (drenado)',   category: 'lunch', kcal: 109, carbs: 0,    protein: 24,  fat: 0.8,  fiber: null,sodium: 371 },
  { name: 'Macarrão cozido',          category: 'lunch', kcal: 131, carbs: 26,   protein: 5,   fat: 1,    fiber: 1.8, sodium: 1   },
  { name: 'Batata cozida',            category: 'lunch', kcal: 86,  carbs: 20,   protein: 1.7, fat: 0.1,  fiber: 1.8, sodium: 6   },
  { name: 'Batata-doce cozida',       category: 'lunch', kcal: 77,  carbs: 18,   protein: 1.4, fat: 0.1,  fiber: 3,   sodium: 55  },
  { name: 'Brócolis cozido',          category: 'lunch', kcal: 35,  carbs: 7,    protein: 2.4, fat: 0.4,  fiber: 3.3, sodium: 41  },
  { name: 'Cenoura cozida',           category: 'lunch', kcal: 35,  carbs: 8,    protein: 0.9, fat: 0.2,  fiber: 3.2, sodium: 58  },
  { name: 'Alface',                   category: 'lunch', kcal: 14,  carbs: 2.9,  protein: 1.3, fat: 0.2,  fiber: 2,   sodium: 28  },
  { name: 'Tomate',                   category: 'lunch', kcal: 18,  carbs: 3.9,  protein: 0.9, fat: 0.2,  fiber: 1.2, sodium: 5   },
]

// ── Jantar ─────────────────────────────────────────────────────────────────
const dinner = [
  { name: 'Arroz integral cozido',        category: 'dinner', kcal: 124, carbs: 26,  protein: 2.6, fat: 0.9,  fiber: 2.7, sodium: 2   },
  { name: 'Feijão preto cozido',          category: 'dinner', kcal: 77,  carbs: 14,  protein: 4.5, fat: 0.5,  fiber: 8.4, sodium: 2   },
  { name: 'Ovo cozido',                   category: 'dinner', kcal: 155, carbs: 1.1, protein: 13,  fat: 11,   fiber: null,sodium: 124 },
  { name: 'Frango xadrez',               category: 'dinner', kcal: 122, carbs: 7,   protein: 15,  fat: 4,    fiber: null,sodium: 310 },
  { name: 'Tilápia assada',              category: 'dinner', kcal: 91,  carbs: 0,   protein: 20,  fat: 1,    fiber: null,sodium: 60  },
  { name: 'Salmão assado',               category: 'dinner', kcal: 206, carbs: 0,   protein: 20,  fat: 13,   fiber: null,sodium: 59  },
  { name: 'Carne moída refogada',         category: 'dinner', kcal: 249, carbs: 0,   protein: 26,  fat: 16,   fiber: null,sodium: 70  },
  { name: 'Macarrão ao molho de tomate', category: 'dinner', kcal: 141, carbs: 27,  protein: 5,   fat: 2,    fiber: 2,   sodium: 290 },
  { name: 'Sopa de legumes',             category: 'dinner', kcal: 31,  carbs: 6,   protein: 1,   fat: 0.4,  fiber: 1.5, sodium: 220 },
  { name: 'Caldo de frango caseiro',     category: 'dinner', kcal: 25,  carbs: 2,   protein: 3,   fat: 0.5,  fiber: null,sodium: 380 },
  { name: 'Purê de batata',              category: 'dinner', kcal: 83,  carbs: 18,  protein: 2,   fat: 0.1,  fiber: 1.5, sodium: 190 },
  { name: 'Abobrinha refogada',          category: 'dinner', kcal: 17,  carbs: 3.1, protein: 1.2, fat: 0.3,  fiber: 1,   sodium: 2   },
  { name: 'Pão integral',               category: 'dinner', kcal: 247, carbs: 46,  protein: 9,   fat: 3,    fiber: 5.8, sodium: 420 },
  { name: 'Salada de folhas mistas',    category: 'dinner', kcal: 14,  carbs: 2.9, protein: 1.3, fat: 0.2,  fiber: 2,   sodium: 28  },
  { name: 'Requeijão cremoso',           category: 'dinner', kcal: 213, carbs: 4,   protein: 13,  fat: 16,   fiber: null,sodium: 760 },
  { name: 'Quiche de legumes',           category: 'dinner', kcal: 210, carbs: 18,  protein: 7,   fat: 12,   fiber: 1.5, sodium: 340 },
  { name: 'Frango assado',              category: 'dinner', kcal: 215, carbs: 0,   protein: 29,  fat: 11,   fiber: null,sodium: 80  },
  { name: 'Ervilha cozida',             category: 'dinner', kcal: 81,  carbs: 14,  protein: 5.4, fat: 0.4,  fiber: 5.7, sodium: 3   },
]

// ── Lanche (manhã / tarde / ceia) ──────────────────────────────────────────
const snack = [
  { name: 'Banana',                      category: 'snack', kcal: 89,  carbs: 23,  protein: 1.1, fat: 0.3,  fiber: 2.6, sodium: 1   },
  { name: 'Maçã',                        category: 'snack', kcal: 52,  carbs: 14,  protein: 0.3, fat: 0.2,  fiber: 2.4, sodium: 1   },
  { name: 'Pera',                        category: 'snack', kcal: 57,  carbs: 15,  protein: 0.4, fat: 0.1,  fiber: 3.1, sodium: 1   },
  { name: 'Uva (Red Globe)',             category: 'snack', kcal: 69,  carbs: 18,  protein: 0.7, fat: 0.2,  fiber: 0.9, sodium: 2   },
  { name: 'Melancia',                    category: 'snack', kcal: 30,  carbs: 8,   protein: 0.6, fat: 0.2,  fiber: 0.4, sodium: 1   },
  { name: 'Morango',                     category: 'snack', kcal: 32,  carbs: 7.7, protein: 0.7, fat: 0.3,  fiber: 2,   sodium: 1   },
  { name: 'Abacaxi',                     category: 'snack', kcal: 48,  carbs: 13,  protein: 0.5, fat: 0.1,  fiber: 1.4, sodium: 1   },
  { name: 'Manga',                       category: 'snack', kcal: 60,  carbs: 15,  protein: 0.8, fat: 0.4,  fiber: 1.6, sodium: 2   },
  { name: 'Castanha do pará',            category: 'snack', kcal: 656, carbs: 12,  protein: 14,  fat: 66,   fiber: 7.5, sodium: 3   },
  { name: 'Castanha de caju torrada',    category: 'snack', kcal: 553, carbs: 33,  protein: 18,  fat: 44,   fiber: 3.3, sodium: 16  },
  { name: 'Amendoim torrado',            category: 'snack', kcal: 567, carbs: 16,  protein: 26,  fat: 49,   fiber: 8.5, sodium: 6   },
  { name: 'Iogurte grego integral',      category: 'snack', kcal: 97,  carbs: 3.6, protein: 9,   fat: 5,    fiber: null,sodium: 45  },
  { name: 'Queijo cottage',              category: 'snack', kcal: 98,  carbs: 3.4, protein: 11,  fat: 4.3,  fiber: null,sodium: 364 },
  { name: 'Barrinha de cereal',          category: 'snack', kcal: 392, carbs: 72,  protein: 7,   fat: 9,    fiber: 3,   sodium: 140 },
  { name: 'Biscoito integral',           category: 'snack', kcal: 440, carbs: 65,  protein: 8,   fat: 17,   fiber: 4.5, sodium: 330 },
  { name: 'Pipoca simples (sem manteiga)',category:'snack', kcal: 387, carbs: 74,  protein: 13,  fat: 5,    fiber: 14.5,sodium: 8   },
  { name: 'Tapioca',                     category: 'snack', kcal: 360, carbs: 88,  protein: 0.6, fat: 0.4,  fiber: 0.9, sodium: 10  },
  { name: 'Mix de oleaginosas',          category: 'snack', kcal: 607, carbs: 18,  protein: 18,  fat: 56,   fiber: 6,   sodium: 10  },
  { name: 'Whey protein (pó)',           category: 'snack', kcal: 373, carbs: 10,  protein: 74,  fat: 5,    fiber: null,sodium: 130 },
  { name: 'Coco fresco (polpa)',         category: 'snack', kcal: 354, carbs: 15,  protein: 3.3, fat: 33,   fiber: 9,   sodium: 20  },
]

/** Catálogo completo (todas as categorias) */
export const foodCatalog = [...breakfast, ...lunch, ...dinner, ...snack]

/** Filtra por categoria */
export function foodsByCategory(category) {
  return foodCatalog.filter(f => f.category === category)
}

/**
 * Calcula os macros de um alimento para uma determinada quantidade em gramas.
 * Retorna valores arredondados para inteiros.
 */
export function calcMacros(food, grams) {
  const f = grams / 100
  return {
    kcal:    Math.round(food.kcal    * f),
    carbs:   Math.round(food.carbs   * f),
    protein: Math.round(food.protein * f),
    fat:     Math.round(food.fat     * f),
  }
}

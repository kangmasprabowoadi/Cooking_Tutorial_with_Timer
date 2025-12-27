import { useState } from 'react';
import { Check, Circle, CircleCheck } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

interface IngredientChecklistProps {
  ingredients: Ingredient[];
}

export function IngredientChecklist({ ingredients }: IngredientChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleIngredient = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const checkedCount = checkedItems.size;
  const totalCount = ingredients.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900">Ingredients</h2>
        <span className="text-sm text-gray-500">
          {checkedCount}/{totalCount} checked
        </span>
      </div>
      
      <div className="space-y-3">
        {ingredients.map((ingredient) => {
          const isChecked = checkedItems.has(ingredient.id);
          return (
            <button
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient.id)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex-shrink-0 mt-0.5">
                {isChecked ? (
                  <CircleCheck className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <span className={`${isChecked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {ingredient.name}
                </span>
                <span className={`ml-2 ${isChecked ? 'text-gray-400' : 'text-gray-500'}`}>
                  {ingredient.amount}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

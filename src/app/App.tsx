import { useState } from 'react';
import { ChefHat, ChevronLeft, ChevronRight } from 'lucide-react';
import { IngredientChecklist } from './components/IngredientChecklist';
import { RecipeStep, Step } from './components/RecipeStep';

const recipe = {
  name: 'Classic Spaghetti Carbonara',
  description: 'An authentic Italian pasta dish with eggs, cheese, and pancetta',
  prepTime: '10 min',
  cookTime: '20 min',
  servings: 4,
  ingredients: [
    { id: '1', name: 'Spaghetti', amount: '400g' },
    { id: '2', name: 'Pancetta or guanciale', amount: '200g, diced' },
    { id: '3', name: 'Egg yolks', amount: '4 large' },
    { id: '4', name: 'Whole eggs', amount: '2 large' },
    { id: '5', name: 'Pecorino Romano cheese', amount: '100g, finely grated' },
    { id: '6', name: 'Black pepper', amount: 'freshly ground, to taste' },
    { id: '7', name: 'Salt', amount: 'for pasta water' },
  ],
  steps: [
    {
      id: 1,
      title: 'Boil the Water',
      description: 'Fill a large pot with water and add a generous amount of salt (about 2 tablespoons). Bring the water to a rolling boil over high heat. The water should taste like the sea.',
      timer: {
        duration: 480, // 8 minutes
        label: 'Water Boiling Time'
      },
      tip: 'Use a large pot with plenty of water to prevent the pasta from sticking together.'
    },
    {
      id: 2,
      title: 'Cook the Pancetta',
      description: 'While the water is heating, place the diced pancetta in a large, cold skillet. Turn the heat to medium and cook until the pancetta is crispy and golden, stirring occasionally. The fat should render out and the pieces should be crispy but not burnt.',
      timer: {
        duration: 300, // 5 minutes
        label: 'Pancetta Cooking Time'
      },
      tip: 'Starting with a cold pan helps render the fat slowly and prevents burning.'
    },
    {
      id: 3,
      title: 'Prepare the Egg Mixture',
      description: 'In a medium bowl, whisk together the egg yolks, whole eggs, and grated Pecorino Romano cheese. Add a generous amount of freshly ground black pepper. Mix until well combined and creamy. Set aside.',
      tip: 'Room temperature eggs mix better and create a smoother sauce.'
    },
    {
      id: 4,
      title: 'Cook the Spaghetti',
      description: 'Once the water is boiling, add the spaghetti and cook according to package directions until al dente (usually 8-10 minutes). Reserve 1 cup of pasta water before draining. The starchy pasta water is essential for the sauce.',
      timer: {
        duration: 540, // 9 minutes
        label: 'Pasta Cooking Time'
      },
      tip: 'Set a timer 1 minute before the package time and taste-test for doneness.'
    },
    {
      id: 5,
      title: 'Combine Everything',
      description: 'Remove the pan with pancetta from heat. Add the drained spaghetti to the pan with the pancetta and toss to coat. Let it cool for 1 minute. Then add the egg mixture, tossing quickly and constantly to create a creamy sauce. Add reserved pasta water, a little at a time, until you reach the desired consistency.',
      timer: {
        duration: 120, // 2 minutes
        label: 'Final Tossing Time'
      },
      tip: 'Work quickly off heat to prevent the eggs from scrambling. The residual heat will cook the eggs perfectly.'
    },
    {
      id: 6,
      title: 'Serve Immediately',
      description: 'Divide the carbonara among warm plates. Top with additional grated Pecorino Romano and freshly ground black pepper. Serve immediately while hot and creamy.',
      tip: 'Carbonara waits for no one! The sauce will thicken as it cools, so serve right away.'
    }
  ] as Step[]
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / recipe.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">{recipe.name}</h1>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Prep:</span> {recipe.prepTime}
            </div>
            <div>
              <span className="font-semibold">Cook:</span> {recipe.cookTime}
            </div>
            <div>
              <span className="font-semibold">Servings:</span> {recipe.servings}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <IngredientChecklist ingredients={recipe.ingredients} />
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-2">
            <RecipeStep 
              step={recipe.steps[currentStep]} 
              stepNumber={currentStep + 1}
              totalSteps={recipe.steps.length}
            />

            {/* Navigation */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={previousStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <button
                onClick={nextStep}
                disabled={currentStep === recipe.steps.length - 1}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-600 text-white shadow-md hover:shadow-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Completion Message */}
            {currentStep === recipe.steps.length - 1 && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 text-center">
                <h3 className="text-green-900 mb-2">🎉 Congratulations!</h3>
                <p className="text-green-700">
                  You've completed the recipe. Enjoy your delicious {recipe.name}!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { COFFEE_RECIPES } from './data';
import { X, Coffee } from 'lucide-react';

interface RecipeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeBookModal: React.FC<RecipeBookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#FDFCF9] rounded-3xl overflow-hidden shadow-2xl border border-[#B89C82]/30 text-[#3E453A] p-6 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B89C82]/20 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#7A8974]/20 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#7A8974]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] block">
                Cafe Aldaw Barista Guide
              </span>
              <h3 className="font-serif text-xl font-bold">Signature Drink Recipes</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            aria-label="Close recipes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipes Grid */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {COFFEE_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 rounded-2xl border border-[#B89C82]/20 bg-white shadow-2xs hover:border-[#7A8974]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{recipe.icon}</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#2F362A]">
                      {recipe.name}
                    </h4>
                    <span className="text-[10px] text-[#B89C82] font-bold uppercase tracking-wider">
                      {recipe.bicolTag}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-base text-[#7A8974]">
                    ₱{recipe.price}
                  </span>
                  <div className="text-[10px] font-semibold text-[#8C9388]">
                    {recipe.temperature === 'iced' ? 'Served with Ice 🧊' : 'Warm Brew ☕'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#5E6659] mb-3 leading-relaxed">
                {recipe.description}
              </p>

              {/* Step Ingredients Recipe Bar */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold pt-2 border-t border-black/5">
                <span className="text-[#B89C82] uppercase text-[10px] font-bold">Craft Steps:</span>

                <span className="px-2 py-0.5 rounded-full bg-[#7A8974]/15 text-[#7A8974]">
                  1. {recipe.ingredients.coffee.toUpperCase()}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800">
                  2. {recipe.ingredients.milk.replace('_', ' ').toUpperCase()}
                </span>

                {recipe.ingredients.topping !== 'none' && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-800">
                    3. {recipe.ingredients.topping.replace('_', ' ').toUpperCase()}
                  </span>
                )}

                {recipe.ingredients.ice && (
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-800">
                    + ICE CUBES
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#B89C82]/20 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-white hover:bg-[#63715D] transition-colors"
          >
            Got It, Back to Machine
          </button>
        </div>
      </div>
    </div>
  );
};

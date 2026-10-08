export type DrinkTemperature = 'hot' | 'iced';

export interface CoffeeRecipe {
  id: string;
  name: string;
  bicolTag: string;
  temperature: DrinkTemperature;
  price: number;
  ingredients: {
    coffee: 'espresso' | 'tea' | 'chocolate';
    milk: 'steamed_milk' | 'coconut_milk' | 'condensed_milk' | 'chocolate_milk' | 'none';
    topping: 'biscoff' | 'caramel' | 'coconut_flakes' | 'boba' | 'none';
    ice: boolean;
  };
  description: string;
  icon: string;
  cupColor: string;
}

export interface CustomerCharacter {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  happyQuote: string;
  desiredRecipe: CoffeeRecipe;
  maxPatience: number;
  remainingPatience: number;
}

export interface CupBrewState {
  hasCoffee: 'espresso' | 'tea' | 'chocolate' | null;
  hasMilk: 'steamed_milk' | 'coconut_milk' | 'condensed_milk' | 'chocolate_milk' | null;
  hasTopping: 'biscoff' | 'caramel' | 'coconut_flakes' | 'boba' | null;
  hasIce: boolean;
}

export type MachineAction = 'idle' | 'grinding' | 'brewing' | 'steaming' | 'topping' | 'serving';

export interface CafeUpgrade {
  id: string;
  name: string;
  cost: number;
  icon: string;
  desc: string;
  unlocked: boolean;
}

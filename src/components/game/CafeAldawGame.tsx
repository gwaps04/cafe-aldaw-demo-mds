import React, { useState, useEffect, useRef } from 'react';
import { gameAudio } from '../../utils/gameAudio';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Trophy,
  Coffee,
  CheckCircle2,
  Clock,
  Heart,
  Info,
} from 'lucide-react';

interface CafeAldawGameProps {
  onBackToHome: () => void;
}

interface GameRecipe {
  id: string;
  name: string;
  category: 'Coffee' | 'Drink' | 'Food';
  price: number;
  ingredients: string[];
  icon: string;
}

interface CustomerOrder {
  id: number;
  customerName: string;
  recipe: GameRecipe;
  maxPatience: number;
  remainingPatience: number;
}

const RECIPES: GameRecipe[] = [
  {
    id: 'biscoff-latte',
    name: 'Biscoff Latte',
    category: 'Coffee',
    price: 178,
    ingredients: ['Espresso', 'Steamed Milk', 'Biscoff Spread'],
    icon: '☕',
  },
  {
    id: 'spanish-latte',
    name: 'Spanish Latte',
    category: 'Coffee',
    price: 148,
    ingredients: ['Espresso', 'Condensed Milk', 'Steamed Milk'],
    icon: '☕',
  },
  {
    id: 'coconut-latte',
    name: 'Coconut Latte',
    category: 'Coffee',
    price: 148,
    ingredients: ['Espresso', 'Fresh Coconut Milk', 'Ice Cubes'],
    icon: '🥥',
  },
  {
    id: 'strawberry-choco',
    name: 'Strawberry Choco',
    category: 'Drink',
    price: 178,
    ingredients: ['Strawberry Purée', 'Chocolate Milk', 'Ice Cubes'],
    icon: '🍓',
  },
  {
    id: 'pesto-pinangat',
    name: 'Pesto Pinangat Pasta',
    category: 'Food',
    price: 188,
    ingredients: ['Al Dente Pasta', 'Taro Pinangat', 'Parmesan Cheese'],
    icon: '🍝',
  },
  {
    id: 'crispy-karekare',
    name: 'Crispy Liempo Kare-Kare',
    category: 'Food',
    price: 218,
    ingredients: ['Warm Rice', 'Peanut Sauce', 'Crispy Liempo'],
    icon: '🍚',
  },
  {
    id: 'nutella-milktea',
    name: 'Nutella Milk Tea with Pearl',
    category: 'Drink',
    price: 138,
    ingredients: ['Black Tea', 'Nutella', 'Boba Pearls'],
    icon: '🧋',
  },
  {
    id: 'adobo-sa-asin',
    name: 'Adobo sa Asin Bowl',
    category: 'Food',
    price: 198,
    ingredients: ['Warm Rice', 'Garlic Vinegar Sauce', 'Crispy Liempo'],
    icon: '🍚',
  },
];

const ALL_INGREDIENTS = [
  { name: 'Espresso', icon: '☕', category: 'brew' },
  { name: 'Steamed Milk', icon: '🥛', category: 'brew' },
  { name: 'Fresh Coconut Milk', icon: '🥥', category: 'brew' },
  { name: 'Condensed Milk', icon: '🍯', category: 'brew' },
  { name: 'Biscoff Spread', icon: '🍪', category: 'brew' },
  { name: 'Chocolate Milk', icon: '🍫', category: 'drink' },
  { name: 'Strawberry Purée', icon: '🍓', category: 'drink' },
  { name: 'Black Tea', icon: '🍵', category: 'drink' },
  { name: 'Nutella', icon: '🌰', category: 'drink' },
  { name: 'Boba Pearls', icon: '🧋', category: 'drink' },
  { name: 'Ice Cubes', icon: '🧊', category: 'drink' },
  { name: 'Warm Rice', icon: '🍚', category: 'kitchen' },
  { name: 'Al Dente Pasta', icon: '🍝', category: 'kitchen' },
  { name: 'Taro Pinangat', icon: '🍃', category: 'kitchen' },
  { name: 'Crispy Liempo', icon: '🥓', category: 'kitchen' },
  { name: 'Peanut Sauce', icon: '🥜', category: 'kitchen' },
  { name: 'Parmesan Cheese', icon: '🧀', category: 'kitchen' },
  { name: 'Garlic Vinegar Sauce', icon: '🧄', category: 'kitchen' },
];

const CUSTOMER_NAMES = [
  'Maria from Camalig',
  'Kuya Mark',
  'Sofia from Legazpi',
  'Ate Bea',
  'Lola Carmen',
  'Danilo',
  'Carla from Daraga',
  'Chef Anton',
];

export const CafeAldawGame: React.FC<CafeAldawGameProps> = ({ onBackToHome }) => {
  // Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [ordersServed, setOrdersServed] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customers, setCustomers] = useState<CustomerOrder[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; success: boolean } | null>(null);

  const customerIdRef = useRef(1);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('cafe_aldaw_highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Sync sound manager
  useEffect(() => {
    gameAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Spawn customer helper
  const spawnCustomer = () => {
    const randomRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
    const randomName = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
    const newCustomer: CustomerOrder = {
      id: customerIdRef.current++,
      customerName: randomName,
      recipe: randomRecipe,
      maxPatience: 24, // 24 seconds
      remainingPatience: 24,
    };
    return newCustomer;
  };

  // Start game
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setOrdersServed(0);
    setLives(3);
    setSelectedIngredients([]);
    setFeedbackMsg(null);
    customerIdRef.current = 1;
    setCustomers([spawnCustomer()]);
  };

  // Game Loop Timer (1-second intervals for customer patience)
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setCustomers((prevCustomers) => {
        let lifeLost = false;
        const updated = prevCustomers
          .map((cust) => {
            const nextPatience = cust.remainingPatience - 1;
            if (nextPatience <= 0) {
              lifeLost = true;
              gameAudio.playMistake();
              return null;
            }
            return { ...cust, remainingPatience: nextPatience };
          })
          .filter(Boolean) as CustomerOrder[];

        if (lifeLost) {
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) {
              setGameOver(true);
              setIsPlaying(false);
            }
            return nextL;
          });
        }

        // Spawn replacement if queue is empty or low
        if (updated.length < 2 && Math.random() > 0.45) {
          updated.push(spawnCustomer());
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  // Add ingredient
  const handleAddIngredient = (ingredientName: string) => {
    if (!isPlaying || gameOver) return;
    if (selectedIngredients.length >= 4) return; // tray limit
    gameAudio.playTap();
    setSelectedIngredients((prev) => [...prev, ingredientName]);
  };

  // Clear tray
  const handleClearTray = () => {
    gameAudio.playTap();
    setSelectedIngredients([]);
  };

  // Serve current active customer order
  const handleServeOrder = () => {
    if (customers.length === 0 || selectedIngredients.length === 0) return;

    const targetCustomer = customers[0];
    const targetRecipe = targetCustomer.recipe;

    // Check if ingredient sets match (order-agnostic)
    const requiredSorted = [...targetRecipe.ingredients].sort();
    const currentSorted = [...selectedIngredients].sort();

    const isMatch =
      requiredSorted.length === currentSorted.length &&
      requiredSorted.every((ing, idx) => ing === currentSorted[idx]);

    if (isMatch) {
      // Success!
      gameAudio.playSuccess();
      const bonus = Math.round(targetCustomer.remainingPatience * 2);
      const earned = targetRecipe.price + bonus;

      setScore((prev) => {
        const nextScore = prev + earned;
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem('cafe_aldaw_highscore', nextScore.toString());
        }
        return nextScore;
      });

      setOrdersServed((prev) => prev + 1);
      setSelectedIngredients([]);
      setFeedbackMsg({
        text: `+₱${earned} Served ${targetRecipe.name} perfectly to ${targetCustomer.customerName}!`,
        success: true,
      });

      // Remove customer from queue and immediately replenish
      setCustomers((prev) => {
        const remaining = prev.slice(1);
        if (remaining.length === 0) {
          remaining.push(spawnCustomer());
        }
        return remaining;
      });
    } else {
      // Mistake!
      gameAudio.playMistake();
      setFeedbackMsg({
        text: `Oops! Incorrect recipe for ${targetRecipe.name}. Please check the required ingredients.`,
        success: false,
      });
      setSelectedIngredients([]);
    }

    setTimeout(() => {
      setFeedbackMsg(null);
    }, 2800);
  };

  const activeCustomer = customers[0];

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#3E453A] flex flex-col selection:bg-[#B89C82]/30 selection:text-[#3E453A]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#EFECE4]/95 backdrop-blur-md border-b border-[#B89C82]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#B89C82]/30 bg-white/70 hover:bg-white text-xs font-semibold text-[#3E453A] transition-all hover:scale-105"
            title="Return to Cafe Aldaw Homepage"
          >
            <ArrowLeft className="w-4 h-4 text-[#7A8974]" />
            <span className="hidden sm:inline">Back to Sanctuary</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#3E453A]">
              Cafe Aldaw
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#7A8974] text-[#F7F5F0] text-[10px] uppercase font-bold tracking-wider">
              Barista Rush Game
            </span>
          </div>
        </div>

        {/* Audio & Info Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHowToPlay(true)}
            type="button"
            className="p-2 rounded-full border border-[#B89C82]/30 bg-white/80 hover:bg-white text-[#7A8974] transition-colors"
            title="How to Play"
            aria-label="How to play"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            type="button"
            className="p-2 rounded-full border border-[#B89C82]/30 bg-white/80 hover:bg-white text-[#7A8974] transition-colors"
            title={soundEnabled ? 'Mute Game Audio' : 'Enable Game Audio'}
            aria-label="Toggle audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-500" />}
          </button>
        </div>
      </header>

      {/* Main Game Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
        {/* Top Status & Scoreboard */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#B89C82]/25 shadow-xs mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
          {/* Earnings / Pesos */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#7A8974]/15 flex items-center justify-center shrink-0">
              <span className="font-serif font-bold text-lg text-[#7A8974]">₱</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#B89C82]">
                Earnings
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#3E453A]">
                ₱{score}
              </div>
            </div>
          </div>

          {/* Orders Served */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#B89C82]/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#9F8369]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#B89C82]">
                Orders Served
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#3E453A]">
                {ordersServed}
              </div>
            </div>
          </div>

          {/* Customer Satisfaction (Lives) */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#B89C82]">
                Courtyard Lives
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[1, 2, 3].map((heart) => (
                  <Heart
                    key={heart}
                    className={`w-4 h-4 ${
                      heart <= lives ? 'text-red-500 fill-red-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Best Record */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EFECE4] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-[#B89C82]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#B89C82]">
                Best Record
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#7A8974]">
                ₱{highScore}
              </div>
            </div>
          </div>
        </div>

        {/* Start Game Hero Overlay if not yet playing */}
        {!isPlaying && !gameOver && (
          <div className="my-auto py-12 px-6 bg-white rounded-3xl border border-[#B89C82]/30 shadow-xl text-center max-w-2xl mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#7A8974]/15 flex items-center justify-center mb-5 border-2 border-[#7A8974]/30 shadow-sm">
              <Coffee className="w-10 h-10 text-[#7A8974]" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#B89C82] mb-1">
              Courtyard Barista Challenge
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Cafe Aldaw Barista Rush
            </h1>
            <p className="text-sm sm:text-base text-[#5E6659] leading-relaxed max-w-md mb-8">
              Step behind the counter at our Camalig & Legazpi sanctuaries. Handcraft
              authentic Bicol specialties and craft Nucturna lattes before your guests’
              patience runs out!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={startGame}
                type="button"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#EED5B7]" />
                <span>Start Barista Shift</span>
              </button>
              <button
                onClick={() => setShowHowToPlay(true)}
                type="button"
                className="w-full sm:w-auto px-6 py-4 rounded-full font-semibold text-xs uppercase tracking-wider border border-[#B89C82]/40 text-[#3E453A] hover:bg-[#F5F2EB] transition-colors"
              >
                How To Play
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="my-auto py-12 px-6 bg-white rounded-3xl border border-[#B89C82]/30 shadow-2xl text-center max-w-lg mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-[#B89C82]" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#B89C82] mb-1">
              Shift Ended
            </span>
            <h2 className="font-serif text-3xl font-bold mb-2">Great Effort!</h2>
            <p className="text-sm text-[#5E6659] mb-6">
              You served <span className="font-bold text-[#3E453A]">{ordersServed} orders</span> and earned a total of:
            </p>

            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#7A8974] mb-8">
              ₱{score}
            </div>

            <div className="flex items-center gap-3 w-full justify-center">
              <button
                onClick={startGame}
                type="button"
                className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-md flex items-center gap-2 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onBackToHome}
                type="button"
                className="px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider border border-[#3E453A]/30 text-[#3E453A] hover:bg-black/5"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}

        {/* Active Gameplay Arena */}
        {isPlaying && !gameOver && (
          <div className="flex flex-col gap-6">
            {/* Feedback Toast */}
            {feedbackMsg && (
              <div
                className={`py-2.5 px-4 rounded-2xl text-xs font-semibold text-center border transition-all animate-in fade-in duration-200 ${
                  feedbackMsg.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}
              >
                {feedbackMsg.text}
              </div>
            )}

            {/* Current Active Order Ticket */}
            {activeCustomer && (
              <div className="bg-white rounded-3xl p-6 border-2 border-[#7A8974]/40 shadow-md relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-2 rounded-2xl bg-[#EFECE4] border border-[#B89C82]/20">
                      {activeCustomer.recipe.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-[#B89C82]">
                          Customer: {activeCustomer.customerName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7A8974]/15 text-[#7A8974] font-semibold">
                          ₱{activeCustomer.recipe.price}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold">
                        {activeCustomer.recipe.name}
                      </h3>
                    </div>
                  </div>

                  {/* Patience Timer Meter */}
                  <div className="flex flex-col sm:items-end w-full sm:w-48">
                    <div className="flex items-center justify-between w-full text-xs font-semibold mb-1">
                      <span className="flex items-center gap-1 text-[#B89C82]">
                        <Clock className="w-3.5 h-3.5" /> Patience
                      </span>
                      <span
                        className={
                          activeCustomer.remainingPatience < 8
                            ? 'text-red-600 font-bold animate-pulse'
                            : 'text-[#7A8974]'
                        }
                      >
                        {activeCustomer.remainingPatience}s
                      </span>
                    </div>
                    <div className="w-full bg-[#EFECE4] rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          activeCustomer.remainingPatience < 8
                            ? 'bg-red-500'
                            : activeCustomer.remainingPatience < 15
                            ? 'bg-amber-500'
                            : 'bg-[#7A8974]'
                        }`}
                        style={{
                          width: `${(activeCustomer.remainingPatience / activeCustomer.maxPatience) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recipe Blueprint Instructions */}
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#B89C82]/20 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#7A8974] uppercase tracking-wider text-[11px]">
                    Required Ingredients:
                  </span>
                  {activeCustomer.recipe.ingredients.map((ing) => {
                    const isAdded = selectedIngredients.includes(ing);
                    return (
                      <span
                        key={ing}
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-[#7A8974] text-white border-[#7A8974]'
                            : 'bg-white text-[#5E6659] border-[#B89C82]/30'
                        }`}
                      >
                        {isAdded && <CheckCircle2 className="w-3 h-3" />}
                        <span>{ing}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Preparation Tray (Current Workbench) */}
            <div className="bg-white rounded-3xl p-5 border border-[#B89C82]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B89C82] shrink-0">
                  Preparation Tray:
                </span>
                <div className="flex flex-wrap items-center gap-2 min-h-[36px]">
                  {selectedIngredients.length === 0 ? (
                    <span className="text-xs text-[#8E968B] italic">
                      Tap ingredients below to add to tray...
                    </span>
                  ) : (
                    selectedIngredients.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE4] text-[#3E453A] border border-[#B89C82]/30 flex items-center gap-1 animate-in zoom-in-95 duration-150"
                      >
                        <span>{item}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Action Buttons: Serve / Clear */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleClearTray}
                  disabled={selectedIngredients.length === 0}
                  type="button"
                  className="px-4 py-2.5 rounded-xl border border-black/10 text-xs font-semibold text-[#5E6659] hover:bg-black/5 disabled:opacity-40 transition-colors"
                >
                  Clear Tray
                </button>
                <button
                  onClick={handleServeOrder}
                  disabled={selectedIngredients.length === 0}
                  type="button"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] disabled:opacity-40 shadow-sm transition-all hover:scale-102 active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Serve Order</span>
                </button>
              </div>
            </div>

            {/* Ingredients Station Buttons Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B89C82]">
                  Barista Counter Stations
                </span>
                <span className="text-xs text-[#8E968B]">
                  Tap to add (Max 4 per tray)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {ALL_INGREDIENTS.map((ing) => (
                  <button
                    key={ing.name}
                    onClick={() => handleAddIngredient(ing.name)}
                    type="button"
                    className="p-3 rounded-2xl bg-white border border-[#B89C82]/25 hover:border-[#7A8974] hover:shadow-md transition-all text-left flex flex-col justify-between group active:scale-95"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {ing.icon}
                    </span>
                    <span className="text-xs font-semibold text-[#3E453A] group-hover:text-[#7A8974] transition-colors leading-tight">
                      {ing.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* How To Play Modal */}
      {showHowToPlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#B89C82]/30 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-2xl font-bold mb-3">How to Play</h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#5E6659] leading-relaxed mb-6">
              <p>
                1. <strong>Read the Order</strong>: Check the customer’s request and required ingredients on the order ticket.
              </p>
              <p>
                2. <strong>Assemble on Tray</strong>: Tap the ingredients from the Barista Counter to load them onto your tray.
              </p>
              <p>
                3. <strong>Serve Promptly</strong>: Click "Serve Order" before the customer’s patience meter runs out to earn Pesos (₱) and tips!
              </p>
              <p>
                4. <strong>Protect Your Lives</strong>: You have 3 lives. Don’t let customer patience drop to zero!
              </p>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              type="button"
              className="w-full py-3 rounded-xl bg-[#7A8974] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#63715D] transition-colors"
            >
              Got it, Let's Brew!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

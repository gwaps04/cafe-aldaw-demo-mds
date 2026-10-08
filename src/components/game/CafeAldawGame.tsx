import React, { useState, useEffect, useRef } from 'react';
import {
  CustomerCharacter,
  CupBrewState,
  MachineAction,
  CafeUpgrade,
} from './types';
import { COFFEE_RECIPES, CUSTOMER_ROSTERS, INITIAL_UPGRADES } from './data';
import { EspressoMachineStation } from './EspressoMachineStation';
import { BaristaCounter } from './BaristaCounter';
import { CozyCafeHeader } from './CozyCafeHeader';
import { RecipeBookModal } from './RecipeBookModal';
import { UpgradesShopModal } from './UpgradesShopModal';
import { gameAudio } from '../../utils/gameAudio';
import { RotateCcw, Wand2 } from 'lucide-react';

interface CafeAldawGameProps {
  onBackToHome: () => void;
}

const EMPTY_CUP: CupBrewState = {
  hasCoffee: null,
  hasMilk: null,
  hasTopping: null,
  hasIce: false,
};

export const CafeAldawGame: React.FC<CafeAldawGameProps> = ({ onBackToHome }) => {
  // Game lifecycle
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Score & Progression
  const [score, setScore] = useState(0);
  const [ordersServed, setOrdersServed] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);

  // Machine & Cup state
  const [cup, setCup] = useState<CupBrewState>(EMPTY_CUP);
  const [machineAction, setMachineAction] = useState<MachineAction>('idle');
  const [baristaMood, setBaristaMood] = useState<'happy' | 'brewing' | 'cheering'>('happy');

  // Active Customer queue
  const [activeCustomer, setActiveCustomer] = useState<CustomerCharacter | null>(null);
  const [happyCustomerMsg, setHappyCustomerMsg] = useState<string | null>(null);
  const customerCounterRef = useRef(1);

  // Upgrades & Modals
  const [upgrades, setUpgrades] = useState<CafeUpgrade[]>(INITIAL_UPGRADES);
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState(false);
  const [isUpgradesOpen, setIsUpgradesOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load high score from storage
  useEffect(() => {
    const saved = localStorage.getItem('cafe_aldaw_cozy_highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Sync sound manager
  useEffect(() => {
    gameAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Determine time of day based on orders served
  const dayTime: 'Sunrise (Aldaw)' | 'Golden Hour' | 'Sunset Courtyard' =
    ordersServed < 5
      ? 'Sunrise (Aldaw)'
      : ordersServed < 10
      ? 'Golden Hour'
      : 'Sunset Courtyard';

  // Check if player has unlocked upgrades
  const hasTamper = upgrades.find((u) => u.id === 'golden_tamper')?.unlocked;
  const hasFrother = upgrades.find((u) => u.id === 'coconut_frother')?.unlocked;

  // Helper to spawn a new customer
  const spawnNewCustomer = (): CustomerCharacter => {
    const randomRoster =
      CUSTOMER_ROSTERS[Math.floor(Math.random() * CUSTOMER_ROSTERS.length)];
    const randomRecipe =
      COFFEE_RECIPES[Math.floor(Math.random() * COFFEE_RECIPES.length)];

    const extraPatience = hasFrother ? 5 : 0;
    const basePatience = randomRoster.maxPatience + extraPatience;

    return {
      id: customerCounterRef.current++,
      name: randomRoster.name,
      role: randomRoster.role,
      avatar: randomRoster.avatar,
      quote: randomRoster.quote,
      happyQuote: randomRoster.happyQuote,
      desiredRecipe: randomRecipe,
      maxPatience: basePatience,
      remainingPatience: basePatience,
    };
  };

  // Start / Restart Game
  const handleStartGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setOrdersServed(0);
    setLives(3);
    setCup(EMPTY_CUP);
    setMachineAction('idle');
    setBaristaMood('happy');
    setHappyCustomerMsg(null);
    customerCounterRef.current = 1;
    setActiveCustomer(spawnNewCustomer());
  };

  // Customer patience countdown timer loop
  useEffect(() => {
    if (!isPlaying || gameOver || !activeCustomer) return;

    const timer = setInterval(() => {
      setActiveCustomer((prev) => {
        if (!prev) return null;

        const nextPatience = prev.remainingPatience - 1;
        if (nextPatience <= 0) {
          // Patience expired! Customer walked away
          gameAudio.playMistake();
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) {
              setGameOver(true);
              setIsPlaying(false);
            }
            return nextL;
          });

          // Spawn next customer after brief pause
          return spawnNewCustomer();
        }

        return { ...prev, remainingPatience: nextPatience };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver, activeCustomer]);

  // Machine Action: Extract Coffee
  const handleGrindAndBrew = (coffeeType: 'espresso' | 'tea' | 'chocolate') => {
    if (machineAction !== 'idle') return;

    setMachineAction('grinding');
    setBaristaMood('brewing');
    gameAudio.playGrind();

    setTimeout(() => {
      setMachineAction('brewing');
      gameAudio.playBrew();

      setTimeout(() => {
        setCup((prev) => ({ ...prev, hasCoffee: coffeeType }));
        setMachineAction('idle');
        setBaristaMood('happy');
      }, 500);
    }, 350);
  };

  // Machine Action: Steam & Pour Milk
  const handleAddMilk = (
    milkType: 'steamed_milk' | 'coconut_milk' | 'condensed_milk' | 'chocolate_milk'
  ) => {
    if (machineAction !== 'idle') return;

    setMachineAction('steaming');
    setBaristaMood('brewing');
    gameAudio.playSteam();

    setTimeout(() => {
      setCup((prev) => ({ ...prev, hasMilk: milkType }));
      setMachineAction('idle');
      setBaristaMood('happy');
    }, 450);
  };

  // Machine Action: Toggle Ice
  const handleToggleIce = () => {
    gameAudio.playTap();
    setCup((prev) => ({ ...prev, hasIce: !prev.hasIce }));
  };

  // Machine Action: Add Topping
  const handleAddTopping = (
    topping: 'biscoff' | 'caramel' | 'coconut_flakes' | 'boba'
  ) => {
    gameAudio.playTap();
    setCup((prev) => ({ ...prev, hasTopping: topping }));
  };

  // Clear Cup
  const handleClearCup = () => {
    gameAudio.playTap();
    setCup(EMPTY_CUP);
    setMachineAction('idle');
    setBaristaMood('happy');
  };

  // Quick Auto-Brew Helper (for casual enjoyment or learning)
  const handleQuickAutoBrew = () => {
    if (!activeCustomer || machineAction !== 'idle') return;
    const req = activeCustomer.desiredRecipe.ingredients;

    gameAudio.playGrind();
    setMachineAction('brewing');
    setBaristaMood('brewing');

    setTimeout(() => {
      gameAudio.playSteam();
      setCup({
        hasCoffee: req.coffee,
        hasMilk: req.milk === 'none' ? null : req.milk,
        hasTopping: req.topping === 'none' ? null : req.topping,
        hasIce: req.ice,
      });
      setMachineAction('idle');
      setBaristaMood('happy');
    }, 400);
  };

  // Ring Brass Bell & Serve Order
  const handleRingBell = () => {
    if (!activeCustomer) return;
    gameAudio.playBell();

    const target = activeCustomer.desiredRecipe.ingredients;

    // Check recipe match
    const coffeeMatch = cup.hasCoffee === target.coffee;
    const milkMatch =
      (target.milk === 'none' && cup.hasMilk === null) ||
      cup.hasMilk === target.milk;
    const toppingMatch =
      (target.topping === 'none' && cup.hasTopping === null) ||
      cup.hasTopping === target.topping;
    const iceMatch = cup.hasIce === target.ice;

    const isSuccess = coffeeMatch && milkMatch && toppingMatch && iceMatch;

    if (isSuccess) {
      // Order Perfect!
      gameAudio.playSuccess();
      gameAudio.playCoins();

      const tipBonus = hasTamper ? 15 : 0;
      const patienceBonus = Math.round(activeCustomer.remainingPatience * 1.5);
      const totalEarned = activeCustomer.desiredRecipe.price + patienceBonus + tipBonus;

      setScore((prev) => {
        const nextScore = prev + totalEarned;
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem('cafe_aldaw_cozy_highscore', nextScore.toString());
        }
        return nextScore;
      });

      setOrdersServed((prev) => prev + 1);
      setBaristaMood('cheering');

      const happyLine = `+₱${totalEarned}! ${activeCustomer.name}: "${activeCustomer.happyQuote}"`;
      setHappyCustomerMsg(happyLine);

      // Reset cup and spawn next customer
      setCup(EMPTY_CUP);

      setTimeout(() => {
        setHappyCustomerMsg(null);
        setBaristaMood('happy');
        setActiveCustomer(spawnNewCustomer());
      }, 2500);
    } else {
      // Recipe Mismatch
      gameAudio.playMistake();
      setLives((l) => {
        const nextL = l - 1;
        if (nextL <= 0) {
          setGameOver(true);
          setIsPlaying(false);
        }
        return nextL;
      });

      setHappyCustomerMsg(
        `Oops! Not quite the right recipe for ${activeCustomer.desiredRecipe.name}. Please check the ticket!`
      );

      setTimeout(() => {
        setHappyCustomerMsg(null);
      }, 2500);
    }
  };

  // Buy Upgrade
  const handleBuyUpgrade = (upgradeId: string) => {
    const target = upgrades.find((u) => u.id === upgradeId);
    if (!target || score < target.cost || target.unlocked) return;

    gameAudio.playSuccess();
    setScore((s) => s - target.cost);
    setUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, unlocked: true } : u))
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#3E453A] flex flex-col selection:bg-[#B89C82]/30 selection:text-[#3E453A]">
      {/* Top Header Bar */}
      <CozyCafeHeader
        score={score}
        ordersServed={ordersServed}
        lives={lives}
        dayTime={dayTime}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenRecipeBook={() => setIsRecipeBookOpen(true)}
        onOpenUpgrades={() => setIsUpgradesOpen(true)}
        onBackToHome={onBackToHome}
      />

      {/* Main Game Screen */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {!isPlaying && !gameOver && (
          /* WELCOME SCREEN */
          <div className="bg-white rounded-3xl p-6 sm:p-12 border-2 border-[#B89C82]/30 shadow-xl text-center max-w-2xl mx-auto my-auto animate-in zoom-in-95 duration-300">
            {/* Sun Disc Graphic */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-t from-[#EED5B7] to-[#FFF7EB] border-4 border-[#7A8974]/30 flex items-center justify-center mx-auto mb-4 shadow-lg text-4xl">
              ☀️
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#B89C82] block mb-1">
              Courtyard Simulation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-[#2F362A]">
              Cafe Aldaw: Cozy Sun Barista
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6659] max-w-md mx-auto leading-relaxed mb-6">
              Step behind the artisan espresso counter! Grind highland beans, steam fresh coconut
              milk, pull double espresso shots, garnish signature toppings, and serve your warm
              courtyard regulars.
            </p>

            {/* Quick 3-Step Guide Graphic */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 text-xs font-semibold">
              <div className="p-3 rounded-2xl bg-[#F7F5F0] border border-[#B89C82]/20">
                <span className="text-xl block mb-1">☕</span>
                <span>1. Pull Espresso</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7F5F0] border border-[#B89C82]/20">
                <span className="text-xl block mb-1">🥛</span>
                <span>2. Steam Milk</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7F5F0] border border-[#B89C82]/20">
                <span className="text-xl block mb-1">🛎️</span>
                <span>3. Ring Bell</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStartGame}
                type="button"
                className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                Open Cafe & Start Brewing
              </button>

              <button
                onClick={() => setIsRecipeBookOpen(true)}
                type="button"
                className="w-full sm:w-auto px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider border border-[#B89C82]/40 text-[#5E6659] hover:bg-black/5 transition-colors"
              >
                View Recipe Book
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE GAMEPLAY */}
        {isPlaying && (
          <div className="flex flex-col space-y-4">
            {/* Barista & Customer Counter */}
            <BaristaCounter
              activeCustomer={activeCustomer}
              machineAction={machineAction}
              baristaMood={baristaMood}
              happyCustomerMsg={happyCustomerMsg}
            />

            {/* Interactive Physical Espresso Machine Station */}
            <EspressoMachineStation
              cup={cup}
              machineAction={machineAction}
              onGrindAndBrew={handleGrindAndBrew}
              onAddMilk={handleAddMilk}
              onToggleIce={handleToggleIce}
              onAddTopping={handleAddTopping}
              onClearCup={handleClearCup}
              onRingBell={handleRingBell}
              targetRecipe={activeCustomer?.desiredRecipe}
            />

            {/* Quick Helper Floating Bar */}
            <div className="flex items-center justify-between text-xs text-[#8C9388] px-2 pt-1">
              <span>
                Tip: Follow the customer's <strong>Order Ticket</strong> on the counter.
              </span>
              <button
                onClick={handleQuickAutoBrew}
                type="button"
                className="text-[11px] font-semibold text-[#7A8974] hover:underline flex items-center gap-1"
                title="Automatically load the exact recipe ingredients into your cup"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Quick Auto-Prep Recipe</span>
              </button>
            </div>
          </div>
        )}

        {/* GAME OVER SCREEN */}
        {gameOver && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#B89C82]/30 shadow-2xl text-center max-w-lg mx-auto my-auto animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-amber-500/15 border-2 border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-3xl">
              🌅
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#B89C82] block mb-1">
              Courtyard Shift Finished
            </span>
            <h2 className="font-serif text-3xl font-bold mb-2 text-[#2F362A]">
              Sun Setting Over Mayon
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6659] leading-relaxed mb-6">
              You served comforting drinks and warm smiles to our Albay locals and travelers today!
            </p>

            {/* Shift Stats Card */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#B89C82]/20 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B89C82] block">
                  Total Earnings
                </span>
                <span className="font-serif text-2xl font-bold text-[#7A8974]">₱{score}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B89C82] block">
                  Orders Served
                </span>
                <span className="font-serif text-2xl font-bold text-[#3E453A]">{ordersServed}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleStartGame}
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-white hover:bg-[#63715D] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Another Shift</span>
              </button>
              <button
                onClick={onBackToHome}
                type="button"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider border border-black/10 hover:bg-black/5 transition-colors"
              >
                Return to Sanctuary
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <RecipeBookModal
        isOpen={isRecipeBookOpen}
        onClose={() => setIsRecipeBookOpen(false)}
      />
      <UpgradesShopModal
        isOpen={isUpgradesOpen}
        onClose={() => setIsUpgradesOpen(false)}
        upgrades={upgrades}
        score={score}
        onBuyUpgrade={handleBuyUpgrade}
      />
    </div>
  );
};

export default CafeAldawGame;

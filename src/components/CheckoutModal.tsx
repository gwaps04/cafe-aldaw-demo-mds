import React, { useState, useEffect } from 'react';
import { CartItem, PaymentMethod, PlacedOrder, ThemeMode } from '../types';
import { saveLastOrder } from '../utils/cartStorage';
import {
  X,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  Coffee,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Truck,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: () => void;
  themeMode: ThemeMode;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
  themeMode,
}) => {
  const isNight = themeMode === 'night';

  const [step, setStep] = useState<'form' | 'qr_simulation' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [qrCountdown, setQrCountdown] = useState<number>(6);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 600 ? 0 : 45; // Free delivery over ₱600
  const totalAmount = subtotal + deliveryFee;

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setFormErrors({});
      setQrCountdown(6);
    }
  }, [isOpen]);

  // QR Countdown simulation timer
  useEffect(() => {
    if (step !== 'qr_simulation') return;

    if (qrCountdown <= 0) {
      completeOrder();
      return;
    }

    const timer = setTimeout(() => {
      setQrCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, qrCountdown]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please provide your full name.';
    }

    // Clean phone number: check for minimum 9-10 digits
    const cleanedPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 9) {
      errors.mobileNumber = 'Please enter a valid mobile number (+63 9XX XXX XXXX).';
    }

    if (!fullAddress.trim()) {
      errors.fullAddress = 'Please enter your complete delivery address.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedFromForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === 'qr_online') {
      setStep('qr_simulation');
      setQrCountdown(6);
    } else {
      completeOrder();
    }
  };

  const completeOrder = () => {
    const orderNumber = `ALDAW-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedPhone = mobileNumber.startsWith('+63')
      ? mobileNumber
      : `+63 ${mobileNumber.replace(/^0+/, '')}`;

    const newOrder: PlacedOrder = {
      orderId: orderNumber,
      items: [...cart],
      customerInfo: {
        fullName: fullName.trim(),
        mobileNumber: formattedPhone,
        fullAddress: fullAddress.trim(),
        notes: notes.trim(),
        paymentMethod,
      },
      subtotal,
      deliveryFee,
      total: totalAmount,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmed',
    };

    setPlacedOrder(newOrder);
    saveLastOrder(newOrder);
    setStep('success');
    onOrderSuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (step !== 'qr_simulation') onClose();
        }}
      />

      {/* Main Card Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border transition-all animate-in fade-in zoom-in-95 duration-200 ${
          isNight
            ? 'bg-[#1D221A] border-[#3E453A] text-[#F7F5F0]'
            : 'bg-[#FDFCF9] border-[#B89C82]/30 text-[#3E453A]'
        }`}
      >
        {/* Top Header */}
        <div
          className={`p-6 border-b flex items-center justify-between ${
            isNight ? 'bg-[#242A20] border-[#3E453A]/70' : 'bg-[#F7F5F0] border-[#B89C82]/20'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#7A8974]/15 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#7A8974]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] block">
                Cafe Aldaw Courtyard Dispatch
              </span>
              <h2 id="checkout-dialog-title" className="font-serif text-xl sm:text-2xl font-bold">
                {step === 'form' && 'Proceed to Checkout'}
                {step === 'qr_simulation' && 'Scan QR Code Payment'}
                {step === 'success' && 'Order Confirmed!'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM (CUSTOMER DETAILS & PAYMENT MODE) */}
        {step === 'form' && (
          <form onSubmit={handleProceedFromForm} className="p-6 sm:p-8 space-y-6">
            {/* Simulation Notification Banner */}
            <div
              className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed ${
                isNight
                  ? 'bg-[#293224] border-[#B89C82]/40 text-[#EED5B7]'
                  : 'bg-[#FAF5EC] border-[#B89C82]/30 text-[#7A6B56]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#B89C82] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Client Demonstration Simulation</span>
                This checkout flow is tailored for Cafe Aldaw's clients to demonstrate the customer
                experience with instant success messaging and simulated QR payment.
              </div>
            </div>

            {/* Order Items Snapshot */}
            <div
              className={`p-4 rounded-2xl border text-xs ${
                isNight ? 'bg-[#23291F] border-[#3E453A]/60' : 'bg-[#F8F6F1] border-[#B89C82]/20'
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-2">
                <span className="uppercase tracking-wider text-[#B89C82]">
                  Order Items ({cart.reduce((a, b) => a + b.quantity, 0)})
                </span>
                <span className="text-[#7A8974] font-serif font-bold text-sm">
                  Total: ₱{totalAmount}
                </span>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                {cart.map((ci) => (
                  <div key={`${ci.item.id}-${ci.selectedOption}`} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[240px]">
                      {ci.quantity}x {ci.item.name} {ci.selectedOption && `(${ci.selectedOption})`}
                    </span>
                    <span className="font-mono">₱{ci.unitPrice * ci.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#7A8974] flex items-center gap-1.5">
                <User className="w-4 h-4" /> Customer Contact & Delivery Details
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#5E6659] dark:text-[#C5CBC1]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maria Santos"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-hidden transition-all ${
                    formErrors.fullName
                      ? 'border-red-500 bg-red-50/20'
                      : isNight
                      ? 'bg-[#242A20] border-[#3E453A] text-white focus:border-[#7A8974]'
                      : 'bg-white border-[#B89C82]/40 text-[#3E453A] focus:border-[#7A8974]'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number (+63) */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#5E6659] dark:text-[#C5CBC1]">
                  Mobile Number (+63) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-[#7A8974] border-r pr-2 border-black/10 dark:border-white/10 select-none">
                    +63
                  </span>
                  <input
                    type="tel"
                    placeholder="966 162 2227"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className={`w-full pl-16 pr-4 py-2.5 rounded-xl border text-sm outline-hidden font-mono transition-all ${
                      formErrors.mobileNumber
                        ? 'border-red-500 bg-red-50/20'
                        : isNight
                        ? 'bg-[#242A20] border-[#3E453A] text-white focus:border-[#7A8974]'
                        : 'bg-white border-[#B89C82]/40 text-[#3E453A] focus:border-[#7A8974]'
                    }`}
                  />
                </div>
                {formErrors.mobileNumber && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Full Delivery Address */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#5E6659] dark:text-[#C5CBC1]">
                  Full Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="House/Unit #, Street, Barangay, Camalig or Legazpi City, Albay"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-hidden transition-all resize-none ${
                    formErrors.fullAddress
                      ? 'border-red-500 bg-red-50/20'
                      : isNight
                      ? 'bg-[#242A20] border-[#3E453A] text-white focus:border-[#7A8974]'
                      : 'bg-white border-[#B89C82]/40 text-[#3E453A] focus:border-[#7A8974]'
                  }`}
                />
                {formErrors.fullAddress && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.fullAddress}
                  </p>
                )}
              </div>

              {/* Special Instructions (Optional) */}
              <div>
                <label className="block text-[11px] font-medium mb-1 text-[#8C9388]">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring doorbell, separate ice, less sugar"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full px-4 py-2 rounded-xl border text-xs outline-hidden ${
                    isNight
                      ? 'bg-[#242A20] border-[#3E453A] text-white'
                      : 'bg-white border-[#B89C82]/30 text-[#3E453A]'
                  }`}
                />
              </div>
            </div>

            {/* TWO CHECKOUT MODES: COD vs SCAN QR CODE */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#7A8974]">
                Choose Checkout Payment Mode
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Mode 1: Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-[#7A8974] bg-[#7A8974]/10 shadow-xs'
                      : isNight
                      ? 'border-[#3E453A] bg-[#242A20] hover:border-[#7A8974]/50'
                      : 'border-[#B89C82]/20 bg-white hover:border-[#7A8974]/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      paymentMethod === 'cod'
                        ? 'bg-[#7A8974] text-white'
                        : 'bg-black/5 dark:bg-white/5 text-[#7A8974]'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-serif text-sm font-bold flex items-center gap-2">
                      <span>Cash on Delivery (COD)</span>
                      {paymentMethod === 'cod' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8974]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#5E6659] dark:text-[#A8B0A5] mt-0.5 leading-relaxed">
                      Pay directly with cash to our courier upon order delivery.
                    </p>
                  </div>
                </div>

                {/* Mode 2: Scan QR Code Online Payment */}
                <div
                  onClick={() => setPaymentMethod('qr_online')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    paymentMethod === 'qr_online'
                      ? 'border-[#7A8974] bg-[#7A8974]/10 shadow-xs'
                      : isNight
                      ? 'border-[#3E453A] bg-[#242A20] hover:border-[#7A8974]/50'
                      : 'border-[#B89C82]/20 bg-white hover:border-[#7A8974]/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      paymentMethod === 'qr_online'
                        ? 'bg-[#7A8974] text-white'
                        : 'bg-black/5 dark:bg-white/5 text-[#B89C82]'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-serif text-sm font-bold flex items-center gap-2">
                      <span>Scan QR Code (Online)</span>
                      {paymentMethod === 'qr_online' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8974]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#5E6659] dark:text-[#A8B0A5] mt-0.5 leading-relaxed">
                      Scan QR Ph (GCash / Maya). Includes live simulated verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total breakdown and submit */}
            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#8C9388] block">Total Amount to Settle</span>
                <span className="font-serif text-2xl font-bold text-[#7A8974]">₱{totalAmount}</span>
                <span className="text-[10px] text-[#8C9388] block">
                  {deliveryFee === 0 ? 'Free Delivery' : 'Includes ₱45 Courtyard Delivery'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2"
              >
                <span>{paymentMethod === 'qr_online' ? 'Proceed to QR Scan' : 'Place COD Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: SCAN QR CODE ONLINE PAYMENT SIMULATION */}
        {step === 'qr_simulation' && (
          <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
            {/* Simulation Header Notice */}
            <div className="w-full p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs shadow-sm">
              <div className="flex items-center justify-center gap-2 font-bold text-sm mb-1 text-amber-800 dark:text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>CLIENT DEMONSTRATION SIMULATION</span>
              </div>
              <p className="leading-relaxed">
                This is just a simulation for Cafe Aldaw. No real money will be charged. The system will
                simulate scanning and auto-confirm payment in{' '}
                <strong className="underline text-amber-800 dark:text-amber-300 font-bold">
                  {qrCountdown} seconds
                </strong>.
              </p>
            </div>

            {/* QR Card Container */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#7A8974]/30 shadow-xl max-w-sm w-full flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-serif font-bold text-lg text-[#3E453A]">Cafe Aldaw QR Ph</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#7A8974] text-white text-[10px] font-bold uppercase tracking-wider">
                  Simulation Mode
                </span>
              </div>

              {/* Graphic QR Code Simulation */}
              <div className="relative w-48 h-48 bg-[#F7F5F0] rounded-2xl p-4 border border-[#B89C82]/30 flex flex-col items-center justify-center shadow-inner mb-4">
                {/* SVG QR Code Pattern */}
                <svg className="w-40 h-40 text-[#3E453A]" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner finders */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#3E453A" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="#F7F5F0" />
                  <rect x="13" y="13" width="10" height="10" fill="#7A8974" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#3E453A" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="#F7F5F0" />
                  <rect x="77" y="13" width="10" height="10" fill="#7A8974" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#3E453A" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="#F7F5F0" />
                  <rect x="13" y="77" width="10" height="10" fill="#7A8974" />

                  {/* Center data pattern blocks */}
                  <rect x="37" y="10" width="8" height="8" rx="1" fill="#3E453A" />
                  <rect x="51" y="10" width="10" height="6" rx="1" fill="#3E453A" />
                  <rect x="37" y="24" width="24" height="6" rx="1" fill="#3E453A" />

                  <rect x="10" y="37" width="6" height="14" rx="1" fill="#3E453A" />
                  <rect x="22" y="42" width="10" height="6" rx="1" fill="#3E453A" />
                  <rect x="37" y="36" width="26" height="26" rx="6" fill="#7A8974" />
                  <rect x="43" y="42" width="14" height="14" rx="3" fill="#F7F5F0" />
                  <rect x="47" y="46" width="6" height="6" fill="#7A8974" />

                  <rect x="69" y="37" width="22" height="6" rx="1" fill="#3E453A" />
                  <rect x="79" y="49" width="12" height="14" rx="1" fill="#3E453A" />

                  <rect x="37" y="68" width="14" height="8" rx="1" fill="#3E453A" />
                  <rect x="57" y="68" width="20" height="6" rx="1" fill="#3E453A" />
                  <rect x="42" y="82" width="24" height="8" rx="1" fill="#3E453A" />
                  <rect x="72" y="80" width="18" height="10" rx="1" fill="#3E453A" />
                </svg>

                {/* Center Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#F7F5F0] border-2 border-[#7A8974] flex items-center justify-center shadow-md">
                    <span className="font-serif font-bold text-xs text-[#7A8974]">A</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-[#8C9388] block">Payee Merchant:</span>
                <span className="font-bold text-xs text-[#3E453A] block">
                  CAFE ALDAW (CAMALIG & LEGAZPI)
                </span>
                <span className="font-serif text-2xl font-bold text-[#7A8974] mt-1 block">
                  ₱{totalAmount}
                </span>
              </div>
            </div>

            {/* Prominent Countdown Indicator & Instant Confirm Button */}
            <div className="flex flex-col items-center gap-3.5 w-full max-w-sm">
              <div className="flex items-center justify-center gap-3 w-full py-3 px-5 rounded-2xl bg-[#7A8974]/15 border border-[#7A8974]/30 text-sm font-bold text-[#7A8974]">
                <Clock className="w-5 h-5 animate-spin" />
                <span>Simulating payment... ({qrCountdown}s remaining)</span>
              </div>

              <p className="text-[11px] text-[#8E968B] italic">
                This is just a simulation. You can wait for the countdown or tap below.
              </p>

              <button
                onClick={completeOrder}
                type="button"
                className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2"
              >
                <span>Instant Confirm & Show Success</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION & ORDER RECEIPT */}
        {step === 'success' && placedOrder && (
          <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center animate-in zoom-in-75 duration-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#B89C82] block mb-1">
                Order Simulation Success • Confirmed
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
                The product has been ordered!
              </h2>
              <p
                className={`text-sm max-w-md mx-auto leading-relaxed ${
                  isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
                }`}
              >
                Your product has been ordered and is now being prepared with Filipino warmth at Cafe
                Aldaw. <strong>Please wait for the arrival</strong> of our delivery rider at your registered
                address!
              </p>
            </div>

            {/* Arrival Notice Banner */}
            <div className="w-full max-w-md p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center gap-2 font-medium">
              <Truck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                Dispatching soon: Estimated arrival in <strong>30–45 minutes</strong>.
              </span>
            </div>

            {/* Order Receipt Card */}
            <div
              className={`w-full max-w-md rounded-2xl p-5 border text-left text-xs space-y-3 ${
                isNight
                  ? 'bg-[#242A20] border-[#3E453A]/80 text-[#D0D4CE]'
                  : 'bg-[#FAF8F5] border-[#B89C82]/30 text-[#4E5649]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2 border-black/10 dark:border-white/10">
                <span className="font-mono font-bold text-[#7A8974] text-sm">
                  #{placedOrder.orderId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">
                  Confirmed
                </span>
              </div>

              {/* Delivery info */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-start gap-2">
                  <User className="w-3.5 h-3.5 text-[#B89C82] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3E453A] dark:text-white">Customer:</strong>{' '}
                    {placedOrder.customerInfo.fullName}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B89C82] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3E453A] dark:text-white">Mobile:</strong>{' '}
                    {placedOrder.customerInfo.mobileNumber}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B89C82] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3E453A] dark:text-white">Address:</strong>{' '}
                    {placedOrder.customerInfo.fullAddress}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-[#B89C82] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3E453A] dark:text-white">Payment Mode:</strong>{' '}
                    {placedOrder.customerInfo.paymentMethod === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : 'Scan QR Code (Online Paid - Simulated)'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#B89C82] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3E453A] dark:text-white">Estimated Arrival:</strong>{' '}
                    30 – 45 Minutes (Courtyard Dispatch)
                  </span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="border-t pt-2 border-black/10 dark:border-white/10 space-y-1">
                {placedOrder.items.map((it) => (
                  <div
                    key={`${it.item.id}-${it.selectedOption}`}
                    className="flex justify-between text-[11px]"
                  >
                    <span>
                      {it.quantity}x {it.item.name} {it.selectedOption && `(${it.selectedOption})`}
                    </span>
                    <span className="font-mono">₱{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-2 border-black/10 dark:border-white/10 flex justify-between font-bold text-sm text-[#7A8974]">
                <span>Total Settled:</span>
                <span>₱{placedOrder.total}</span>
              </div>
            </div>

            {/* Close / Return Button */}
            <button
              onClick={onClose}
              type="button"
              className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors shadow-md"
            >
              Done & Return to Sanctuary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

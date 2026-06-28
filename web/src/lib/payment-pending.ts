const PENDING_PAYMENT_KEY = "matrix-pending-payment";

export function setPendingPaymentId(paymentId: string): void {
  sessionStorage.setItem(PENDING_PAYMENT_KEY, paymentId);
}

export function getPendingPaymentId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_PAYMENT_KEY);
}

export function clearPendingPaymentId(): void {
  sessionStorage.removeItem(PENDING_PAYMENT_KEY);
}

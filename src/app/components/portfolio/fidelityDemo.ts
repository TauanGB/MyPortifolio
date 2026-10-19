// A local illustration of purchase_count only. No backend or persistence.
export const DEMO_GOAL = 5;
export type DemoState = { purchases: number; redemptions: number; message: string };
export type DemoAction = 'purchase' | 'redeem' | 'reset';
export const initialDemoState: DemoState = {
  purchases: 3,
  redemptions: 0,
  message: 'Ana tem 3 de 5 compras. Registre mais 2 para liberar a recompensa.',
};

export function fidelityDemoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action === 'reset') return { ...initialDemoState, message: 'Simulação reiniciada. Ana voltou a 3 de 5 compras e nenhum resgate.' };
  if (action === 'redeem') {
    if (state.purchases < DEMO_GOAL) return state;
    return { purchases: 0, redemptions: state.redemptions + 1, message: 'Recompensa fictícia resgatada! Um novo ciclo começa com 0 de 5 compras.' };
  }
  const purchases = state.purchases + 1;
  const remaining = Math.max(DEMO_GOAL - purchases, 0);
  return {
    ...state,
    purchases,
    message: remaining === 0
      ? `${purchases} compras registradas. Meta atingida! A recompensa fictícia pode ser resgatada.`
      : `${purchases} de 5 compras. ${remaining === 1 ? 'Falta 1 compra' : `Faltam ${remaining} compras`} para liberar a recompensa.`,
  };
}

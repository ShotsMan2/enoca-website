import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Step = 1 | 2 | 3 | 4;

interface ConfiguratorState {
  step: Step;
  selections: {
    companySize: string;
    primaryGoal: string;
    preferredTech: string[];
  };
  setStep: (step: Step) => void;
  nextStep: () => void;
  setCompanySize: (size: string) => void;
  setPrimaryGoal: (goal: string) => void;
  toggleTech: (tech: string) => void;
  reset: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      step: 1,
      selections: {
        companySize: "",
        primaryGoal: "",
        preferredTech: [],
      },
      setStep: (step) => set({ step }),
      nextStep: () => {
        const currentStep = get().step;
        if (currentStep < 4) set({ step: (currentStep + 1) as Step });
      },
      setCompanySize: (size) =>
        set((state) => ({ selections: { ...state.selections, companySize: size } })),
      setPrimaryGoal: (goal) =>
        set((state) => ({ selections: { ...state.selections, primaryGoal: goal } })),
      toggleTech: (tech) =>
        set((state) => {
          const isSelected = state.selections.preferredTech.includes(tech);
          const newTechs = isSelected
            ? state.selections.preferredTech.filter((t) => t !== tech)
            : [...state.selections.preferredTech, tech];
          return { selections: { ...state.selections, preferredTech: newTechs } };
        }),
      reset: () =>
        set({
          step: 1,
          selections: { companySize: "", primaryGoal: "", preferredTech: [] },
        }),
    }),
    {
      name: 'enoca-configurator-storage', // localStorage'da tutulacak isim
    }
  )
);

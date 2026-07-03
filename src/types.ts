import { SavedCalculation } from './data';

export type AppView = 'home' | 'calculator' | 'bag_calculator' | 'guide' | 'saved' | 'settings';

export interface AppState {
  currentView: AppView;
  savedCalculations: SavedCalculation[];
  darkMode: boolean;
  language: 'English' | 'Hindi';
}

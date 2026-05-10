/**
 * Portfolio palette (aligned with Retailerz `AppColors` shape for `appTheme`).
 */

export interface AppColors {
  statusBarColor: 'light-content' | 'dark-content';
  statusBarReverseColor: 'light-content' | 'dark-content';
  transparent: string;
  darkTransparent: string;
  white: string;
  black: string;
  black1: string;
  brand: string;
  brand2: string;
  brand3: string;
  brand4: string;
  brand5: string;
  brand7: string;
  blue: string;
  grey: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey5: string;
  darkGrey: string;
  darkGrey1: string;
  lightGrey: string;
  background?: string;
  success: string;
  pending: string;
  error: string;
  red: string;
  orange: string;
  purple: string;
  linearGradient1: string;
  linearGradient2: string;
}

export const Colors: {
  light: AppColors;
  dark: AppColors;
  custom: AppColors;
} = {
  light: {
    statusBarColor: 'dark-content',
    statusBarReverseColor: 'light-content',
    transparent: 'transparent',
    darkTransparent: 'rgba(0, 0, 0, 0.3)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(20, 20, 20, 1)',
    black1: 'rgba(0, 0, 0, 1)',
    brand: 'rgba(56, 43, 96, 1)',
    brand2: 'rgba(83, 61, 150, 1)',
    brand3: 'rgba(138, 112, 218, 1)',
    brand4: 'rgb(197, 181, 246)',
    brand5: 'rgba(218, 206, 255, 1)',
    brand7: 'rgba(226, 217, 255, 1)',
    blue: 'rgb(36, 114, 183)',
    grey: 'rgba(108, 108, 112, 1)',
    grey1: 'rgba(142, 142, 147, 1)',
    grey2: 'rgba(174, 174, 178, 1)',
    grey3: 'rgba(188, 188, 192, 1)',
    grey5: 'rgba(235, 235, 240, 1)',
    darkGrey: 'rgba(42, 42, 42, 1)',
    darkGrey1: 'rgba(131, 150, 172, 1)',
    lightGrey: 'rgba(223, 228, 234, 1)',
    success: 'rgba(5, 185, 23, 1)',
    pending: 'rgba(255, 138, 20, 1)',
    error: 'rgb(172, 31, 31)',
    red: 'rgba(202, 0, 0, 1)',
    orange: 'rgba(227, 148, 0, 1)',
    purple: 'rgba(151, 71, 255, 1)',
    linearGradient1: 'rgba(51, 78, 172, 0.8)',
    linearGradient2: 'rgba(0, 6, 25, 1)',
  },

  dark: {
    statusBarColor: 'light-content',
    statusBarReverseColor: 'dark-content',
    transparent: 'transparent',
    darkTransparent: 'rgba(0, 0, 0, 0.3)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(20, 20, 20, 1)',
    black1: 'rgba(0, 0, 0, 1)',
    brand: 'rgba(56, 43, 96, 1)',
    brand2: 'rgba(83, 61, 150, 1)',
    brand3: 'rgba(138, 112, 218, 1)',
    brand4: 'rgb(197, 181, 246)',
    brand5: 'rgba(218, 206, 255, 1)',
    brand7: 'rgba(226, 217, 255, 1)',
    blue: 'rgb(36, 114, 183)',
    grey: 'rgba(108, 108, 112, 1)',
    grey1: 'rgba(142, 142, 147, 1)',
    grey2: 'rgba(174, 174, 178, 1)',
    grey3: 'rgba(188, 188, 192, 1)',
    grey5: 'rgba(235, 235, 240, 1)',
    darkGrey: 'rgba(42, 42, 42, 1)',
    darkGrey1: 'rgba(131, 150, 172, 1)',
    lightGrey: 'rgba(223, 228, 234, 1)',
    success: 'rgba(5, 185, 23, 1)',
    pending: 'rgba(255, 138, 20, 1)',
    error: 'rgb(172, 31, 31)',
    red: 'rgba(202, 0, 0, 1)',
    orange: 'rgba(227, 148, 0, 1)',
    purple: 'rgba(151, 71, 255, 1)',
    linearGradient1: 'rgba(51, 78, 172, 0.8)',
    linearGradient2: 'rgba(0, 6, 25, 1)',
  },

  custom: {
    statusBarColor: 'light-content',
    statusBarReverseColor: 'dark-content',
    transparent: 'transparent',
    darkTransparent: 'rgba(0, 0, 0, 0.3)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(20, 20, 20, 1)',
    black1: 'rgba(0, 0, 0, 1)',
    brand: 'rgba(56, 43, 96, 1)',
    brand2: 'rgba(83, 61, 150, 1)',
    brand3: 'rgba(138, 112, 218, 1)',
    brand4: 'rgb(197, 181, 246)',
    brand5: 'rgba(218, 206, 255, 1)',
    brand7: 'rgba(226, 217, 255, 1)',
    blue: 'rgb(36, 114, 183)',
    grey: 'rgba(108, 108, 112, 1)',
    grey1: 'rgba(142, 142, 147, 1)',
    grey2: 'rgba(174, 174, 178, 1)',
    grey3: 'rgba(188, 188, 192, 1)',
    grey5: 'rgba(235, 235, 240, 1)',
    darkGrey: 'rgba(42, 42, 42, 1)',
    darkGrey1: 'rgba(131, 150, 172, 1)',
    lightGrey: 'rgba(223, 228, 234, 1)',
    success: 'rgba(5, 185, 23, 1)',
    pending: 'rgba(255, 138, 20, 1)',
    error: 'rgb(172, 31, 31)',
    red: 'rgba(202, 0, 0, 1)',
    orange: 'rgba(227, 148, 0, 1)',
    purple: 'rgba(151, 71, 255, 1)',
    linearGradient1: 'rgba(51, 78, 172, 0.8)',
    linearGradient2: 'rgba(0, 6, 25, 1)',
  },
};

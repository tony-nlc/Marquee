export interface MarqueeSettings {
  text: string;
  fontFamily: string;
  fontSize: number;
  bgColor: string;
  isBgRainbow: boolean;
  textColor: string;
  isTextRainbow: boolean;
  direction: 'horizontal' | 'vertical';
  speed: number;
}
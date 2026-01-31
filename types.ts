export enum AppView {
  INTRO = 'INTRO',
  TIMELINE = 'TIMELINE',
  VAULT = 'VAULT',
  FLOWER = 'FLOWER',
  EMOTIONAL = 'EMOTIONAL',
  BIRTHDAY_LETTER = 'BIRTHDAY_LETTER'
}

export interface TimelineEvent {
  id: string;
  stage: number;
  title: string;
  description: string;
  image: string;
  date?: string;
}

export interface EmotionalPage {
  id: string;
  title: string;
  content: string[];
}
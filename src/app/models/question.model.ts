export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  topicId: string;
  text: string;
  imageUrl?: string;
  soundUrl?: string;
  answers: Answer[];
  difficulty: number; // 1-10 scale
}

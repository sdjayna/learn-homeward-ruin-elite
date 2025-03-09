import { Card, Rating } from 'ts-fsrs';
import { IPreview } from 'ts-fsrs/dist/fsrs';

export interface StudyItem {
  questionId: string;
  card: Card;
  lastReviewed?: Date;
  nextReview?: Date;
  schedulingInfo?: IPreview;
  correctCount: number;
  incorrectCount: number;
}

export interface StudySession {
  id: string;
  date: Date;
  items: StudyItem[];
  completed: boolean;
}

export interface UserProgress {
  userId: string;
  targetExamDate?: Date;
  studyItems: { [questionId: string]: StudyItem };
  sessions: StudySession[];
}

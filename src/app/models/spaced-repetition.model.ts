import { Card, Rating, SchedulingInfo } from 'ts-fsrs';

export interface StudyItem {
  questionId: string;
  card: Card;
  lastReviewed?: Date;
  nextReview?: Date;
  schedulingInfo?: SchedulingInfo;
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

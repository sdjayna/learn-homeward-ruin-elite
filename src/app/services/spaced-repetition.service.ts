import { Injectable } from '@angular/core';
import { FSRS, Card, Rating } from 'ts-fsrs';
import { IParameters } from 'ts-fsrs/dist/fsrs';
import { StudyItem, UserProgress } from '../models/spaced-repetition.model';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpacedRepetitionService {
  private fsrs: FSRS;
  private userProgressSubject = new BehaviorSubject<UserProgress | null>(null);
  
  constructor() {
    // Initialize FSRS with default parameters
    const params: IParameters = {
      request_retention: 0.9,
      maximum_interval: 36500,
      w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
    };
    this.fsrs = new FSRS(params);
    
    // Load user progress from localStorage
    this.loadUserProgress();
  }

  getUserProgress(): Observable<UserProgress | null> {
    return this.userProgressSubject.asObservable();
  }

  setTargetExamDate(date: Date): void {
    const progress = this.userProgressSubject.value;
    if (progress) {
      progress.targetExamDate = date;
      this.userProgressSubject.next(progress);
      this.saveUserProgress();
    }
  }

  addQuestion(question: Question): void {
    const progress = this.userProgressSubject.value;
    if (progress && !progress.studyItems[question.id]) {
      // Create a new card for FSRS
      const card = {} as Card;
      
      progress.studyItems[question.id] = {
        questionId: question.id,
        card,
        correctCount: 0,
        incorrectCount: 0
      };
      
      this.userProgressSubject.next(progress);
      this.saveUserProgress();
    }
  }

  recordAnswer(questionId: string, isCorrect: boolean): void {
    const progress = this.userProgressSubject.value;
    if (!progress || !progress.studyItems[questionId]) return;
    
    const studyItem = progress.studyItems[questionId];
    
    // Update stats
    if (isCorrect) {
      studyItem.correctCount++;
    } else {
      studyItem.incorrectCount++;
    }
    
    // Convert boolean to FSRS rating (1-4)
    // 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
    const rating = isCorrect ? Rating.Good : Rating.Again;
    
    // Get scheduling info from FSRS
    const now = new Date();
    const schedulingInfo = this.fsrs.repeat(studyItem.card, rating);
    
    // Update study item with new scheduling info
    studyItem.lastReviewed = now;
    studyItem.nextReview = new Date(now.getTime() + schedulingInfo.scheduledDays * 24 * 60 * 60 * 1000);
    studyItem.schedulingInfo = schedulingInfo;
    studyItem.card = schedulingInfo.card as Card;
    
    // Save progress
    this.userProgressSubject.next(progress);
    this.saveUserProgress();
  }

  getNextQuestions(count: number = 10): string[] {
    const progress = this.userProgressSubject.value;
    if (!progress) return [];
    
    const now = new Date();
    
    // Get all study items that are due or new
    const dueItems = Object.values(progress.studyItems)
      .filter(item => !item.nextReview || item.nextReview <= now)
      .sort((a, b) => {
        // Prioritize items that have never been reviewed
        if (!a.lastReviewed && !b.lastReviewed) return 0;
        if (!a.lastReviewed) return -1;
        if (!b.lastReviewed) return 1;
        
        // Then prioritize by due date (oldest first)
        if (!a.nextReview && !b.nextReview) return 0;
        if (!a.nextReview) return -1;
        if (!b.nextReview) return 1;
        
        return a.nextReview.getTime() - b.nextReview.getTime();
      });
    
    // Return the question IDs for the next batch
    return dueItems.slice(0, count).map(item => item.questionId);
  }

  private loadUserProgress(): void {
    try {
      const savedProgress = localStorage.getItem('userProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress) as UserProgress;
        
        // Convert date strings back to Date objects
        if (progress.targetExamDate) {
          progress.targetExamDate = new Date(progress.targetExamDate);
        }
        
        Object.values(progress.studyItems).forEach(item => {
          if (item.lastReviewed) {
            item.lastReviewed = new Date(item.lastReviewed);
          }
          if (item.nextReview) {
            item.nextReview = new Date(item.nextReview);
          }
          
          // Recreate Card objects
          item.card = item.card as Card;
        });
        
        progress.sessions.forEach(session => {
          session.date = new Date(session.date);
        });
        
        this.userProgressSubject.next(progress);
      } else {
        // Initialize with empty progress
        this.userProgressSubject.next({
          userId: 'user1', // In a real app, this would be the authenticated user's ID
          studyItems: {},
          sessions: []
        });
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
      // Initialize with empty progress on error
      this.userProgressSubject.next({
        userId: 'user1',
        studyItems: {},
        sessions: []
      });
    }
  }

  private saveUserProgress(): void {
    try {
      const progress = this.userProgressSubject.value;
      if (progress) {
        localStorage.setItem('userProgress', JSON.stringify(progress));
      }
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  }
}

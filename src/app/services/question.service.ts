import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // This would typically come from an API in a real application
  private questions: Question[] = [
    // Mathematics - Number Operations
    {
      id: 'q1',
      topicId: 'math-1',
      text: 'What is 24 × 7?',
      answers: [
        { id: 'a1', text: '168', isCorrect: true },
        { id: 'a2', text: '158', isCorrect: false },
        { id: 'a3', text: '178', isCorrect: false },
        { id: 'a4', text: '148', isCorrect: false }
      ],
      difficulty: 3
    },
    // Mathematics - Fractions
    {
      id: 'q2',
      topicId: 'math-2',
      text: 'Which of these is equal to 3/4?',
      answers: [
        { id: 'a1', text: '0.75', isCorrect: true },
        { id: 'a2', text: '0.7', isCorrect: false },
        { id: 'a3', text: '0.8', isCorrect: false },
        { id: 'a4', text: '0.65', isCorrect: false }
      ],
      difficulty: 4
    },
    // English - Reading Comprehension
    {
      id: 'q3',
      topicId: 'eng-1',
      text: 'Read the passage: "The sun was setting behind the mountains, casting long shadows across the valley. Birds were returning to their nests, and a gentle breeze rustled the leaves." What time of day is described?',
      answers: [
        { id: 'a1', text: 'Evening', isCorrect: true },
        { id: 'a2', text: 'Morning', isCorrect: false },
        { id: 'a3', text: 'Noon', isCorrect: false }
      ],
      difficulty: 2
    },
    // Verbal Reasoning - Word Relationships
    {
      id: 'q4',
      topicId: 'vr-1',
      text: 'Hot is to Cold as High is to:',
      answers: [
        { id: 'a1', text: 'Low', isCorrect: true },
        { id: 'a2', text: 'Tall', isCorrect: false },
        { id: 'a3', text: 'Up', isCorrect: false },
        { id: 'a4', text: 'Sky', isCorrect: false }
      ],
      difficulty: 3
    },
    // Non-Verbal Reasoning - Patterns
    {
      id: 'q5',
      topicId: 'nvr-1',
      text: 'Which shape comes next in the sequence?',
      imageUrl: 'assets/images/pattern-sequence.png',
      answers: [
        { id: 'a1', text: 'Square', isCorrect: false },
        { id: 'a2', text: 'Triangle', isCorrect: true },
        { id: 'a3', text: 'Circle', isCorrect: false },
        { id: 'a4', text: 'Pentagon', isCorrect: false }
      ],
      difficulty: 5
    }
  ];

  constructor() { }

  getQuestions(): Observable<Question[]> {
    return of(this.questions);
  }

  getQuestionsByTopic(topicId: string): Observable<Question[]> {
    return of(this.questions.filter(q => q.topicId === topicId));
  }

  getQuestionById(id: string): Observable<Question | undefined> {
    return of(this.questions.find(q => q.id === id));
  }

  getQuestionsByIds(ids: string[]): Observable<Question[]> {
    return of(this.questions.filter(q => ids.includes(q.id)));
  }
}

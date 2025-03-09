import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionAnswerComponent } from '../../components/question-answer/question-answer.component';
import { Question, Answer } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { SpacedRepetitionService } from '../../services/spaced-repetition.service';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, QuestionAnswerComponent],
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  currentQuestion: Question | null = null;
  questionsQueue: Question[] = [];
  questionsCompleted = 0;
  loading = true;
  sessionComplete = false;
  
  constructor(
    private questionService: QuestionService,
    private spacedRepetitionService: SpacedRepetitionService
  ) { }
  
  ngOnInit(): void {
    this.loadNextQuestions();
  }
  
  loadNextQuestions(): void {
    this.loading = true;
    
    // Get next question IDs from spaced repetition service
    const nextQuestionIds = this.spacedRepetitionService.getNextQuestions(5);
    
    if (nextQuestionIds.length === 0) {
      this.sessionComplete = true;
      this.loading = false;
      return;
    }
    
    // Load the actual questions
    this.questionService.getQuestionsByIds(nextQuestionIds).subscribe(questions => {
      this.questionsQueue = questions;
      this.showNextQuestion();
      this.loading = false;
    });
  }
  
  showNextQuestion(): void {
    if (this.questionsQueue.length > 0) {
      this.currentQuestion = this.questionsQueue.shift() || null;
    } else {
      this.loadNextQuestions();
    }
  }
  
  onAnswerSelected(answer: Answer): void {
    if (!this.currentQuestion) return;
    
    // Record the answer in the spaced repetition system
    this.spacedRepetitionService.recordAnswer(
      this.currentQuestion.id,
      answer.isCorrect
    );
    
    this.questionsCompleted++;
    
    // Wait a moment to show feedback before moving to next question
    setTimeout(() => {
      this.showNextQuestion();
    }, 2000);
  }
  
  startNewSession(): void {
    this.sessionComplete = false;
    this.questionsCompleted = 0;
    this.loadNextQuestions();
  }
}

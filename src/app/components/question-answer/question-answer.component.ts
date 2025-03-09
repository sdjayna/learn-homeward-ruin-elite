import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question, Answer } from '../../models/question.model';
import { TranslationStructure } from '../../i18n/translations';

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  @Input() question: Question | null = null;
  @Input() translations!: TranslationStructure;
  @Output() answerSelected = new EventEmitter<Answer>();
  
  selectedAnswer: Answer | null = null;
  answered = false;
  
  constructor() { }
  
  ngOnInit(): void {
    this.resetState();
  }
  
  selectAnswer(answer: Answer): void {
    if (this.answered) return;
    
    this.selectedAnswer = answer;
    this.answered = true;
    this.answerSelected.emit(answer);
    
    // Play sound if correct/incorrect
    this.playSound(answer.isCorrect);
  }
  
  resetState(): void {
    this.selectedAnswer = null;
    this.answered = false;
  }
  
  getAnswerClass(answer: Answer): string {
    if (!this.answered) return '';
    
    if (answer.isCorrect) {
      return 'correct';
    }
    
    if (answer === this.selectedAnswer) {
      return 'incorrect';
    }
    
    return '';
  }
  
  playSound(correct: boolean): void {
    const audio = new Audio();
    audio.src = correct ? 'assets/sounds/correct.mp3' : 'assets/sounds/incorrect.mp3';
    audio.load();
    audio.play().catch(error => console.error('Error playing sound:', error));
  }
  
  getCorrectAnswerText(): string {
    if (!this.question || !this.question.answers) return '';
    const correctAnswer = this.question.answers.find(a => a.isCorrect);
    return correctAnswer ? correctAnswer.text : '';
  }
}

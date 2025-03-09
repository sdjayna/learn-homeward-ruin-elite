import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpacedRepetitionService } from '../../services/spaced-repetition.service';
import { QuestionService } from '../../services/question.service';
import { UserProgress, StudyItem } from '../../models/spaced-repetition.model';
import { Question } from '../../models/question.model';
import { SUBJECTS } from '../../models/subject.model';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { translations, SupportedLanguages, TranslationStructure } from '../../i18n/translations';

interface TopicProgress {
  topicId: string;
  topicName: string;
  subjectName: string;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  masteryPercentage: number;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  userProgress: UserProgress | null = null;
  topicProgress: TopicProgress[] = [];
  daysUntilExam: number | null = null;
  totalMasteryPercentage: number = 0;
  translations!: TranslationStructure;
  
  constructor(
    private spacedRepetitionService: SpacedRepetitionService,
    private questionService: QuestionService
  ) { }
  
  ngOnInit(): void {
    // Get the current language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage') || 'en';
    this.updateTranslations(storedLang);
    
    // Listen for language changes
    window.addEventListener('languageChange', (e: any) => {
      if (e.detail && e.detail.language) {
        this.updateTranslations(e.detail.language);
      }
    });
    
    this.loadProgress();
  }
  
  updateTranslations(lang: string): void {
    const safeLanguage = (lang in translations) ? lang as SupportedLanguages : 'en';
    this.translations = translations[safeLanguage];
  }
  
  loadProgress(): void {
    this.spacedRepetitionService.getUserProgress().subscribe(progress => {
      this.userProgress = progress;
      
      if (progress) {
        // Calculate days until exam
        if (progress.targetExamDate) {
          const today = new Date();
          const examDate = new Date(progress.targetExamDate);
          const diffTime = examDate.getTime() - today.getTime();
          this.daysUntilExam = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        
        // Get all questions to calculate topic progress
        this.questionService.getQuestions().subscribe(questions => {
          this.calculateTopicProgress(progress, questions);
        });
      }
    });
  }
  
  calculateTopicProgress(progress: UserProgress, questions: Question[]): void {
    // Group questions by topic
    const questionsByTopic: { [topicId: string]: Question[] } = {};
    questions.forEach(question => {
      if (!questionsByTopic[question.topicId]) {
        questionsByTopic[question.topicId] = [];
      }
      questionsByTopic[question.topicId].push(question);
    });
    
    // Create topic progress objects
    this.topicProgress = [];
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalQuestions = 0;
    
    Object.entries(questionsByTopic).forEach(([topicId, topicQuestions]) => {
      // Find topic and subject names
      let topicName = 'Unknown Topic';
      let subjectName = 'Unknown Subject';
      
      for (const subject of SUBJECTS) {
        const topic = subject.topics.find(t => t.id === topicId);
        if (topic) {
          topicName = topic.name;
          subjectName = subject.name;
          break;
        }
      }
      
      // Calculate progress for this topic
      let correctCount = 0;
      let incorrectCount = 0;
      
      topicQuestions.forEach(question => {
        const studyItem = progress.studyItems[question.id];
        if (studyItem) {
          correctCount += studyItem.correctCount;
          incorrectCount += studyItem.incorrectCount;
        }
      });
      
      totalCorrect += correctCount;
      totalIncorrect += incorrectCount;
      totalQuestions += topicQuestions.length;
      
      // Calculate mastery percentage
      const totalAttempts = correctCount + incorrectCount;
      const masteryPercentage = totalAttempts > 0 
        ? Math.round((correctCount / totalAttempts) * 100) 
        : 0;
      
      this.topicProgress.push({
        topicId,
        topicName,
        subjectName,
        correctCount,
        incorrectCount,
        totalQuestions: topicQuestions.length,
        masteryPercentage
      });
    });
    
    // Sort by mastery percentage (ascending, so weakest topics first)
    this.topicProgress.sort((a, b) => a.masteryPercentage - b.masteryPercentage);
    
    // Calculate overall mastery
    const totalAttempts = totalCorrect + totalIncorrect;
    this.totalMasteryPercentage = totalAttempts > 0 
      ? Math.round((totalCorrect / totalAttempts) * 100) 
      : 0;
  }
  
  getMasteryColorClass(percentage: number): string {
    if (percentage < 50) return 'mastery-low';
    if (percentage < 75) return 'mastery-medium';
    return 'mastery-high';
  }
}

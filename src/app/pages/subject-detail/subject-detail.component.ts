import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, SubjectType, SUBJECTS, Topic } from '../../models/subject.model';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';
import { map } from 'rxjs/operators';
import { translations, SupportedLanguages, TranslationStructure } from '../../i18n/translations';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  subject: Subject | undefined;
  selectedTopic: Topic | null = null;
  topicQuestions: Question[] = [];
  translations!: TranslationStructure;
  
  constructor(
    private route: ActivatedRoute,
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
    
    this.route.paramMap.subscribe(params => {
      const subjectType = params.get('type');
      if (subjectType) {
        this.subject = SUBJECTS.find(s => s.type === subjectType);
        this.selectedTopic = null;
        this.topicQuestions = [];
      }
    });
  }
  
  updateTranslations(lang: string): void {
    const safeLanguage = (lang in translations) ? lang as SupportedLanguages : 'en';
    this.translations = translations[safeLanguage];
  }
  
  selectTopic(topic: Topic): void {
    this.selectedTopic = topic;
    this.loadTopicQuestions(topic.id);
  }
  
  loadTopicQuestions(topicId: string): void {
    this.questionService.getQuestionsByTopic(topicId).subscribe(questions => {
      this.topicQuestions = questions;
    });
  }
  
  getSubjectIcon(type: SubjectType): string {
    switch (type) {
      case SubjectType.Mathematics:
        return '➗';
      case SubjectType.English:
        return '📝';
      case SubjectType.VerbalReasoning:
        return '🔤';
      case SubjectType.NonVerbalReasoning:
        return '🧩';
      default:
        return '📚';
    }
  }
}

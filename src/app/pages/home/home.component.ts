import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, SubjectType, SUBJECTS } from '../../models/subject.model';
import { SpacedRepetitionService } from '../../services/spaced-repetition.service';
import { translations, SupportedLanguages, TranslationStructure } from '../../i18n/translations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subjects = SUBJECTS;
  appTitle = '';
  translations!: TranslationStructure;
  
  constructor(private spacedRepetitionService: SpacedRepetitionService) { }
  
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
  }
  
  updateTranslations(lang: string): void {
    const safeLanguage = (lang in translations) ? lang as SupportedLanguages : 'en';
    this.appTitle = translations[safeLanguage].app.title;
    this.translations = translations[safeLanguage];
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

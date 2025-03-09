import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { translations, SupportedLanguages, TranslationStructure } from '../../i18n/translations';
import { SpacedRepetitionService } from '../../services/spaced-repetition.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedLanguage: string = 'en';
  appTitle = '';
  translations!: TranslationStructure;
  targetExamDate: string = '';
  
  constructor(private spacedRepetitionService: SpacedRepetitionService) { }
  
  ngOnInit(): void {
    // Get the current language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && ['en', 'fr', 'es'].includes(storedLang)) {
      this.selectedLanguage = storedLang;
    }
    
    this.updateTranslations(this.selectedLanguage);
    
    // Load target exam date
    this.spacedRepetitionService.getUserProgress().subscribe(progress => {
      if (progress?.targetExamDate) {
        this.targetExamDate = progress.targetExamDate.toISOString().split('T')[0];
      } else {
        // Set default target date to September 13th, 2025
        const defaultDate = new Date('2025-09-13');
        this.targetExamDate = defaultDate.toISOString().split('T')[0];
      }
    });
  }
  
  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    
    // Store the preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update the app title and translations
    this.updateTranslations(lang);
    
    // Dispatch a custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: lang } 
    }));
    
    // Call the global changeLanguage function if it exists
    const win = window as any;
    if (typeof win.changeLanguage === 'function') {
      win.changeLanguage(lang);
    }
  }
  
  updateTranslations(lang: string): void {
    const safeLanguage = (lang in translations) ? lang as SupportedLanguages : 'en';
    this.appTitle = translations[safeLanguage].app.title;
    this.translations = translations[safeLanguage];
  }
  
  updateTargetDate(): void {
    if (this.targetExamDate) {
      this.spacedRepetitionService.setTargetExamDate(new Date(this.targetExamDate));
    }
  }
}

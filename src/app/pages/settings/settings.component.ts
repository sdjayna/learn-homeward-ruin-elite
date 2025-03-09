import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { translations, SupportedLanguages, TranslationStructure } from '../../i18n/translations';

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
  
  constructor() { }
  
  ngOnInit(): void {
    // Get the current language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && ['en', 'fr', 'es'].includes(storedLang)) {
      this.selectedLanguage = storedLang;
    }
    
    this.updateTranslations(this.selectedLanguage);
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
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { translations, SupportedLanguages } from '../../i18n/translations';

@Component({
  selector: 'app-desktop-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './desktop-nav.component.html',
  styleUrls: ['./desktop-nav.component.scss']
})
export class DesktopNavComponent implements OnInit {
  appTitle = '';
  
  constructor() { }
  
  ngOnInit(): void {
    // Get the current language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage') || 'en';
    this.updateTitle(storedLang);
    
    // Listen for language changes
    window.addEventListener('languageChange', (e: any) => {
      if (e.detail && e.detail.language) {
        this.updateTitle(e.detail.language);
      }
    });
  }
  
  updateTitle(lang: string): void {
    const safeLanguage = (lang in translations) ? lang as SupportedLanguages : 'en';
    this.appTitle = translations[safeLanguage].app.title;
  }
}

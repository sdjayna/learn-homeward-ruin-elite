import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { DesktopNavComponent } from './components/desktop-nav/desktop-nav.component';
import { translations, SupportedLanguages } from './i18n/translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MobileNavComponent, DesktopNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '';
  copyright = '';
  
  ngOnInit() {
    // Get the current language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage') || 'en';
    this.updateTitle(storedLang);
    
    // Set the document title
    document.title = this.title;
    
    // Listen for language changes
    window.addEventListener('languageChange', (e: any) => {
      if (e.detail && e.detail.language) {
        this.updateTitle(e.detail.language);
        // Update document title when language changes
        document.title = this.title;
      }
    });
    
    // Check if service worker update is available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        console.debug('PWA: Service Worker ready');
      });
      
      // Listen for service worker updates
      window.addEventListener('beforeinstallprompt', (e) => {
        console.debug('PWA: App can be installed');
      });
    }
  }
  
  updateTitle(lang: string): void {
    const safeLanguage = (lang in translations) ? lang as SupportedLanguages : 'en';
    this.title = translations[safeLanguage].app.title;
    this.copyright = translations[safeLanguage].app.copyright;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedLanguage: string = 'en';
  
  constructor() { }
  
  ngOnInit(): void {
    // Get the current language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && ['en', 'fr', 'es'].includes(storedLang)) {
      this.selectedLanguage = storedLang;
    }
  }
  
  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    
    // Store the preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Call the global changeLanguage function if it exists
    const win = window as any;
    if (typeof win.changeLanguage === 'function') {
      win.changeLanguage(lang);
    }
  }
}

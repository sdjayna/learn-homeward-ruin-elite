import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MobileNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Learning App';
  
  ngOnInit() {
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
}

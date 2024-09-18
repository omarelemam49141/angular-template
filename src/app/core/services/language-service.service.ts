import { SessionStorageService } from './session-storage.service';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  //observables
  private isLangArabic = new Subject<boolean>;

  //injection
  private sessionStorageService = inject(SessionStorageService);

  //life cycle
  constructor() {
    this.setLanguageInLocalStorage();
  }

  //methods
  setCurrentLanguageSubject(lang: string) {
    this.isLangArabic.next(lang === 'ar');
  }
  changeCurrentLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.setCurrentLanguageSubject(lang);
    this.reloadCurrentRoute();
  }
  setLanguageInLocalStorage(): void {
    let lang = this.sessionStorageService.lang;
    if (!lang) {
      localStorage.setItem('lang', 'en');
    } else {
      localStorage.setItem('lang', 'ar');
    }
    this.setCurrentLanguageSubject(lang);
  }
  getIsLangArabic$(): Observable<boolean> {
    return this.isLangArabic.asObservable();
  }

  getCurrentLanguage(): string {
    return localStorage.getItem('lang') || 'en';
  }

  reloadCurrentRoute(): void {
    window.location.reload();
  }
}

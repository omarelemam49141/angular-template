import { SessionStorageService } from './session-storage.service';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  //observables
  private isLangArabic = new Subject<boolean>;

  //injection
  private translateService = inject(TranslateService);

  //life cycle
  constructor() {
    this.setLanguageInLocalStorage();
  }

  //methods
  setBodyDirection(lang: string) {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  setCurrentLanguageSubject(lang: string) {
    this.isLangArabic.next(lang === 'ar');
  }
  changeCurrentLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.setCurrentLanguageSubject(lang);
    this.setBodyDirection(lang);
  }
  setLanguageInLocalStorage(): void {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      lang = 'en';
      localStorage.setItem('lang', 'en');
      this.translateService.use('en');
    } else {
      localStorage.setItem('lang', lang);
      this.translateService.use(lang);
    }
    this.setCurrentLanguageSubject(lang);
    this.setBodyDirection(lang);
  }
  getIsLangArabic$(): Observable<boolean> {
    return this.isLangArabic.asObservable();
  }

  getCurrentLanguage(): string {
    return localStorage.getItem('lang') || 'en';
  }
}

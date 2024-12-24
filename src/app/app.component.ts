import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';
import { sharedImports } from './shared/imports/sharedImports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //properties
  title = 'embeded-store-front';

  //injection
  private translateService = inject(TranslateService);
  private languageService = inject(LanguageService);

  //life cycle
  constructor() {
    this.addSupportedLanguages();
    this.setDefaultLanguage('en');
    let currLang = this.languageService.getCurrentLanguage()
    if (!currLang) {
      this.useLanguageAccordingToBrowserPreference();
    } else {
      this.translateService.use(currLang);
    }
  }

  //methods
  changeLanguage(): void {
    if(this.languageService.getCurrentLanguage() == 'en') {
      this.languageService.changeCurrentLanguage('ar');
    } else {
      this.languageService.changeCurrentLanguage('en');
    }
  }
  addSupportedLanguages(): void {
    this.translateService.addLangs(['en', 'ar']);
  }

  setDefaultLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  useLanguageAccordingToBrowserPreference(): void {
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }
}

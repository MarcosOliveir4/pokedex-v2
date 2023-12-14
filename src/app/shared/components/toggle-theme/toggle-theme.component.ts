import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-toggle-theme',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
export class ToggleThemeComponent {
  protected theme = signal<Theme>('light');

  constructor() {
    const themeStorage = localStorage.getItem('theme') as Theme;
    if (!themeStorage) {
      localStorage.setItem('theme', 'light');
      return;
    }
    this.theme.set(themeStorage);
    this.setTheme(this.theme());
  }

  public toggleTheme() {
    const theme = this.theme();
    this.setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  private setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    this.theme.set(theme);
    this.theme() === 'dark'
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');
  }
}

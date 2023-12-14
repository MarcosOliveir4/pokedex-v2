import { render, screen } from '@testing-library/angular';
import { ToggleThemeComponent } from './toggle-theme.component';
import { NgOptimizedImage } from '@angular/common';
import userEvent from '@testing-library/user-event';

const sut = async () =>
  await render(ToggleThemeComponent, {
    imports: [NgOptimizedImage],
  });
let toggleThemeSpy: jest.SpyInstance;

describe('ToggleThemeComponent', () => {
  beforeEach(() => {
    toggleThemeSpy = jest.spyOn(ToggleThemeComponent.prototype, 'toggleTheme');
    localStorage.clear();
  });
  it('should render the component', async () => {
    await sut();
    const btnToggleTheme = screen.getByTestId('btn-toggle-theme');
    expect(btnToggleTheme).toBeTruthy();
    expect(btnToggleTheme).toBeInTheDocument();
  });

  it('should render default theme', async () => {
    await sut();
    const btnToggleTheme = screen.getByTestId('btn-toggle-theme');
    const btnToggleThemeIcon = screen.getByTestId('btn-toggle-theme-icon-moon');

    expect(btnToggleTheme).toBeTruthy();
    expect(btnToggleTheme).toBeInTheDocument();
    expect(btnToggleTheme).toHaveTextContent('Tema escuro');

    expect(btnToggleThemeIcon).toBeTruthy();
    expect(btnToggleThemeIcon).toBeInTheDocument();
    expect(btnToggleThemeIcon).toHaveAttribute('alt', 'ícone de lua');
    expect(btnToggleThemeIcon).toHaveAttribute('src', 'assets/svg/moon.svg');
  });

  it('should call the theme change function once', async () => {
    await sut();
    const btnToggleTheme = screen.getByTestId('btn-toggle-theme');
    await userEvent.click(btnToggleTheme);
    expect(toggleThemeSpy).toHaveBeenCalledTimes(1);
    await userEvent.click(btnToggleTheme);
    expect(toggleThemeSpy).toHaveBeenCalledTimes(2);
  });

  it('should change theme when click', async () => {
    await sut();
    const btnToggleTheme = screen.getByTestId('btn-toggle-theme');
    await userEvent.click(btnToggleTheme);
    const btnToggleThemeIcon = screen.getByTestId('btn-toggle-theme-icon-sun');

    expect(btnToggleTheme).toBeTruthy();
    expect(btnToggleTheme).toBeInTheDocument();
    expect(btnToggleTheme).toHaveTextContent('Tema claro');

    expect(btnToggleThemeIcon).toBeTruthy();
    expect(btnToggleThemeIcon).toBeInTheDocument();
    expect(btnToggleThemeIcon).toHaveAttribute('alt', 'ícone do sol');
    expect(btnToggleThemeIcon).toHaveAttribute('src', 'assets/svg/sun.svg');
  });

  it('should apply localstorage theme', async () => {
    localStorage.setItem('theme', 'dark');
    await sut();
    const btnToggleTheme = screen.getByTestId('btn-toggle-theme');
    const btnToggleThemeIcon = screen.getByTestId('btn-toggle-theme-icon-sun');

    expect(btnToggleTheme).toBeTruthy();
    expect(btnToggleTheme).toBeInTheDocument();
    expect(btnToggleTheme).toHaveTextContent('Tema claro');

    expect(btnToggleThemeIcon).toBeTruthy();
    expect(btnToggleThemeIcon).toBeInTheDocument();
    expect(btnToggleThemeIcon).toHaveAttribute('alt', 'ícone do sol');
    expect(btnToggleThemeIcon).toHaveAttribute('src', 'assets/svg/sun.svg');
  });
});

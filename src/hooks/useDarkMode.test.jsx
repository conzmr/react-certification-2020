import { renderHook, act } from '@testing-library/react-hooks';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
  it('returns expected initial state', () => {
    const { result } = renderHook(() => useDarkMode());
    const [theme, toggleTheme, componentMounted] = result.current;

    expect(theme).toBe('light');
    expect(componentMounted).toBe(true);
    expect(toggleTheme).toBeInstanceOf(Function);
  });

  it('returns a previous set theme if any already set', async () => {
    window.localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useDarkMode());
    const [theme] = result.current;
    expect(theme).toBe('dark');
  });

  it('theme changes when toggleTheme function is called', () => {
    const { result } = renderHook(() => useDarkMode());
    const [theme, toggleTheme] = result.current;

    act(() => {
      toggleTheme('dark');
    });

    expect(theme).toBe('dark');
  });
});

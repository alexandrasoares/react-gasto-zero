import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { NavigationProvider, useNavigation } from './navigation.context';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationProvider>{children}</NavigationProvider>
);

describe('useNavigation', () => {
  it('throws when used outside of a NavigationProvider', () => {
    expect(() => renderHook(() => useNavigation())).toThrow(
      'useNavigation must be used within NavigationProvider',
    );
  });

  it('defaults the current path to /rewards', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    expect(result.current.currentPath).toBe('/rewards');
  });

  it('updates the current path when navigate is called', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.navigate('/dashboard');
    });

    expect(result.current.currentPath).toBe('/dashboard');
  });

  it('reflects the latest navigation target across multiple calls', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.navigate('/gamification');
    });
    act(() => {
      result.current.navigate('/rewards');
    });

    expect(result.current.currentPath).toBe('/rewards');
  });
});

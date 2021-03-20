import React from 'react';
import { render } from '@testing-library/react';
import ToogleButton from './ToogleButton.component';

describe('ToogleButton', () => {
  it('renders base icon when selected value is false', () => {
    const { getByTestId } = render(
      <ToogleButton
        selected={false}
        icon={<div data-testid="base-icon" />}
        selectedIcon={<div data-testid="selected-icon" />}
      />
    );
    expect(getByTestId('base-icon')).toBeTruthy();
  });

  it('renders selected icon when selected value is true', () => {
    const { getByTestId } = render(
      <ToogleButton
        selected
        icon={<div data-testid="base-icon" />}
        selectedIcon={<div data-testid="selected-icon" />}
      />
    );
    expect(getByTestId('selected-icon')).toBeTruthy();
  });
});

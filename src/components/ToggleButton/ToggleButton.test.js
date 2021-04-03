import React from 'react';
import { render } from '@testing-library/react';
import ToggleButton from './ToggleButton.component';

describe('ToggleButton', () => {
  it('renders base icon when selected value is false', () => {
    const { getByTestId } = render(
      <ToggleButton
        selected={false}
        icon={<div data-testid="base-icon" />}
        selectedIcon={<div data-testid="selected-icon" />}
      />
    );
    expect(getByTestId('base-icon')).toBeTruthy();
  });

  it('renders selected icon when selected value is true', () => {
    const { getByTestId } = render(
      <ToggleButton
        selected
        icon={<div data-testid="base-icon" />}
        selectedIcon={<div data-testid="selected-icon" />}
      />
    );
    expect(getByTestId('selected-icon')).toBeTruthy();
  });
});

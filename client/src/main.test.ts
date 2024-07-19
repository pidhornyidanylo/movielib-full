import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/dom';
import { renderApp } from './main';
import { updateMain, updateNavBar } from './uiUpdaters';

vi.mock('./uiUpdaters', () => ({
  updateMain: vi.fn(),
  updateNavBar: vi.fn(),
}));

describe('renderApp', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render header and main', () => {
    renderApp();
    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    expect(header).toBeDefined();
    expect(main).toBeDefined();
  });

  it('should call updateNavBar and updateMain on DOMContentLoaded', async () => {
    renderApp();
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(updateNavBar).toHaveBeenCalled();
    expect(updateMain).toHaveBeenCalled();
  });
});
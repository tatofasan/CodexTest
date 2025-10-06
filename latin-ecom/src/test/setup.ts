import '@testing-library/jest-dom/vitest';
import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  vi.setSystemTime(new Date('2024-08-01T12:00:00.000Z'));

  class ResizeObserverMock {
    observe() {
      return void 0;
    }
    unobserve() {
      return void 0;
    }
    disconnect() {
      return void 0;
    }
  }

  // @ts-expect-error - jsdom no define ResizeObserver por defecto
  global.ResizeObserver = ResizeObserverMock;
});

afterEach(() => {
  cleanup();
});

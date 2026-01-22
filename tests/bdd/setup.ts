// Setup file pour initialiser un système de mocks compatible avec Cucumber
// Ce fichier est chargé avant tous les steps

// Créer expect avant de charger @testing-library/jest-dom
const expectFn = (actual: any) => {
  return {
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected ${actual} to be ${expected}`);
      }
    },
    toBeInTheDocument: () => {
      if (!actual || !document.body.contains(actual)) {
        throw new Error('Element is not in the document');
      }
    },
    toBeVisible: () => {
      if (!actual) {
        throw new Error('Element is not visible');
      }
      const style = window.getComputedStyle(actual);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        throw new Error('Element is not visible');
      }
    },
    toHaveTextContent: (text: string) => {
      if (!actual || !actual.textContent?.includes(text)) {
        throw new Error(`Expected element to have text content "${text}"`);
      }
    },
    toHaveClass: (className: string) => {
      if (!actual || !actual.classList.contains(className)) {
        throw new Error(`Expected element to have class "${className}"`);
      }
    },
    toHaveAttribute: (attr: string, value?: string) => {
      if (!actual || !actual.hasAttribute(attr)) {
        throw new Error(`Expected element to have attribute "${attr}"`);
      }
      if (value !== undefined && actual.getAttribute(attr) !== value) {
        throw new Error(`Expected element to have attribute "${attr}" with value "${value}"`);
      }
    },
    toHaveBeenCalled: () => {
      if (!actual || !actual.mock || actual.mock.calls.length === 0) {
        throw new Error('Expected function to have been called');
      }
    },
    toHaveBeenCalledWith: (...args: any[]) => {
      if (!actual || !actual.mock || actual.mock.calls.length === 0) {
        throw new Error('Expected function to have been called');
      }
      const found = actual.mock.calls.some((call: any[]) => 
        call.length === args.length && call.every((val, i) => val === args[i])
      );
      if (!found) {
        throw new Error(`Expected function to have been called with ${JSON.stringify(args)}`);
      }
    },
    not: {
      toHaveBeenCalled: () => {
        if (actual && actual.mock && actual.mock.calls.length > 0) {
          throw new Error('Expected function not to have been called');
        }
      },
      toHaveBeenCalledWith: (...args: any[]) => {
        if (actual && actual.mock) {
          const found = actual.mock.calls.some((call: any[]) => 
            call.length === args.length && call.every((val, i) => val === args[i])
          );
          if (found) {
            throw new Error(`Expected function not to have been called with ${JSON.stringify(args)}`);
          }
        }
      },
    },
    toBeGreaterThan: (value: number) => {
      if (actual <= value) {
        throw new Error(`Expected ${actual} to be greater than ${value}`);
      }
    },
    toBeGreaterThanOrEqual: (value: number) => {
      if (actual < value) {
        throw new Error(`Expected ${actual} to be greater than or equal to ${value}`);
      }
    },
    toContain: (item: any) => {
      if (!Array.isArray(actual) || !actual.includes(item)) {
        throw new Error(`Expected array to contain ${item}`);
      }
    },
    toBeTruthy: () => {
      if (!actual) {
        throw new Error('Expected value to be truthy');
      }
    },
    toBeDefined: () => {
      if (actual === undefined) {
        throw new Error('Expected value to be defined');
      }
    },
  };
};

// Ajouter expect.extend pour @testing-library/jest-dom
expectFn.extend = (matchers: any) => {
  // Étendre les matchers disponibles
  Object.keys(matchers).forEach((key: string) => {
    const matchersObj = expectFn(null) as any;
    if (matchersObj[key]) {
      // Fusionner les matchers si nécessaire
    }
  });
};

(global as any).expect = expectFn;

// Charger testing-library/jest-dom pour les matchers supplémentaires
import '@testing-library/jest-dom';

// Créer un système de mocks compatible avec jest.mock()
const mockRegistry = new Map<string, any>();

// Fonction pour créer un mock function compatible avec Jest
function createMockFn(implementation?: any) {
  const calls: any[] = [];
  const mockFn: any = (...args: any[]) => {
    calls.push(args);
    if (implementation) {
      return implementation(...args);
    }
    return undefined;
  };
  
  mockFn.mock = {
    calls,
    results: [],
  };
  
  mockFn.mockReturnValue = (value: any) => {
    const originalFn = mockFn;
    const newFn: any = (...args: any[]) => {
      originalFn(...args);
      return value;
    };
    newFn.mock = mockFn.mock;
    newFn.mockReturnValue = mockFn.mockReturnValue;
    newFn.mockImplementation = mockFn.mockImplementation;
    return newFn;
  };
  
  mockFn.mockImplementation = (impl: any) => {
    const originalFn = mockFn;
    const newFn: any = (...args: any[]) => impl(...args);
    newFn.mock = originalFn.mock;
    newFn.mockReturnValue = originalFn.mockReturnValue;
    newFn.mockImplementation = originalFn.mockImplementation;
    return newFn;
  };
  
  mockFn.mockReturnValueOnce = (value: any) => {
    let called = false;
    const originalFn = mockFn;
    const newFn: any = (...args: any[]) => {
      if (!called) {
        called = true;
        return value;
      }
      return originalFn(...args);
    };
    newFn.mock = originalFn.mock;
    newFn.mockReturnValue = originalFn.mockReturnValue;
    newFn.mockImplementation = originalFn.mockImplementation;
    return newFn;
  };
  
  return mockFn;
}

// Créer l'objet jest global compatible avec jest.mock()
(global as any).jest = {
  fn: createMockFn,
  mock: (moduleName: string, factory?: () => any) => {
    if (factory) {
      const mockValue = factory();
      mockRegistry.set(moduleName, mockValue);
    }
  },
  Mock: class Mock {
    mockReturnValue(value: any): any {
      return this;
    }
    mockImplementation(impl: any): any {
      return this;
    }
  },
  clearAllMocks: () => {
    mockRegistry.clear();
  },
  resetAllMocks: () => {
    mockRegistry.clear();
  },
};

// Exposer expect depuis @testing-library/jest-dom
// expect est déjà disponible via @testing-library/jest-dom

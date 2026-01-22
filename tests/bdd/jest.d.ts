// Déclarations de types pour Jest dans le contexte Cucumber

declare global {
  const jest: {
    fn: (implementation?: any) => any;
    mock: (moduleName: string, factory?: () => any) => void;
    Mock: new () => any;
    clearAllMocks: () => void;
    resetAllMocks: () => void;
  };
  const expect: (actual: any) => any;
}

export {};

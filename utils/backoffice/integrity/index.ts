/**
 * Barrel export pour le sous-domaine integrity (BackOffice)
 */

// e2eId Counter
export { calculateMaxCounter, getNextAvailableId } from './e2eIdCounter';

// e2eId Inventory
export { generateE2eIdInventory, extractE2eIdsFromTestFile } from './e2eIdInventory';
export type { E2eIdInventoryItem } from './e2eIdInventory';

// e2eId Detector
export { detectMissingE2eIds, generateAuditFile } from './e2eIdDetector';
export type { DetectionItem, DetectionResult } from './e2eIdDetector';

// e2eId Generator
export { generateE2eIdsFromAudit } from './e2eIdGenerator';

// Referential Integrity Checker
export { checkReferentialIntegrity, checkAllPagesIntegrity } from './referentialIntegrityChecker';
export type { IntegrityCheckResult } from './referentialIntegrityChecker';

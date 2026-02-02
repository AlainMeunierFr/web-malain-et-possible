/**
 * Tests TDD pour passwordUtils.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Le cas le plus simple - hashMD5 avec un texte simple
 * ITÉRATION 2 : getStoredPasswordHash avec fichier existant
 * ITÉRATION 3 : getStoredPasswordHash avec fichier inexistant
 * ITÉRATION 4 : getStoredPasswordHash avec format ancien (motdepassemd5)
 * ITÉRATION 5 : verifyPassword avec mot de passe correct
 * ITÉRATION 6 : verifyPassword avec mot de passe incorrect
 * ITÉRATION 7 : verifyPassword avec fichier inexistant
 */

import fs from 'fs';
import path from 'path';
import { hashMD5, hashPassword, getStoredPasswordHash, verifyPassword } from '../../utils/passwordUtils';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('passwordUtils - Approche TDD (simple → complexe)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ITÉRATION 1 : Le cas le plus simple - hashMD5', () => {
    it('devrait hasher un texte simple en MD5', () => {
      // ARRANGE : Texte simple
      const text = 'test';

      // ACT
      const hash = hashMD5(text);

      // ASSERT : Le hash MD5 de "test" est connu
      expect(hash).toBe('098f6bcd4621d373cade4e832627b4f6');
      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(32); // MD5 = 32 caractères hexadécimaux
    });

    it('devrait produire le même hash pour le même texte', () => {
      const text = 'password123';
      const hash1 = hashMD5(text);
      const hash2 = hashMD5(text);

      expect(hash1).toBe(hash2);
    });

    it('devrait produire des hash différents pour des textes différents', () => {
      const hash1 = hashMD5('password1');
      const hash2 = hashMD5('password2');

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('ITÉRATION 2 : getStoredPasswordHash avec fichier existant', () => {
    it('devrait lire le hash depuis motdepasse.json (format nouveau)', () => {
      // ARRANGE : Fichier avec format nouveau
      const mockData = {
        hash: '098f6bcd4621d373cade4e832627b4f6',
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const hash = getStoredPasswordHash();

      // ASSERT
      expect(hash).toBe('098f6bcd4621d373cade4e832627b4f6');
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('motdepasse.json')
      );
    });
  });

  describe('ITÉRATION 3 : getStoredPasswordHash avec fichier inexistant', () => {
    it('devrait retourner null si le fichier n\'existe pas', () => {
      // ARRANGE : Fichier inexistant
      mockFs.existsSync.mockReturnValue(false);

      // ACT
      const hash = getStoredPasswordHash();

      // ASSERT
      expect(hash).toBeNull();
    });
  });

  describe('ITÉRATION 4 : getStoredPasswordHash avec format ancien', () => {
    it('devrait lire le hash depuis motdepasse.json (format ancien motdepassemd5)', () => {
      // ARRANGE : Fichier avec format ancien
      const mockData = {
        motdepassemd5: '098f6bcd4621d373cade4e832627b4f6',
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const hash = getStoredPasswordHash();

      // ASSERT
      expect(hash).toBe('098f6bcd4621d373cade4e832627b4f6');
    });

    it('devrait préférer le format nouveau (hash) au format ancien (motdepassemd5)', () => {
      // ARRANGE : Fichier avec les deux formats
      const mockData = {
        hash: 'nouveau-hash',
        motdepassemd5: 'ancien-hash',
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const hash = getStoredPasswordHash();

      // ASSERT : Le format nouveau est préféré
      expect(hash).toBe('nouveau-hash');
    });
  });

  describe('ITÉRATION 5 : verifyPassword avec mot de passe correct', () => {
    it('devrait retourner true si le mot de passe correspond', () => {
      // ARRANGE : Fichier avec hash SHA-256 connu
      const password = 'test';
      const expectedHash = hashPassword(password);
      const mockData = {
        sha256: expectedHash,
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const result = verifyPassword(password);

      // ASSERT
      expect(result).toBe(true);
    });
  });

  describe('ITÉRATION 6 : verifyPassword avec mot de passe incorrect', () => {
    it('devrait retourner false si le mot de passe ne correspond pas', () => {
      // ARRANGE : Fichier avec hash SHA-256 différent
      const enteredPassword = 'wrong';
      const storedHash = hashPassword('correct');

      const mockData = {
        sha256: storedHash,
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const result = verifyPassword(enteredPassword);

      // ASSERT
      expect(result).toBe(false);
    });
  });

  describe('ITÉRATION 7 : verifyPassword avec fichier inexistant', () => {
    it('devrait retourner false si le fichier n\'existe pas', () => {
      // ARRANGE : Fichier inexistant
      mockFs.existsSync.mockReturnValue(false);

      // ACT
      const result = verifyPassword('any-password');

      // ASSERT
      expect(result).toBe(false);
    });

    it('devrait retourner false si le fichier est malformé', () => {
      // ARRANGE : Fichier malformé
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Invalid JSON');
      });

      // ACT
      const result = verifyPassword('any-password');

      // ASSERT : Devrait retourner false sans planter
      expect(result).toBe(false);
    });
  });
});

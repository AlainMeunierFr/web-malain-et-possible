/**
 * Utilitaires pour la gestion du mot de passe (SHA-256)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Hash un texte en SHA-256 (remplace MD5 obsolète)
 */
export const hashPassword = (text: string): string => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

/**
 * @deprecated Utiliser hashPassword à la place. Conservé pour compatibilité.
 */
export const hashMD5 = (text: string): string => {
  return crypto.createHash('md5').update(text).digest('hex');
};

/**
 * Lit le hash stocké dans motdepasse.json
 */
export const getStoredPasswordHash = (): string | null => {
  try {
    const passwordPath = path.join(process.cwd(), 'data', '_motdepasse.json');
    if (!fs.existsSync(passwordPath)) {
      return null;
    }
    
    const content = fs.readFileSync(passwordPath, 'utf8');
    const data = JSON.parse(content);
    
    // Nouveau format : "sha256", fallback vers anciens formats pour migration
    return data.sha256 || data.hash || data.motdepassemd5 || null;
  } catch {
    return null;
  }
};

/**
 * Vérifie si le mot de passe entré correspond au hash stocké (SHA-256)
 */
export const verifyPassword = (enteredPassword: string): boolean => {
  const storedHash = getStoredPasswordHash();
  if (!storedHash) {
    return false;
  }
  
  const enteredHash = hashPassword(enteredPassword);
  return enteredHash === storedHash;
};

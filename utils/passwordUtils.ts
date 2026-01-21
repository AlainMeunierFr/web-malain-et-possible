/**
 * Utilitaires pour la gestion du mot de passe (MD5)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Hash un texte en MD5
 */
export const hashMD5 = (text: string): string => {
  return crypto.createHash('md5').update(text).digest('hex');
};

/**
 * Lit le hash MD5 stocké dans motdepasse.json
 */
export const getStoredPasswordHash = (): string | null => {
  try {
    const passwordPath = path.join(process.cwd(), 'data', 'motdepasse.json');
    if (!fs.existsSync(passwordPath)) {
      return null;
    }
    
    const content = fs.readFileSync(passwordPath, 'utf8');
    const data = JSON.parse(content);
    
    // Support des deux formats : "motdepassemd5" (ancien) et "hash" (nouveau)
    return data.hash || data.motdepassemd5 || null;
  } catch (e) {
    return null;
  }
};

/**
 * Vérifie si le mot de passe entré correspond au hash stocké
 */
export const verifyPassword = (enteredPassword: string): boolean => {
  const storedHash = getStoredPasswordHash();
  if (!storedHash) {
    return false;
  }
  
  const enteredHash = hashMD5(enteredPassword);
  return enteredHash === storedHash;
};

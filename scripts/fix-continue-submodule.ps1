# Script pour supprimer le submodule 'continue' du tracking Git
# À exécuter après redémarrage si le fichier .git/index.lock est libéré

Write-Host "Suppression du submodule 'continue' du tracking Git..."

# Supprimer le submodule du cache Git
git rm --cached continue

# Si un fichier .gitmodules existe, le supprimer aussi (optionnel)
if (Test-Path .gitmodules) {
    Write-Host "Suppression de .gitmodules..."
    Remove-Item .gitmodules
}

Write-Host "✅ Submodule 'continue' supprimé du tracking Git"
Write-Host "Le dossier continue/ est maintenant ignoré via .gitignore"

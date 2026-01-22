# Script PowerShell - Menu interactif pour les commandes du projet
# Usage: .\Menu.ps1 ou menu (si alias configuré)

# Créer un alias temporaire pour cette session si le script est lancé directement
if ($MyInvocation.InvocationName -ne '.') {
    Set-Alias -Name menu -Value $PSCommandPath -Scope Global -ErrorAction SilentlyContinue
}

# Forcer l'encodage UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$SecurityConfigPath = ".cursor-security-config.json"

function Get-SecurityConfig {
    if (Test-Path $SecurityConfigPath) {
        $config = Get-Content $SecurityConfigPath -Encoding UTF8 | ConvertFrom-Json
        return $config.securityEnabled
    }
    return $true
}

function Set-SecurityConfig {
    param([bool]$enabled)
    $config = @{
        securityEnabled = $enabled
        lastModified = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    }
    $config | ConvertTo-Json | Set-Content $SecurityConfigPath -Encoding UTF8
}

function Show-Menu {
    $securityStatus = Get-SecurityConfig
    Clear-Host
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   MENU PRINCIPAL - WEB MALAIN ET POSSIBLE" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "TESTS:" -ForegroundColor Magenta
    Write-Host "2.  Lancer tous les tests Jest (mode watch)" -ForegroundColor Yellow
    Write-Host "3.  Lancer les tests d'intégration (TI) - mode watch" -ForegroundColor Yellow
    Write-Host "4.  Lancer les tests E2E Playwright (mode UI)" -ForegroundColor Yellow
    Write-Host "5.  Lancer les tests E2E en navigateur visible (headed)" -ForegroundColor Yellow
    Write-Host "6.  Lancer les tests BDD métier (avec rapport HTML)" -ForegroundColor Yellow
    Write-Host "19. Lancer TOUS les tests (BDD métier + E2E) avec rapport HTML" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "DÉVELOPPEMENT:" -ForegroundColor Magenta
    Write-Host "7.  Lancer le serveur de développement" -ForegroundColor Yellow
    Write-Host "8.  Build le projet" -ForegroundColor Yellow
    Write-Host "9.  Collecter les métriques" -ForegroundColor Yellow
    Write-Host "10. Générer le plan de test E2E" -ForegroundColor Yellow
    Write-Host "11. Linter (ESLint)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "GIT:" -ForegroundColor Magenta
    Write-Host "1.  Publier la version (git add + commit + push)" -ForegroundColor Yellow
    Write-Host "12. Stager tous les fichiers (git add -A)" -ForegroundColor Yellow
    Write-Host "13. Voir le statut Git" -ForegroundColor Yellow
    Write-Host "14. Voir les derniers commits" -ForegroundColor Yellow
    Write-Host "15. Annuler les modifications non commitées (git reset --hard)" -ForegroundColor Red
    Write-Host ""
    Write-Host "SÉCURITÉ:" -ForegroundColor Magenta
    Write-Host "16. Accepter tout - Désactiver les contrôles (mode silencieux)" -ForegroundColor $(if ($securityStatus) { "Yellow" } else { "Gray" })
    Write-Host "17. Supprimer les permissions - Réactiver les contrôles" -ForegroundColor $(if ($securityStatus) { "Gray" } else { "Yellow" })
    Write-Host ""
    Write-Host "18. Quitter" -ForegroundColor Gray
    Write-Host ""
}

function Execute-Command {
    param([string]$command, [string]$description, [switch]$NoWait)
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Commande: $description" -ForegroundColor Green
    Write-Host "Exécution: $command" -ForegroundColor Gray
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "[*] Commande à retenir: " -ForegroundColor Cyan -NoNewline
    Write-Host "$command" -ForegroundColor White
    Write-Host ""
    if ($command -like "*reset*" -or $command -like "*hard*") {
        $confirm = Read-Host "[!] Cette action est destructive. Continuer ? (oui/non)"
        if ($confirm -ne "oui") {
            Write-Host "[X] Action annulée" -ForegroundColor Red
            return
        }
    }
    try {
        Invoke-Expression $command
    }
    catch {
        Write-Host "[X] Erreur lors de l'exécution: $_" -ForegroundColor Red
    }
    if (-not $NoWait) {
        Write-Host ""
        Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

do {
    Show-Menu
    $choice = Read-Host "Choisissez une option"
    switch ($choice) {
        "1" {
            $message = Read-Host "Message de commit"
            if ([string]::IsNullOrWhiteSpace($message)) {
                $message = "chore: Mise à jour"
            }
            $cmd = "git add -A; git commit -m `"$message`"; git push"
            Execute-Command $cmd "Publier la version"
        }
        "2" {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Lancer tous les tests Jest (mode watch)" -ForegroundColor Green
            Write-Host "Exécution: npm test -- --watch" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] Commande à retenir: npm test -- --watch" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "[!] Mode watch interactif. Appuyez sur 'a' pour lancer tous les tests, 'q' pour quitter." -ForegroundColor Yellow
            Write-Host ""
            npm test -- --watch
        }
        "3" {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Lancer les tests d'intégration (mode watch)" -ForegroundColor Green
            Write-Host "Exécution: npm test -- tests/integration/ --watch" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] Commande à retenir: npm test -- tests/integration/ --watch" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "[!] Mode watch interactif. Appuyez sur 'a' pour lancer tous les tests, 'q' pour quitter." -ForegroundColor Yellow
            Write-Host ""
            npm test -- tests/integration/ --watch
        }
        "4" {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Lancer les tests E2E Playwright (mode UI)" -ForegroundColor Green
            Write-Host "Exécution: npm run test:e2e:ui" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] Commande à retenir: npm run test:e2e:ui" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "[!] L'interface graphique Playwright va s'ouvrir." -ForegroundColor Yellow
            Write-Host ""
            npm run test:e2e:ui
        }
        "5" {
            Execute-Command "npm run test:e2e -- --headed" "Lancer les tests E2E en mode visible (headed)" -NoWait
        }
        "6" {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Lancer les tests BDD métier (avec rapport HTML)" -ForegroundColor Green
            Write-Host "Exécution: npm run test:bdd" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] Commande à retenir: npm run test:bdd" -ForegroundColor Cyan
            Write-Host "[*] Tests BDD métier: site-map, e2e-ids-assignment, criteres-acceptation, user-stories-format" -ForegroundColor Gray
            Write-Host ""
            Write-Host "[>] Génération des tests BDD..." -ForegroundColor Yellow
            npm run test:bdd:generate
            Write-Host ""
            Write-Host "[>] Lancement des tests BDD métier..." -ForegroundColor Yellow
            npm run test:bdd
            Write-Host ""
            Write-Host "[*] Ouverture du rapport HTML Playwright..." -ForegroundColor Cyan
            Start-Sleep -Seconds 2
            npx playwright show-report
            Write-Host ""
            Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "7" {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Lancer le serveur de développement" -ForegroundColor Green
            Write-Host "Exécution: npm run dev" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] Commande à retenir: npm run dev" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "[!] Le serveur va démarrer. Appuyez sur Ctrl+C pour l'arrêter." -ForegroundColor Yellow
            Write-Host ""
            npm run dev
        }
        "8" {
            Execute-Command "npm run build" "Build le projet"
        }
        "9" {
            Execute-Command "npm run metrics:collect" "Collecter les métriques"
        }
        "10" {
            Execute-Command "npm run test:e2e:generate" "Générer le plan de test E2E"
        }
        "11" {
            Execute-Command "npm run lint" "Linter (ESLint)"
        }
        "12" {
            Execute-Command "git add -A" "Stager tous les fichiers (git add -A)"
        }
        "13" {
            Execute-Command "git status" "Voir le statut Git"
        }
        "14" {
            Execute-Command "git log --oneline -10" "Voir les derniers commits"
        }
        "15" {
            Execute-Command "git reset --hard HEAD" "Annuler les modifications non commitées"
        }
        "16" {
            $currentStatus = Get-SecurityConfig
            if ($currentStatus) {
                Set-SecurityConfig -enabled $false
                Write-Host ""
                Write-Host "[--] Contrôles de sécurité DÉSACTIVÉS" -ForegroundColor Red
                Write-Host "[!] Mode silencieux activé - l'IA peut écrire sans confirmation" -ForegroundColor Yellow
                Write-Host ""
            } else {
                Write-Host ""
                Write-Host "[!] Les contrôles sont déjà désactivés" -ForegroundColor Yellow
                Write-Host ""
            }
            Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "17" {
            $currentStatus = Get-SecurityConfig
            if (-not $currentStatus) {
                Set-SecurityConfig -enabled $true
                Write-Host ""
                Write-Host "[OK] Contrôles de sécurité RÉACTIVÉS" -ForegroundColor Green
                Write-Host "[OK] Mode sécurisé activé - l'IA demandera confirmation avant d'écrire" -ForegroundColor Green
                Write-Host ""
            } else {
                Write-Host ""
                Write-Host "[!] Les contrôles sont déjà actives" -ForegroundColor Yellow
                Write-Host ""
            }
            Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "19" {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Lancer TOUS les tests (BDD métier + E2E) avec rapport HTML" -ForegroundColor Green
            Write-Host "Exécution: npm run test:bdd && npm run test:e2e" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] Commande à retenir: npm run test:bdd && npm run test:e2e" -ForegroundColor Cyan
            Write-Host "[*] Ou simplement: playwright test (après génération BDD)" -ForegroundColor Gray
            Write-Host ""
            Write-Host "[>] Génération des tests BDD..." -ForegroundColor Yellow
            npm run test:bdd:generate
            Write-Host ""
            Write-Host "[>] Lancement de TOUS les tests (BDD métier + E2E)..." -ForegroundColor Yellow
            playwright test
            Write-Host ""
            Write-Host "[*] Ouverture du rapport HTML Playwright..." -ForegroundColor Cyan
            Start-Sleep -Seconds 2
            Write-Host "[*] Commande pour ouvrir le rapport: npx playwright show-report" -ForegroundColor Cyan
            npx playwright show-report
            Write-Host ""
            Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "18" {
            Write-Host "Au revoir !" -ForegroundColor Cyan
            break
        }
        default {
            Write-Host "[X] Option invalide. Appuyez sur une touche pour continuer..." -ForegroundColor Red
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
    }
} while ($choice -ne "18")

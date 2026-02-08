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
    Write-Host "NAVIGATEUR / MCP:" -ForegroundColor Magenta
    Write-Host "20. Lancer Chrome avec débogage distant (port 9222) pour MCP Chrome DevTools" -ForegroundColor Yellow
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
            return 1
        }
    }
    $exitCode = 0
    try {
        # Exécuter la commande et capturer le code de sortie
        if ($command -match ';') {
            # Si plusieurs commandes séparées par ;, les exécuter une par une
            $commands = $command -split ';'
            foreach ($cmd in $commands) {
                $cmd = $cmd.Trim()
                if ($cmd) {
                    Invoke-Expression $cmd
                    if (-not $?) {
                        $exitCode = 1
                        break
                    }
                }
            }
        } else {
            Invoke-Expression $command
            if (-not $?) {
                $exitCode = 1
            }
        }
    }
    catch {
        Write-Host "[X] Erreur lors de l'exécution: $_" -ForegroundColor Red
        $exitCode = 1
    }
    if (-not $NoWait) {
        Write-Host ""
        Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    return $exitCode
}

do {
    Show-Menu
    $choice = Read-Host "Choisissez une option"
    switch ($choice) {
        "1" {
            Write-Host ""
            $bddChoice = Read-Host "Inclure les tests BDD ? (o/n) [o]"
            $skipBdd = ($bddChoice -match '^n|non$')
            if ($skipBdd) {
                $env:SKIP_BDD = "1"
                Write-Host "[*] Publication SANS BDD (métriques BDD conservées = ordre de grandeur)" -ForegroundColor Cyan
            } else {
                Remove-Item Env:\SKIP_BDD -ErrorAction SilentlyContinue
                Write-Host "[*] Publication AVEC BDD" -ForegroundColor Cyan
            }
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Commande: Publier la version (script scripts/publie.ts)" -ForegroundColor Green
            Write-Host "Exécution: npm run publie" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "[*] En cas d'échec des tests, la liste des erreurs s'affiche ci-dessous." -ForegroundColor Cyan
            Write-Host ""
            & npm run publie
            $exitCode = $LASTEXITCODE
            if ($skipBdd) { Remove-Item Env:\SKIP_BDD -ErrorAction SilentlyContinue }
            Write-Host ""
            Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "2" { Execute-Command -command "npm test" -description "Tests Jest (watch)" }
        "3" { Execute-Command -command "npm run test:ti" -description "Tests d'intégration (watch)" }
        "4" { Execute-Command -command "npm run test:e2e:ui" -description "Tests E2E Playwright (mode UI)" }
        "5" { Execute-Command -command "npm run test:e2e:headed" -description "Tests E2E en navigateur visible" }
        "6" { Execute-Command -command "npm run test:bdd" -description "Tests BDD métier (rapport HTML)" }
        "7" { Execute-Command -command "npm run dev" -description "Serveur de développement" -NoWait }
        "8" { Execute-Command -command "npm run build" -description "Build du projet" }
        "9" { Execute-Command -command "npm run metrics:collect" -description "Collecter les métriques" }
        "10" { Execute-Command -command "npm run e2e:plan" -description "Générer le plan de test E2E" }
        "11" { Execute-Command -command "npm run lint" -description "Linter (ESLint)" }
        "12" { Execute-Command -command "git add -A" -description "Stager tous les fichiers" }
        "13" { Execute-Command -command "git status" -description "Statut Git" }
        "14" { Execute-Command -command "git log -5 --oneline" -description "Derniers commits" }
        "15" { Execute-Command -command "git reset --hard HEAD" -description "Annuler les modifications non commitées" }
        "16" {
            Set-SecurityConfig -enabled $false
            Write-Host "[*] Contrôles désactivés (mode silencieux)" -ForegroundColor Yellow
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "17" {
            Set-SecurityConfig -enabled $true
            Write-Host "[*] Contrôles réactivés" -ForegroundColor Yellow
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "18" { Write-Host "Au revoir." -ForegroundColor Cyan; exit 0 }
        "19" { Execute-Command -command "npm run test:all" -description "TOUS les tests (BDD + E2E) avec rapport HTML" }
        "20" {
            $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "Lancement de Chrome avec débogage distant (port 9222)" -ForegroundColor Green
            Write-Host "Pour MCP Chrome DevTools dans Cursor" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            if (Test-Path $chromePath) {
                Start-Process $chromePath -ArgumentList "--remote-debugging-port=9222"
                Write-Host "[*] Chrome lancé. Ouvrez l'onglet voulu (ex. http://localhost:3000)." -ForegroundColor Cyan
            } else {
                Write-Host "[X] Chrome non trouvé: $chromePath" -ForegroundColor Red
            }
            Write-Host ""
            Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        default { Write-Host "Option non reconnue." -ForegroundColor Red; $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") }
    }
} while ($true)
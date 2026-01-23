# language: fr

Fonctionnalité: Affichage structuré des critères d'acceptation dans le wiki
  En tant que lecteur du wiki du site
  Je veux voir les "Critères d'acceptation" des User Stories structurés hiérarchiquement
  Afin de mieux comprendre l'organisation et la hiérarchie des critères

  Contexte:
    Étant donné que je suis sur la page "À propos du site"
    Et qu'une User Story contient une section "Critères d'acceptation"

  Scénario: Détection de la section "Critères d'acceptation"
    Étant donné qu'une User Story contient la ligne "- **Critères d'acceptation** :"
    Quand le contenu Markdown est parsé
    Alors cette ligne est détectée comme début de section "Critères d'acceptation"
    Et cette section a le typeDeContenu "Critères d'acceptation"

  Scénario: Fin de la section "Critères d'acceptation" à la prochaine US
    Étant donné qu'une section "Critères d'acceptation" est ouverte
    Quand une ligne commence par "#### US-"
    Alors la section "Critères d'acceptation" se termine avant cette ligne
    Et les lignes suivantes ne sont plus considérées comme faisant partie des critères d'acceptation

  Scénario: Fin de la section "Critères d'acceptation" à un séparateur
    Étant donné qu'une section "Critères d'acceptation" est ouverte
    Quand une ligne contient uniquement "---"
    Alors la section "Critères d'acceptation" se termine avant cette ligne
    Et les lignes suivantes ne sont plus considérées comme faisant partie des critères d'acceptation

  Scénario: Fin de la section "Critères d'acceptation" à la fin de la sous-partie
    Étant donné qu'une section "Critères d'acceptation" est ouverte dans une sous-partie (H4)
    Quand une nouvelle sous-partie (H4) commence ou la sous-partie se termine
    Alors la section "Critères d'acceptation" se termine
    Et les lignes suivantes ne sont plus considérées comme faisant partie des critères d'acceptation

  Scénario: Détection d'un thème de critère
    Étant donné qu'une section "Critères d'acceptation" est ouverte
    Quand une ligne commence par "- **"
    Alors cette ligne est détectée comme un "Thème de critère"
    Et le texte entre `**` est extrait comme titre du thème
    Et le typeDeContenu "themeCritere" est attribué à cette ligne

  Scénario: Détection d'un critère normal
    Étant donné qu'une section "Critères d'acceptation" est ouverte
    Quand une ligne commence par "- " (sans `**` au début)
    Alors cette ligne est détectée comme un "Critère"
    Et le texte après "- " est extrait comme contenu du critère
    Et le typeDeContenu "critere" est attribué à cette ligne
    Et ce critère est associé au dernier thème rencontré

  Scénario: Hiérarchie thème-critères
    Étant donné qu'une section "Critères d'acceptation" contient :
      """
      - **Thème 1** :
      - Critère 1 sous thème 1
      - Critère 2 sous thème 1
      - **Thème 2** :
      - Critère 1 sous thème 2
      """
    Quand le contenu Markdown est parsé
    Alors "Critère 1 sous thème 1" est associé à "Thème 1"
    Et "Critère 2 sous thème 1" est associé à "Thème 1"
    Et "Critère 1 sous thème 2" est associé à "Thème 2"

  Scénario: Affichage d'un thème de critère
    Étant donné qu'un thème de critère est détecté dans la section "Critères d'acceptation"
    Quand le wiki affiche la User Story
    Alors le thème s'affiche avec une puce de niveau 1
    Et le texte du thème est en gras
    Et le thème n'a pas d'indentation supplémentaire

  Scénario: Affichage d'un critère normal
    Étant donné qu'un critère normal est détecté dans la section "Critères d'acceptation"
    Et que ce critère est associé à un thème
    Quand le wiki affiche la User Story
    Alors le critère s'affiche avec une puce de niveau 2 (indentée)
    Et le texte du critère est normal (pas en gras)
    Et le critère est visuellement sous le thème correspondant

  Scénario: Structure hiérarchique visuelle
    Étant donné qu'une section "Critères d'acceptation" contient des thèmes et des critères imbriqués
    Quand le wiki affiche la User Story
    Alors la hiérarchie visuelle est claire :
      - Les thèmes (niveau 1) sont plus visibles
      - Les critères (niveau 2) sont indentés sous leur thème
      - La séparation entre différents thèmes est claire

  Scénario: Règle dans la DOD pour l'IA
    Étant donné que la DOD "Comportement implicite de l'IA" existe
    Quand je consulte cette DOD
    Alors je vois une règle spécifiant que lors de l'écriture d'une User Story dans le wiki, je dois respecter :
      - `- **Thème de critère**` pour les thèmes de critères
      - `- Critère normal` (sans `**` au début) pour les critères sous ce thème
      - Les critères doivent être placés après leur thème correspondant

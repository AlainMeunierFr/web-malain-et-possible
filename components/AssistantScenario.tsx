'use client';

import React, { useEffect, useState, useCallback } from 'react';
import type { PlanSite, PlanPage, PlanLien } from '../utils/siteMapGenerator';
import {
  getLiensAParcourirInitial,
  getPagesAccessiblesDepuis,
  retirerLienUtilise,
  pageAccueil,
} from '../utils/assistantScenario';
import styles from './AssistantScenario.module.css';

export default function AssistantScenario() {
  const [plan, setPlan] = useState<PlanSite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pageCourante, setPageCourante] = useState<string>(pageAccueil());
  const [liensAParcourir, setLiensAParcourir] = useState<PlanLien[]>([]);
  const [cheminParcouru, setCheminParcouru] = useState<string[]>([pageAccueil()]);

  useEffect(() => {
    fetch('/api/site-map')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur chargement plan');
        return res.json();
      })
      .then((data: PlanSite) => {
        setPlan(data);
        setLiensAParcourir(getLiensAParcourirInitial(data));
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const pagesAccessibles = plan ? getPagesAccessiblesDepuis(pageCourante, plan.liens) : [];

  const handleClickPage = useCallback(
    (url: string) => {
      if (!plan) return;
      const link = plan.liens.find((l) => l.source === pageCourante && l.destination === url);
      if (!link) return;
      setLiensAParcourir((prev) => retirerLienUtilise(prev, link));
      setPageCourante(url);
      setCheminParcouru((prev) => [...prev, url]);
    },
    [plan, pageCourante]
  );

  const handleAnnuler = useCallback(() => {
    if (cheminParcouru.length <= 1) return;
    const nouveauChemin = cheminParcouru.slice(0, -1);
    const prev = nouveauChemin[nouveauChemin.length - 1];
    const last = cheminParcouru[cheminParcouru.length - 1];
    setCheminParcouru(nouveauChemin);
    setPageCourante(prev);
    if (plan) {
      const link = plan.liens.find((l) => l.source === prev && l.destination === last);
      if (link) setLiensAParcourir((prevLiens) => [...prevLiens, link]);
    }
  }, [cheminParcouru, plan]);

  const handleToutAnnuler = useCallback(() => {
    setPageCourante(pageAccueil());
    setCheminParcouru([]); // BDD : liste "Chemin parcouru" vidée
    if (plan) setLiensAParcourir(getLiensAParcourirInitial(plan));
  }, [plan]);

  const handleGenererScenario = useCallback(async () => {
    if (liensAParcourir.length > 0) return;
    try {
      const res = await fetch('/api/generate-e2e-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chemin: cheminParcouru }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur génération');
      }
      const data = await res.json();
      if (data.path) alert(`Scénario généré : ${data.path}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    }
  }, [cheminParcouru, liensAParcourir.length]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!plan) return null;

  const pagesAAfficher = plan.pages.filter(
    (p) => (p as PlanPage & { zone?: string }).zone !== 'Masqué' || p.url === '/plan-du-site'
  );

  // Même structure que la page "Plan du site" (ListeDesPages) : Home, Profils, Autres/Footer, + bouton Plan du site pour le scénario
  const pagesParZone = {
    HomePage: pagesAAfficher.filter((p) => (p as PlanPage).zone === 'HomePage'),
    Profils: pagesAAfficher.filter((p) => (p as PlanPage).zone === 'Profils'),
    Autres: pagesAAfficher.filter((p) => (p as PlanPage).zone === 'Autres'),
    Footer: pagesAAfficher.filter((p) => (p as PlanPage).zone === 'Footer'),
    PlanDuSite: pagesAAfficher.filter((p) => p.url === '/plan-du-site'),
  };

  const renderPageButton = (p: PlanPage) => {
    const url = p.url;
    const titre = p.titre || url;
    const isCurrent = pageCourante === url;
    const accessible = pagesAccessibles.some((l) => l.destination === url);
    const className = isCurrent
      ? styles.pageCurrent
      : accessible
        ? styles.pageAccessible
        : styles.pageOther;
    return accessible ? (
      <button
        type="button"
        className={className}
        onClick={() => handleClickPage(url)}
      >
        {titre}
      </button>
    ) : (
      <span className={className}>{titre}</span>
    );
  };

  return (
    <div className={styles.assistantScenario}>
      <header className={styles.header}>
        <h1 className={styles.title}>Assistant de construction de scénario E2E</h1>
      </header>

      <div className={styles.layout}>
        <section className={styles.planSection}>
          <h2 className={styles.planTitle}>Plan du site</h2>
          {/* Ligne 1 : Home – boutons les uns sous les autres, centrés (comme Plan du site) */}
          {pagesParZone.HomePage.length > 0 && (
            <div className={`${styles.pagesList} ${styles.ligne1} ${styles.zoneHomepage}`}>
              {pagesParZone.HomePage.map((p) => (
                <div key={p.url} className={styles.pageItem}>
                  {renderPageButton(p as PlanPage)}
                </div>
              ))}
            </div>
          )}
          {/* Ligne 2 : Profils – boutons côte à côte sur la même ligne */}
          {pagesParZone.Profils.length > 0 && (
            <div className={`${styles.pagesList} ${styles.ligne2} ${styles.zoneProfils}`}>
              {pagesParZone.Profils.map((p) => (
                <div key={p.url} className={styles.pageItem}>
                  {renderPageButton(p as PlanPage)}
                </div>
              ))}
            </div>
          )}
          {/* Ligne 3 : Autres (gauche) et Footer (droite) – disposition en deux colonnes verticales */}
          {(pagesParZone.Autres.length > 0 || pagesParZone.Footer.length > 0) && (
            <div className={styles.ligne3}>
              {pagesParZone.Autres.length > 0 && (
                <div className={`${styles.pagesList} ${styles.colonneGauche} ${styles.zoneAutres}`}>
                  {pagesParZone.Autres.map((p) => (
                    <div key={p.url} className={styles.pageItem}>
                      {renderPageButton(p as PlanPage)}
                    </div>
                  ))}
                </div>
              )}
              {pagesParZone.Footer.length > 0 && (
                <div className={`${styles.pagesList} ${styles.colonneDroite} ${styles.zoneFooter}`}>
                  {pagesParZone.Footer.map((p) => (
                    <div key={p.url} className={styles.pageItem}>
                      {renderPageButton(p as PlanPage)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Bouton Plan du site (zone Masqué sur le site) : affiché ici pour que le scénario puisse y passer */}
          {pagesParZone.PlanDuSite.length > 0 && (
            <div className={`${styles.pagesList} ${styles.ligne1} ${styles.zonePlanDuSite}`}>
              {pagesParZone.PlanDuSite.map((p) => (
                <div key={p.url} className={styles.pageItem}>
                  {renderPageButton(p as PlanPage)}
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.buttonsRow}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={handleAnnuler}
              disabled={cheminParcouru.length <= 1}
              e2eid="e2eid-assistant-annuler"
            >
              Annuler
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={handleToutAnnuler}
              e2eid="e2eid-assistant-tout-annuler"
            >
              Tout annuler
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleGenererScenario}
              disabled={liensAParcourir.length > 0}
              e2eid="e2eid-assistant-generer"
            >
              Générer scénario
            </button>
          </div>
          <div className={styles.listBox}>
            <h3 className={styles.listBoxTitle}>Liens à parcourir</h3>
            <div className={styles.listItemsWrapper}>
              <ul className={styles.listItems}>
                {liensAParcourir.length === 0 ? (
                  <li>Aucun (tous parcourus)</li>
                ) : (
                  liensAParcourir.map((l) => {
                    const sourceTitre = plan.pages.find((p) => p.url === l.source)?.titre ?? l.source;
                    const destTitre = plan.pages.find((p) => p.url === l.destination)?.titre ?? l.destination;
                    return (
                      <li key={`${l.source}->${l.destination}`}>
                        {sourceTitre} → {destTitre}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
          <div className={styles.listBox}>
            <h3 className={styles.listBoxTitle}>Chemin parcouru</h3>
            <div className={styles.listItemsWrapper}>
              <ul className={styles.listItems}>
                {cheminParcouru.length === 0 ? (
                  <li>Aucun</li>
                ) : (
                  cheminParcouru.map((url, i) => {
                    const titre = plan.pages.find((p) => p.url === url)?.titre ?? url;
                    return <li key={`${url}-${i}`}>{titre}</li>;
                  })
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

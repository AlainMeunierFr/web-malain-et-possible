// Generated from: tests\bdd\page-metrics-valeurs-correctes.feature
import { test } from "playwright-bdd";

test.describe('Affichage des valeurs correctes des métriques sur la page Metrics (US-12.1)', () => {

  test('Type Coverage affiché quand la valeur est calculée', { tag: ['@page-metrics-valeurs-correctes'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('les métriques collectées contiennent une valeur numérique pour Type Coverage'); 
    await When('j\'accède à la page "/metrics"', null, { page }); 
    await Then('je vois dans la section "Qualité du code" une carte "Type Coverage"', null, { page }); 
    await And('la carte affiche un pourcentage entier (valeur réelle, pas un placeholder)', null, { page }); 
  });

  test('Type Coverage absent ou NC quand non calculé', { tag: ['@page-metrics-valeurs-correctes'] }, async ({ Given, When, Then, page }) => { 
    await Given('les métriques collectées contiennent "NC" pour Type Coverage'); 
    await When('j\'accède à la page "/metrics"', null, { page }); 
    await Then('la section "Qualité du code" n\'affiche pas la carte "Type Coverage"', null, { page }); 
  });

  test('Score Lighthouse affiché quand la valeur est calculée', { tag: ['@page-metrics-valeurs-correctes'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('les métriques collectées contiennent une valeur numérique pour le score Lighthouse'); 
    await When('j\'accède à la page "/metrics"', null, { page }); 
    await Then('je vois dans la section "Performance" une carte "Score Lighthouse"', null, { page }); 
    await And('la carte affiche un nombre entre 0 et 100 (valeur réelle, pas un placeholder)', null, { page }); 
  });

  test('Score Lighthouse absent ou NC quand non calculé', { tag: ['@page-metrics-valeurs-correctes'] }, async ({ Given, When, Then, page }) => { 
    await Given('les métriques collectées contiennent "NC" pour le score Lighthouse'); 
    await When('j\'accède à la page "/metrics"', null, { page }); 
    await Then('la section "Performance" n\'affiche pas la carte "Score Lighthouse"', null, { page }); 
  });

  test('Métriques non calculées sans valeur inventée', { tag: ['@page-metrics-valeurs-correctes'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('les métriques collectées contiennent "NC" pour Complexité cyclomatique, Index de maintenabilité et Dette technique'); 
    await When('j\'accède à la page "/metrics"', null, { page }); 
    await Then('les cartes "Complexité cyclomatique", "Index de maintenabilité" et "Dette technique" sont absentes de la section "Qualité du code"', null, { page }); 
    await And('aucune de ces cartes n\'affiche de valeur inventée (absente ou affichant "NC")', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\bdd\\page-metrics-valeurs-correctes.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":["@page-metrics-valeurs-correctes"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Étant donné que les métriques collectées contiennent une valeur numérique pour Type Coverage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"Quand j'accède à la page \"/metrics\"","stepMatchArguments":[{"group":{"start":19,"value":"\"/metrics\"","children":[{"start":20,"value":"/metrics","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Alors je vois dans la section \"Qualité du code\" une carte \"Type Coverage\"","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Et la carte affiche un pourcentage entier (valeur réelle, pas un placeholder)","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":14,"tags":["@page-metrics-valeurs-correctes"],"steps":[{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Étant donné que les métriques collectées contiennent \"NC\" pour Type Coverage","stepMatchArguments":[{"group":{"start":37,"value":"\"NC\"","children":[{"start":38,"value":"NC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"Quand j'accède à la page \"/metrics\"","stepMatchArguments":[{"group":{"start":19,"value":"\"/metrics\"","children":[{"start":20,"value":"/metrics","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Alors la section \"Qualité du code\" n'affiche pas la carte \"Type Coverage\"","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":19,"tags":["@page-metrics-valeurs-correctes"],"steps":[{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Étant donné que les métriques collectées contiennent une valeur numérique pour le score Lighthouse","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"Quand j'accède à la page \"/metrics\"","stepMatchArguments":[{"group":{"start":19,"value":"\"/metrics\"","children":[{"start":20,"value":"/metrics","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Alors je vois dans la section \"Performance\" une carte \"Score Lighthouse\"","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Et la carte affiche un nombre entre 0 et 100 (valeur réelle, pas un placeholder)","stepMatchArguments":[{"group":{"start":33,"value":"0","children":[]},"parameterTypeName":"int"},{"group":{"start":38,"value":"100","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":26,"pickleLine":25,"tags":["@page-metrics-valeurs-correctes"],"steps":[{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Étant donné que les métriques collectées contiennent \"NC\" pour le score Lighthouse","stepMatchArguments":[{"group":{"start":37,"value":"\"NC\"","children":[{"start":38,"value":"NC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"Quand j'accède à la page \"/metrics\"","stepMatchArguments":[{"group":{"start":19,"value":"\"/metrics\"","children":[{"start":20,"value":"/metrics","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Alors la section \"Performance\" n'affiche pas la carte \"Score Lighthouse\"","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":30,"tags":["@page-metrics-valeurs-correctes"],"steps":[{"pwStepLine":33,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Étant donné que les métriques collectées contiennent \"NC\" pour Complexité cyclomatique, Index de maintenabilité et Dette technique","stepMatchArguments":[{"group":{"start":37,"value":"\"NC\"","children":[{"start":38,"value":"NC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"Quand j'accède à la page \"/metrics\"","stepMatchArguments":[{"group":{"start":19,"value":"\"/metrics\"","children":[{"start":20,"value":"/metrics","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Alors les cartes \"Complexité cyclomatique\", \"Index de maintenabilité\" et \"Dette technique\" sont absentes de la section \"Qualité du code\"","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Et aucune de ces cartes n'affiche de valeur inventée (absente ou affichant \"NC\")","stepMatchArguments":[]}]},
]; // bdd-data-end
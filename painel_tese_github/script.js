"use strict";

// Enunciados originais. Q1 a Q8 são comuns às três turmas.
const COMUNS = [
  "Sinto-me capaz de utilizar a Inteligência Artificial como apoio em atividades de estudo.",
  "Acredito que a IA é uma ferramenta adequada para melhorar minha compreensão dos conteúdos escolares, incluindo conceitos de Matemática e Física.",
  "Costumo analisar criticamente as respostas e sugestões da IA antes de aceitá-las.",
  "O uso de Tecnologias Digitais (GeoGebra, planilhas, simulações) torna o estudo mais interessante.",
  "Consigo identificar situações em que o uso da IA pode ser inadequado ou pouco confiável.",
  "Usar a IA em grupo ajuda no trabalho colaborativo e no desenvolvimento de ideias.",
  "Não há riscos éticos envolvidos no uso da IA nos processos de aprendizagem humana.",
  "Acredito que projetos como a Feira de Ciências podem aproximar a Matemática e a Física da realidade vivenciada pelos estudantes."
];

const ESPECIFICOS = {
  1: [
    "Entendo como a função afim pode representar situações do dia a dia (ex.: custo x quantidade).",
    "Sei relacionar a função quadrática com movimentos (ex.: queda de objetos, lançamentos).",
    "Consigo interpretar um gráfico de função exponencial em contextos de crescimento.",
    "Compreendo como as Leis de Newton ajudam a explicar movimentos observados em situações do meu cotidiano.",
    "Acredito que o uso de IA pode facilitar a modelagem de fenômenos de movimento."
  ],
  2: [
    "Consigo reconhecer situações do cotidiano que envolvem a função logarítmica (ex.: escala Richter, pH).",
    "Entendo o papel das funções trigonométricas na descrição de ciclos e fenômenos periódicos.",
    "Compreendo os conceitos básicos de calorimetria (trocas de calor, equilíbrio térmico).",
    "Relaciono o uso de funções com fenômenos ondulatórios e ciclos térmicos.",
    "Acredito que a IA é uma ferramenta adequada para apoiar a análise de fenômenos de calor e periodicidade."
  ],
  3: [
    "Entendo como a Lei de Ohm pode ser representada matematicamente (U = R·I).",
    "Consigo interpretar gráficos relacionados à corrente elétrica e potência em circuitos.",
    "Tenho noção de como os campos magnéticos interagem com correntes elétricas.",
    "Considero importante discutir temas relacionados com a matriz energética e com os impactos sociais e ambientais gerados pela produção e utilização da eletricidade.",
    "Acredito que a IA é uma ferramenta adequada para auxiliar na modelagem e análise de circuitos elétricos e fenômenos eletromagnéticos."
  ]
};

// Cada linha corresponde a Q1, Q2, ..., Q13.
// Colunas: aumentou, igual, reduziu, média inicial, média final,
// mediana inicial, mediana final, p bruto, p ajustado por Holm.
// Valores preservados do painel original; sem dados individuais.
const LINHAS = {
  1: [
    [4,5,1,3.3,4,4,4,0.375,1],
    [2,4,4,4,3.9,4,4,0.6875,1],
    [3,3,4,3.2,3,3,3.5,1,1],
    [1,2,7,4,3.2,4,3,0.0703125,1],
    [2,5,3,4.1,3.9,4,4,1,1],
    [4,3,3,3.7,3.9,4,4,1,1],
    [2,4,4,1.6,1.4,1,1,0.6875,1],
    [2,1,7,3.7,3,3.5,3,0.1796875,1],
    [1,6,3,4.1,3.8,4,4,0.625,1],
    [5,3,2,3,3.5,3,3.5,0.453125,1],
    [4,2,4,3.8,3.9,4,4,1,1],
    [3,5,2,3.9,4.3,4,4.5,1,1],
    [4,5,1,3.9,4.2,4,4.5,0.375,1]
  ],
  2: [
    [8,16,3,4.222222222222222,4.481481481481482,4,5,0.2265625,1],
    [7,14,6,3.962962962962963,4.185185185185185,4,4,1,1],
    [15,9,3,3.185185185185185,4,3,4,0.007537841796875,0.293975830078125],
    [7,12,8,3.4444444444444446,3.4444444444444446,3,3,1,1],
    [13,7,7,3.7777777777777777,4.111111111111111,4,4,0.2631759643554687,1],
    [14,9,4,3.6666666666666665,4.333333333333333,4,5,0.0308837890625,1],
    [9,9,9,2.5185185185185186,2.5185185185185186,3,2,1,1],
    [8,12,7,3.6296296296296298,4.037037037037037,4,4,1,1],
    [12,8,7,2.6296296296296298,3.037037037037037,3,3,0.359283447265625,1],
    [11,8,8,3.4074074074074074,3.4444444444444446,3,4,0.6476058959960938,1],
    [9,8,10,3.2222222222222223,3.2222222222222223,3,3,1,1],
    [13,8,6,2.7777777777777777,3.111111111111111,3,3,0.1670684814453125,1],
    [7,14,6,3.740740740740741,3.888888888888889,4,4,1,1]
  ],
  3: [
    [9,12,3,4.208333333333333,4.583333333333333,4,5,0.14599609375,1],
    [7,11,6,4.083333333333333,4.166666666666667,4,4,1,1],
    [5,14,5,4.291666666666667,4.291666666666667,5,4.5,1,1],
    [4,10,10,4.041666666666667,3.6666666666666665,4,4,0.1795654296875,1],
    [5,17,2,4.291666666666667,4.458333333333333,5,5,0.453125,1],
    [7,16,1,3.9583333333333335,4.25,4,4.5,0.0703125,1],
    [8,11,5,1.9583333333333333,2.083333333333333,2,2,0.5810546875,1],
    [6,8,10,4.166666666666667,3.9583333333333335,4,4,0.454498291015625,1],
    [10,8,6,3.0416666666666665,3.333333333333333,3,3.5,0.454498291015625,1],
    [7,13,4,2.958333333333333,3.208333333333333,3.5,3.5,0.548828125,1],
    [14,6,4,2.875,3.583333333333333,3,4,0.0308837890625,1],
    [6,13,5,4.083333333333333,4.25,4,4,1,1],
    [12,6,6,3.583333333333333,4,4,4,0.237884521484375,1]
  ]
};

const DATA = Object.entries(LINHAS).flatMap(([serie, linhas]) =>
  linhas.map((r, i) => ({
    serie: Number(serie),
    item: i + 1,
    n: r[0] + r[1] + r[2],
    subiu: r[0],
    igual: r[1],
    desceu: r[2],
    media_pre: r[3],
    media_pos: r[4],
    mediana_pre: r[5],
    mediana_pos: r[6],
    p_sinais: r[7],
    p_holm_39: r[8],
    enunciado: i < 8 ? COMUNS[i] : ESPECIFICOS[serie][i - 8]
  }))
);

const GRUPOS = [
  { chave: "subiu", nome: "Aumentou", classe: "up" },
  { chave: "igual", nome: "Permaneceu igual", classe: "same" },
  { chave: "desceu", nome: "Reduziu", classe: "down" }
];

const $ = id => document.getElementById(id);
const fmt = (valor, casas = 2) =>
  Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });

const esc = texto => String(texto).replace(/[&<>"']/g, caractere => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;",
  '"': "&quot;", "'": "&#39;"
}[caractere]));

function descricao(r) {
  return GRUPOS.map(g =>
    `${g.nome}: ${r[g.chave]} de ${r.n} (${fmt(100 * r[g.chave] / r.n, 1)}%)`
  ).join("; ");
}

function segmentos(r) {
  return GRUPOS.map(g => {
    const quantidade = r[g.chave];
    const percentual = 100 * quantidade / r.n;
    if (!quantidade) return "";
    // Segmentos pequenos mantêm a contagem; o percentual aparece na legenda.
    const detalhe = percentual >= 12 ? `<span>${fmt(percentual, 1)}%</span>` : "";
    return `<div class="seg ${g.classe}" style="width:${percentual}%"
      title="${g.nome}: ${quantidade} (${fmt(percentual, 1)}%)">
      <strong>${quantidade}</strong>${detalhe}</div>`;
  }).join("");
}

function atualizarItens() {
  const serie = Number($("serie").value);
  const anterior = Number($("item").value) || 3;
  const registros = DATA.filter(r => r.serie === serie);
  $("item").replaceChildren(...registros.map(r =>
    new Option(`Q${r.item} — ${r.enunciado}`, String(r.item))
  ));
  $("item").value = String(anterior);
  atualizarPainel();
}

function atualizarPainel() {
  const serie = Number($("serie").value);
  const item = Number($("item").value);
  const r = DATA.find(d => d.serie === serie && d.item === item);
  if (!r) return;

  $("statement").textContent = `${serie}º EDI · Q${item} — ${r.enunciado}`;
  $("chart").innerHTML = segmentos(r);
  $("chart").setAttribute("aria-label", descricao(r));
  $("counts").innerHTML = GRUPOS.map(g =>
    `<span><i class="dot ${g.classe}"></i>${g.nome}:
      ${r[g.chave]} (${fmt(100 * r[g.chave] / r.n, 1)}%)</span>`
  ).join("");

  const indicadores = [
    ["Pares analisados", r.n],
    ["Média inicial", fmt(r.media_pre)],
    ["Média final", fmt(r.media_pos)],
    ["p ajustado por Holm", fmt(r.p_holm_39, 4)]
  ];
  $("stats").innerHTML = indicadores.map(([titulo, valor]) =>
    `<div class="stat"><span>${titulo}</span><strong>${valor}</strong></div>`
  ).join("");

  $("test").textContent =
    `Teste dos sinais bilateral: p bruto = ${fmt(r.p_sinais, 4)}; ` +
    `p ajustado = ${fmt(r.p_holm_39, 4)}. ` +
    "O aumento numérico de uma resposta não equivale automaticamente a melhora.";
  $("reverse").hidden = item !== 7;
}

function preencherTabela() {
  $("allrows").innerHTML = DATA.map(r => `
    <tr>
      <th scope="row">${r.serie}º EDI<br>Q${r.item} · n=${r.n}</th>
      <td>${esc(r.enunciado)}</td>
      ${GRUPOS.map(g => `<td class="num">${r[g.chave]}<br>
        <span class="small">${fmt(100 * r[g.chave] / r.n, 1)}%</span></td>`).join("")}
      <td class="num">${fmt(r.media_pre)}</td>
      <td class="num">${fmt(r.media_pos)}</td>
      <td class="num">${fmt(r.p_holm_39, 4)}</td>
    </tr>`).join("");
}

function preencherDestaques() {
  const destaques = [
    [1, 4, "Interesse pelas tecnologias digitais"],
    [2, 3, "Exame crítico das respostas da IA"],
    [3, 11, "Campos magnéticos e correntes elétricas"]
  ];
  $("summary").innerHTML = destaques.map(([serie, item, titulo]) => {
    const r = DATA.find(d => d.serie === serie && d.item === item);
    return `<div class="summaryrow">
      <div><strong>${serie}º EDI · ${titulo}</strong><br>
        <span class="small">Q${item} · ${r.n} pares</span></div>
      <div class="bar" role="img" aria-label="${esc(descricao(r))}">
        ${segmentos(r)}</div>
    </div>`;
  }).join("");
}

$("serie").addEventListener("change", atualizarItens);
$("item").addEventListener("change", atualizarPainel);
preencherTabela();
preencherDestaques();
atualizarItens();


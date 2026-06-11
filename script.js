/* =========================================================
   HACHIMON 八門 — Os Oito Portões
   Tracker de treino híbrido: força + estética + capacidade
   de trabalho. Cada sessão registrada acumula chakra e abre
   caminho até o próximo portão.
   Client-side puro · localStorage versionado · zero dependência
   ========================================================= */

/* ---------------------------------------------------------
   PROGRAMA — fonte da verdade (editável sem tocar no resto)
   Upper/Lower 2× · Ter UA · Qui LA · Sex UB · Sáb LB
--------------------------------------------------------- */
const PROGRAM = {
    agenda: {
        pesados: { 2: "UA", 4: "LA", 5: "UB", 6: "LB" }, // getDay() -> treino
        leve: [1],            // Seg: cardio Z2
        recuperacao: [0, 3]   // Dom e Qua: descanso / recuperação ativa
    },
    est1RM: "Epley → peso * (1 + reps / 30)",
    treinos: {
        UA: {
            titulo: "UPPER A", foco: "supino pesado · costas espessas · ombro", kanji: "拳",
            exercicios: [
                { nome: "Supino reto com barra", series: 4, reps: [4, 6], tipo: "composto", musculo: "peito", descanso: "2,5–3 min", nota: "Lift de força do dia. Rampa antes: barra×10 · 40%×6 · 60%×4 · 80%×2. Pausa de 1s no peito, 1–2 reps na reserva." },
                { nome: "Remada curvada com barra", series: 4, reps: [6, 8], tipo: "composto", musculo: "costas", descanso: "2–2,5 min", nota: "Tronco a ~45°, barra ao abdome. Única remada com carga lombar da semana — por isso vive na terça, longe do sábado." },
                { nome: "Desenvolvimento com halteres sentado", series: 3, reps: [8, 10], tipo: "composto", musculo: "ombro", descanso: "90 s–2 min", nota: "Banco a ~80°. Desça até a linha das orelhas, sem bater os halteres no topo." },
                { nome: "Puxada alta pegada aberta", series: 3, reps: [8, 10], tipo: "composto", musculo: "costas · V", descanso: "90 s", nota: "Cotovelos em direção aos bolsos, peito alto. Largura de costas = o V do shape." },
                { nome: "Elevação lateral com halteres", series: 3, reps: [12, 15], tipo: "isolado", musculo: "deltoide lateral", descanso: "bi-set com face pull", nota: "Cotovelo lidera. Emenda direto no face pull e descansa 60s ao fim do par." },
                { nome: "Face pull na polia com corda", series: 3, reps: [15, 20], tipo: "isolado", musculo: "deltoide posterior", descanso: "60 s após o bi-set", nota: "Puxe em direção à testa e rode pra fora no final. Ombro 3D + saúde de ombro." },
                { nome: "Rosca direta com barra W", series: 3, reps: [8, 12], tipo: "isolado", musculo: "bíceps", descanso: "bi-set com tríceps", nota: "Cotovelos colados no tronco. Emenda no tríceps corda, 60s ao fim do par." },
                { nome: "Tríceps na polia com corda", series: 3, reps: [10, 15], tipo: "isolado", musculo: "tríceps", descanso: "60 s após o bi-set", nota: "Abra a corda no final e estenda completo. Trabalha o tríceps encurtado — sexta pega alongado." }
            ],
            finisher: {
                nome: "Konoha Senpū", duracao: "6 min · tiros aláticos",
                descricao: "Bike: 6 tiros de 15s em cadência máxima com carga alta, 45s de giro leve entre eles. Curto de propósito — violento sem roubar a quinta. Sem bike: esteira a 10–12% de inclinação, 6 tiros de 15–20s com 40–45s de pausa pisando nas laterais. Progrida: +1 tiro ou +1 nível de carga, nunca menos descanso."
            }
        },
        LA: {
            titulo: "LOWER A", foco: "agachamento livre · dobradiça · quadríceps", kanji: "脚",
            exercicios: [
                { nome: "Agachamento livre com barra", series: 4, reps: [4, 6], tipo: "composto", musculo: "quadríceps · glúteo", descanso: "2,5–3 min", nota: "Lift de força do dia. Rampa: barra×10 · 40%×6 · 60%×4 · 80%×2. Vindo do Smith: 2 semanas calibrando com 2–3 reps na reserva, prioridade em profundidade. Rack ocupado → Smith mantém a progressão, não espere 15 min." },
                { nome: "Terra romeno (RDL) com barra", series: 3, reps: [8, 10], tipo: "composto", musculo: "posterior · glúteo", descanso: "2–2,5 min", nota: "Única dobradiça pesada da semana — o sábado poupa a lombar de propósito. Barra rente à coxa, quadril pra trás, coluna neutra." },
                { nome: "Leg press 45°", series: 3, reps: [10, 12], tipo: "composto", musculo: "quadríceps", descanso: "90 s", nota: "Amplitude longa sem deixar o quadril enrolar no fundo. Volume sem custo axial." },
                { nome: "Cadeira flexora", series: 3, reps: [10, 15], tipo: "isolado", musculo: "posterior", descanso: "75 s", nota: "Controle de 2–3s na volta — o alongamento é a parte que constrói." },
                { nome: "Panturrilha em pé", series: 4, reps: [10, 15], tipo: "isolado", musculo: "panturrilha", descanso: "60 s", nota: "Pausa de 1–2s no alongamento embaixo, sem quicar. Amplitude honesta > carga." },
                { nome: "Abdominal na polia alta (crunch ajoelhado)", series: 3, reps: [10, 15], tipo: "core", musculo: "core", descanso: "60 s", nota: "Flexione a coluna torácica, não o quadril. Core também progride em carga." }
            ],
            finisher: {
                nome: "Kaimon — Abertura", duracao: "6 min · glicolítico",
                descricao: "Bike: 4 rounds de 30s forte sentado (carga moderada-alta) + 60s leve. Estímulo diferente dos tiros de terça; sexta é de superiores, então não há interferência. Sem bike: esteira a 12%, 4 rounds de 45s no máximo que aguentar caminhando + 60s normal. Progrida: +1 round."
            }
        },
        UB: {
            titulo: "UPPER B", foco: "ombro 3D · costas em V · braços", kanji: "剛",
            exercicios: [
                { nome: "Desenvolvimento militar com barra", series: 4, reps: [5, 7], tipo: "composto", musculo: "ombro", descanso: "2,5 min", nota: "Lift de força do dia. Rampa: barra×10 · 40%×6 · 60%×4 · 80%×2. Em pé se a técnica estiver sólida; sentado poupa mais a lombar pro sábado. Rack ocupado → Smith mantém a progressão." },
                { nome: "Puxada alta com triângulo (neutra)", series: 4, reps: [8, 10], tipo: "composto", musculo: "costas · V", descanso: "90 s–2 min", nota: "Pegada neutra deixa puxar mais carga com mais amplitude que a aberta de terça. Leve o triângulo ao esterno." },
                { nome: "Supino inclinado com halteres", series: 3, reps: [8, 12], tipo: "composto", musculo: "peito superior", descanso: "90 s", nota: "Banco a 30°. Desça fundo alongando o peitoral — complementa o supino pesado de terça." },
                { nome: "Remada baixa sentado (cavalinho)", series: 3, reps: [10, 12], tipo: "composto", musculo: "costas", descanso: "90 s", nota: "Tronco quase imóvel — quem rema é o cotovelo, não a lombar. Aperte as escápulas 1s." },
                { nome: "Elevação lateral na polia (unilateral)", series: 3, reps: [12, 20], tipo: "isolado", musculo: "deltoide lateral", descanso: "bi-set com crucifixo inv.", nota: "Cabo por trás do corpo: tensão onde o halter não pesa. Na última série, myo-reps opcional: após chegar perto da falha, 3 mini-séries de 4–5 reps." },
                { nome: "Crucifixo invertido (halteres ou polia)", series: 3, reps: [12, 15], tipo: "isolado", musculo: "deltoide posterior", descanso: "60 s após o bi-set", nota: "Peça-chave do ombro 3D. Cotovelos semiestendidos, arco amplo pra fora." },
                { nome: "Rosca martelo alternada", series: 3, reps: [10, 12], tipo: "isolado", musculo: "bíceps · braquial", descanso: "bi-set com tríceps", nota: "Braquial dá espessura lateral ao braço. Emenda no francês, 60s ao fim do par." },
                { nome: "Tríceps francês com halter (duas mãos)", series: 3, reps: [10, 12], tipo: "isolado", musculo: "tríceps", descanso: "60 s após o bi-set", nota: "Sentado, cotovelos pro teto, alongamento profundo — a cabeça longa só cresce alongada. Complementa a corda de terça." }
            ],
            finisher: {
                nome: "Dynamic Entry", duracao: "8 min · EMOM misto",
                descricao: "EMOM 8 min: minutos ímpares — 10–15 flexões explosivas (empurre o chão com intenção de decolar); minutos pares — 8–12 remadas invertidas na barra do Smith na altura do quadril. O que sobrar do minuto é descanso. Smith ocupado: 20 polichinelos + 10 agachamentos com peso corporal nos pares. Progrida: +1 rep por estação."
            }
        },
        LB: {
            titulo: "LOWER B", foco: "glúteo · unilateral · lombar poupada", kanji: "嵐",
            exercicios: [
                { nome: "Leg press 45° (pesado)", series: 4, reps: [8, 12], tipo: "composto", musculo: "quadríceps · glúteo", descanso: "2 min", nota: "Você treinou ontem: o eixo do sábado é carga pesada SEM compressão de coluna. Rampa de 2 séries leves antes." },
                { nome: "Elevação pélvica (hip thrust)", series: 3, reps: [8, 12], tipo: "composto", musculo: "glúteo", descanso: "90 s–2 min", nota: "Pausa de 1s no topo com pelve neutra. Monte no Smith pra agilizar o setup; sem paciência pro setup → búlgaro com mais carga e elevação pélvica unilateral no banco." },
                { nome: "Agachamento búlgaro com halteres", series: 3, reps: [8, 10], tipo: "composto", musculo: "quadríceps · glúteo", descanso: "90 s após as duas pernas", nota: "Reps POR PERNA, comece pela mais fraca. Tronco inclinado = mais glúteo; ereto = mais quadríceps." },
                { nome: "Cadeira extensora", series: 3, reps: [12, 15], tipo: "isolado", musculo: "quadríceps", descanso: "60 s", nota: "Segure 1s no topo. Semana ruim de plantão/sono? Este é o primeiro exercício a cortar — válvula oficial do programa." },
                { nome: "Cadeira flexora", series: 3, reps: [12, 15], tipo: "isolado", musculo: "posterior", descanso: "60 s", nota: "Segunda dose semanal de flexão de joelho — curva de resistência que o RDL não cobre." },
                { nome: "Panturrilha sentado", series: 4, reps: [12, 20], tipo: "isolado", musculo: "panturrilha · sóleo", descanso: "45–60 s", nota: "Joelho dobrado pega o sóleo — complementa a panturrilha em pé de quinta." },
                { nome: "Elevação de pernas (suspenso ou banco)", series: 3, reps: [10, 15], tipo: "core", musculo: "core", descanso: "60 s", nota: "Enrole o quadril no final, sem balanço." }
            ],
            finisher: {
                nome: "Hachimon — Os Oito Portões", duracao: "8 min · farmer carry",
                descricao: "EMOM 8 min com um par de halteres pesado (que você só aguentaria ~45s seguidos): a cada minuto, caminhe 30–40 m em passada firme e postura ereta; o resto do minuto é descanso. 8 rounds = 8 portões. A pegada recupera até terça. Sem corredor: farmer hold parado de 30s por round. Progrida: +5 m ou o próximo par de halteres a cada portão que abrir."
            }
        }
    }
};

/* ---------------------------------------------------------
   OS OITO PORTÕES — desbloqueio por sessões pesadas registradas
--------------------------------------------------------- */
const GATES = [
    { n: 1, kanji: "開", nome: "Kaimon", pt: "Portão da Abertura", tech: "Omote Renge", req: 1, quote: "O primeiro passo remove as travas da mente. Você começou — isso já te separa da maioria." },
    { n: 2, kanji: "休", nome: "Kyūmon", pt: "Portão da Cura", tech: "Força além da vontade", req: 8, quote: "Duas semanas de presença. O corpo já entendeu que não é fase." },
    { n: 3, kanji: "生", nome: "Seimon", pt: "Portão da Vida", tech: "Ura Renge", req: 16, quote: "Um mês de chakra acumulado. A pele queima vermelha: agora é hábito." },
    { n: 4, kanji: "傷", nome: "Shōmon", pt: "Portão da Dor", tech: "Constância sob fadiga", req: 32, quote: "Dois meses. Você treinou nos dias em que não queria — é isso que constrói." },
    { n: 5, kanji: "杜", nome: "Tomon", pt: "Portão do Limite", tech: "Cargas de outro patamar", req: 56, quote: "O que era pesado virou aquecimento. O limite era mentira." },
    { n: 6, kanji: "景", nome: "Keimon", pt: "Portão da Visão", tech: "Asa Kujaku", req: 88, quote: "Meio ano de lapidação. O espelho já conta a história — o Pavão da Manhã abriu as penas." },
    { n: 7, kanji: "驚", nome: "Kyōmon", pt: "Portão do Espanto", tech: "Hirudora", req: 128, quote: "Oito meses. Quem te viu no começo não te reconhece. Tigre da Tarde." },
    { n: 8, kanji: "死", nome: "Shimon", pt: "Portão da Morte", tech: "Sekizō · Yagai (Night Guy)", req: 176, quote: "Um ano de guerra silenciosa. Você virou o exemplo que procurava. 努力は天才に勝る。" }
];

/* ---------------------------------------------------------
   IDs estáveis por exercício (slug do nome) + índice plano
--------------------------------------------------------- */
function slug(s) {
    return s.toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const TREINO_KEYS = ["UA", "LA", "UB", "LB"];
const EXERCISES = {}; // id -> { ...ex, treino, idx }
TREINO_KEYS.forEach((t) => {
    PROGRAM.treinos[t].exercicios.forEach((ex, idx) => {
        ex.id = slug(ex.nome);
        ex.treino = t;
        ex.idx = idx;
        EXERCISES[ex.id] = ex;
    });
});

/* ---------------------------------------------------------
   FRASES — tom Maito Gai: juventude, esforço, fogo
--------------------------------------------------------- */
const MANIFESTOS = [
    { pt: "O trabalho duro supera o talento.", jp: "努力は天才に勝る。" },
    { pt: "A primavera da juventude explode agora!", jp: "青春パワー全開!" },
    { pt: "O lótus de Konoha floresce duas vezes.", jp: "木ノ葉の蓮華は二度咲く。" },
    { pt: "Não conseguiu? Treine até conseguir. Essa é a sua regra.", jp: "できるまで鍛えろ。それが自分ルールだ。" },
    { pt: "Abrir o portão dói. Ficar parado dói mais.", jp: "門を開くのは痛い。止まる方がもっと痛い。" },
    { pt: "Rivalize com quem você era ontem.", jp: "昨日の自分に勝て。" },
    { pt: "Não existe gênio que aguente a sua consistência.", jp: "継続に勝てる天才はいない。" },
    { pt: "Suor hoje. Explosão amanhã.", jp: "今日の汗、明日の爆発。" }
];

/* =========================================================
   HELPERS
========================================================= */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

const WEEKDAY_PT = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const WEEKDAY_FULL = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];

const pad2 = (n) => String(n).padStart(2, "0");

/** Formata número no padrão BR (vírgula decimal, até 1 casa). */
function fmt(n) {
    if (n == null || isNaN(n)) return "—";
    const r = Math.round(n * 10) / 10;
    return String(r).replace(".", ",");
}

/** Chave de data local YYYY-MM-DD (sem fuso surpresa). */
function dateKey(d) {
    const x = (d instanceof Date) ? d : new Date(d);
    return `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`;
}
const todayKey = () => dateKey(new Date());

/** Epley. */
const epley = (carga, reps) => (Number(carga) || 0) * (1 + (Number(reps) || 0) / 30);

/* ----- Calendário ----- */
function startOfWeekMonday(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dow = d.getDay();                 // 0=Dom … 6=Sáb
    const diff = dow === 0 ? -6 : 1 - dow;  // recua até a segunda
    d.setDate(d.getDate() + diff);
    return d;
}

/** Tipo do dia: 'pesado' | 'leve' | 'recuperacao'. */
function dayType(date) {
    const dow = date.getDay();
    if (dow in PROGRAM.agenda.pesados) return "pesado";
    if (PROGRAM.agenda.leve.includes(dow)) return "leve";
    return "recuperacao";
}

/** Treino sugerido hoje (no dia pesado: o do dia; senão: o próximo pesado). */
function suggestedTreino(date) {
    const dow = date.getDay();
    if (dow in PROGRAM.agenda.pesados) return PROGRAM.agenda.pesados[dow];
    for (let i = 1; i <= 7; i++) {
        const d = new Date(date);
        d.setDate(date.getDate() + i);
        if (d.getDay() in PROGRAM.agenda.pesados) return PROGRAM.agenda.pesados[d.getDay()];
    }
    return "UA";
}

function pickManifesto() {
    const d = new Date();
    const seed = d.getFullYear() * 1000 + d.getMonth() * 31 + d.getDate();
    return MANIFESTOS[seed % MANIFESTOS.length];
}

/* =========================================================
   PERSISTÊNCIA — interface única sobre o localStorage
========================================================= */
const STORE_KEY = "hachimon:sessoes:v1";
const CELEBRATED_KEY = "hachimon:portao-celebrado:v1";
const store = {
    load() {
        try {
            const raw = localStorage.getItem(STORE_KEY);
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            console.warn("Hachimon: falha ao ler registros, seguindo em memória.", e);
            return [];
        }
    },
    save(arr) {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(arr));
            return true;
        } catch (e) {
            console.warn("Hachimon: falha ao salvar registros.", e);
            return false;
        }
    },
    clear() {
        try {
            localStorage.removeItem(STORE_KEY);
            localStorage.removeItem(CELEBRATED_KEY);
        } catch (e) { /* noop */ }
    },
    getCelebrated() {
        try { return parseInt(localStorage.getItem(CELEBRATED_KEY) || "0", 10) || 0; }
        catch (e) { return 0; }
    },
    setCelebrated(n) {
        try { localStorage.setItem(CELEBRATED_KEY, String(n)); } catch (e) { /* noop */ }
    }
};

/* Estado em memória (espelha o store). */
let sessions = store.load();

/** Salva (substituindo a sessão do mesmo dia+treino, se existir). */
function commitSession(sess) {
    const k = dateKey(sess.data);
    const i = sessions.findIndex((s) => dateKey(s.data) === k && s.treino === sess.treino);
    if (i >= 0) sessions[i] = sess; else sessions.push(sess);
    sessions.sort((a, b) => a.id - b.id);
    return store.save(sessions);
}

/* ----- Consultas ----- */
function todaysSession(treino) {
    const k = todayKey();
    return sessions.find((s) => dateKey(s.data) === k && s.treino === treino) || null;
}

function historyOf(exId) {
    return sessions
        .filter((s) => s.series[exId] && s.series[exId].some((x) => x && (x.carga != null || x.reps != null)))
        .sort((a, b) => a.id - b.id);
}

/** Última sessão COMPLETA anterior a hoje (referência "último: …"). */
function lastEntry(exId) {
    const list = historyOf(exId).slice().reverse();
    const k = todayKey();
    for (const s of list) if (dateKey(s.data) !== k) return s;
    return null;
}

/** Métrica do exercício: 'tempo' (porTempo) | 'kg' (tem carga) | 'reps' (peso corporal). */
function exMetric(ex) {
    if (ex.porTempo) return "tempo";
    const any = sessions.some((s) =>
        s.series[ex.id] && s.series[ex.id].some((x) => x && x.carga != null && x.carga > 0));
    return any ? "kg" : "reps";
}

function bestSet(series, metric) {
    const valid = (series || []).filter((x) => x && (x.reps != null || x.carga != null));
    if (!valid.length) return null;
    if (metric === "kg") return valid.reduce((b, x) => (epley(x.carga, x.reps) > epley(b.carga, b.reps) ? x : b));
    return valid.reduce((b, x) => ((x.reps || 0) > (b.reps || 0) ? x : b));
}

function setValue(set, metric) {
    if (!set) return 0;
    if (metric === "kg") return Number(set.carga) || 0;
    return Number(set.reps) || 0;
}

/** Motor de sobrecarga: bateu o topo da faixa em TODAS as séries na última sessão? */
function shouldIncreaseLoad(ex) {
    if (!ex.reps) return false;
    const last = lastEntry(ex.id);
    if (!last) return false;
    const sets = (last.series[ex.id] || []).filter((x) => x && x.reps != null);
    if (sets.length < ex.series) return false;
    const topo = ex.reps[1];
    return sets.every((x) => x.reps >= topo);
}

/* =========================================================
   MOTOR DOS PORTÕES
========================================================= */
const totalSessions = () => sessions.length;

/** Índice (0-8) do portão atual: quantos portões estão abertos. */
function gatesOpen() {
    const n = totalSessions();
    let open = 0;
    for (const g of GATES) if (n >= g.req) open = g.n;
    return open;
}
/** Portão atual (último aberto) ou null se nenhum. */
const currentGate = () => gatesOpen() > 0 ? GATES[gatesOpen() - 1] : null;
/** Próximo portão a abrir ou null se todos abertos. */
const nextGate = () => gatesOpen() < 8 ? GATES[gatesOpen()] : null;

/* =========================================================
   ESTADO DA UI
========================================================= */
const state = {
    screen: "treino",
    treino: suggestedTreino(new Date()),
    progEx: null,
    finisherDone: false
};

/* =========================================================
   RENDER — TOPO E NAV
========================================================= */
function renderTopbar() {
    const now = new Date();
    $("#topbar-date").textContent =
        `${WEEKDAY_FULL[now.getDay()]} · ${pad2(now.getDate())}.${pad2(now.getMonth() + 1)}.${now.getFullYear()}`;
}

function setScreen(name) {
    state.screen = name;
    document.body.dataset.screen = name;
    $$(".screen").forEach((s) => s.classList.toggle("is-active", s.dataset.screen === name));
    $$(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.screen === name));
    if (name === "progresso") renderProgresso();
    if (name === "semana") renderSemana();
    if (name === "treino") renderTreino();
    if (name === "portoes") renderPortoes();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   RENDER — TELA TREINO
========================================================= */
function renderTreino() {
    const now = new Date();
    const tipo = dayType(now);
    const t = state.treino;
    const treino = PROGRAM.treinos[t];

    // Cabeçalho / herói
    $("#treino-kanji").textContent = treino.kanji;
    $("#treino-weekday").textContent = WEEKDAY_PT[now.getDay()];
    const cg = currentGate();
    $("#hero-gate-label").textContent = cg
        ? `PORTÃO ${cg.n} · ${cg.kanji} ${cg.nome}`
        : "NENHUM PORTÃO ABERTO — AINDA";
    const sug = suggestedTreino(now);
    const sugPrefix = tipo === "pesado" ? "SUGERIDO" : "PRÓXIMO PESADO";
    $("#treino-sugerido").textContent = `${sugPrefix}: ${sug} · ${PROGRAM.treinos[sug].titulo}`;
    $("#treino-title").textContent = treino.titulo;
    $("#treino-foco").textContent = treino.foco;

    // Frase do dia
    const m = pickManifesto();
    $("#manifesto-text").textContent = m.pt;
    $("#manifesto-jp").textContent = m.jp;

    // Toggle UA/LA/UB/LB
    $$(".seg-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.treino === t));

    // Banner do tipo de dia
    const banner = $("#day-banner");
    if (tipo === "pesado") {
        banner.hidden = true;
    } else {
        banner.hidden = false;
        if (tipo === "leve") {
            banner.className = "day-banner is-leve";
            banner.innerHTML = `<span class="db-kanji">軽</span>
                <div><strong>DIA LEVE</strong>
                <p>Cardio Zona 2 · 30–40 min. A base aeróbica é o que sustenta os portões. Registro de carga abaixo é opcional.</p></div>`;
        } else {
            banner.className = "day-banner is-rec";
            banner.innerHTML = `<span class="db-kanji">休</span>
                <div><strong>RECUPERAÇÃO</strong>
                <p>Descanso ou recuperação ativa: caminhada, mobilidade, Z2 leve. O corpo abre portão no silêncio.</p></div>`;
        }
    }

    // Cards de exercício
    const saved = todaysSession(t);
    state.finisherDone = !!(saved && saved.finisher);
    const wrap = $("#exercicios");
    wrap.innerHTML = "";

    treino.exercicios.forEach((ex, i) => {
        const metric = exMetric(ex);
        const last = lastEntry(ex.id);
        const lastSets = last ? (last.series[ex.id] || []) : [];
        const savedSets = saved ? (saved.series[ex.id] || []) : [];
        const subir = shouldIncreaseLoad(ex);
        const esquema = ex.porTempo ? `${ex.series} × tempo`
            : `${ex.series} × ${ex.reps[0]}–${ex.reps[1]}`;

        const card = document.createElement("article");
        card.className = "card reveal";
        card.style.transitionDelay = (i * 45) + "ms";

        let setsHTML = "";
        for (let s = 0; s < ex.series; s++) {
            const sv = savedSets[s] || {};
            const lv = lastSets[s];
            const ref = lv && (lv.carga != null || lv.reps != null)
                ? `últ. ${refText(lv, metric, true)}`
                : "primeira vez";
            const cargaVal = sv.carga != null ? sv.carga : "";
            const repsVal = sv.reps != null ? sv.reps : "";

            if (metric === "tempo") {
                setsHTML += `
                <div class="set-row" data-ex="${ex.id}" data-set="${s}">
                    <span class="set-idx">${s + 1}</span>
                    <label class="set-field set-field--solo">
                        <input class="set-reps" type="number" inputmode="numeric" min="0"
                            placeholder="0" value="${repsVal}" aria-label="Tempo em segundos série ${s + 1}">
                        <span class="set-unit">seg</span>
                    </label>
                    <span class="set-ref">${ref}</span>
                </div>`;
            } else {
                setsHTML += `
                <div class="set-row" data-ex="${ex.id}" data-set="${s}">
                    <span class="set-idx">${s + 1}</span>
                    <label class="set-field">
                        <input class="set-carga" type="number" inputmode="decimal" min="0" step="0.5"
                            placeholder="0" value="${cargaVal}" aria-label="Carga série ${s + 1}">
                        <span class="set-unit">kg</span>
                    </label>
                    <label class="set-field">
                        <input class="set-reps" type="number" inputmode="numeric" min="0"
                            placeholder="0" value="${repsVal}" aria-label="Reps série ${s + 1}">
                        <span class="set-unit">reps</span>
                    </label>
                    <span class="set-ref">${ref}</span>
                </div>`;
            }
        }

        card.innerHTML = `
            <div class="card-head">
                <div class="card-head-main">
                    <span class="card-tag">${ex.musculo} · ${ex.tipo}</span>
                    <h3 class="card-name">${ex.nome}</h3>
                </div>
                <span class="card-scheme">${esquema}</span>
            </div>
            <div class="card-rest">descanso ${ex.descanso}</div>
            ${ex.nota ? `<p class="card-nota">${ex.nota}</p>` : ""}
            ${subir ? `<div class="badge-up"><span class="badge-up-dot"></span>SUBA A CARGA — bateu o topo em tudo</div>`
                : (last ? `<div class="card-goal">Meta: repetir a carga e ganhar reps até o topo da faixa.</div>` : "")}
            <div class="sets">${setsHTML}</div>`;

        wrap.appendChild(card);
    });

    // Finisher do dia
    renderFinisher(treino);

    // Revela cards
    requestAnimationFrame(() => $$("#exercicios .reveal").forEach((el) => el.classList.add("is-visible")));
}

function renderFinisher(treino) {
    const wrap = $("#finisher-wrap");
    const f = treino.finisher;
    if (!f) { wrap.innerHTML = ""; return; }
    wrap.innerHTML = `
        <div class="finisher">
            <span class="finisher-eyebrow">FINISHER · ABRA O PORTÃO</span>
            <h3 class="finisher-name">${f.nome}</h3>
            <span class="finisher-dur">${f.duracao}</span>
            <p class="finisher-desc">${f.descricao}</p>
            <button class="finisher-check${state.finisherDone ? " is-done" : ""}" id="finisher-check" type="button">
                ${state.finisherDone ? "✓ PORTÃO ABERTO" : "MARCAR COMO FEITO"}
            </button>
        </div>`;
    $("#finisher-check").addEventListener("click", () => {
        state.finisherDone = !state.finisherDone;
        const btn = $("#finisher-check");
        btn.classList.toggle("is-done", state.finisherDone);
        btn.textContent = state.finisherDone ? "✓ PORTÃO ABERTO" : "MARCAR COMO FEITO";
    });
}

/** Texto da referência de uma série, conforme métrica. */
function refText(set, metric, compact = false) {
    if (metric === "tempo") return `${set.reps ?? "—"}s`;
    if (metric === "reps") return `${set.reps ?? "—"} reps`;
    const c = set.carga != null ? `${fmt(set.carga)}kg` : "—";
    const r = set.reps != null ? `${set.reps}` : "—";
    return compact ? `${c}×${r}` : `${c} × ${r}`;
}

/** Coleta os inputs e salva a sessão atual. */
function saveSession() {
    const t = state.treino;
    const treino = PROGRAM.treinos[t];
    const series = {};
    let hasData = false;

    treino.exercicios.forEach((ex) => {
        const rows = $$(`.set-row[data-ex="${ex.id}"]`);
        const arr = rows.map((row) => {
            const cargaEl = $(".set-carga", row);
            const repsEl = $(".set-reps", row);
            const carga = cargaEl && cargaEl.value !== "" ? parseFloat(cargaEl.value) : null;
            const reps = repsEl && repsEl.value !== "" ? parseInt(repsEl.value, 10) : null;
            if (carga != null || reps != null) hasData = true;
            return { carga: isNaN(carga) ? null : carga, reps: isNaN(reps) ? null : reps };
        });
        series[ex.id] = arr;
    });

    if (!hasData) {
        toast("Registre ao menos uma série antes de salvar.");
        return;
    }

    const before = gatesOpen();
    const existing = todaysSession(t);
    const sess = {
        id: existing ? existing.id : Date.now(),
        data: existing ? existing.data : new Date().toISOString(),
        treino: t,
        series,
        finisher: state.finisherDone
    };

    const ok = commitSession(sess);
    toast(ok ? "Sessão registrada. 押忍!" : "Salvo só nesta sessão (storage indisponível).");
    renderTreino();
    buildProgressoOptions();

    // Abriu portão novo?
    const after = gatesOpen();
    if (ok && after > before && after > store.getCelebrated()) {
        celebrateGate(GATES[after - 1]);
    }
}

/* =========================================================
   RENDER — TELA PORTÕES
========================================================= */
function renderPortoes() {
    const n = totalSessions();
    const open = gatesOpen();
    const cur = currentGate();
    const next = nextGate();

    document.body.classList.toggle("gate-max", open >= 8);

    // Herói: portão atual
    if (cur) {
        $("#g-current-kanji").textContent = cur.kanji;
        $("#g-current-name").textContent = cur.nome;
        $("#g-current-pt").textContent = `${cur.pt} · ${cur.tech}`;
    } else {
        $("#g-current-kanji").textContent = "門";
        $("#g-current-name").textContent = "Fechado";
        $("#g-current-pt").textContent = "Registre a primeira sessão pesada para abrir o Kaimon.";
    }

    // Barra até o próximo
    if (next) {
        const base = cur ? cur.req : 0;
        const pct = Math.max(0, Math.min(100, ((n - base) / (next.req - base)) * 100));
        $("#g-next-bar").style.width = pct + "%";
        const falta = next.req - n;
        $("#g-next-text").textContent =
            `${n} ${n === 1 ? "sessão" : "sessões"} · ${falta} até o ${next.kanji} ${next.nome}`;
    } else {
        $("#g-next-bar").style.width = "100%";
        $("#g-next-text").textContent = `${n} sessões · TODOS OS PORTÕES ABERTOS`;
    }

    // Lista dos 8
    const wrap = $("#gates");
    wrap.innerHTML = "";
    GATES.forEach((g, i) => {
        const isOpen = n >= g.req;
        const isCurrent = next && g.n === next.n;
        const el = document.createElement("div");
        el.className = "gate reveal" + (isOpen ? " is-open" : "") + (isCurrent ? " is-current" : "")
            + (g.n === 8 ? " gate--death" : "");
        el.style.transitionDelay = (i * 50) + "ms";
        el.innerHTML = `
            <span class="gate-kanji">${g.kanji}</span>
            <div class="gate-info">
                <div class="gate-name">${g.n}. ${g.nome}</div>
                <div class="gate-pt">${g.pt}</div>
                <div class="gate-tech">${isOpen ? "✓ " : ""}${g.tech}</div>
            </div>
            <span class="gate-req">${isOpen ? "ABERTO" : `${g.req} sessões`}</span>`;
        wrap.appendChild(el);
    });

    // Chamas da Juventude (finishers)
    const done = sessions.filter((s) => s.finisher).length;
    const rate = sessions.length ? Math.round((done / sessions.length) * 100) : 0;
    $("#flames-stats").innerHTML = `
        <div class="stat-box">
            <span class="stat-label">Finishers feitos</span>
            <span class="stat-val">${done}</span>
        </div>
        <div class="stat-box">
            <span class="stat-label">Taxa de chama</span>
            <span class="stat-val">${rate}%</span>
        </div>`;

    requestAnimationFrame(() => $$("#screen-portoes .reveal").forEach((el) => el.classList.add("is-visible")));
}

/** Overlay de celebração ao abrir um portão novo. */
function celebrateGate(gate) {
    const ov = $("#gate-overlay");
    $("#go-kanji").textContent = gate.kanji;
    $("#go-name").textContent = `${gate.nome} · ${gate.pt}`;
    $("#go-quote").textContent = gate.quote;
    ov.classList.toggle("is-death", gate.n === 8);
    ov.hidden = false;
    store.setCelebrated(gate.n);
}

/* =========================================================
   RENDER — TELA PROGRESSÃO
========================================================= */
function buildProgressoOptions() {
    const sel = $("#prog-select");
    if (!sel) return;
    const prev = state.progEx || sel.value;
    sel.innerHTML = "";
    TREINO_KEYS.forEach((t) => {
        const og = document.createElement("optgroup");
        og.label = `${t} · ${PROGRAM.treinos[t].titulo}`;
        PROGRAM.treinos[t].exercicios.forEach((ex) => {
            const o = document.createElement("option");
            o.value = ex.id;
            o.textContent = ex.nome;
            og.appendChild(o);
        });
        sel.appendChild(og);
    });
    if (prev && EXERCISES[prev]) sel.value = prev;
    state.progEx = sel.value;
}

function renderProgresso() {
    if (!state.progEx) buildProgressoOptions();
    const ex = EXERCISES[state.progEx];
    if (!ex) return;

    const metric = exMetric(ex);
    const hist = historyOf(ex.id);

    const unitLabel = metric === "tempo" ? "segundos" : metric === "reps" ? "reps" : "kg";
    $("#prog-chart-label").textContent = `Melhor série · ${unitLabel}`;

    const points = hist.map((s) => {
        const best = bestSet(s.series[ex.id], metric);
        return { date: s.data, best, value: setValue(best, metric) };
    }).filter((p) => p.best);

    const statsWrap = $("#prog-stats");
    const chartWrap = $("#prog-chart");
    const histWrap = $("#prog-history");

    if (!points.length) {
        statsWrap.innerHTML = "";
        chartWrap.innerHTML = `<p class="empty">Sem registros ainda.<br>Treine, registre e o número aparece aqui.</p>`;
        histWrap.innerHTML = "";
        return;
    }

    const first = points[0];
    const latest = points[points.length - 1];

    const firstCmp = metric === "kg" ? epley(first.best.carga, first.best.reps) : first.value;
    const lastCmp = metric === "kg" ? epley(latest.best.carga, latest.best.reps) : latest.value;
    const varPct = firstCmp > 0 ? ((lastCmp - firstCmp) / firstCmp) * 100 : 0;
    const varSign = varPct > 0 ? "+" : "";
    const varClass = varPct > 0 ? "up" : varPct < 0 ? "down" : "flat";

    const bestNow = refText(latest.best, metric, true);
    const e1 = metric === "kg" ? Math.round(epley(latest.best.carga, latest.best.reps)) : null;

    statsWrap.innerHTML = `
        <div class="stat-box">
            <span class="stat-label">Melhor série atual</span>
            <span class="stat-val">${bestNow}</span>
        </div>
        <div class="stat-box">
            <span class="stat-label">1RM estimado</span>
            <span class="stat-val">${e1 != null ? fmt(e1) + " kg" : "—"}</span>
        </div>
        <div class="stat-box">
            <span class="stat-label">Variação${metric === "kg" ? " (1RM)" : ""}</span>
            <span class="stat-val var-${varClass}">${varSign}${fmt(varPct)}%</span>
        </div>`;

    chartWrap.innerHTML = buildChart(points, metric);

    histWrap.innerHTML = `<div class="hist-head">Histórico</div>` +
        points.slice().reverse().slice(0, 16).map((p) => {
            const d = new Date(p.date);
            const date = `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}`;
            const e = metric === "kg" ? ` · 1RM ${fmt(Math.round(epley(p.best.carga, p.best.reps)))}` : "";
            return `<div class="hist-row">
                <span class="hist-date">${date}</span>
                <span class="hist-val">${refText(p.best, metric)}</span>
                <span class="hist-e1">${e}</span>
            </div>`;
        }).join("");
}

/** Gráfico de linha em SVG feito à mão — visual Hachimon. */
function buildChart(points, metric) {
    const W = 320, H = 150, padL = 8, padR = 8, padT = 14, padB = 22;
    const vals = points.map((p) => p.value);
    let min = Math.min(...vals), max = Math.max(...vals);
    if (min === max) { min = Math.max(0, min - 1); max = max + 1; }
    const span = max - min || 1;

    const n = points.length;
    const x = (i) => padL + (n === 1 ? (W - padL - padR) / 2 : (i / (n - 1)) * (W - padL - padR));
    const y = (v) => padT + (1 - (v - min) / span) * (H - padT - padB);

    const coords = points.map((p, i) => ({ cx: x(i), cy: y(p.value), v: p.value }));
    const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.cx.toFixed(1)},${c.cy.toFixed(1)}`).join(" ");
    const area = `${line} L${coords[n - 1].cx.toFixed(1)},${H - padB} L${coords[0].cx.toFixed(1)},${H - padB} Z`;

    const dots = coords.map((c, i) =>
        `<circle cx="${c.cx.toFixed(1)}" cy="${c.cy.toFixed(1)}" r="${i === n - 1 ? 4 : 2.6}"
            class="${i === n - 1 ? "chart-dot chart-dot--last" : "chart-dot"}"/>`).join("");

    const lastLabel = `<text x="${coords[n - 1].cx.toFixed(1)}" y="${(coords[n - 1].cy - 9).toFixed(1)}"
        class="chart-tip" text-anchor="${n === 1 ? "middle" : "end"}">${fmt(coords[n - 1].v)}</text>`;

    return `
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg" preserveAspectRatio="none" role="img" aria-label="Curva da melhor série">
        <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--green)" stop-opacity="0.26"/>
                <stop offset="100%" stop-color="var(--green-deep)" stop-opacity="0"/>
            </linearGradient>
        </defs>
        <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" class="chart-axis"/>
        <path d="${area}" fill="url(#chartFill)"/>
        <path d="${line}" class="chart-line" fill="none"/>
        ${dots}
        ${lastLabel}
        <text x="${padL}" y="${H - 6}" class="chart-min">${fmt(min)}</text>
        <text x="${W - padR}" y="${H - 6}" class="chart-max" text-anchor="end">${fmt(max)}</text>
    </svg>`;
}

/* =========================================================
   RENDER — TELA SEMANA
========================================================= */
function renderSemana() {
    const now = new Date();
    const mon = startOfWeekMonday(now);
    const todayK = todayKey();

    const grid = $("#week-grid");
    grid.innerHTML = "";
    let pesadosFeitos = 0;

    for (let i = 0; i < 7; i++) {
        const d = new Date(mon);
        d.setDate(mon.getDate() + i);
        const dk = dateKey(d);
        const tipo = dayType(d);
        const sess = sessions.find((s) => dateKey(s.data) === dk);
        const treinado = !!sess;
        if (treinado) pesadosFeitos++; // sessão registrada = treino pesado, mesmo fora do dia programado

        const cell = document.createElement("div");
        cell.className = "wk-cell";
        if (dk === todayK) cell.classList.add("is-today");
        if (treinado) cell.classList.add("is-done");
        if (tipo !== "pesado") cell.classList.add("is-soft");

        const mark = treinado ? sess.treino
            : (tipo === "pesado" ? PROGRAM.agenda.pesados[d.getDay()].charAt(0) + "·"
                : tipo === "recuperacao" ? "休" : "軽");
        cell.innerHTML = `
            <span class="wk-day">${WEEKDAY_PT[d.getDay()]}</span>
            <span class="wk-mark">${treinado ? sess.treino : mark}</span>
            <span class="wk-date">${pad2(d.getDate())}</span>`;
        grid.appendChild(cell);
    }

    $("#week-count").textContent = pesadosFeitos;
    const rail = $("#week-count-bar");
    if (rail) rail.style.width = Math.min(100, (pesadosFeitos / 4) * 100) + "%";

    $("#week-total").textContent = sessions.length;
}

/* =========================================================
   TOAST
========================================================= */
let toastTimer = null;
function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-show"), 2600);
}

/* =========================================================
   EVENTOS
========================================================= */
function wireEvents() {
    $$(".tab").forEach((t) => t.addEventListener("click", () => setScreen(t.dataset.screen)));

    $$(".seg-btn").forEach((b) => b.addEventListener("click", () => {
        state.treino = b.dataset.treino;
        renderTreino();
    }));

    $("#btn-save").addEventListener("click", saveSession);

    $("#prog-select").addEventListener("change", (e) => {
        state.progEx = e.target.value;
        renderProgresso();
    });

    $("#go-close").addEventListener("click", () => { $("#gate-overlay").hidden = true; });

    $("#btn-clear").addEventListener("click", () => {
        if (!sessions.length) { toast("Nada para apagar."); return; }
        if (confirm("Apagar TODOS os registros? Os portões se fecham. Esta ação não tem volta.")) {
            store.clear();
            sessions = [];
            buildProgressoOptions();
            renderTreino();
            renderSemana();
            renderProgresso();
            toast("Registros apagados. Recomece do Kaimon.");
        }
    });
}

/* Parallax sutil no herói (imagem + render). */
function setupParallax() {
    const bg = $(".hero-bg");
    const render = $(".hero-render");
    if (!bg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            bg.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0) scale(1.06)`;
            if (render) render.style.transform = `translate3d(0, ${window.scrollY * 0.10}px, 0)`;
            ticking = false;
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

/* =========================================================
   INIT
========================================================= */
function init() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(() => { });
    }
    // Dados antigos sem celebração registrada: alinha sem mostrar overlay.
    if (store.getCelebrated() < gatesOpen()) store.setCelebrated(gatesOpen());

    renderTopbar();
    buildProgressoOptions();
    wireEvents();
    renderTreino();
    setScreen("treino");
    setupParallax();
}

document.addEventListener("DOMContentLoaded", init);

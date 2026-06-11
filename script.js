/* =========================================================
   HACHIMON 八門 — Os Oito Portões
   Planilha de treino híbrido: força + estética + capacidade
   de trabalho. Sem campos de carga — a planilha é a referência,
   o registro é "treino feito". Cada sessão registrada acumula
   chakra e abre caminho até o próximo portão.
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
                { nome: "Cadeira flexora (reps altas)", series: 3, reps: [12, 15], tipo: "isolado", musculo: "posterior", descanso: "60 s", nota: "Segunda dose semanal de flexão de joelho — curva de resistência que o RDL não cobre." },
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
TREINO_KEYS.forEach((t) => {
    PROGRAM.treinos[t].exercicios.forEach((ex, idx) => {
        ex.id = slug(ex.nome);
        ex.treino = t;
        ex.idx = idx;
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

/** Chave de data local YYYY-MM-DD (sem fuso surpresa). */
function dateKey(d) {
    const x = (d instanceof Date) ? d : new Date(d);
    return `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`;
}
const todayKey = () => dateKey(new Date());

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

/** Próximo treino pesado a partir de hoje (inclusive). */
function nextHeavyInfo(date) {
    for (let i = 0; i <= 7; i++) {
        const d = new Date(date);
        d.setDate(date.getDate() + i);
        if (d.getDay() in PROGRAM.agenda.pesados) {
            return { treino: PROGRAM.agenda.pesados[d.getDay()], dow: d.getDay(), hoje: i === 0 };
        }
    }
    return { treino: "UA", dow: 2, hoje: false };
}
const suggestedTreino = (date) => nextHeavyInfo(date).treino;

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
const CARDIO_KEY = "hachimon:cardio:v1";
const STRIKES_KEY = "hachimon:riscados:v1";

function lsGet(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
}
function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { console.warn("Hachimon: falha ao salvar.", e); return false; }
}

const store = {
    load() {
        const arr = lsGet(STORE_KEY, []);
        if (!Array.isArray(arr)) return [];
        // Item malformado não pode derrubar o app inteiro.
        return arr.filter((s) => s && typeof s === "object" && (s.treino in PROGRAM.treinos) && s.data);
    },
    save(arr) { return lsSet(STORE_KEY, arr); },
    clear() {
        try {
            localStorage.removeItem(STORE_KEY);
            localStorage.removeItem(CELEBRATED_KEY);
            localStorage.removeItem(CARDIO_KEY);
            localStorage.removeItem(STRIKES_KEY);
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
function todaysSession(treino) {
    const k = todayKey();
    return sessions.find((s) => dateKey(s.data) === k && s.treino === treino) || null;
}

/* ----- Cardio: lista de dias (dateKey) com cardio feito ----- */
function cardioList() {
    const arr = lsGet(CARDIO_KEY, []);
    return Array.isArray(arr) ? arr.filter((d) => typeof d === "string") : [];
}
const cardioDoneToday = () => cardioList().includes(todayKey());
function toggleCardioToday() {
    const k = todayKey();
    let list = cardioList();
    if (list.includes(k)) list = list.filter((d) => d !== k);
    else list.push(k);
    return lsSet(CARDIO_KEY, list);
}

/* ----- Riscados: exercícios marcados na planilha (só o dia de hoje) ----- */
function strikesToday() {
    const obj = lsGet(STRIKES_KEY, null);
    if (!obj || obj.dia !== todayKey() || !Array.isArray(obj.itens)) return [];
    return obj.itens;
}
function toggleStrike(exId) {
    const itens = strikesToday();
    const i = itens.indexOf(exId);
    if (i >= 0) itens.splice(i, 1); else itens.push(exId);
    lsSet(STRIKES_KEY, { dia: todayKey(), itens });
    return itens;
}

/* =========================================================
   MOTOR DOS PORTÕES
========================================================= */
const totalSessions = () => sessions.length;

/** Quantos portões estão abertos (0-8). */
function gatesOpen() {
    const n = totalSessions();
    let open = 0;
    for (const g of GATES) if (n >= g.req) open = g.n;
    return open;
}
const currentGate = () => gatesOpen() > 0 ? GATES[gatesOpen() - 1] : null;
const nextGate = () => gatesOpen() < 8 ? GATES[gatesOpen()] : null;

/* =========================================================
   ESTADO DA UI
========================================================= */
const state = {
    screen: "treino",
    treino: suggestedTreino(new Date()),
    finisherDone: false,
    renderedDay: todayKey()
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
    if (name === "treino") renderTreino();
    if (name === "portoes") renderPortoes();
    if (name === "semana") renderSemana();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

/* =========================================================
   RENDER — TELA TREINO (planilha)
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
    const prox = nextHeavyInfo(now);
    $("#treino-sugerido").textContent = prox.hoje
        ? `HOJE: ${prox.treino} · ${PROGRAM.treinos[prox.treino].titulo}`
        : `PRÓXIMO PESADO: ${prox.treino} · ${WEEKDAY_FULL[prox.dow]}`;
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
                <p>Cardio Zona 2 · 30–40 min. A base aeróbica é o que sustenta os portões. Marque no card lá embaixo.</p></div>`;
        } else {
            banner.className = "day-banner is-rec";
            banner.innerHTML = `<span class="db-kanji">休</span>
                <div><strong>RECUPERAÇÃO</strong>
                <p>Descanso ou recuperação ativa: caminhada, mobilidade, Z2 leve. O corpo abre portão no silêncio.</p></div>`;
        }
    }

    // Planilha de exercícios — toque risca o que já foi feito (vale só hoje)
    const saved = todaysSession(t);
    state.finisherDone = !!(saved && saved.finisher);
    const struck = strikesToday();
    const wrap = $("#exercicios");
    wrap.innerHTML = "";

    treino.exercicios.forEach((ex, i) => {
        const isStruck = struck.includes(ex.id);
        const card = document.createElement("article");
        card.className = "card sheet reveal" + (isStruck ? " is-struck" : "");
        card.style.transitionDelay = (i * 45) + "ms";
        card.dataset.ex = ex.id;
        card.setAttribute("role", "button");
        card.setAttribute("aria-pressed", isStruck ? "true" : "false");

        card.innerHTML = `
            <div class="card-head">
                <div class="card-head-main">
                    <span class="card-tag">${ex.musculo} · ${ex.tipo}</span>
                    <h3 class="card-name">${ex.nome}</h3>
                </div>
                <span class="card-scheme">${ex.series} × ${ex.reps[0]}–${ex.reps[1]}</span>
            </div>
            <div class="card-rest">descanso ${ex.descanso}</div>
            ${ex.nota ? `<p class="card-nota">${ex.nota}</p>` : ""}
            <span class="card-check" aria-hidden="true">✓</span>`;

        card.addEventListener("click", () => {
            const itens = toggleStrike(ex.id);
            const on = itens.includes(ex.id);
            card.classList.toggle("is-struck", on);
            card.setAttribute("aria-pressed", on ? "true" : "false");
        });

        wrap.appendChild(card);
    });

    // Selo de sessão já registrada hoje
    if (saved) {
        const done = document.createElement("div");
        done.className = "done-note";
        done.innerHTML = `押忍 — <b>${t}</b> já registrado hoje. Salvar de novo só atualiza o finisher.`;
        wrap.appendChild(done);
    }

    renderFinisher(treino);
    renderCardio();

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

/* Card de cardio — pros dias em que o treino vira cardio de manhã. */
function renderCardio() {
    const wrap = $("#cardio-wrap");
    const done = cardioDoneToday();
    wrap.innerHTML = `
        <div class="cardio${done ? " is-done" : ""}">
            <span class="cardio-eyebrow">BASE AERÓBICA · 軽</span>
            <h3 class="cardio-name">Cardio Zona 2</h3>
            <span class="cardio-dur">30–40 min · vale de manhã, vale em dia corrido</span>
            <p class="cardio-desc">Esteira inclinada, bike ou corrida leve — ritmo de conversa. Não abre portão,
            mas sustenta todos eles. Conta separado do treino pesado.</p>
            <button class="cardio-check${done ? " is-done" : ""}" id="cardio-check" type="button">
                ${done ? "✓ CARDIO FEITO HOJE" : "MARCAR CARDIO DE HOJE"}
            </button>
        </div>`;
    $("#cardio-check").addEventListener("click", () => {
        toggleCardioToday();
        renderCardio();
        toast(cardioDoneToday() ? "Cardio registrado. A chama não apaga. 炎" : "Cardio de hoje desmarcado.");
    });
}

/** Registra o treino do dia como feito. */
function saveSession() {
    const t = state.treino;
    const before = gatesOpen();
    const existing = todaysSession(t);
    const sess = {
        id: existing ? existing.id : Date.now(),
        data: existing ? existing.data : new Date().toISOString(),
        treino: t,
        finisher: state.finisherDone
    };

    const ok = commitSession(sess);
    toast(ok ? (existing ? "Sessão de hoje atualizada. 押忍!" : "Treino registrado. 押忍!")
        : "Salvo só nesta sessão (storage indisponível).");
    renderTreino();

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

    if (cur) {
        $("#g-current-kanji").textContent = cur.kanji;
        $("#g-current-name").textContent = cur.nome;
        $("#g-current-pt").textContent = `${cur.pt} · ${cur.tech}`;
    } else {
        $("#g-current-kanji").textContent = "門";
        $("#g-current-name").textContent = "Fechado";
        $("#g-current-pt").textContent = "Registre o primeiro treino feito para abrir o Kaimon.";
    }

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
            <span class="gate-req">${isOpen ? "ABERTO" : `${g.req} ${g.req === 1 ? "sessão" : "sessões"}`}</span>`;
        wrap.appendChild(el);
    });

    // Chamas da Juventude (finishers + cardio)
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
        </div>
        <div class="stat-box">
            <span class="stat-label">Cardios 軽</span>
            <span class="stat-val">${cardioList().length}</span>
        </div>
        <div class="stat-box">
            <span class="stat-label">Sessões totais</span>
            <span class="stat-val">${sessions.length}</span>
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
    document.body.classList.add("overlay-open");
    store.setCelebrated(gate.n);
}

/* =========================================================
   RENDER — TELA SEMANA
========================================================= */
function renderSemana() {
    const now = new Date();
    const mon = startOfWeekMonday(now);
    const todayK = todayKey();
    const cardios = cardioList();

    const grid = $("#week-grid");
    grid.innerHTML = "";
    let pesadosFeitos = 0;
    let cardiosSemana = 0;

    for (let i = 0; i < 7; i++) {
        const d = new Date(mon);
        d.setDate(mon.getDate() + i);
        const dk = dateKey(d);
        const tipo = dayType(d);
        const daySessions = sessions.filter((s) => dateKey(s.data) === dk);
        const treinado = daySessions.length > 0;
        const cardioFeito = cardios.includes(dk);
        pesadosFeitos += daySessions.length;
        if (cardioFeito) cardiosSemana++;

        const cell = document.createElement("div");
        cell.className = "wk-cell";
        if (dk === todayK) cell.classList.add("is-today");
        if (treinado) cell.classList.add("is-done");
        if (cardioFeito) cell.classList.add("is-cardio");
        if (tipo !== "pesado") cell.classList.add("is-soft");

        const mark = treinado ? daySessions.map((s) => s.treino).join("+")
            : (tipo === "pesado" ? PROGRAM.agenda.pesados[d.getDay()].charAt(0) + "·"
                : tipo === "recuperacao" ? "休" : "軽");
        cell.innerHTML = `
            <span class="wk-day">${WEEKDAY_PT[d.getDay()]}</span>
            <span class="wk-mark">${mark}</span>
            <span class="wk-date">${pad2(d.getDate())}</span>
            <span class="wk-flame">${cardioFeito ? "軽" : ""}</span>`;
        grid.appendChild(cell);
    }

    $("#week-count").textContent = pesadosFeitos;
    const rail = $("#week-count-bar");
    if (rail) rail.style.width = Math.min(100, (pesadosFeitos / 4) * 100) + "%";
    $("#week-cardio").textContent = cardiosSemana > 0
        ? `軽 ${cardiosSemana} ${cardiosSemana === 1 ? "cardio" : "cardios"} nesta semana`
        : "軽 nenhum cardio registrado nesta semana";

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

    $("#go-close").addEventListener("click", () => {
        $("#gate-overlay").hidden = true;
        document.body.classList.remove("overlay-open");
    });

    $("#btn-clear").addEventListener("click", () => {
        if (!sessions.length && !cardioList().length) { toast("Nada para apagar."); return; }
        if (confirm("Apagar TODOS os registros? Os portões se fecham. Esta ação não tem volta.")) {
            store.clear();
            sessions = [];
            renderTreino();
            renderSemana();
            toast("Registros apagados. Recomece do Kaimon.");
        }
    });
}

/* Parallax sutil no herói. */
function setupParallax() {
    const bg = $(".hero-bg");
    if (!bg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            bg.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0) scale(1.06)`;
            ticking = false;
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

/* =========================================================
   VIRADA DE DIA — PWA suspenso no app switcher não recarrega
========================================================= */
function checkDayRollover() {
    if (todayKey() === state.renderedDay) return;
    state.renderedDay = todayKey();
    state.treino = suggestedTreino(new Date());
    renderTopbar();
    setScreen(state.screen); // re-renderiza a tela ativa com o dia novo
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
    wireEvents();
    setScreen("treino"); // abre já no treino sugerido do dia
    setupParallax();

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) checkDayRollover();
    });
    window.addEventListener("pageshow", checkDayRollover);
}

document.addEventListener("DOMContentLoaded", init);

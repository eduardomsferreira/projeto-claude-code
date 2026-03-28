// ============================================================
// GROWTH MARKETING ACADEMY — DATA
// ============================================================

const LEVELS = [
  { level: 1, name: 'Iniciante',          xp: 0 },
  { level: 2, name: 'Explorador',         xp: 200 },
  { level: 3, name: 'Praticante',         xp: 500 },
  { level: 4, name: 'Analista',           xp: 1000 },
  { level: 5, name: 'Especialista',       xp: 2000 },
  { level: 6, name: 'Estrategista',       xp: 3500 },
  { level: 7, name: 'Growth Lead',        xp: 5500 },
  { level: 8, name: 'Growth Expert',      xp: 8000 },
  { level: 9, name: 'Growth Master',      xp: 11000 },
  { level: 10, name: 'Growth Hacker Lendário', xp: 15000 },
];

const ACHIEVEMENTS = [
  { id:'first_lesson',   icon:'🌱', name:'Primeiro Passo',      desc:'Complete sua primeira lição',            xp:50,  condition: s => s.totalLessons >= 1 },
  { id:'five_lessons',   icon:'📖', name:'Aprendiz',            desc:'Complete 5 lições',                       xp:100, condition: s => s.totalLessons >= 5 },
  { id:'twenty_lessons', icon:'📚', name:'Leitor Dedicado',     desc:'Complete 20 lições',                      xp:200, condition: s => s.totalLessons >= 20 },
  { id:'all_lessons',    icon:'🎓', name:'Graduado',            desc:'Complete todas as lições',                xp:500, condition: s => s.totalLessons >= 53 },
  { id:'first_quiz',     icon:'🧠', name:'Primeiro Quiz',       desc:'Faça seu primeiro quiz',                 xp:50,  condition: s => s.totalQuizzes >= 1 },
  { id:'quiz_perfect',   icon:'💯', name:'Perfeito!',           desc:'Tire 100% em qualquer quiz',             xp:150, condition: s => s.hasPerfectQuiz },
  { id:'three_modules',  icon:'🥉', name:'Trio',                desc:'Complete 3 módulos',                     xp:200, condition: s => s.completedModules >= 3 },
  { id:'five_modules',   icon:'🥈', name:'Meio Caminho',        desc:'Complete 5 módulos',                     xp:300, condition: s => s.completedModules >= 5 },
  { id:'all_modules',    icon:'🥇', name:'Growth Master',       desc:'Complete todos os 10 módulos',           xp:1000, condition: s => s.completedModules >= 10 },
  { id:'use_tool',       icon:'🔧', name:'Calculista',          desc:'Use uma ferramenta pela 1ª vez',         xp:50,  condition: s => s.toolsUsed >= 1 },
  { id:'five_tools',     icon:'⚙️', name:'Engenheiro',         desc:'Use 5 ferramentas diferentes',           xp:150, condition: s => s.toolsUsed >= 5 },
  { id:'all_tools',      icon:'🛠️', name:'Mestre das Ferramentas', desc:'Use todas as ferramentas',           xp:300, condition: s => s.toolsUsed >= 7 },
  { id:'streak_3',       icon:'🔥', name:'Em Chamas',           desc:'Mantenha 3 dias de streak',              xp:100, condition: s => s.streak >= 3 },
  { id:'streak_7',       icon:'🌟', name:'Dedicado',            desc:'Mantenha 7 dias de streak',              xp:250, condition: s => s.streak >= 7 },
  { id:'xp_1000',        icon:'⚡', name:'Energizado',          desc:'Acumule 1.000 XP',                       xp:100, condition: s => s.xp >= 1000 },
  { id:'xp_5000',        icon:'💥', name:'Poderoso',            desc:'Acumule 5.000 XP',                       xp:300, condition: s => s.xp >= 5000 },
  { id:'level5',         icon:'🚀', name:'Decolando',           desc:'Alcance o nível 5',                      xp:200, condition: s => s.level >= 5 },
  { id:'level10',        icon:'👑', name:'Lendário',            desc:'Alcance o nível máximo (10)',            xp:500, condition: s => s.level >= 10 },
];

const MODULES = [
  {
    id: 'fundamentals',
    title: 'Fundamentos do Growth Marketing',
    icon: '🌱',
    color: '#6366f1',
    colorBg: 'rgba(99,102,241,.15)',
    desc: 'Entenda o que é Growth Marketing, como ele difere do marketing tradicional e os princípios que guiam as estratégias de alto crescimento.',
    time: '40 min',
    xp: 300,
    tool: 'channel-matrix',
    prereqs: [],
    lessons: [
      {
        id:'f1', title:'O que é Growth Marketing?', xp:50,
        content:`
<h3>Definição e Origem</h3>
<p>Growth Marketing é uma abordagem orientada a dados que combina marketing, produto e tecnologia para acelerar o crescimento de um negócio de forma sustentável e escalável.</p>
<p>O termo foi popularizado por <strong>Sean Ellis</strong> em 2010, quando trabalhava no Dropbox. Ellis percebeu que o marketing tradicional não era suficiente para startups que precisavam crescer rapidamente com recursos limitados.</p>
<div class="highlight-box">💡 <strong>Definição simples:</strong> Growth Marketing é o processo de experimentação rápida em todo o funil de marketing para identificar o que funciona melhor para crescer um negócio.</div>
<h3>Diferença do Marketing Tradicional</h3>
<ul>
  <li><strong>Tradicional:</strong> Foco em brand awareness, campanhas longas, métricas de vaidade (impressões, alcance)</li>
  <li><strong>Growth:</strong> Foco em métricas de negócio reais (receita, retenção, LTV), experimentos rápidos, decisões baseadas em dados</li>
</ul>
<div class="example-box">✅ <strong>Exemplo real:</strong> O Hotmail cresceu de 0 para 12 milhões de usuários em 18 meses adicionando apenas uma linha no rodapé dos e-mails: "PS: I love you. Get your free email at Hotmail". Isso é Growth Marketing.</div>
`
      },
      {
        id:'f2', title:'Os 3 Pilares do Growth', xp:50,
        content:`
<h3>1. Dados e Análise</h3>
<p>Toda decisão no Growth Marketing deve ser embasada em dados. Isso inclui análise quantitativa (números, métricas) e qualitativa (comportamento, feedback de usuários).</p>
<ul>
  <li>Defina métricas claras antes de qualquer experimento</li>
  <li>Use ferramentas de analytics (Google Analytics, Mixpanel, Amplitude)</li>
  <li>Crie uma cultura de dados na equipe</li>
</ul>
<h3>2. Experimentação Contínua</h3>
<p>O Growth é impulsionado por ciclos rápidos de teste e aprendizado. O objetivo é falhar rápido, aprender mais rápido.</p>
<div class="formula">Hipótese → Experimento → Análise → Aprendizado → Nova Hipótese</div>
<h3>3. Foco no Usuário</h3>
<p>Entender profundamente as necessidades, dores e comportamentos dos usuários é essencial. O crescimento sustentável vem de criar valor real para as pessoas.</p>
<div class="warning-box">⚠️ <strong>Atenção:</strong> Growth Hacking "sujo" (spam, dark patterns) pode gerar crescimento de curto prazo, mas destrói a confiança e é insustentável.</div>
`
      },
      {
        id:'f3', title:'O Mindset do Growth Marketer', xp:50,
        content:`
<h3>Características do Growth Marketer</h3>
<ul>
  <li><strong>Curiosidade:</strong> Sempre questionar o "por quê" por trás dos dados</li>
  <li><strong>Criatividade:</strong> Encontrar oportunidades não óbvias de crescimento</li>
  <li><strong>Resiliência:</strong> A maioria dos experimentos falha — e isso é normal</li>
  <li><strong>Visão sistêmica:</strong> Ver como todas as peças do negócio se conectam</li>
  <li><strong>Velocidade:</strong> Executar rapidamente, iterar constantemente</li>
</ul>
<h3>A Regra 70-20-10</h3>
<p>Uma boa alocação de esforço em Growth Marketing:</p>
<ul>
  <li><strong>70%</strong> — Otimizar o que já funciona (escalar canais comprovados)</li>
  <li><strong>20%</strong> — Expandir estratégias promissoras (testar variações)</li>
  <li><strong>10%</strong> — Experimentos radicais (apostas de alto risco, alto retorno)</li>
</ul>
<div class="example-box">✅ <strong>Exemplo:</strong> Se o SEO está gerando bons resultados, coloque 70% do esforço ali, 20% testando novos tipos de conteúdo e 10% em um canal completamente novo como podcasts.</div>
`
      },
      {
        id:'f4', title:'O Processo de Experimentação', xp:50,
        content:`
<h3>O Ciclo de Experimentação</h3>
<p>Equipes de Growth de alto desempenho rodam dezenas de experimentos por mês. O processo segue um framework claro:</p>
<ol>
  <li><strong>Ideação:</strong> Geração e priorização de hipóteses (use o framework ICE: Impact, Confidence, Ease)</li>
  <li><strong>Design:</strong> Definir métricas de sucesso, grupo controle e variante</li>
  <li><strong>Execução:</strong> Implementar o experimento com rigor técnico</li>
  <li><strong>Análise:</strong> Interpretar resultados com significância estatística</li>
  <li><strong>Aprendizado:</strong> Documentar e compartilhar os insights</li>
</ol>
<h3>Framework ICE para Priorização</h3>
<div class="formula">ICE Score = (Impact + Confidence + Ease) / 3</div>
<p>Pontue cada experimento de 1-10 em cada dimensão e priorize pelos maiores scores.</p>
<div class="highlight-box">💡 <strong>Dica prática:</strong> Mantenha um backlog de experimentos. O Trello ou Notion funcionam bem para isso. Sempre documente o resultado, mesmo dos experimentos que "falharam" — eles ensinam muito.</div>
`
      },
      {
        id:'f5', title:'KPIs e Métricas de Crescimento', xp:50,
        content:`
<h3>Métricas que Importam</h3>
<p>Growth Marketers focam em métricas acionáveis, não de vaidade. A diferença é crucial:</p>
<ul>
  <li><strong>Vaidade:</strong> Seguidores, curtidas, impressões, visualizações de página</li>
  <li><strong>Acionáveis:</strong> Cadastros, ativações, conversões, receita, retenção</li>
</ul>
<h3>Métricas-Chave do Growth</h3>
<ul>
  <li><strong>MRR (Monthly Recurring Revenue):</strong> Receita recorrente mensal</li>
  <li><strong>CAC (Customer Acquisition Cost):</strong> Custo para adquirir um cliente</li>
  <li><strong>LTV (Lifetime Value):</strong> Valor total gerado por um cliente</li>
  <li><strong>Churn Rate:</strong> Taxa de cancelamento/abandono</li>
  <li><strong>NPS (Net Promoter Score):</strong> Satisfação e lealdade do cliente</li>
  <li><strong>DAU/MAU:</strong> Usuários ativos diários/mensais</li>
</ul>
<div class="formula">Razão saudável: LTV / CAC ≥ 3</div>
<div class="example-box">✅ <strong>Regra de ouro:</strong> Se você gasta R$100 para adquirir um cliente, esse cliente precisa gerar pelo menos R$300 ao longo de sua vida para o negócio ser viável.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'O que melhor define Growth Marketing?', options:['Foco exclusivo em campanhas de mídia paga','Abordagem orientada a dados para acelerar o crescimento de forma sustentável','Estratégia de branding e awareness de longo prazo','Gestão de redes sociais e conteúdo'], correct:1, xp:10, explanation:'Growth Marketing combina marketing, produto e tecnologia com foco em dados e experimentos para crescer de forma sustentável.' },
      { id:'q2', text:'Quem popularizou o termo "Growth Hacking"?', options:['Mark Zuckerberg','Reid Hoffman','Sean Ellis','Brian Chesky'], correct:2, xp:10, explanation:'Sean Ellis cunhou o termo em 2010 enquanto trabalhava em startups como o Dropbox.' },
      { id:'q3', text:'Qual é a razão mínima saudável entre LTV e CAC?', options:['1:1','2:1','3:1','5:1'], correct:2, xp:10, explanation:'A razão LTV/CAC ≥ 3 é considerada saudável — o cliente gera pelo menos 3x o custo de aquisição.' },
      { id:'q4', text:'No framework ICE, o que significa a letra "C"?', options:['Cost (Custo)','Confidence (Confiança)','Conversion (Conversão)','Channel (Canal)'], correct:1, xp:10, explanation:'ICE = Impact (Impacto) + Confidence (Confiança) + Ease (Facilidade). Usado para priorizar experimentos.' },
      { id:'q5', text:'Qual dessas é uma métrica de VAIDADE?', options:['Taxa de conversão','Número de curtidas no Instagram','Churn rate','Customer Acquisition Cost'], correct:1, xp:10, explanation:'Curtidas são métricas de vaidade — não refletem diretamente em crescimento de negócio.' },
      { id:'q6', text:'A regra 70-20-10 no Growth Marketing refere-se a:', options:['Divisão do orçamento por canais','Alocação de esforço entre otimizar, expandir e experimentar','Taxa de conversão esperada','Proporção de conteúdo orgânico vs pago'], correct:1, xp:10, explanation:'70% otimizando o que funciona, 20% expandindo estratégias promissoras, 10% em experimentos radicais.' },
      { id:'q7', text:'O Growth Marketing difere do marketing tradicional principalmente por:', options:['Usar apenas canais digitais','Ser mais barato','Focar em métricas de negócio reais e experimentação contínua','Não precisar de criatividade'], correct:2, xp:10, explanation:'Growth Marketing foca em resultados concretos (receita, retenção) e em ciclos rápidos de experimentação baseados em dados.' },
      { id:'q8', text:'MRR significa:', options:['Monthly Revenue Rate','Marketing Return Ratio','Monthly Recurring Revenue','Market Research Report'], correct:2, xp:10, explanation:'MRR = Monthly Recurring Revenue (Receita Recorrente Mensal) — métrica central para SaaS e negócios por assinatura.' },
    ]
  },
  {
    id: 'aarrr',
    title: 'Framework AARRR (Métricas Pirata)',
    icon: '🏴‍☠️',
    color: '#a855f7',
    colorBg: 'rgba(168,85,247,.15)',
    desc: 'Domine o framework AARRR criado por Dave McClure: Aquisição, Ativação, Retenção, Receita e Referência.',
    time: '50 min',
    xp: 350,
    tool: 'aarrr',
    prereqs: [],
    lessons: [
      {
        id:'a1', title:'Visão Geral do Framework AARRR', xp:50,
        content:`
<h3>O que é AARRR?</h3>
<p>Criado por <strong>Dave McClure</strong> da 500 Startups, o AARRR (apelidado de "Métricas Pirata" pelo som que faz) é um framework para estruturar e medir o crescimento de um negócio em 5 estágios do ciclo de vida do cliente.</p>
<div class="highlight-box">🏴‍☠️ <strong>AARRR = Aquisição → Ativação → Retenção → Receita → Referência</strong></div>
<h3>Por que usar o AARRR?</h3>
<ul>
  <li>Fornece uma visão completa de todo o funil do cliente</li>
  <li>Identifica onde estão os maiores gargalos de crescimento</li>
  <li>Alinha toda a equipe em torno de métricas claras</li>
  <li>Prioriza onde investir tempo e dinheiro</li>
</ul>
<p>A maioria das empresas foca demais em <strong>Aquisição</strong> e negligencia os outros 4 estágios — que costumam ter o maior impacto no crescimento sustentável.</p>
`
      },
      {
        id:'a2', title:'A — Aquisição', xp:50,
        content:`
<h3>O que é Aquisição?</h3>
<p>Aquisição é como os usuários descobrem sua empresa pela primeira vez. É o topo do funil — onde você atrai visitantes, leads ou usuários.</p>
<h3>Métricas de Aquisição</h3>
<ul>
  <li>Visitantes únicos por canal</li>
  <li>Custo por clique (CPC)</li>
  <li>Custo por lead (CPL)</li>
  <li>CAC por canal</li>
  <li>Taxa de conversão do topo de funil</li>
</ul>
<h3>Canais de Aquisição</h3>
<ul>
  <li><strong>Orgânico:</strong> SEO, conteúdo, social orgânico</li>
  <li><strong>Pago:</strong> Google Ads, Meta Ads, LinkedIn Ads</li>
  <li><strong>Referência:</strong> Indicações, afiliados, parcerias</li>
  <li><strong>Direto:</strong> Busca direta, newsletters, comunidades</li>
</ul>
<div class="warning-box">⚠️ <strong>Erro comum:</strong> Investir muito em Aquisição sem otimizar Ativação e Retenção é desperdiçar dinheiro — você enche o balde furado.</div>
`
      },
      {
        id:'a3', title:'A — Ativação', xp:50,
        content:`
<h3>O que é Ativação?</h3>
<p>Ativação é o momento em que o usuário tem sua <strong>primeira experiência de valor</strong> com o produto — o famoso "Aha! Moment".</p>
<div class="highlight-box">💡 <strong>Aha! Moment:</strong> O instante em que o usuário entende o valor do produto e quer usá-lo de novo. Ex: No Twitter, é quando você segue 30+ pessoas. No Facebook, é quando você adiciona 7+ amigos em 10 dias.</div>
<h3>Métricas de Ativação</h3>
<ul>
  <li>Taxa de conclusão do onboarding</li>
  <li>Tempo até o primeiro valor (Time to First Value)</li>
  <li>Taxa de ativação (usuários que completam a ação-chave)</li>
  <li>Taxa de conversão de trial para pago</li>
</ul>
<h3>Como melhorar a Ativação</h3>
<ul>
  <li>Simplificar o processo de cadastro</li>
  <li>Criar um onboarding guiado e personalizado</li>
  <li>Reduzir o tempo até o primeiro valor</li>
  <li>Usar emails e notificações de ativação</li>
</ul>
<div class="example-box">✅ <strong>Exemplo:</strong> O Slack sabe que times que enviam 2.000+ mensagens têm altíssima retenção. Então todo o onboarding é desenhado para chegar lá o mais rápido possível.</div>
`
      },
      {
        id:'a4', title:'R — Retenção', xp:50,
        content:`
<h3>O que é Retenção?</h3>
<p>Retenção mede se os usuários continuam voltando e usando o produto ao longo do tempo. É o estágio mais importante para o crescimento sustentável.</p>
<div class="formula">Retenção > Aquisição: Reter é mais barato que adquirir</div>
<h3>Tipos de Retenção</h3>
<ul>
  <li><strong>D1/D7/D30:</strong> % de usuários que voltam no dia 1, 7 e 30 após o cadastro</li>
  <li><strong>Cohort Retention:</strong> Análise de retenção por grupo de entrada</li>
  <li><strong>Churn Rate:</strong> % de usuários que abandonam o produto</li>
</ul>
<h3>Benchmarks de Retenção (D30)</h3>
<ul>
  <li>Apps de consumo: 10-20% é bom</li>
  <li>SaaS B2B: 70-80% é esperado</li>
  <li>E-commerce: depende da frequência de compra do produto</li>
</ul>
<div class="example-box">✅ <strong>Táticas:</strong> Push notifications inteligentes, emails de re-engajamento, gamificação (streaks, pontos), personalização, programas de fidelidade.</div>
`
      },
      {
        id:'a5', title:'R — Receita e R — Referência', xp:50,
        content:`
<h3>Receita</h3>
<p>Receita é o estágio em que os usuários pagam pelo produto ou geram receita de alguma forma. Não é apenas sobre monetização — é sobre encontrar o modelo de negócio certo.</p>
<ul>
  <li><strong>Métricas:</strong> MRR, ARR, ARPU (receita média por usuário), LTV</li>
  <li><strong>Estratégias:</strong> Upsell, cross-sell, planos premium, freemium para pago</li>
</ul>
<div class="formula">LTV = Ticket Médio × Frequência de Compra × Tempo de Retenção</div>
<h3>Referência (o "R" mais poderoso)</h3>
<p>Referência é quando usuários satisfeitos indicam outros usuários — o crescimento orgânico e viral. É o canal mais barato e mais confiável.</p>
<ul>
  <li><strong>NPS:</strong> Net Promoter Score — probabilidade de indicação</li>
  <li><strong>Coeficiente Viral (K):</strong> Número médio de novos usuários trazidos por cada usuário</li>
  <li><strong>Programas de Referência:</strong> Incentivos para quem indica</li>
</ul>
<div class="example-box">✅ <strong>Caso Dropbox:</strong> O programa de referência "ganhe espaço ao indicar amigos" reduziu o CAC em 75% e foi responsável por 35% de todos os novos usuários.</div>
`
      },
      {
        id:'a6', title:'Priorizando com AARRR', xp:50,
        content:`
<h3>Como Identificar o Gargalo</h3>
<p>O poder do AARRR está em mapear onde está o maior problema no funil. A regra é simples: <strong>conserte o gargalo antes de investir em aquisição</strong>.</p>
<ol>
  <li>Mapeie as taxas de conversão em cada etapa</li>
  <li>Compare com benchmarks do seu setor</li>
  <li>Identifique a etapa com maior queda</li>
  <li>Foque os experimentos nessa etapa</li>
</ol>
<div class="highlight-box">💡 <strong>Exemplo de análise:</strong><br>
• Aquisição: 10.000 visitantes/mês ✓<br>
• Ativação: 8% completam onboarding ← GARGALO (benchmark: 25%)<br>
• Retenção: 40% retornam no D7 ✓<br>
Conclusão: Foque em melhorar o onboarding antes de gastar mais em Ads.</div>
<h3>O Framework de Priorização</h3>
<p>Depois de identificar o gargalo, use o ICE Score para priorizar experimentos naquela etapa. Rode pelo menos 2-3 experimentos por semana para aprender rapidamente.</p>
`
      },
    ],
    quiz: [
      { id:'q1', text:'O que significa AARRR?', options:['Aquisição, Análise, Receita, Resultado, Referência','Aquisição, Ativação, Retenção, Receita, Referência','Alcance, Ativação, Retorno, Receita, Resultado','Aquisição, Ativação, Retenção, ROI, Referência'], correct:1, xp:10, explanation:'AARRR = Aquisição, Ativação, Retenção, Receita e Referência — o framework criado por Dave McClure.' },
      { id:'q2', text:'O "Aha! Moment" está associado a qual estágio do AARRR?', options:['Aquisição','Ativação','Retenção','Receita'], correct:1, xp:10, explanation:'O Aha! Moment é o pico da Ativação — quando o usuário experimenta o valor central do produto pela primeira vez.' },
      { id:'q3', text:'Qual é o estágio mais importante para o crescimento sustentável?', options:['Aquisição','Ativação','Retenção','Referência'], correct:2, xp:10, explanation:'Retenção é a base do crescimento — sem ela, você desperdiça todo o investimento em aquisição.' },
      { id:'q4', text:'O coeficiente viral K mede:', options:['O custo por usuário adquirido','Quantos novos usuários cada usuário traz em média','A velocidade de crescimento do MRR','A taxa de abertura de emails'], correct:1, xp:10, explanation:'K = (convites por usuário) × (taxa de conversão dos convites). K > 1 = crescimento viral.' },
      { id:'q5', text:'Quem criou o framework AARRR?', options:['Sean Ellis','Paul Graham','Dave McClure','Andrew Chen'], correct:2, xp:10, explanation:'Dave McClure, fundador da 500 Startups, criou e popularizou o framework AARRR.' },
      { id:'q6', text:'Se a taxa de ativação está em 5% (benchmark é 25%), o que você deve fazer?', options:['Aumentar o orçamento de aquisição','Focar em melhorar o onboarding antes de qualquer coisa','Criar um programa de referência','Reduzir o preço do produto'], correct:1, xp:10, explanation:'O gargalo está na Ativação. Consertar o problema antes de injetar mais tráfego é a decisão correta.' },
      { id:'q7', text:'A fórmula LTV = Ticket Médio × Frequência × Tempo está em qual estágio?', options:['Aquisição','Ativação','Retenção','Receita'], correct:3, xp:10, explanation:'LTV (Lifetime Value) é uma métrica de Receita — representa o valor total gerado por um cliente ao longo do tempo.' },
      { id:'q8', text:'O programa de referência do Dropbox resultou em:', options:['Redução de 75% no CAC','Aumento de 75% no LTV','Redução de 75% no churn','Aumento de 75% no ticket médio'], correct:0, xp:10, explanation:'O programa de referência do Dropbox reduziu o CAC em 75% e foi responsável por 35% de todos os novos usuários.' },
    ]
  },
  {
    id: 'growth-loops',
    title: 'Growth Loops',
    icon: '🔄',
    color: '#06b6d4',
    colorBg: 'rgba(6,182,212,.15)',
    desc: 'Aprenda a construir loops de crescimento autossustentáveis que compõem o crescimento ao longo do tempo.',
    time: '40 min',
    xp: 300,
    tool: 'viral-coefficient',
    prereqs: ['fundamentals'],
    lessons: [
      {
        id:'gl1', title:'O que são Growth Loops?', xp:50,
        content:`
<h3>Funis vs. Loops</h3>
<p>O modelo tradicional de marketing é um <strong>funil</strong>: você joga usuários no topo e espera que alguns cheguem ao fundo. O problema? Funis são lineares — você precisa continuar alimentando o topo indefinidamente.</p>
<p><strong>Growth Loops</strong> são diferentes. Cada ciclo do loop gera os inputs para o próximo ciclo, criando crescimento composto e autossustentável.</p>
<div class="formula">Input → Ação → Output → Reinveste como novo Input</div>
<div class="highlight-box">💡 <strong>Analogia:</strong> Um funil é como uma torneira — precisa de pressão constante. Um loop é como uma bola de neve descendo a montanha — se auto-alimenta.</div>
`
      },
      {
        id:'gl2', title:'Tipos de Growth Loops', xp:50,
        content:`
<h3>1. Loop Viral</h3>
<p>Usuários existentes trazem novos usuários de forma orgânica. O produto se torna mais valioso conforme cresce.</p>
<div class="example-box">✅ <strong>Exemplo:</strong> WhatsApp — você precisa que seus contatos também usem para se comunicar. O uso do produto incentiva a indicação.</div>
<h3>2. Loop de Conteúdo (SEO)</h3>
<p>Usuários geram conteúdo → conteúdo atrai novos usuários via busca → novos usuários geram mais conteúdo.</p>
<div class="example-box">✅ <strong>Exemplo:</strong> Reddit, Quora, TripAdvisor — o conteúdo criado pelos usuários atrai novos usuários organicamente via Google.</div>
<h3>3. Loop de Receita</h3>
<p>Receita é reinvestida em aquisição → mais usuários geram mais receita → mais investimento em aquisição.</p>
<div class="example-box">✅ <strong>Exemplo:</strong> Amazon — margem das vendas financia o AWS → AWS financia preços mais baixos → preços baixos atraem mais clientes.</div>
<h3>4. Loop de Produto</h3>
<p>Engajamento com o produto melhora o produto para todos → produto melhor atrai mais usuários.</p>
`
      },
      {
        id:'gl3', title:'Como Construir um Growth Loop', xp:50,
        content:`
<h3>Passo 1: Identifique a Ação Central</h3>
<p>Qual é a ação que seus melhores usuários fazem repetidamente e que gera valor para outros? Essa é a base do loop.</p>
<h3>Passo 2: Defina o Output</h3>
<p>O que essa ação produz? Conteúdo? Convites? Dados? Esse output precisa se transformar em input para o próximo ciclo.</p>
<h3>Passo 3: Crie o Mecanismo de Reinvestimento</h3>
<p>Como o output se converte em novos inputs? Esse é o "motor" do loop — precisa ser automático ou de baixo atrito.</p>
<h3>Passo 4: Meça e Otimize</h3>
<p>Cada estágio do loop tem uma taxa de conversão. Melhorar qualquer etapa melhora o loop inteiro.</p>
<div class="highlight-box">💡 <strong>Dica:</strong> Empresas que têm loops fortes crescem exponencialmente. Empresas que dependem apenas de funis lineares crescem linearmente.</div>
`
      },
      {
        id:'gl4', title:'Exemplos Reais de Growth Loops', xp:50,
        content:`
<h3>Airbnb + Craigslist</h3>
<p>No início, o Airbnb postava automaticamente os anúncios dos anfitriões no Craigslist, onde havia enorme audiência buscando hospedagem. Os hóspedes encontravam o anúncio, se cadastravam no Airbnb, e os anfitriões conseguiam mais reservas → mais anfitriões → mais hóspedes.</p>
<h3>Duolingo</h3>
<p>Usuários aprendem idiomas → compartilham progresso nas redes sociais → amigos se cadastram → mais usuários geram mais dados → algoritmo fica mais inteligente → melhor experiência → mais compartilhamentos.</p>
<h3>Pinterest</h3>
<p>Usuários salvam conteúdo → conteúdo é indexado pelo Google → novos usuários chegam via busca → salvam mais conteúdo → mais indexação.</p>
<div class="warning-box">⚠️ <strong>Cuidado:</strong> Nem todo produto tem um loop natural. Force um loop artificial pode parecer spam. Encontre o loop que está no DNA do seu produto.</div>
`
      },
      {
        id:'gl5', title:'Medindo e Otimizando Loops', xp:50,
        content:`
<h3>Métricas de Loop</h3>
<ul>
  <li><strong>Ciclo do Loop:</strong> Quanto tempo leva para o loop completar um ciclo?</li>
  <li><strong>Taxa de Conversão de Cada Etapa:</strong> % de usuários que avançam para a próxima etapa</li>
  <li><strong>Fator de Amplificação:</strong> Cada usuário traz quantos novos usuários?</li>
</ul>
<h3>A Matemática dos Loops</h3>
<p>Um loop com fator 1.1 (cada usuário traz em média 1.1 novos) cresce 10% por ciclo. Com 100 usuários iniciais e ciclo de 30 dias:</p>
<ul>
  <li>Mês 1: 100 → 110</li>
  <li>Mês 6: ~177</li>
  <li>Mês 12: ~314</li>
  <li>Mês 24: ~985</li>
</ul>
<div class="formula">Usuários(n) = Usuários(0) × (Fator)^n</div>
<div class="highlight-box">💡 Mesmo um pequeno aumento no fator de amplificação tem impacto enorme no longo prazo. Melhorar de 1.1 para 1.2 dobra o crescimento em 24 meses.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'Qual a principal diferença entre Funis e Growth Loops?', options:['Funis são mais modernos','Loops se auto-alimentam e geram crescimento composto','Funis são melhores para B2B','Loops são apenas para apps mobile'], correct:1, xp:10, explanation:'Growth Loops se auto-alimentam — o output de cada ciclo se torna o input do próximo, criando crescimento exponencial.' },
      { id:'q2', text:'O que é o "fator de amplificação" de um loop?', options:['O custo de cada ciclo do loop','Quantos novos usuários cada usuário traz em média','A velocidade do ciclo','O investimento inicial necessário'], correct:1, xp:10, explanation:'O fator de amplificação determina o crescimento composto do loop. Fator > 1 = crescimento exponencial.' },
      { id:'q3', text:'Qual tipo de loop o Reddit utiliza?', options:['Loop viral','Loop de conteúdo/SEO','Loop de receita','Loop de produto'], correct:1, xp:10, explanation:'O Reddit é um exemplo clássico de loop de conteúdo: usuários geram conteúdo que atrai novos usuários via busca orgânica.' },
      { id:'q4', text:'Como o Airbnb usou o Craigslist no seu growth loop inicial?', options:['Comprando anúncios no Craigslist','Postando automaticamente seus anúncios no Craigslist','Comprando a base de usuários do Craigslist','Fazendo parceria formal com o Craigslist'], correct:1, xp:10, explanation:'O Airbnb postava automaticamente os anúncios dos anfitriões no Craigslist, aproveitando a audiência massiva da plataforma.' },
      { id:'q5', text:'Num loop com fator 1.2, partindo de 100 usuários, quantos teremos após 3 ciclos?', options:['120','144','173','200'], correct:2, xp:10, explanation:'100 × 1.2 × 1.2 × 1.2 = 100 × 1.728 ≈ 173 usuários.' },
      { id:'q6', text:'Qual é o primeiro passo para construir um growth loop?', options:['Definir o orçamento','Identificar a ação central que usuários engajados fazem','Escolher a plataforma tecnológica','Contratar uma equipe de growth'], correct:1, xp:10, explanation:'O loop começa identificando a ação central — o comportamento dos melhores usuários que naturalmente gera valor para outros.' },
    ]
  },
  {
    id: 'north-star',
    title: 'North Star Metric',
    icon: '⭐',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,.15)',
    desc: 'Aprenda a identificar e usar a North Star Metric para alinhar toda a empresa em torno de uma única medida de crescimento.',
    time: '35 min',
    xp: 250,
    tool: 'north-star',
    prereqs: ['fundamentals'],
    lessons: [
      {
        id:'ns1', title:'O Conceito de North Star Metric', xp:50,
        content:`
<h3>O que é a North Star Metric?</h3>
<p>A <strong>North Star Metric (NSM)</strong> é uma única métrica que melhor captura o valor central que seu produto entrega aos clientes. É a estrela que guia todas as decisões da empresa.</p>
<div class="highlight-box">💡 <strong>Princípio:</strong> Se a NSM está crescendo, significa que os clientes estão recebendo mais valor e o negócio está crescendo de forma sustentável.</div>
<h3>Exemplos de NSM em empresas famosas</h3>
<ul>
  <li><strong>Facebook:</strong> DAU (usuários ativos diários)</li>
  <li><strong>Spotify:</strong> Tempo de escuta por usuário</li>
  <li><strong>Airbnb:</strong> Noites reservadas</li>
  <li><strong>Uber:</strong> Corridas por semana</li>
  <li><strong>Slack:</strong> Mensagens enviadas</li>
  <li><strong>HubSpot:</strong> Empresas usando o produto semanalmente</li>
</ul>
`
      },
      {
        id:'ns2', title:'Como Escolher sua NSM', xp:50,
        content:`
<h3>Critérios para uma Boa NSM</h3>
<p>Uma boa North Star Metric deve:</p>
<ol>
  <li><strong>Representar o valor para o cliente</strong> — não apenas receita interna</li>
  <li><strong>Ser mensurável</strong> — você precisa conseguir rastreá-la com precisão</li>
  <li><strong>Ser acionável</strong> — equipes devem conseguir influenciá-la diretamente</li>
  <li><strong>Ser preditiva</strong> — crescimento da NSM deve prever crescimento de receita</li>
  <li><strong>Ser compreensível</strong> — qualquer pessoa na empresa deve entender</li>
</ol>
<div class="warning-box">⚠️ <strong>Erros comuns:</strong><br>
• Usar receita como NSM (é consequência, não causa)<br>
• Escolher uma métrica de vaidade (pageviews, downloads)<br>
• Ter métricas que conflitam entre si<br>
• Não revisar a NSM quando o negócio muda</div>
`
      },
      {
        id:'ns3', title:'Métricas de Suporte (Input Metrics)', xp:50,
        content:`
<h3>A Árvore de Métricas</h3>
<p>A NSM sozinha não diz O QUE fazer. Por isso, você precisa de <strong>Input Metrics</strong> (métricas de entrada) — as alavancas que as equipes podem puxar para mover a NSM.</p>
<div class="formula">Input Metrics → North Star Metric → Receita</div>
<h3>Exemplo: Spotify</h3>
<ul>
  <li><strong>NSM:</strong> Tempo de escuta por usuário por dia</li>
  <li><strong>Input Metrics:</strong>
    <ul>
      <li>Taxa de descoberta de novos artistas</li>
      <li>% de usuários com playlist personalizada</li>
      <li>Taxa de conversão de free para premium</li>
      <li>Retenção de usuários após 30 dias</li>
    </ul>
  </li>
</ul>
<div class="highlight-box">💡 Cada time da empresa deve ter pelo menos uma input metric que alimenta a NSM. Assim todos sabem como contribuem para o crescimento.</div>
`
      },
      {
        id:'ns4', title:'Implementando a NSM', xp:50,
        content:`
<h3>Passos para Implementação</h3>
<ol>
  <li><strong>Workshop de alinhamento:</strong> Reúna liderança e produto para debater candidatas</li>
  <li><strong>Validação histórica:</strong> Verifique se a NSM candidata correlaciona com receita no passado</li>
  <li><strong>Definição das input metrics:</strong> 3-5 métricas por equipe</li>
  <li><strong>Dashboard único:</strong> NSM sempre visível para toda a empresa</li>
  <li><strong>Rituais de revisão:</strong> Revisão semanal/mensal de progresso</li>
</ol>
<div class="example-box">✅ <strong>Prática:</strong> Cole a NSM na parede do escritório. Se as pessoas precisam de uma planilha para encontrar a métrica, ela não está funcionando como guia.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'A North Star Metric do Airbnb é:', options:['Receita mensal','Número de anfitriões cadastrados','Noites reservadas','Número de países atendidos'], correct:2, xp:10, explanation:'A NSM do Airbnb são as "noites reservadas" — captura o valor entregue tanto para hóspedes quanto para anfitriões.' },
      { id:'q2', text:'Uma boa NSM NÃO deve ser:', options:['Mensurável','Acionável','A receita total da empresa','Preditiva'], correct:2, xp:10, explanation:'Receita é consequência do valor entregue, não causa. A NSM deve medir o valor para o cliente, que então gera receita.' },
      { id:'q3', text:'O que são Input Metrics?', options:['Métricas de custo de marketing','As alavancas que os times puxam para mover a NSM','Métricas de receita por produto','Indicadores de satisfação do cliente'], correct:1, xp:10, explanation:'Input Metrics são as métricas acionáveis que, quando melhoradas, movem a North Star Metric.' },
      { id:'q4', text:'Qual é a NSM do Slack?', options:['Número de usuários cadastrados','Mensagens enviadas','Receita anual','Número de workspaces'], correct:1, xp:10, explanation:'O Slack usa "mensagens enviadas" como NSM — captura o engajamento e o valor da comunicação em equipe.' },
      { id:'q5', text:'Quantas North Star Metrics uma empresa deve ter?', options:['Uma por departamento','Uma por produto','Uma única para toda a empresa','Três a cinco'], correct:2, xp:10, explanation:'A NSM deve ser UMA — daí o nome "estrela do norte" que guia toda a empresa em uma direção única.' },
    ]
  },
  {
    id: 'ab-testing',
    title: 'A/B Testing e Experimentação',
    icon: '🔬',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,.15)',
    desc: 'Domine os fundamentos de testes A/B, significância estatística e como criar uma cultura de experimentação.',
    time: '55 min',
    xp: 400,
    tool: 'ab-test',
    prereqs: ['fundamentals'],
    lessons: [
      {
        id:'ab1', title:'O que é um Teste A/B?', xp:50,
        content:`
<h3>Definição</h3>
<p>Um teste A/B (também chamado de split test) é um experimento controlado onde você divide aleatoriamente seu público em dois grupos:</p>
<ul>
  <li><strong>Grupo A (Controle):</strong> Vê a versão original</li>
  <li><strong>Grupo B (Variante):</strong> Vê a versão modificada</li>
</ul>
<p>Você então mede qual versão performa melhor em relação à métrica escolhida.</p>
<div class="highlight-box">💡 <strong>Por que A/B testar?</strong> Porque as opiniões enganam. Aquela mudança que você acha que vai melhorar a taxa de conversão pode, na prática, piorá-la. Dados não mentem — opiniões sim.</div>
<h3>O que pode ser testado</h3>
<ul>
  <li>Títulos e copy de landing pages</li>
  <li>Cor, texto e posição de CTAs (botões)</li>
  <li>Preços e estrutura de planos</li>
  <li>Layout de emails</li>
  <li>Fluxos de onboarding</li>
  <li>Algoritmos de recomendação</li>
</ul>
`
      },
      {
        id:'ab2', title:'Significância Estatística', xp:50,
        content:`
<h3>O Conceito</h3>
<p>Significância estatística é a confiança de que os resultados do seu teste NÃO são fruto do acaso.</p>
<div class="formula">Nível de confiança padrão: 95% (p-value < 0.05)</div>
<p>Isso significa: "Existe menos de 5% de chance que esse resultado aconteceu por sorte."</p>
<h3>Erros Comuns</h3>
<ul>
  <li><strong>Parar o teste cedo:</strong> Ver uma diferença e parar antes de ter amostra suficiente</li>
  <li><strong>Pequena amostra:</strong> Testar com poucos usuários gera falsos positivos</li>
  <li><strong>Testar muitas coisas de uma vez:</strong> Dificulta saber o que causou a mudança</li>
  <li><strong>Ignorar sazonalidade:</strong> Resultados podem variar por dia da semana ou época do ano</li>
</ul>
<div class="warning-box">⚠️ <strong>Regra prática:</strong> Rode o teste por pelo menos 1-2 semanas completas e com pelo menos 1.000 usuários por variante antes de tirar conclusões.</div>
`
      },
      {
        id:'ab3', title:'Calculando o Tamanho da Amostra', xp:50,
        content:`
<h3>Por que o Tamanho da Amostra Importa?</h3>
<p>Testar com amostra insuficiente é o erro #1 em A/B testing. Você pode "ver" uma melhora de 20% que desaparece depois que você escala.</p>
<h3>Fatores que Determinam o Tamanho</h3>
<ul>
  <li><strong>Taxa de conversão base:</strong> Quanto menor, maior a amostra necessária</li>
  <li><strong>Efeito mínimo detectável:</strong> Que mudança mínima importa para você? (2%, 5%, 10%?)</li>
  <li><strong>Nível de confiança:</strong> 95% é o padrão</li>
  <li><strong>Poder estatístico:</strong> 80% é o padrão (chance de detectar efeito real)</li>
</ul>
<div class="example-box">✅ <strong>Regra de bolso:</strong> Para detectar uma melhora de 10% numa taxa de conversão de 3%, você precisa de ~8.000 visitantes por variante. Para detectar 20%, você precisa de ~2.000.</div>
<p>Use calculadoras de tamanho de amostra (como a ferramenta neste módulo!) para calcular com precisão.</p>
`
      },
      {
        id:'ab4', title:'Cultura de Experimentação', xp:50,
        content:`
<h3>Como Criar uma Cultura de Testes</h3>
<p>Empresas como Amazon, Booking.com e Netflix rodam centenas ou milhares de testes simultâneos. Como elas chegaram lá?</p>
<ol>
  <li><strong>Democratize os testes:</strong> Qualquer pessoa na empresa pode propor e rodar um teste</li>
  <li><strong>Documente tudo:</strong> Mantenha um registro de todos os testes — ganhos e perdedores</li>
  <li><strong>Celebrate o aprendizado:</strong> Um teste "negativo" que ensina algo é tão valioso quanto um positivo</li>
  <li><strong>Velocidade > Perfeição:</strong> Um teste rodado hoje vale mais que o teste perfeito rodado em 3 meses</li>
</ol>
<div class="highlight-box">💡 <strong>Booking.com</strong> tem uma diretriz: se um engenheiro não rodou pelo menos 1 teste nos últimos 3 meses, algo está errado. Experimentação é parte do job description.</div>
`
      },
      {
        id:'ab5', title:'Além do A/B: Testes Multivariados', xp:50,
        content:`
<h3>Testes A/B/C e Multivariados</h3>
<p>Às vezes você quer testar mais de duas versões simultaneamente, ou testar múltiplos elementos ao mesmo tempo.</p>
<h3>Teste A/B/C</h3>
<p>Três versões simultâneas. Requer ~50% mais tráfego que um A/B, mas permite comparar mais alternativas de uma vez.</p>
<h3>Teste Multivariado (MVT)</h3>
<p>Testa múltiplas combinações de elementos (ex: título × imagem × CTA). Requer muito mais tráfego mas descobre interações entre elementos.</p>
<div class="warning-box">⚠️ <strong>Quando usar MVT:</strong> Apenas quando você tem tráfego suficiente (100k+ visitantes/mês) e quer entender como elementos interagem entre si.</div>
<h3>Bandits (Bandit Testing)</h3>
<p>Uma abordagem mais moderna que automaticamente aloca mais tráfego para a variante vencedora durante o teste, minimizando perdas.</p>
`
      },
    ],
    quiz: [
      { id:'q1', text:'O nível de confiança padrão para um teste A/B é:', options:['80%','90%','95%','99%'], correct:2, xp:10, explanation:'95% é o padrão da indústria — significa que há menos de 5% de chance que os resultados sejam fruto do acaso.' },
      { id:'q2', text:'Qual é o erro #1 em testes A/B?', options:['Testar cor de botões','Parar o teste muito cedo com amostra insuficiente','Usar o mesmo teste duas vezes','Testar em mobile'], correct:1, xp:10, explanation:'Parar o teste antes de ter amostra suficiente gera falsos positivos — você vê uma "melhora" que desaparece ao escalar.' },
      { id:'q3', text:'O que é o "grupo controle" num teste A/B?', options:['O grupo que vê a versão nova','O grupo que vê a versão original','O grupo que não participa do teste','O grupo com os usuários mais ativos'], correct:1, xp:10, explanation:'O grupo controle (A) vê a versão original. A variante (B) vê a versão modificada.' },
      { id:'q4', text:'Para um teste A/B ser estatisticamente válido, deve rodar por no mínimo:', options:['2-3 dias','3-5 dias','1-2 semanas','1 mês'], correct:2, xp:10, explanation:'Pelo menos 1-2 semanas completas para capturar variações de dias da semana e ter amostra suficiente.' },
      { id:'q5', text:'O que é "poder estatístico" (statistical power)?', options:['O tamanho do orçamento do teste','A chance de detectar um efeito real quando ele existe','A velocidade de carregamento da página','O número de variantes testadas'], correct:1, xp:10, explanation:'Poder estatístico (geralmente 80%) é a probabilidade de detectar uma diferença real quando ela existe.' },
      { id:'q6', text:'Quando usar testes multivariados (MVT)?', options:['Sempre — é mais eficiente','Apenas com 100k+ visitantes/mês','Para testes de email','Para testes em mobile'], correct:1, xp:10, explanation:'MVT requer muito tráfego para ser estatisticamente válido. Com pouco tráfego, prefira testes A/B simples.' },
    ]
  },
  {
    id: 'funnel',
    title: 'Funil de Conversão',
    icon: '🔻',
    color: '#ef4444',
    colorBg: 'rgba(239,68,68,.15)',
    desc: 'Aprenda a mapear, medir e otimizar cada etapa do funil de conversão para maximizar resultados.',
    time: '45 min',
    xp: 300,
    tool: 'funnel',
    prereqs: ['aarrr'],
    lessons: [
      {
        id:'fn1', title:'O que é um Funil de Conversão?', xp:50,
        content:`
<h3>Definição</h3>
<p>Um funil de conversão representa a jornada que um usuário percorre desde o primeiro contato com a marca até a conversão final (compra, cadastro, etc.).</p>
<p>É chamado de "funil" porque o número de pessoas vai diminuindo em cada etapa — como uma filtragem progressiva.</p>
<h3>Funil Básico TOFU-MOFU-BOFU</h3>
<ul>
  <li><strong>TOFU (Top of Funnel):</strong> Consciência — pessoas que ainda estão descobrindo o problema/solução</li>
  <li><strong>MOFU (Middle of Funnel):</strong> Consideração — pessoas que estão avaliando opções</li>
  <li><strong>BOFU (Bottom of Funnel):</strong> Decisão — pessoas prontas para comprar</li>
</ul>
<div class="highlight-box">💡 <strong>Insight chave:</strong> Melhorar a conversão em qualquer etapa do funil tem efeito multiplicador. Aumentar de 2% para 3% no fundo do funil pode dobrar o faturamento.</div>
`
      },
      {
        id:'fn2', title:'Mapeando seu Funil', xp:50,
        content:`
<h3>Como Mapear seu Funil de Conversão</h3>
<ol>
  <li><strong>Liste todos os pontos de contato:</strong> Anúncios, blog, landing pages, emails, etc.</li>
  <li><strong>Identifique as micro-conversões:</strong> Cada pequeno "sim" do usuário na jornada</li>
  <li><strong>Meça as taxas de conversão:</strong> % de usuários que avançam de uma etapa para a próxima</li>
  <li><strong>Identifique o gargalo:</strong> Onde está a maior queda?</li>
</ol>
<h3>Exemplo de Funil E-commerce</h3>
<ul>
  <li>Visitantes: 10.000</li>
  <li>Visualizaram produto: 3.000 (30%)</li>
  <li>Adicionaram ao carrinho: 900 (30%)</li>
  <li>Iniciaram checkout: 450 (50%)</li>
  <li>Compraram: 135 (30%)</li>
</ul>
<div class="formula">Conversão total: 10.000 → 135 = 1,35%</div>
`
      },
      {
        id:'fn3', title:'Otimizando o Funil', xp:50,
        content:`
<h3>Princípio da Alavancagem</h3>
<p>Sempre otimize de baixo para cima. Uma melhora no fundo do funil tem impacto imediato na receita. Uma melhora no topo aumenta o volume que entra em cada etapa.</p>
<h3>Táticas por Etapa</h3>
<h4>TOFU — Aumentar Audiência</h4>
<ul>
  <li>SEO e marketing de conteúdo</li>
  <li>Anúncios de awareness</li>
  <li>Relações públicas e parcerias</li>
</ul>
<h4>MOFU — Nutrir Leads</h4>
<ul>
  <li>Email marketing automatizado</li>
  <li>Webinars e demos</li>
  <li>Cases de sucesso e comparativos</li>
  <li>Retargeting</li>
</ul>
<h4>BOFU — Converter</h4>
<ul>
  <li>Garantias e provas sociais</li>
  <li>Urgência e escassez (autênticas!)</li>
  <li>Simplificar o processo de compra</li>
  <li>Chat ao vivo e suporte</li>
</ul>
`
      },
      {
        id:'fn4', title:'CRO — Otimização de Conversão', xp:50,
        content:`
<h3>O que é CRO?</h3>
<p><strong>CRO (Conversion Rate Optimization)</strong> é a prática sistemática de aumentar a % de usuários que realizam a ação desejada, sem aumentar o tráfego.</p>
<div class="formula">CRO = Mais receita sem mais tráfego</div>
<h3>Processo de CRO</h3>
<ol>
  <li><strong>Pesquisa:</strong> Heatmaps, gravações de sessão, surveys</li>
  <li><strong>Análise:</strong> Encontrar onde e por que os usuários saem</li>
  <li><strong>Hipótese:</strong> O que mudar e por quê melhoraria?</li>
  <li><strong>Teste:</strong> A/B test da mudança</li>
  <li><strong>Implementação:</strong> Se venceu, implemente para todos</li>
</ol>
<div class="example-box">✅ <strong>Caso real:</strong> A Mozilla Firefox aumentou downloads em 15% (3,6 milhões a mais por mês) apenas mudando o texto do botão CTA de "Try Firefox 3" para "Download Now — Free".</div>
`
      },
      {
        id:'fn5', title:'Abandono de Carrinho e Recuperação', xp:50,
        content:`
<h3>A Oportunidade Escondida</h3>
<p>70% dos carrinhos de e-commerce são abandonados. Isso representa uma enorme oportunidade de receita "esquecida".</p>
<h3>Por que as Pessoas Abandonam?</h3>
<ul>
  <li>Custos inesperados (frete, taxas) — 50% dos casos</li>
  <li>Obrigatoriedade de criar conta — 28%</li>
  <li>Processo de checkout longo — 21%</li>
  <li>Não confiava no site — 17%</li>
  <li>Site lento ou com erros — 12%</li>
</ul>
<h3>Estratégias de Recuperação</h3>
<ul>
  <li>Email de abandono de carrinho (enviar em 1h, 24h e 72h)</li>
  <li>Retargeting dinâmico com os produtos abandonados</li>
  <li>Simplificar o checkout (1 página, checkout como convidado)</li>
  <li>Mostrar frete grátis ou custo real desde o início</li>
</ul>
<div class="highlight-box">💡 O primeiro email de abandono de carrinho (enviado em 1 hora) tem taxa de conversão de ~4-5% — é uma das campanhas com melhor ROI em e-commerce.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'BOFU significa:', options:['Bottom of the Funnel','Brand Outreach Funnel Unit','Business Output Framework','Before Online Funnel Usage'], correct:0, xp:10, explanation:'BOFU = Bottom of the Funnel — representa usuários no fundo do funil, prontos para comprar.' },
      { id:'q2', text:'Por que CRO é tão valioso?', options:['Porque é gratuito','Porque gera mais receita sem aumentar tráfego','Porque é mais fácil que SEO','Porque não precisa de testes'], correct:1, xp:10, explanation:'CRO aumenta a conversão do tráfego existente — você extrai mais valor sem precisar atrair mais visitantes.' },
      { id:'q3', text:'Qual o principal motivo de abandono de carrinho?', options:['Produto muito caro','Custos inesperados (frete, taxas)','Site difícil de usar','Falta de confiança'], correct:1, xp:10, explanation:'50% dos abandonos são causados por custos inesperados como frete e taxas que aparecem só no checkout.' },
      { id:'q4', text:'Em que ordem deve-se otimizar o funil?', options:['De cima para baixo (TOFU primeiro)','De baixo para cima (BOFU primeiro)','Aleatoriamente','Pelo que é mais fácil de implementar'], correct:1, xp:10, explanation:'Otimize de baixo para cima — melhorias no BOFU têm impacto imediato em receita e amplificam tudo que vem antes.' },
      { id:'q5', text:'Quando enviar o primeiro email de abandono de carrinho?', options:['Imediatamente (5 minutos)','Em 1 hora','Em 24 horas','Em 48 horas'], correct:1, xp:10, explanation:'O primeiro email em ~1 hora tem as melhores taxas de conversão — o usuário ainda está no "modo de compra".' },
    ]
  },
  {
    id: 'channels',
    title: 'Canais de Aquisição',
    icon: '📡',
    color: '#06b6d4',
    colorBg: 'rgba(6,182,212,.15)',
    desc: 'Conheça todos os canais de aquisição, como avaliá-los e como escolher os certos para seu negócio.',
    time: '55 min',
    xp: 350,
    tool: 'channel-matrix',
    prereqs: ['aarrr'],
    lessons: [
      {
        id:'ch1', title:'Visão Geral dos Canais', xp:50,
        content:`
<h3>O Framework de 19 Canais (Traction)</h3>
<p>O livro "Traction" de Gabriel Weinberg e Justin Mares identifica 19 canais de aquisição que toda startup deve conhecer.</p>
<h3>Categorias Principais</h3>
<ul>
  <li><strong>Orgânico/Content:</strong> SEO, Blog, Podcasts, Vídeo, Social orgânico</li>
  <li><strong>Pago:</strong> SEM (Google Ads), Social Ads, Display, Native Ads</li>
  <li><strong>Outbound:</strong> Email frio, Cold calling, SDR</li>
  <li><strong>Viral/Comunidade:</strong> Referral programs, PR, Eventos, Comunidades</li>
  <li><strong>Parcerias:</strong> Afiliados, Co-marketing, Integrações</li>
</ul>
<div class="highlight-box">💡 <strong>Lei de Weinberg:</strong> A maioria das startups falha em tração não por falta de produto, mas por não testar sistematicamente canais suficientes. Teste pelo menos 6 canais antes de desistir.</div>
`
      },
      {
        id:'ch2', title:'SEO — Busca Orgânica', xp:50,
        content:`
<h3>SEO como Canal de Aquisição</h3>
<p>SEO (Search Engine Optimization) é o processo de otimizar seu site para aparecer nos primeiros resultados orgânicos do Google.</p>
<h3>Os 3 Pilares do SEO</h3>
<ul>
  <li><strong>On-page:</strong> Conteúdo, palavras-chave, título, meta description, estrutura de URL</li>
  <li><strong>Off-page:</strong> Backlinks (links de outros sites apontando para o seu)</li>
  <li><strong>Técnico:</strong> Velocidade, mobile-friendly, Core Web Vitals, estrutura do site</li>
</ul>
<h3>Vantagens e Desvantagens</h3>
<ul>
  <li>✅ Tráfego gratuito e sustentável no longo prazo</li>
  <li>✅ Alta intenção de compra (busca ativa)</li>
  <li>❌ Lento (6-12 meses para ver resultados)</li>
  <li>❌ Algoritmo muda constantemente</li>
</ul>
`
      },
      {
        id:'ch3', title:'Paid Acquisition — Mídia Paga', xp:50,
        content:`
<h3>Os Principais Canais Pagos</h3>
<h4>Google Ads (SEM)</h4>
<p>Anúncios que aparecem quando alguém busca por palavras-chave específicas. Alta intenção, mas costuma ser caro.</p>
<h4>Meta Ads (Facebook/Instagram)</h4>
<p>Segmentação por interesses, comportamentos e dados demográficos. Ótimo para awareness e remarketing.</p>
<h4>LinkedIn Ads</h4>
<p>Ideal para B2B. Segmentação por cargo, empresa, setor. CPC alto mas audiência qualificada.</p>
<h3>Métricas Essenciais</h3>
<ul>
  <li><strong>CPC:</strong> Custo por clique</li>
  <li><strong>CPL:</strong> Custo por lead</li>
  <li><strong>CPA:</strong> Custo por aquisição (cliente)</li>
  <li><strong>ROAS:</strong> Return on Ad Spend (receita ÷ investimento em ads)</li>
</ul>
<div class="formula">ROAS = Receita gerada / Valor investido em anúncios</div>
`
      },
      {
        id:'ch4', title:'Email Marketing', xp:50,
        content:`
<h3>Por que Email ainda é rei?</h3>
<p>Com ROI médio de $42 por $1 investido, email marketing é consistentemente um dos canais com melhor retorno.</p>
<h3>Tipos de Email</h3>
<ul>
  <li><strong>Onboarding sequences:</strong> Educar e ativar novos usuários</li>
  <li><strong>Newsletters:</strong> Nutrir leads e manter engajamento</li>
  <li><strong>Transacionais:</strong> Confirmações, recibos, notificações</li>
  <li><strong>Re-engajamento:</strong> Recuperar usuários inativos</li>
  <li><strong>Abandono de carrinho:</strong> Recuperar vendas perdidas</li>
</ul>
<h3>Métricas de Email</h3>
<ul>
  <li><strong>Open Rate:</strong> Taxa de abertura (benchmark: 20-25%)</li>
  <li><strong>CTR:</strong> Taxa de clique (benchmark: 2-5%)</li>
  <li><strong>Unsubscribe Rate:</strong> Taxa de descadastro (bom: abaixo de 0.5%)</li>
</ul>
`
      },
      {
        id:'ch5', title:'Programas de Referência', xp:50,
        content:`
<h3>O Canal com Melhor ROI</h3>
<p>Clientes indicados por referência têm 16% mais LTV, fecham 30% mais rápido e têm 37% melhor retenção que clientes de outros canais.</p>
<h3>Elementos de um Bom Programa de Referência</h3>
<ul>
  <li><strong>Incentivo claro:</strong> O que o indicador e o indicado ganham?</li>
  <li><strong>Baixo atrito:</strong> Compartilhar deve ser fácil (1 clique)</li>
  <li><strong>Incentivo relevante:</strong> Desconto, crédito, produto extra</li>
  <li><strong>Tracking robusto:</strong> Atribuição clara de cada indicação</li>
</ul>
<div class="example-box">✅ <strong>Caso Uber:</strong> "Indique um amigo e vocês dois ganham R$20 em créditos." Simples, bilateral e com incentivo relevante. O resultado foi crescimento explosivo nos primeiros anos.</div>
<h3>Double-sided vs. Single-sided</h3>
<p>Programas bilaterais (ambos ganham) convertem muito melhor que unilaterais (só o indicador ganha).</p>
`
      },
      {
        id:'ch6', title:'Marketing de Conteúdo', xp:50,
        content:`
<h3>Conteúdo como Ativo de Longo Prazo</h3>
<p>Ao contrário de anúncios que param de funcionar quando você para de pagar, conteúdo de qualidade continua gerando tráfego por anos.</p>
<h3>Tipos de Conteúdo</h3>
<ul>
  <li><strong>Blog posts:</strong> SEO, educação, tráfego orgânico</li>
  <li><strong>Vídeo (YouTube):</strong> 2º maior mecanismo de busca do mundo</li>
  <li><strong>Podcasts:</strong> Audiência altamente engajada e leal</li>
  <li><strong>Infográficos:</strong> Alta taxa de compartilhamento e backlinks</li>
  <li><strong>Ebooks/Whitepapers:</strong> Geração de leads B2B</li>
</ul>
<h3>O Funil de Conteúdo</h3>
<ul>
  <li>TOFU: Conteúdo educativo, respostas a perguntas gerais</li>
  <li>MOFU: Comparativos, casos de uso, tutoriais</li>
  <li>BOFU: Cases de sucesso, demos, provas sociais</li>
</ul>
`
      },
    ],
    quiz: [
      { id:'q1', text:'O ROAS (Return on Ad Spend) é calculado como:', options:['Receita / Custo total','Receita gerada por ads / Investimento em ads','Cliques / Impressões','LTV / CAC'], correct:1, xp:10, explanation:'ROAS = Receita gerada ÷ Valor investido em anúncios. Ex: R$4 de receita para cada R$1 investido = ROAS de 4.' },
      { id:'q2', text:'Qual canal tem o melhor ROI historicamente?', options:['Google Ads','SEO','Email Marketing','Social Media Orgânico'], correct:2, xp:10, explanation:'Email marketing tem ROI médio de $42 para cada $1 investido — consistentemente o melhor retorno entre todos os canais.' },
      { id:'q3', text:'Uma desvantagem do SEO como canal de aquisição é:', options:['Alto custo','É difícil de medir','Demora 6-12 meses para ver resultados','Não funciona para B2B'], correct:2, xp:10, explanation:'SEO é de longo prazo — você investe agora mas os resultados chegam em meses. É ótimo mas requer paciência.' },
      { id:'q4', text:'Qual é a vantagem de programas de referência bilaterais (double-sided)?', options:['São mais baratos','Convertem muito melhor que programas unilaterais','São mais fáceis de implementar','Não precisam de tracking'], correct:1, xp:10, explanation:'Quando ambos (indicador e indicado) ganham, a conversão é muito maior — há interesse dos dois lados.' },
      { id:'q5', text:'O LinkedIn Ads é recomendado principalmente para:', options:['E-commerce de moda','Aplicativos de jogos','Negócios B2B','Marketing local'], correct:2, xp:10, explanation:'LinkedIn permite segmentar por cargo, empresa e setor — ideal para B2B, mas com CPC mais alto.' },
      { id:'q6', text:'Taxa de abertura (Open Rate) de email saudável é aproximadamente:', options:['5-10%','20-25%','40-50%','60-70%'], correct:1, xp:10, explanation:'20-25% de open rate é o benchmark médio. Acima de 30% é excelente para a maioria das indústrias.' },
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics e Métricas Avançadas',
    icon: '📊',
    color: '#6366f1',
    colorBg: 'rgba(99,102,241,.15)',
    desc: 'Aprenda a calcular e interpretar CAC, LTV, Churn Rate, NPS e outras métricas essenciais do growth.',
    time: '50 min',
    xp: 350,
    tool: 'ltv',
    prereqs: ['fundamentals', 'aarrr'],
    lessons: [
      {
        id:'an1', title:'CAC — Custo de Aquisição de Cliente', xp:50,
        content:`
<h3>O que é CAC?</h3>
<p>O CAC representa quanto você gasta, em média, para adquirir um novo cliente. É uma das métricas mais importantes para avaliar a eficiência do seu crescimento.</p>
<div class="formula">CAC = Custos Totais de Aquisição / Número de Novos Clientes</div>
<h3>O que inclui nos custos?</h3>
<ul>
  <li>Gastos com publicidade e mídia paga</li>
  <li>Salários de marketing e vendas</li>
  <li>Ferramentas e softwares de marketing</li>
  <li>Eventos e trade shows</li>
  <li>Agências e freelancers</li>
</ul>
<div class="example-box">✅ <strong>Exemplo:</strong> R$100.000 em custos de marketing em um mês → 200 novos clientes = CAC de R$500.</div>
<h3>CAC por Canal</h3>
<p>Calcule o CAC separado por canal para entender quais são mais eficientes. Ex: CAC via Google Ads vs. via indicação de clientes.</p>
`
      },
      {
        id:'an2', title:'LTV — Lifetime Value', xp:50,
        content:`
<h3>O que é LTV?</h3>
<p>LTV (Lifetime Value) é a receita total que um cliente gera para sua empresa ao longo de todo o relacionamento.</p>
<div class="formula">LTV = Ticket Médio × Frequência Anual × Anos de Retenção</div>
<h3>LTV por Margem (LTV real)</h3>
<p>Para uma análise mais precisa, use o LTV de margem:</p>
<div class="formula">LTV Margem = LTV × Margem Bruta (%)</div>
<h3>A Razão LTV/CAC</h3>
<ul>
  <li><strong>LTV/CAC < 1:</strong> Negócio insustentável (você perde dinheiro em cada cliente)</li>
  <li><strong>LTV/CAC de 1-3:</strong> Crescimento lento</li>
  <li><strong>LTV/CAC ≥ 3:</strong> Negócio saudável</li>
  <li><strong>LTV/CAC > 5:</strong> Pode investir mais em aquisição</li>
</ul>
<div class="highlight-box">💡 <strong>Insight:</strong> Aumentar o LTV é muitas vezes mais fácil do que reduzir o CAC. Melhorar retenção em 5% pode aumentar o LTV em 25-95%.</div>
`
      },
      {
        id:'an3', title:'Churn Rate — Taxa de Cancelamento', xp:50,
        content:`
<h3>O que é Churn?</h3>
<p>Churn é a taxa de clientes (ou receita) que você perde em um período. É o "buraco no balde" do seu negócio.</p>
<div class="formula">Churn Rate = Clientes perdidos no período / Clientes no início do período</div>
<h3>Tipos de Churn</h3>
<ul>
  <li><strong>Customer Churn:</strong> % de clientes que cancelaram</li>
  <li><strong>Revenue Churn (MRR Churn):</strong> % da receita que foi perdida</li>
  <li><strong>Net Revenue Churn:</strong> Leva em conta expansão de receita (pode ser negativo = bom!)</li>
</ul>
<h3>Benchmarks</h3>
<ul>
  <li>SaaS B2B: < 5% ao ano é excelente</li>
  <li>SaaS B2C: < 3% ao mês é bom</li>
  <li>E-commerce: depende muito do produto</li>
</ul>
<div class="warning-box">⚠️ <strong>Impacto exponencial:</strong> Com 5% de churn mensal, você perde metade da sua base em menos de 14 meses. Churn mata negócios silenciosamente.</div>
`
      },
      {
        id:'an4', title:'NPS — Net Promoter Score', xp:50,
        content:`
<h3>O que é NPS?</h3>
<p>O NPS mede a probabilidade de seus clientes recomendarem seu produto/serviço a outras pessoas, em uma escala de 0 a 10.</p>
<div class="formula">NPS = % Promotores − % Detratores</div>
<h3>Classificação dos Respondentes</h3>
<ul>
  <li><strong>Promotores (9-10):</strong> Amam o produto, vão indicar</li>
  <li><strong>Passivos (7-8):</strong> Satisfeitos mas não entusiasmados</li>
  <li><strong>Detratores (0-6):</strong> Insatisfeitos, podem fazer propaganda negativa</li>
</ul>
<h3>Benchmarks por Setor</h3>
<ul>
  <li>SaaS: NPS acima de 30 é bom, acima de 50 é excelente</li>
  <li>E-commerce: Acima de 45 é bom</li>
  <li>Apple: ~72 | Netflix: ~68 | Amazon: ~62</li>
</ul>
<div class="example-box">✅ <strong>Como usar:</strong> Pergunte NPS periodicamente. Para detratores: entenda o problema e resolva. Para promotores: ative-os como evangelistas e para programas de referência.</div>
`
      },
      {
        id:'an5', title:'Análise de Cohort', xp:50,
        content:`
<h3>O que é Análise de Cohort?</h3>
<p>Análise de cohort agrupa usuários por data de entrada (ex: todos que se cadastraram em janeiro) e acompanha o comportamento desse grupo ao longo do tempo.</p>
<h3>Por que usar?</h3>
<ul>
  <li>Revela padrões de retenção que médias escondem</li>
  <li>Mostra se o produto está melhorando (cohorts mais recentes retêm mais?)</li>
  <li>Identifica quando usuários tendem a sair</li>
</ul>
<h3>Lendo uma Tabela de Cohort</h3>
<p>Cada linha é um grupo (cohort) de usuários. Cada coluna é o mês após o cadastro. Os números mostram % que ainda estão ativos.</p>
<div class="highlight-box">💡 <strong>Sinal positivo:</strong> Se cohorts mais recentes têm retenção maior que cohorts mais antigos na mesma coluna, o produto está melhorando.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'CAC = ?', options:['Clientes Adquiridos por Canal','Custos Totais de Aquisição / Novos Clientes','Custo de Anúncios / Conversões','Cliques / Custo Total'], correct:1, xp:10, explanation:'CAC = Custos Totais de Aquisição (marketing + vendas) dividido pelo número de novos clientes no mesmo período.' },
      { id:'q2', text:'Uma razão LTV/CAC de 1.5 indica:', options:['Negócio muito saudável','Crescimento explosivo','Negócio com crescimento lento e margem apertada','Empresa com ótimo funil de conversão'], correct:2, xp:10, explanation:'LTV/CAC de 1-3 indica crescimento lento — você está adquirindo clientes, mas a margem é pequena. O ideal é ≥ 3.' },
      { id:'q3', text:'Net Revenue Churn negativo significa:', options:['O negócio está perdendo clientes rapidamente','A receita de expansão supera a receita perdida','Erro de cálculo','CAC está crescendo'], correct:1, xp:10, explanation:'Net Revenue Churn negativo (Net Revenue Retention > 100%) é excelente — você ganha mais com clientes existentes do que perde com cancelamentos.' },
      { id:'q4', text:'No NPS, quem são os "Passivos"?', options:['Clientes que deram 0-6','Clientes que deram 7-8','Clientes que deram 9-10','Clientes que não responderam'], correct:1, xp:10, explanation:'Passivos dão nota 7-8: satisfeitos mas não entusiasmados. Não detratam mas também não promovem.' },
      { id:'q5', text:'O objetivo principal da análise de cohort é:', options:['Calcular CAC por canal','Entender padrões de retenção ao longo do tempo','Prever receita futura','Identificar o melhor canal de aquisição'], correct:1, xp:10, explanation:'Cohort analysis revela como grupos de usuários se comportam ao longo do tempo — especialmente padrões de retenção e churn.' },
      { id:'q6', text:'Com 5% de churn mensal, em quantos meses você perde 50% da base?', options:['5 meses','10 meses','14 meses','20 meses'], correct:2, xp:10, explanation:'Com 5% de churn mensal: 100 × (0.95)^n = 50. Resolvendo: n ≈ 14 meses.' },
    ]
  },
  {
    id: 'plg',
    title: 'Product-Led Growth (PLG)',
    icon: '🎯',
    color: '#a855f7',
    colorBg: 'rgba(168,85,247,.15)',
    desc: 'Entenda como o produto em si pode ser o principal motor de aquisição, conversão e retenção.',
    time: '45 min',
    xp: 300,
    tool: 'north-star',
    prereqs: ['aarrr', 'north-star'],
    lessons: [
      {
        id:'plg1', title:'O que é Product-Led Growth?', xp:50,
        content:`
<h3>Definição</h3>
<p><strong>Product-Led Growth (PLG)</strong> é uma estratégia de go-to-market onde o produto em si é o principal veículo de aquisição, retenção e expansão de clientes.</p>
<p>Em vez de um time de vendas convencer o cliente, o produto "se vende sozinho" através da experiência direta.</p>
<div class="highlight-box">💡 <strong>Slido, Calendly, Figma, Notion, Slack, Zoom, Dropbox</strong> — todos cresceram primariamente por PLG. O usuário experimenta, se encanta, e depois paga (ou convence a empresa a pagar).</div>
<h3>PLG vs. SLG (Sales-Led Growth)</h3>
<ul>
  <li><strong>SLG:</strong> Demo → Proposta → Vendas → Produto</li>
  <li><strong>PLG:</strong> Produto → Valor → Conversão → (opcional) Vendas</li>
</ul>
`
      },
      {
        id:'plg2', title:'Freemium e Free Trial', xp:50,
        content:`
<h3>Os Dois Modelos de PLG</h3>
<h4>Freemium</h4>
<p>Produto gratuito com limitações. Usuário usa indefinidamente no free, e converte quando precisa de mais.</p>
<ul>
  <li>✅ Baixíssimo atrito de entrada</li>
  <li>✅ Viral por natureza (usuários free indicam outros)</li>
  <li>❌ Taxa de conversão baixa (2-5% típico)</li>
  <li>❌ Custo de servir usuários free</li>
</ul>
<h4>Free Trial</h4>
<p>Acesso completo por período limitado (7, 14 ou 30 dias). Conversão ao fim do trial.</p>
<ul>
  <li>✅ Usuário experimenta o valor total</li>
  <li>✅ Taxa de conversão maior (15-25%)</li>
  <li>❌ Mais atrito (senso de urgência pode assustar)</li>
</ul>
<div class="warning-box">⚠️ <strong>Armadilha do Freemium:</strong> Oferecer pouco valor no free = ninguém usa. Oferecer demais = ninguém paga. O equilíbrio é a arte.</div>
`
      },
      {
        id:'plg3', title:'O Aha! Moment no PLG', xp:50,
        content:`
<h3>Projetando o Aha! Moment</h3>
<p>No PLG, o objetivo #1 é levar o usuário ao Aha! Moment o mais rápido possível. Cada minuto a mais antes do Aha! = maior chance de churn.</p>
<h3>Como Encontrar seu Aha! Moment</h3>
<ol>
  <li>Analise o comportamento dos usuários que converteram para pago</li>
  <li>Identifique ações que eles tomaram que usuários churned não tomaram</li>
  <li>A ação com maior correlação com conversão é provavelmente o Aha!</li>
</ol>
<div class="example-box">✅ <strong>Exemplos de Aha! Moments:</strong><br>
• Twitter: Seguir 30+ pessoas<br>
• Slack: 2.000 mensagens enviadas no workspace<br>
• Dropbox: Salvar o primeiro arquivo e acessar de outro dispositivo<br>
• Airbnb: Fazer a primeira reserva</div>
<p>Uma vez identificado, todo o onboarding deve ser desenhado para chegar lá o mais rápido possível.</p>
`
      },
      {
        id:'plg4', title:'PQLs — Product Qualified Leads', xp:50,
        content:`
<h3>O que é um PQL?</h3>
<p>Um <strong>PQL (Product Qualified Lead)</strong> é um lead que demonstrou, através do uso do produto, que está pronto para ser convertido para pago. É o equivalente PLG do MQL (Marketing Qualified Lead).</p>
<div class="formula">PQL = Usuário que atingiu o Aha! Moment + Sinal de expansão</div>
<h3>Sinais de PQL</h3>
<ul>
  <li>Atingiu o limite do plano gratuito</li>
  <li>Convidou 3+ membros para o workspace</li>
  <li>Usou o produto mais de 10x na semana</li>
  <li>Completou o onboarding e tem alta ativação</li>
</ul>
<h3>O Handoff PLG → Vendas</h3>
<p>Quando um PQL é identificado, o time de vendas (se houver) entra em contato com contexto total sobre o uso do produto — o que é muito mais eficiente que vendas frias.</p>
`
      },
      {
        id:'plg5', title:'Métricas Chave do PLG', xp:50,
        content:`
<h3>Métricas Específicas do PLG</h3>
<ul>
  <li><strong>Time to Value (TTV):</strong> Tempo até o usuário experimentar o valor central</li>
  <li><strong>Activation Rate:</strong> % de usuários que atingem o Aha! Moment</li>
  <li><strong>Freemium-to-Paid Conversion:</strong> % de usuários free que convertem</li>
  <li><strong>Product Adoption Rate:</strong> % do mercado usando o produto</li>
  <li><strong>Expansion Revenue:</strong> Receita adicional de clientes existentes (upsell/cross-sell)</li>
</ul>
<h3>The PLG Flywheel</h3>
<p>O volante do PLG cria um ciclo virtuoso: melhor produto → mais usuários → mais dados → produto melhor → mais conversões → mais receita → reinvestir no produto.</p>
<div class="highlight-box">💡 <strong>Net Revenue Retention (NRR) > 120%</strong> é o benchmark de empresas PLG de alto crescimento — significa que mesmo sem adquirir novos clientes, a receita cresceria 20% ao ano.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'O principal veículo de aquisição no PLG é:', options:['Time de vendas','Marketing pago','O próprio produto','Relações públicas'], correct:2, xp:10, explanation:'No PLG, o produto em si é o principal driver de aquisição — os usuários experimentam e se "vendem" para si mesmos.' },
      { id:'q2', text:'Qual é a taxa de conversão típica do modelo Freemium?', options:['0.5-1%','2-5%','10-15%','20-30%'], correct:1, xp:10, explanation:'Freemium tem taxa de conversão de 2-5% tipicamente. Parece baixo, mas com alto volume pode ser muito lucrativo.' },
      { id:'q3', text:'PQL significa:', options:['Paid Qualified Lead','Product Quality Level','Product Qualified Lead','Premium Quality Limit'], correct:2, xp:10, explanation:'PQL = Product Qualified Lead — um usuário que demonstrou através do uso do produto que está pronto para converter.' },
      { id:'q4', text:'TTV (Time to Value) mede:', options:['Tempo de carregamento do produto','Tempo até o usuário experimentar o valor central','Tempo de free trial','Tempo médio de uso por sessão'], correct:1, xp:10, explanation:'TTV é quanto tempo leva até o usuário experimentar o "Aha! Moment" — quanto menor, melhor para ativação e retenção.' },
      { id:'q5', text:'O NRR (Net Revenue Retention) > 120% para empresas PLG significa:', options:['Churn está controlado','A receita cresce mesmo sem adquirir novos clientes','O produto está com defeitos','O modelo freemium está funcionando'], correct:1, xp:10, explanation:'NRR > 100% = receita de expansão (upsell/cross-sell) supera o churn. Acima de 120% é o benchmark de empresas PLG de alto crescimento.' },
    ]
  },
  {
    id: 'viral-loops',
    title: 'Viral Loops e Coeficiente Viral',
    icon: '🦠',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,.15)',
    desc: 'Aprenda a calcular o coeficiente viral, construir loops virais e criar mecanismos de crescimento orgânico.',
    time: '40 min',
    xp: 300,
    tool: 'viral-coefficient',
    prereqs: ['growth-loops'],
    lessons: [
      {
        id:'vl1', title:'Viralidade e Coeficiente Viral (K)', xp:50,
        content:`
<h3>O que é o Coeficiente Viral?</h3>
<p>O coeficiente viral (K) mede quantos novos usuários cada usuário existente traz, em média, durante um ciclo.</p>
<div class="formula">K = (Convites enviados por usuário) × (Taxa de conversão dos convites)</div>
<h3>Interpretando o K</h3>
<ul>
  <li><strong>K > 1:</strong> Crescimento viral exponencial — cada usuário traz mais de 1 novo usuário</li>
  <li><strong>K = 1:</strong> Crescimento linear — você substitui cada usuário que sai</li>
  <li><strong>K < 1:</strong> Sem viralidade — você depende de outras fontes de aquisição</li>
</ul>
<div class="example-box">✅ <strong>Exemplo:</strong> Cada usuário convida em média 5 amigos, e 20% dos convidados se cadastram. K = 5 × 0.20 = 1.0. Com K = 1, cada usuário "replica" 1 novo usuário.</div>
`
      },
      {
        id:'vl2', title:'Tipos de Viralidade', xp:50,
        content:`
<h3>Viralidade Inerente ao Produto</h3>
<p>O produto só funciona ou é melhor quando mais pessoas usam. O convite é parte da proposta de valor.</p>
<div class="example-box">✅ <strong>Exemplos:</strong> WhatsApp (precisa que seus contatos usem), Google Docs (compartilhar documentos), Zoom (convidar para reunião).</div>
<h3>Viralidade por Incentivo</h3>
<p>Você oferece recompensas para quem indica (e/ou para quem é indicado).</p>
<div class="example-box">✅ <strong>Exemplos:</strong> Dropbox (espaço extra), Uber (créditos), Nubank (acesso antecipado).</div>
<h3>Viralidade por Demonstração (Word-of-Mouth)</h3>
<p>Usuários falam sobre o produto naturalmente porque ele é excepcional ou resolve um problema muito bem.</p>
<div class="example-box">✅ <strong>Exemplos:</strong> Notion, Figma, ChatGPT — o "efeito WOW" faz as pessoas contarem para outros.</div>
`
      },
      {
        id:'vl3', title:'Ciclo de Vida do Loop Viral', xp:50,
        content:`
<h3>As Etapas do Loop Viral</h3>
<ol>
  <li><strong>Trigger:</strong> O que leva o usuário a convidar? (alcançar um limite, querer colaborar, incentivo)</li>
  <li><strong>Convite:</strong> Como o convite é enviado? (email, link, WhatsApp, redes sociais)</li>
  <li><strong>Landing:</strong> O convidado chega a uma página — qual é a experiência?</li>
  <li><strong>Conversão:</strong> O convidado se cadastra/instala/compra</li>
  <li><strong>Ativação:</strong> O novo usuário experimenta o valor → e o ciclo recomeça</li>
</ol>
<h3>Otimizando Cada Etapa</h3>
<p>Melhorar qualquer etapa do loop melhora o K. Foque na etapa com maior queda:</p>
<ul>
  <li>Poucos convites enviados? Melhore o Trigger</li>
  <li>Taxa de conversão do convite baixa? Melhore a Landing</li>
  <li>Muitos cadastros mas pouco engajamento? Melhore a Ativação</li>
</ul>
`
      },
      {
        id:'vl4', title:'Construindo Loops Virais', xp:50,
        content:`
<h3>Princípios para Loops Virais Efetivos</h3>
<ol>
  <li><strong>O convite deve criar valor para quem convida E para quem é convidado</strong></li>
  <li><strong>Menor atrito possível</strong> — 1 clique para convidar é ideal</li>
  <li><strong>O timing importa</strong> — peça o convite no momento de maior satisfação (após o Aha! Moment)</li>
  <li><strong>Personalize</strong> — "João te convidou" converte mais que "Convidado por um usuário"</li>
</ol>
<div class="highlight-box">💡 <strong>O momento certo para pedir o convite:</strong> Imediatamente após o Aha! Moment — quando o usuário está mais empolgado e mais propenso a compartilhar.</div>
<div class="warning-box">⚠️ <strong>Não force:</strong> Loops virais artificiais (spam de convites, dark patterns) destroem a confiança. Construa loops que os usuários queiram usar.</div>
`
      },
    ],
    quiz: [
      { id:'q1', text:'A fórmula do Coeficiente Viral (K) é:', options:['K = Novos usuários / Usuários ativos','K = Convites × Taxa de conversão','K = Taxa de retenção - Churn','K = LTV / CAC'], correct:1, xp:10, explanation:'K = (Convites enviados por usuário) × (Taxa de conversão dos convites). Ex: 5 convites × 20% = K de 1.0.' },
      { id:'q2', text:'K > 1 significa:', options:['O produto tem boa retenção','Crescimento viral exponencial — cada usuário traz mais de 1 novo usuário','O CAC está abaixo do LTV','A taxa de churn é saudável'], correct:1, xp:10, explanation:'K > 1 = crescimento viral. Cada usuário traz mais de 1 novo em média, criando crescimento exponencial.' },
      { id:'q3', text:'O WhatsApp é exemplo de qual tipo de viralidade?', options:['Viralidade por incentivo','Viralidade por demonstração','Viralidade inerente ao produto','Viralidade por anúncios'], correct:2, xp:10, explanation:'WhatsApp tem viralidade inerente — o produto só funciona se seus contatos também usam, então convidar é parte do valor.' },
      { id:'q4', text:'Quando é o melhor momento para pedir ao usuário que convide outros?', options:['Logo após o cadastro','Após 30 dias de uso','Imediatamente após o Aha! Moment','Quando o usuário está prestes a cancelar'], correct:2, xp:10, explanation:'Após o Aha! Moment, o usuário está no pico de entusiasmo — é quando a probabilidade de compartilhar é maior.' },
      { id:'q5', text:'Qual é a primeira etapa do loop viral?', options:['Convite','Conversão','Trigger (gatilho)','Ativação'], correct:2, xp:10, explanation:'O Trigger é o que inicia o loop — o motivo pelo qual o usuário vai convidar outros (alcançar limite, querer colaborar, incentivo).' },
    ]
  },
];

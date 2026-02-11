// =============================================
// MVP Placeholder Data - Dados de exemplo
// =============================================

export type LevelTier = "pleasant" | "painful" | "death" | "hell" | "paradise" | "reality"

export interface LevelTierInfo {
  id: LevelTier
  name: string
  nameJp: string
  levels: number[]
  color: string
  bgColor: string
  textColor: string
  borderColor: string
}

export const LEVEL_TIERS: LevelTierInfo[] = [
  {
    id: "pleasant",
    name: "Agradavel",
    nameJp: "快",
    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    color: "hsl(142, 71%, 45%)",
    bgColor: "hsl(142, 71%, 45%)",
    textColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(142, 71%, 35%)",
  },
  {
    id: "painful",
    name: "Doloroso",
    nameJp: "苦",
    levels: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    color: "hsl(25, 95%, 53%)",
    bgColor: "hsl(25, 95%, 53%)",
    textColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(25, 95%, 43%)",
  },
  {
    id: "death",
    name: "Morte",
    nameJp: "死",
    levels: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    color: "hsl(0, 84%, 60%)",
    bgColor: "hsl(0, 84%, 60%)",
    textColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(0, 84%, 50%)",
  },
  {
    id: "hell",
    name: "Inferno",
    nameJp: "地獄",
    levels: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    color: "hsl(270, 70%, 55%)",
    bgColor: "hsl(270, 70%, 55%)",
    textColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(270, 70%, 45%)",
  },
  {
    id: "paradise",
    name: "Paraiso",
    nameJp: "天国",
    levels: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    color: "hsl(199, 89%, 48%)",
    bgColor: "hsl(199, 89%, 48%)",
    textColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(199, 89%, 38%)",
  },
  {
    id: "reality",
    name: "Realidade",
    nameJp: "現実",
    levels: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    color: "hsl(215, 25%, 55%)",
    bgColor: "hsl(215, 25%, 55%)",
    textColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(215, 25%, 45%)",
  },
]

export function getTierForLevel(level: number): LevelTierInfo {
  const tier = LEVEL_TIERS.find((t) => t.levels.includes(level))
  return tier || LEVEL_TIERS[0]
}

// =============================================
// Radicals (Radicais)
// =============================================
export interface Radical {
  id: string
  character: string
  name: string
  namePt: string
  level: number
  mnemonic: string
  mnemonicPt: string
  foundInKanji: string[] // kanji ids
}

export const SAMPLE_RADICALS: Radical[] = [
  {
    id: "radical-ground",
    character: "一",
    name: "Ground",
    namePt: "Chao",
    level: 1,
    mnemonic:
      "This is the ground. Look at it, just a flat line that stretches from one side to the other. That is the ground.",
    mnemonicPt:
      "Isto e o chao. Olhe para ele, apenas uma linha plana que se estende de um lado ao outro. Isso e o chao.",
    foundInKanji: ["kanji-ue", "kanji-ichi"],
  },
  {
    id: "radical-barb",
    character: "亅",
    name: "Barb",
    namePt: "Farpa",
    level: 1,
    mnemonic:
      "This radical is shaped like a barb. Kind of like the barb you'd see on a barbed fishing hook. Imagine that thing getting stuck in your arm.",
    mnemonicPt:
      "Este radical tem a forma de uma farpa. Como a farpa que voce veria em um anzol de pesca. Imagine isso preso no seu braco.",
    foundInKanji: ["kanji-sai"],
  },
  {
    id: "radical-toe",
    character: "ト",
    name: "Toe",
    namePt: "Dedo do pe",
    level: 1,
    mnemonic:
      "This radical looks like a toe. A big toe, specifically. Imagine wiggling your big toe around.",
    mnemonicPt:
      "Este radical parece um dedo do pe. Um dedao, especificamente. Imagine mexendo seu dedao.",
    foundInKanji: ["kanji-ue"],
  },
  {
    id: "radical-tree",
    character: "木",
    name: "Tree",
    namePt: "Arvore",
    level: 1,
    mnemonic:
      "This radical looks like a tree. You can see the trunk going up with branches spreading out and roots going down.",
    mnemonicPt:
      "Este radical parece uma arvore. Voce pode ver o tronco subindo com galhos se espalhando e raizes descendo.",
    foundInKanji: ["kanji-hayashi"],
  },
  {
    id: "radical-mouth",
    character: "口",
    name: "Mouth",
    namePt: "Boca",
    level: 1,
    mnemonic:
      "This radical looks like a mouth, wide open. It's a square shape, like a mouth opened as wide as possible to scream.",
    mnemonicPt:
      "Este radical parece uma boca, bem aberta. E uma forma quadrada, como uma boca aberta o maximo possivel para gritar.",
    foundInKanji: [],
  },
  {
    id: "radical-big",
    character: "大",
    name: "Big",
    namePt: "Grande",
    level: 1,
    mnemonic:
      "This radical shows a person stretching their arms and legs out wide, making themselves look as big as possible.",
    mnemonicPt:
      "Este radical mostra uma pessoa esticando os bracos e pernas, se fazendo parecer o maior possivel.",
    foundInKanji: [],
  },
]

// =============================================
// Kanji
// =============================================
export interface Kanji {
  id: string
  character: string
  meaning: string
  meaningPt: string
  alternatives: string[]
  level: number
  onyomi: string[]
  kunyomi: string[]
  radicalIds: string[]
  meaningMnemonic: string
  meaningMnemonicPt: string
  readingMnemonic: string
  readingMnemonicPt: string
  foundInVocabulary: string[] // vocabulary ids
}

export const SAMPLE_KANJI: Kanji[] = [
  {
    id: "kanji-ue",
    character: "上",
    meaning: "Above",
    meaningPt: "Acima",
    alternatives: ["Up", "Over"],
    level: 1,
    onyomi: ["じょう"],
    kunyomi: ["うえ", "あ", "のぼ", "うわ", "かみ"],
    radicalIds: ["radical-toe", "radical-ground"],
    meaningMnemonic:
      "You find a toe on the ground. It's weird, because it's above the ground, not where toes belong.",
    meaningMnemonicPt:
      "Voce encontra um dedo do pe no chao. E estranho, porque esta acima do chao, nao onde dedos do pe pertencem.",
    readingMnemonic:
      "When you find a toe above the ground, you want to know where it came from. This toe belongs to Joe (じょう).",
    readingMnemonicPt:
      "Quando voce encontra um dedo do pe acima do chao, quer saber de onde veio. Este dedo pertence ao Joe (じょう).",
    foundInVocabulary: ["vocab-ue", "vocab-ageru"],
  },
  {
    id: "kanji-ichi",
    character: "一",
    meaning: "One",
    meaningPt: "Um",
    alternatives: [],
    level: 1,
    onyomi: ["いち"],
    kunyomi: ["ひと"],
    radicalIds: ["radical-ground"],
    meaningMnemonic:
      "This kanji is one line. One single, simple line. What else could the meaning be? One.",
    meaningMnemonicPt:
      "Este kanji e uma linha. Uma unica linha simples. O que mais poderia significar? Um.",
    readingMnemonic:
      "When you lay this one flat line on the ground, it becomes itchy (いち). The ground makes everything itchy.",
    readingMnemonicPt:
      "Quando voce coloca esta unica linha no chao, fica com coceira (いち). O chao deixa tudo com coceira.",
    foundInVocabulary: ["vocab-ichi"],
  },
  {
    id: "kanji-sai",
    character: "才",
    meaning: "Talent",
    meaningPt: "Talento",
    alternatives: ["Genius"],
    level: 1,
    onyomi: ["さい"],
    kunyomi: [],
    radicalIds: ["radical-barb"],
    meaningMnemonic:
      "This kanji contains a barb. When you have the talent to pull a barb out of someone, you are truly gifted.",
    meaningMnemonicPt:
      "Este kanji contem uma farpa. Quando voce tem o talento de tirar uma farpa de alguem, voce e realmente talentoso.",
    readingMnemonic: "A talented person says 'sai' (さい) when they perform their skills.",
    readingMnemonicPt:
      "Uma pessoa talentosa diz 'sai' (さい) quando demonstra suas habilidades.",
    foundInVocabulary: [],
  },
  {
    id: "kanji-hayashi",
    character: "林",
    meaning: "Forest",
    meaningPt: "Floresta",
    alternatives: ["Grove", "Woods"],
    level: 2,
    onyomi: ["りん"],
    kunyomi: ["はやし"],
    radicalIds: ["radical-tree"],
    meaningMnemonic:
      "Two trees together make a grove or forest. When you see two trees side by side, you know you're entering a forest.",
    meaningMnemonicPt:
      "Duas arvores juntas formam um bosque ou floresta. Quando voce ve duas arvores lado a lado, sabe que esta entrando numa floresta.",
    readingMnemonic:
      "In the forest, you can hear a ring (りん) of a bell echoing through the trees.",
    readingMnemonicPt:
      "Na floresta, voce pode ouvir um toque (りん) de um sino ecoando entre as arvores.",
    foundInVocabulary: [],
  },
]

// =============================================
// Vocabulary (Vocabulario)
// =============================================
export interface Vocabulary {
  id: string
  word: string
  reading: string
  meaning: string
  meaningPt: string
  level: number
  wordType: string
  meaningExplanation: string
  meaningExplanationPt: string
  readingExplanation: string
  readingExplanationPt: string
  contextSentences: { ja: string; pt: string }[]
  kanjiIds: string[]
}

export const SAMPLE_VOCABULARY: Vocabulary[] = [
  {
    id: "vocab-ue",
    word: "上",
    reading: "うえ",
    meaning: "Above",
    meaningPt: "Acima",
    level: 1,
    wordType: "substantivo, sufixo",
    meaningExplanation:
      "When a vocab word is a single kanji and alone, it tends to steal the meaning from the kanji. It means above or up.",
    meaningExplanationPt:
      "Quando uma palavra de vocabulario e um unico kanji sozinho, ela tende a pegar o significado do kanji. Significa acima ou em cima.",
    readingExplanation:
      "When a vocab is a single kanji and all alone, it usually uses the kun'yomi. Above you is a huge weight (うえ).",
    readingExplanationPt:
      "Quando um vocabulario e um unico kanji sozinho, geralmente usa a kun'yomi. Acima de voce ha um peso enorme (うえ).",
    contextSentences: [
      {
        ja: "山の上でヨガをしたいね。",
        pt: "Quero fazer yoga no topo da montanha.",
      },
      {
        ja: "上のフロアにキッチンがあります。",
        pt: "Ha uma cozinha no andar de cima.",
      },
      {
        ja: "リビングルームの上にロフトがあります。",
        pt: "Ha um loft acima da sala de estar.",
      },
    ],
    kanjiIds: ["kanji-ue"],
  },
  {
    id: "vocab-ageru",
    word: "上げる",
    reading: "あげる",
    meaning: "To Lift Something",
    meaningPt: "Levantar Algo",
    level: 1,
    wordType: "verbo transitivo",
    meaningExplanation:
      "This word combines the kanji for above with the verb ending. It means to lift something up.",
    meaningExplanationPt:
      "Esta palavra combina o kanji de acima com a terminacao verbal. Significa levantar algo.",
    readingExplanation:
      "The reading comes from the kun'yomi of the kanji. You lift (あげる) things above your head.",
    readingExplanationPt:
      "A leitura vem da kun'yomi do kanji. Voce levanta (あげる) coisas acima da sua cabeca.",
    contextSentences: [
      {
        ja: "手を上げてください。",
        pt: "Por favor, levante a mao.",
      },
      {
        ja: "声を上げる。",
        pt: "Levantar a voz.",
      },
    ],
    kanjiIds: ["kanji-ue"],
  },
  {
    id: "vocab-ichi",
    word: "一",
    reading: "いち",
    meaning: "One",
    meaningPt: "Um",
    level: 1,
    wordType: "numeral",
    meaningExplanation:
      "This is the number one. A single kanji that represents the number one.",
    meaningExplanationPt:
      "Este e o numero um. Um unico kanji que representa o numero um.",
    readingExplanation:
      "The reading for this one is いち, the on'yomi reading.",
    readingExplanationPt:
      "A leitura para este e いち, a leitura on'yomi.",
    contextSentences: [
      {
        ja: "一から始めましょう。",
        pt: "Vamos comecar do um.",
      },
    ],
    kanjiIds: ["kanji-ichi"],
  },
  {
    id: "vocab-jouzu",
    word: "上手",
    reading: "じょうず",
    meaning: "Good At",
    meaningPt: "Bom Em",
    level: 2,
    wordType: "adjetivo na",
    meaningExplanation:
      "This word combines 'above' with 'hand'. If your hand is above others, you are good at something.",
    meaningExplanationPt:
      "Esta palavra combina 'acima' com 'mao'. Se sua mao esta acima dos outros, voce e bom em algo.",
    readingExplanation:
      "Both kanji use on'yomi readings here: じょう + ず = じょうず.",
    readingExplanationPt:
      "Ambos os kanji usam leituras on'yomi aqui: じょう + ず = じょうず.",
    contextSentences: [
      {
        ja: "彼女はピアノが上手です。",
        pt: "Ela e boa em piano.",
      },
    ],
    kanjiIds: ["kanji-ue"],
  },
]

// =============================================
// SRS Stages (Estagios SRS)
// =============================================
export type SrsStage =
  | "aprendiz1"
  | "aprendiz2"
  | "aprendiz3"
  | "aprendiz4"
  | "guru1"
  | "guru2"
  | "mestre"
  | "iluminado"
  | "queimado"

export interface SrsStageInfo {
  id: SrsStage
  name: string
  nameEn: string
  color: string
  bgColor: string
  textColor: string
}

export const SRS_STAGES: SrsStageInfo[] = [
  { id: "aprendiz1", name: "Aprendiz 1", nameEn: "Apprentice 1", color: "hsl(330, 81%, 60%)", bgColor: "hsl(330, 81%, 60%)", textColor: "#fff" },
  { id: "aprendiz2", name: "Aprendiz 2", nameEn: "Apprentice 2", color: "hsl(330, 81%, 55%)", bgColor: "hsl(330, 81%, 55%)", textColor: "#fff" },
  { id: "aprendiz3", name: "Aprendiz 3", nameEn: "Apprentice 3", color: "hsl(330, 81%, 50%)", bgColor: "hsl(330, 81%, 50%)", textColor: "#fff" },
  { id: "aprendiz4", name: "Aprendiz 4", nameEn: "Apprentice 4", color: "hsl(330, 81%, 45%)", bgColor: "hsl(330, 81%, 45%)", textColor: "#fff" },
  { id: "guru1", name: "Guru 1", nameEn: "Guru 1", color: "hsl(270, 70%, 55%)", bgColor: "hsl(270, 70%, 55%)", textColor: "#fff" },
  { id: "guru2", name: "Guru 2", nameEn: "Guru 2", color: "hsl(270, 70%, 50%)", bgColor: "hsl(270, 70%, 50%)", textColor: "#fff" },
  { id: "mestre", name: "Mestre", nameEn: "Master", color: "hsl(199, 89%, 48%)", bgColor: "hsl(199, 89%, 48%)", textColor: "#fff" },
  { id: "iluminado", name: "Iluminado", nameEn: "Enlightened", color: "hsl(45, 93%, 47%)", bgColor: "hsl(45, 93%, 47%)", textColor: "#fff" },
  { id: "queimado", name: "Queimado", nameEn: "Burned", color: "hsl(215, 25%, 40%)", bgColor: "hsl(215, 25%, 40%)", textColor: "#fff" },
]

export function getSrsStageInfo(stage: SrsStage): SrsStageInfo {
  return SRS_STAGES.find((s) => s.id === stage) || SRS_STAGES[0]
}

// =============================================
// Review Items (Itens de Revisao)
// =============================================
export type ReviewItemType = "radical" | "kanji" | "vocabulary"
export type ReviewQuestionType = "meaning" | "reading"

export interface ReviewItem {
  id: string
  type: ReviewItemType
  character: string
  srsStage: SrsStage
  meaning: string
  meaningPt: string
  meaningAlternatives: string[]
  readings: string[] // empty for radicals
  level: number
}

// Generate placeholder review items from existing data
export function generateReviewQueue(): ReviewItem[] {
  const items: ReviewItem[] = []

  // Add radicals (meaning only)
  for (const r of SAMPLE_RADICALS) {
    items.push({
      id: r.id,
      type: "radical",
      character: r.character,
      srsStage: "aprendiz2",
      meaning: r.name,
      meaningPt: r.namePt,
      meaningAlternatives: [r.name.toLowerCase(), r.namePt.toLowerCase()],
      readings: [],
      level: r.level,
    })
  }

  // Add kanji (meaning + reading)
  for (const k of SAMPLE_KANJI) {
    items.push({
      id: k.id,
      type: "kanji",
      character: k.character,
      srsStage: "aprendiz3",
      meaning: k.meaning,
      meaningPt: k.meaningPt,
      meaningAlternatives: [k.meaning.toLowerCase(), k.meaningPt.toLowerCase(), ...k.alternatives.map((a) => a.toLowerCase())],
      readings: [...k.onyomi, ...k.kunyomi],
      level: k.level,
    })
  }

  // Add vocabulary (meaning + reading)
  for (const v of SAMPLE_VOCABULARY) {
    items.push({
      id: v.id,
      type: "vocabulary",
      character: v.word,
      srsStage: "guru1",
      meaning: v.meaning,
      meaningPt: v.meaningPt,
      meaningAlternatives: [v.meaning.toLowerCase(), v.meaningPt.toLowerCase()],
      readings: [v.reading],
      level: v.level,
    })
  }

  // Shuffle
  return items.sort(() => Math.random() - 0.5)
}

// Helper functions
export function getRadicalById(id: string): Radical | undefined {
  return SAMPLE_RADICALS.find((r) => r.id === id)
}

export function getKanjiById(id: string): Kanji | undefined {
  return SAMPLE_KANJI.find((k) => k.id === id)
}

export function getVocabularyById(id: string): Vocabulary | undefined {
  return SAMPLE_VOCABULARY.find((v) => v.id === id)
}

export function getRadicalsByLevel(level: number): Radical[] {
  return SAMPLE_RADICALS.filter((r) => r.level === level)
}

export function getKanjiByLevel(level: number): Kanji[] {
  return SAMPLE_KANJI.filter((k) => k.level === level)
}

export function getVocabularyByLevel(level: number): Vocabulary[] {
  return SAMPLE_VOCABULARY.filter((v) => v.level === level)
}

// =============================================
// Lesson Items (Itens de Licao)
// =============================================
export interface LessonItem {
  id: string
  type: ReviewItemType
  character: string
  meaning: string
  meaningPt: string
  meaningAlternatives: string[]
  readings: string[] // empty for radicals
  level: number
  // Detailed info for the learning phase
  mnemonic: string
  mnemonicPt: string
  readingMnemonic?: string
  readingMnemonicPt?: string
  relatedItems: { character: string; label: string; labelPt: string; href: string }[]
}

// Generate a batch of 5 lesson items from available data
export function generateLessonBatch(): LessonItem[] {
  const items: LessonItem[] = []

  // Add radicals as lessons
  for (const r of SAMPLE_RADICALS) {
    const relatedKanji = r.foundInKanji
      .map((kid) => getKanjiById(kid))
      .filter(Boolean)

    items.push({
      id: r.id,
      type: "radical",
      character: r.character,
      meaning: r.name,
      meaningPt: r.namePt,
      meaningAlternatives: [r.name.toLowerCase(), r.namePt.toLowerCase()],
      readings: [],
      level: r.level,
      mnemonic: r.mnemonic,
      mnemonicPt: r.mnemonicPt,
      relatedItems: relatedKanji.map((k) => ({
        character: k!.character,
        label: k!.meaning,
        labelPt: k!.meaningPt,
        href: `/kanji/${k!.id}`,
      })),
    })
  }

  // Add kanji as lessons
  for (const k of SAMPLE_KANJI) {
    const radicals = k.radicalIds.map((rid) => getRadicalById(rid)).filter(Boolean)

    items.push({
      id: k.id,
      type: "kanji",
      character: k.character,
      meaning: k.meaning,
      meaningPt: k.meaningPt,
      meaningAlternatives: [k.meaning.toLowerCase(), k.meaningPt.toLowerCase(), ...k.alternatives.map((a) => a.toLowerCase())],
      readings: [...k.onyomi, ...k.kunyomi],
      level: k.level,
      mnemonic: k.meaningMnemonic,
      mnemonicPt: k.meaningMnemonicPt,
      readingMnemonic: k.readingMnemonic,
      readingMnemonicPt: k.readingMnemonicPt,
      relatedItems: radicals.map((r) => ({
        character: r!.character,
        label: r!.name,
        labelPt: r!.namePt,
        href: `/radicals/${r!.id}`,
      })),
    })
  }

  // Add vocabulary as lessons
  for (const v of SAMPLE_VOCABULARY) {
    const kanjiList = v.kanjiIds.map((kid) => getKanjiById(kid)).filter(Boolean)

    items.push({
      id: v.id,
      type: "vocabulary",
      character: v.word,
      meaning: v.meaning,
      meaningPt: v.meaningPt,
      meaningAlternatives: [v.meaning.toLowerCase(), v.meaningPt.toLowerCase()],
      readings: [v.reading],
      level: v.level,
      mnemonic: v.meaningExplanation,
      mnemonicPt: v.meaningExplanationPt,
      readingMnemonic: v.readingExplanation,
      readingMnemonicPt: v.readingExplanationPt,
      relatedItems: kanjiList.map((k) => ({
        character: k!.character,
        label: k!.meaning,
        labelPt: k!.meaningPt,
        href: `/kanji/${k!.id}`,
      })),
    })
  }

  // Shuffle and take 5
  return items.sort(() => Math.random() - 0.5).slice(0, 5)
}

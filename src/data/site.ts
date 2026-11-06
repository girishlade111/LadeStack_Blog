export const SITE_CONFIG = {
  name: 'LadeStack Blog',
  parentBrand: 'LadeStack',
  parentUrl: 'https://ladestack.in',
  origin: 'https://blog.ladestack.in',
  defaultLocale: 'en' as const,
  postsPerPage: 12,
  minIndexableTagPosts: 3,
  defaultOgImage: '/og-default.png',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  contactEmail: 'editorial@ladestack.in',
  githubRepo: 'https://github.com/girishlade111',
} as const;

export interface AuthorProfile {
  id: string;
  name: string;
  role: Record<string, string>;
  bio: Record<string, string>;
}

export const AUTHOR_REGISTRY: Record<string, AuthorProfile> = {
  'editor-main': {
    id: 'editor-main',
    name: 'Girish Lade',
    role: {
      en: 'Founding Editor & Systems Architect',
      ja: '創刊編集長・システムアーキテクト',
      ko: '창간 편집장 및 시스템 아키텍트',
      zh: '创刊主编兼系统架构师',
      ru: 'Главный редактор и системный архитектор',
      tr: 'Kurucu Editör ve Sistem Mimarı',
      fr: 'Rédacteur en chef fondateur & Architecte systèmes',
      pt: 'Editor Fundador e Arquiteto de Sistemas',
      es: 'Editor Fundador y Arquitecto de Sistemas',
    },
    bio: {
      en: 'Writes on static web engineering, technical SEO, distributed systems, and evidence-based research for LadeStack.',
      ja: 'LadeStackにて静的Webエンジニアリング、テクニカルSEO、分散システムに関する技術記事を執筆。',
      ko: 'LadeStack에서 정적 웹 엔지니어링, 기술 SEO 및 분산 시스템에 관한 글을 집필합니다.',
      zh: '撰写关于静态 Web 工程、技术 SEO、分布式系统与实证研究的技术专栏。',
      ru: 'Пишет о статической веб-разработке, техническом SEO, распределенных системах и прикладных исследованиях.',
      tr: 'Statik web mühendisliği, teknik SEO, dağıtık sistemler ve kanıta dayalı araştırmalar üzerine yazıyor.',
      fr: 'Écrit sur l’ingénierie web statique, le SEO technique, les systèmes distribués et la recherche appliquée.',
      pt: 'Escreve sobre engenharia web estática, SEO técnico, sistemas distribuídos e investigação aplicada.',
      es: 'Escribe sobre ingeniería web estática, SEO técnico, sistemas distribuidos e investigación aplicada.',
    },
  },
  'editorial-desk': {
    id: 'editorial-desk',
    name: 'LadeStack Editorial Desk',
    role: {
      en: 'Research & Verification Team',
      ja: 'リサーチ・検証チーム',
      ko: '리서치 및 검증 팀',
      zh: '研究与核查团队',
      ru: 'Отдел исследований и проверки фактов',
      tr: 'Araştırma ve Doğrulama Ekibi',
      fr: 'Équipe de recherche et vérification',
      pt: 'Equipa de Investigação e Verificação',
      es: 'Equipo de Investigación y Verificación',
    },
    bio: {
      en: 'Multilingual editorial desk responsible for primary source verification, science reporting, and cross-category synthesis.',
      ja: '一次資料の検証、科学報道、分野横断的な分析を担当する多言語編集部。',
      ko: '1차 자료 검증, 과학 보도 및 분야별 종합 분석을 담당하는 다국어 편집국입니다.',
      zh: '负责一手资料核查、科学报道与跨学科综合分析的多语言编辑部。',
      ru: 'Многоязычная редакция, отвечающая за проверку первоисточников, научную журналистику и аналитику.',
      tr: 'Birincil kaynak doğrulaması, bilim haberciliği ve disiplinlerarası analizden sorumlu çok dilli yayın kurulu.',
      fr: 'Rédaction multilingue chargée de la vérification des sources primaires, du journalisme scientifique et des synthèses.',
      pt: 'Redação multilingue responsável pela verificação de fontes primárias, jornalismo científico e síntese editorial.',
      es: 'Redacción multilingüe responsable de la verificación de fuentes primarias, periodismo científico y síntesis editorial.',
    },
  },
};

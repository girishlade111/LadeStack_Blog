import type { Locale } from './locales';

export const CATEGORY_IDS = [
  'autos-vehicles',
  'beauty-fashion',
  'business-finance',
  'climate',
  'entertainment',
  'food-drink',
  'games',
  'health',
  'hobbies-leisure',
  'jobs-education',
  'law-government',
  'other',
  'pets-animals',
  'politics',
  'science',
  'shopping',
  'sports',
  'technology',
  'travel-transportation',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface CategoryTranslation {
  label: string;
  description: string;
}

export interface CategoryDefinition {
  id: CategoryId;
  translations: Record<Locale, CategoryTranslation>;
}

export const CATEGORIES: Record<CategoryId, CategoryDefinition> = {
  'autos-vehicles': {
    id: 'autos-vehicles',
    translations: {
      en: { label: 'Autos and Vehicles', description: 'Cars, electric vehicles, automotive engineering, maintenance, and modern mobility.' },
      ja: { label: '自動車・乗り物', description: '自動車、電気自動車（EV）、車両技術、メンテナンス、次世代モビリティ。' },
      ko: { label: '자동차 및 차량', description: '자동차, 전기차(EV), 차량 엔지니어링, 정비 및 현대 모빌리티.' },
      zh: { label: '汽车与交通工具', description: '汽车、电动汽车、车辆工程、维护保养与现代出行技术。' },
      ru: { label: 'Автомобили и транспорт', description: 'Автомобили, электромобили, автотехнологии, обслуживание и мобильность.' },
      tr: { label: 'Otomobil ve Araçlar', description: 'Otomobiller, elektrikli araçlar, otomotiv teknolojisi, bakım ve mobilite.' },
      fr: { label: 'Auto et véhicules', description: 'Voitures, véhicules électriques, ingénierie automobile, entretien et mobilité.' },
      pt: { label: 'Automóveis e Veículos', description: 'Carros, veículos elétricos, engenharia automóvel, manutenção e mobilidade.' },
      es: { label: 'Autos y vehículos', description: 'Automóviles, vehículos eléctricos, ingeniería automotriz, mantenimiento y movilidad.' },
    },
  },
  'beauty-fashion': {
    id: 'beauty-fashion',
    translations: {
      en: { label: 'Beauty and Fashion', description: 'Apparel design, textile innovation, personal style, and cosmetic formulation.' },
      ja: { label: '美容・ファッション', description: 'アパレルデザイン、繊維技術、パーソナルスタイル、化粧品科学。' },
      ko: { label: '뷰티 및 패션', description: '의류 디자인, 섬유 혁신, 퍼스널 스타일 및 화장품 포뮬레이션.' },
      zh: { label: '美妆与时尚', description: '服装设计、纺织创新、个人风格与化妆品配方科学。' },
      ru: { label: 'Красота и мода', description: 'Дизайн одежды, текстильные инновации, личный стиль и косметология.' },
      tr: { label: 'Güzellik ve Moda', description: 'Giyim tasarımı, tekstil yenilikleri, kişisel stil ve kozmetik bilimi.' },
      fr: { label: 'Beauté et mode', description: 'Design vestimentaire, innovation textile, style personnel et cosmétique.' },
      pt: { label: 'Beleza e Moda', description: 'Design de vestuário, inovação têxtil, estilo pessoal e cosmética.' },
      es: { label: 'Belleza y moda', description: 'Diseño de indumentaria, innovación textil, estilo personal y cosmética.' },
    },
  },
  'business-finance': {
    id: 'business-finance',
    translations: {
      en: { label: 'Business and Finance', description: 'Markets, software economics, startups, capital allocation, and macroeconomic analysis.' },
      ja: { label: 'ビジネス・金融', description: '市場動向、ソフトウェア経済、スタートアップ、資本配分、マクロ経済分析。' },
      ko: { label: '비즈니스 및 금융', description: '시장 동향, 소프트웨어 경제학, 스타트업, 자본 배분 및 거시경제 분석.' },
      zh: { label: '商业与金融', description: '市场动态、软件经济学、初创企业、资本配置与宏观经济分析。' },
      ru: { label: 'Бизнес и финансы', description: 'Рынки, экономика ПО, стартапы, распределение капитала и макроэкономика.' },
      tr: { label: 'İş Dünyası ve Finans', description: 'Piyasalar, yazılım ekonomisi, girişimler, sermaye tahsisi ve makroekonomi.' },
      fr: { label: 'Économie et finance', description: 'Marchés, économie du logiciel, startups, allocation du capital et macroéconomie.' },
      pt: { label: 'Negócios e Finanças', description: 'Mercados, economia de software, startups, alocação de capital e macroeconomia.' },
      es: { label: 'Negocios y finanzas', description: 'Mercados, economía del software, startups, asignación de capital y macroeconomía.' },
    },
  },
  climate: {
    id: 'climate',
    translations: {
      en: { label: 'Climate', description: 'Climate science, grid decarbonization, environmental systems, and energy policy.' },
      ja: { label: '気候・環境', description: '気候科学、電力網の脱炭素化、環境システム、エネルギー政策。' },
      ko: { label: '기후', description: '기후 과학, 전력망 탈탄소화, 환경 시스템 및 에너지 정책.' },
      zh: { label: '气候与环境', description: '气候科学、电网脱碳、环境系统与能源政策研究。' },
      ru: { label: 'Климат', description: 'Климатология, декарбонизация энергосетей, экология и климатическая политика.' },
      tr: { label: 'İklim', description: 'İklim bilimi, şebeke karbonsuzlaştırma, çevre sistemleri ve enerji politikası.' },
      fr: { label: 'Climat', description: 'Science du climat, décarbonation des réseaux, environnement et politique énergétique.' },
      pt: { label: 'Clima', description: 'Ciência climática, descarbonização da rede, sistemas ambientais e política energética.' },
      es: { label: 'Clima', description: 'Ciencia climática, descarbonización eléctrica, medio ambiente y política energética.' },
    },
  },
  entertainment: {
    id: 'entertainment',
    translations: {
      en: { label: 'Entertainment', description: 'Film, music production, television, digital creators, and cultural criticism.' },
      ja: { label: 'エンターテインメント', description: '映画、音楽制作、テレビ、デジタルクリエイター、カルチャー批評。' },
      ko: { label: '엔터테인먼트', description: '영화, 음악 제작, 텔레비전, 디지털 크리에이터 및 문화 비평.' },
      zh: { label: '娱乐与文化', description: '电影、音乐制作、电视、数字创作者与流行文化评论。' },
      ru: { label: 'Развлечения', description: 'Кино, музыкальное производство, телевидение, авторы и культурная критика.' },
      tr: { label: 'Eğlence', description: 'Sinema, müzik prodüksiyonu, televizyon, dijital içerik üreticileri ve kültür.' },
      fr: { label: 'Divertissement', description: 'Cinéma, production musicale, télévision, créateurs numériques et critique culturelle.' },
      pt: { label: 'Entretenimento', description: 'Cinema, produção musical, televisão, criadores digitais e crítica cultural.' },
      es: { label: 'Entretenimiento', description: 'Cine, producción musical, televisión, creadores digitales y crítica cultural.' },
    },
  },
  'food-drink': {
    id: 'food-drink',
    translations: {
      en: { label: 'Food and Drink', description: 'Culinary science, food systems, fermentation, beverages, and hospitality.' },
      ja: { label: '食と飲料', description: '料理科学、フードシステム、発酵技術、飲料、ホスピタリティ。' },
      ko: { label: '음식 및 음료', description: '요리 과학, 식품 시스템, 발효, 음료 및 호스피탈리티.' },
      zh: { label: '饮食文化', description: '烹饪科学、食品体系、发酵工艺、饮品与餐饮文化。' },
      ru: { label: 'Еда и напитки', description: 'Кулинарная наука, пищевые системы, ферментация, напитки и гастрономия.' },
      tr: { label: 'Yeme ve İçme', description: 'Mutfak bilimi, gıda sistemleri, fermantasyon, içecekler ve gastronomi.' },
      fr: { label: 'Cuisine et boissons', description: 'Science culinaire, systèmes alimentaires, fermentation, boissons et gastronomie.' },
      pt: { label: 'Comida e Bebida', description: 'Ciência culinária, sistemas alimentares, fermentação, bebidas e gastronomia.' },
      es: { label: 'Comida y bebida', description: 'Ciencia culinaria, sistemas alimentarios, fermentación, bebidas y gastronomía.' },
    },
  },
  games: {
    id: 'games',
    translations: {
      en: { label: 'Games', description: 'Video games, real-time rendering, game design systems, and interactive media.' },
      ja: { label: 'ゲーム', description: 'ビデオゲーム、リアルタイムレンダリング、ゲームデザイン、インタラクティブメディア。' },
      ko: { label: '게임', description: '비디오 게임, 실시간 렌더링, 게임 디자인 시스템 및 인터랙티브 미디어.' },
      zh: { label: '游戏', description: '电子游戏、实时渲染技术、游戏系统设计与互动媒体。' },
      ru: { label: 'Игры', description: 'Видеоигры, рендеринг в реальном времени, геймдизайн и индустрия игр.' },
      tr: { label: 'Oyunlar', description: 'Video oyunları, gerçek zamanlı görüntüleme, oyun tasarımı ve oyun endüstrisi.' },
      fr: { label: 'Jeux vidéo', description: 'Jeux vidéo, rendu temps réel, conception de systèmes de jeu et médias interactifs.' },
      pt: { label: 'Jogos', description: 'Videojogos, renderização em tempo real, design de jogos e média interativa.' },
      es: { label: 'Juegos', description: 'Videojuegos, renderizado en tiempo real, diseño de sistemas de juego e industria.' },
    },
  },
  health: {
    id: 'health',
    translations: {
      en: { label: 'Health', description: 'Clinical research, public health, longevity science, sleep, and evidence-based wellness.' },
      ja: { label: '健康・医療', description: '臨床研究、公衆衛生、予防医学、睡眠科学、エビデンスに基づくウェルネス。' },
      ko: { label: '건강', description: '임상 연구, 공중 보건, 수명 과학, 수면 및 근거 중심 웰니스.' },
      zh: { label: '健康与医疗', description: '临床研究、公共卫生、睡眠科学与循证健康管理。' },
      ru: { label: 'Здоровье', description: 'Клинические исследования, общественное здоровье, сон и доказательная медицина.' },
      tr: { label: 'Sağlık', description: 'Klinik araştırmalar, halk sağlığı, uyku bilimi ve kanıta dayalı sağlıklı yaşam.' },
      fr: { label: 'Santé', description: 'Recherche clinique, santé publique, science du sommeil et bien-être fondé sur les preuves.' },
      pt: { label: 'Saúde', description: 'Investigação clínica, saúde pública, ciência do sono e bem-estar baseado em evidências.' },
      es: { label: 'Salud', description: 'Investigación clínica, salud pública, ciencia del sueño y bienestar basado en evidencia.' },
    },
  },
  'hobbies-leisure': {
    id: 'hobbies-leisure',
    translations: {
      en: { label: 'Hobbies and Leisure', description: 'Analogue crafts, photography, mechanical watches, woodworking, and recreational pursuits.' },
      ja: { label: '趣味・レジャー', description: 'クラフト、写真、機械式時計、木工、知的なレクリエーション。' },
      ko: { label: '취미 및 여가', description: '공예, 사진, 기계식 시계, 목공 및 여가 활동.' },
      zh: { label: '爱好与休闲', description: '手工技艺、摄影、机械钟表、木工与日常休闲志趣。' },
      ru: { label: 'Хобби и досуг', description: 'Ремесла, фотография, механические часы, столярное дело и активный отдых.' },
      tr: { label: 'Hobi ve Boş Zaman', description: 'El sanatları, fotoğrafçılık, mekanik saatler, ahşap işçiliği ve dinlence.' },
      fr: { label: 'Loisirs et passions', description: 'Artisanat, photographie, horlogerie mécanique, menuiserie et activités récréatives.' },
      pt: { label: 'Passatempos e Lazer', description: 'Artesanato, fotografia, relojoaria mecânica, marcenaria e atividades recreativas.' },
      es: { label: 'Pasatiempos y ocio', description: 'Artesanía, fotografía, relojería mecánica, carpintería y actividades recreativas.' },
    },
  },
  'jobs-education': {
    id: 'jobs-education',
    translations: {
      en: { label: 'Jobs and Education', description: 'Engineering careers, technical pedagogy, higher education, and workplace skills.' },
      ja: { label: 'キャリア・教育', description: 'エンジニアリングキャリア、技術教育、高等教育、専門スキル開発。' },
      ko: { label: '채용 및 교육', description: '엔지니어링 커리어, 기술 교육학, 고등 교육 및 직무 역량.' },
      zh: { label: '职业与教育', description: '工程职业发展、技术教学法、高等教育与职场核心技能。' },
      ru: { label: 'Работа и образование', description: 'Инженерная карьера, техническое образование, университеты и профессиональные навыки.' },
      tr: { label: 'İş ve Eğitim', description: 'Mühendislik kariyeri, teknik pedagoji, yükseköğretim ve iş yeri becerileri.' },
      fr: { label: 'Emploi et éducation', description: 'Carrières d’ingénieur, pédagogie technique, enseignement supérieur et compétences.' },
      pt: { label: 'Emprego e Educação', description: 'Carreiras técnicas, pedagogia, ensino superior e competências profissionais.' },
      es: { label: 'Empleo y educación', description: 'Carreras de ingeniería, pedagogía técnica, educación superior y habilidades laborales.' },
    },
  },
  'law-government': {
    id: 'law-government',
    translations: {
      en: { label: 'Law and Government', description: 'Digital regulation, antitrust, intellectual property, and civic administration.' },
      ja: { label: '法律・行政', description: 'デジタル規制、独占禁止法、知的財産権、公共ガバナンス。' },
      ko: { label: '법률 및 정부', description: '디지털 규제, 반독점법, 지식재산권 및 공공 행정.' },
      zh: { label: '法律与公共治理', description: '数字监管、反垄断、知识产权与公共行政制度。' },
      ru: { label: 'Право и государство', description: 'Цифровое регулирование, антимонопольное право, интеллектуальная собственность и госуправление.' },
      tr: { label: 'Hukuk ve Devlet', description: 'Dijital düzenlemeler, rekabet hukuku, fikri mülkiyet ve kamu yönetimi.' },
      fr: { label: 'Droit et institutions', description: 'Régulation numérique, droit de la concurrence, propriété intellectuelle et administration.' },
      pt: { label: 'Direito e Governo', description: 'Regulação digital, concorrência, propriedade intelectual e administração pública.' },
      es: { label: 'Derecho y gobierno', description: 'Regulación digital, defensa de la competencia, propiedad intelectual y administración pública.' },
    },
  },
  other: {
    id: 'other',
    translations: {
      en: { label: 'Other', description: 'Interdisciplinary essays and cross-domain notes that bridge multiple fields.' },
      ja: { label: 'その他', description: '複数の領域にまたがる学際的なエッセイおよびノート。' },
      ko: { label: '기타', description: '여러 분야를 아우르는 학제간 에세이 및 노트.' },
      zh: { label: '其他', description: '跨越多个学科领域的综合随笔与研究札记。' },
      ru: { label: 'Другое', description: 'Междисциплинарные эссе и заметки на стыке различных областей.' },
      tr: { label: 'Diğer', description: 'Birden fazla alanı birleştiren disiplinlerarası denemeler ve notlar.' },
      fr: { label: 'Autres', description: 'Essais interdisciplinaires et notes transversales à la croisée de plusieurs domaines.' },
      pt: { label: 'Outros', description: 'Ensaios interdisciplinares e notas transversais entre múltiplos domínios.' },
      es: { label: 'Otros', description: 'Ensayos interdisciplinarios y notas transversales entre múltiples campos.' },
    },
  },
  'pets-animals': {
    id: 'pets-animals',
    translations: {
      en: { label: 'Pets and Animals', description: 'Companion animal care, ethology, wildlife conservation, and veterinary science.' },
      ja: { label: 'ペット・動物', description: '伴侶動物のケア、動物行動学、野生生物保全、獣医学。' },
      ko: { label: '반려동물 및 동물', description: '반려동물 케어, 동물행동학, 야생동물 보전 및 수의학.' },
      zh: { label: '宠物与动物', description: '伴侣动物护理、动物行为学、野生动物保护与兽医学。' },
      ru: { label: 'Домашние и дикие животные', description: 'Уход за питомцами, этология, охрана дикой природы и ветеринария.' },
      tr: { label: 'Evcil Hayvanlar ve Doğa', description: 'Evcil hayvan bakımı, etoloji, yaban hayatı koruma ve veterinerlik bilimi.' },
      fr: { label: 'Animaux et nature', description: 'Soins aux animaux, éthologie, conservation de la faune et sciences vétérinaires.' },
      pt: { label: 'Animais e Natureza', description: 'Cuidado animal, etologia, conservação da vida selvagem e ciências veterinárias.' },
      es: { label: 'Mascotas y animales', description: 'Cuidado animal, etología, conservación de la fauna y ciencias veterinarias.' },
    },
  },
  politics: {
    id: 'politics',
    translations: {
      en: { label: 'Politics', description: 'Electoral systems, geopolitical strategy, legislative debates, and policy analysis.' },
      ja: { label: '政治', description: '選挙制度、地政学、立法議論、公共政策の分析。' },
      ko: { label: '정치', description: '선거 제도, 지정학적 전략, 입법 논의 및 정책 분석.' },
      zh: { label: '政治与国际关系', description: '选举制度、地缘战略、立法辩论与公共政策分析。' },
      ru: { label: 'Политика', description: 'Избирательные системы, геополитика, законодательные дебаты и анализ политики.' },
      tr: { label: 'Siyaset', description: 'Seçim sistemleri, jeopolitik strateji, yasama tartışmaları ve politika analizi.' },
      fr: { label: 'Politique', description: 'Systèmes électoraux, géopolitique, débats législatifs et analyse des politiques publiques.' },
      pt: { label: 'Política', description: 'Sistemas eleitorais, geopolítica, debates legislativos e análise de políticas públicas.' },
      es: { label: 'Política', description: 'Sistemas electorales, geopolítica, debates legislativos y análisis de políticas públicas.' },
    },
  },
  science: {
    id: 'science',
    translations: {
      en: { label: 'Science', description: 'Physics, molecular biology, space exploration, materials science, and scientific method.' },
      ja: { label: '科学', description: '物理学、分子生物学、宇宙探査、材料科学、科学的メソドロジー。' },
      ko: { label: '과학', description: '물리학, 분자생물학, 우주 탐사, 재료 과학 및 과학적 방법론.' },
      zh: { label: '科学', description: '物理学、分子生物学、太空探索、材料科学与科学方法论。' },
      ru: { label: 'Наука', description: 'Физика, молекулярная биология, космос, материаловедение и научный метод.' },
      tr: { label: 'Bilim', description: 'Fizik, moleküler biyoloji, uzay araştırmaları, malzeme bilimi ve bilimsel yöntem.' },
      fr: { label: 'Science', description: 'Physique, biologie moléculaire, exploration spatiale, matériaux et méthode scientifique.' },
      pt: { label: 'Ciência', description: 'Física, biologia molecular, exploração espacial, ciência dos materiais e método científico.' },
      es: { label: 'Ciencia', description: 'Física, biología molecular, exploración espacial, ciencia de materiales y método científico.' },
    },
  },
  shopping: {
    id: 'shopping',
    translations: {
      en: { label: 'Shopping', description: 'Consumer hardware evaluations, supply-chain transparency, durability testing, and buying guides.' },
      ja: { label: 'ショッピング・製品評価', description: 'コンシューマー製品の耐久性検証、サプライチェーン、実用的な購入ガイド。' },
      ko: { label: '쇼핑 및 제품 가이드', description: '소비자 하드웨어 평가, 공급망 투명성, 내구성 테스트 및 구매 가이드.' },
      zh: { label: '消费与评测', description: '消费硬件评测、供应链透明度、耐用性测试与理性选购指南。' },
      ru: { label: 'Покупки и обзоры', description: 'Обзоры потребительских товаров, проверка долговечности и руководства по выбору.' },
      tr: { label: 'Alışveriş ve Rehberler', description: 'Tüketici donanımı değerlendirmeleri, dayanıklılık testleri ve satın alma rehberleri.' },
      fr: { label: 'Guides d’achat', description: 'Tests de durabilité, analyse des produits grand public et guides d’achat raisonnés.' },
      pt: { label: 'Compras e Avaliações', description: 'Testes de durabilidade, avaliação de produtos de consumo e guias de compra.' },
      es: { label: 'Compras y guías', description: 'Evaluación de productos de consumo, pruebas de durabilidad y guías de compra.' },
    },
  },
  sports: {
    id: 'sports',
    translations: {
      en: { label: 'Sports', description: 'Athletic performance analytics, biomechanics, endurance training, and competition coverage.' },
      ja: { label: 'スポーツ', description: 'パフォーマンス分析、バイオメカニクス、持久力トレーニング、競技解説。' },
      ko: { label: '스포츠', description: '스포츠 퍼포먼스 분석, 생체역학, 지구력 훈련 및 경기 분석.' },
      zh: { label: '体育与运动科学', description: '运动表现分析、生物力学、耐力训练与赛事深度解析。' },
      ru: { label: 'Спорт', description: 'Спортивная аналитика, биомеханика, тренировки на выносливость и обзоры соревнований.' },
      tr: { label: 'Spor', description: 'Atletik performans analitiği, biyomekanik, dayanıklılık antrenmanı ve müsabaka analizi.' },
      fr: { label: 'Sport', description: 'Analyse de la performance sportive, biomécanique, entraînement d’endurance et compétitions.' },
      pt: { label: 'Desporto', description: 'Análise de desempenho desportivo, biomecânica, treino de resistência e competições.' },
      es: { label: 'Deportes', description: 'Analítica del rendimiento deportivo, biomecánica, entrenamiento de resistencia y competición.' },
    },
  },
  technology: {
    id: 'technology',
    translations: {
      en: { label: 'Technology', description: 'Web architecture, static publishing, developer tooling, AI systems, and information security.' },
      ja: { label: 'テクノロジー', description: 'Webアーキテクチャ、静的サイト生成、開発者ツール、AIシステム、情報セキュリティ。' },
      ko: { label: '기술', description: '웹 아키텍처, 정적 퍼블리싱, 개발자 도구, AI 시스템 및 정보 보안.' },
      zh: { label: '技术', description: 'Web 架构、静态出版工程、开发者工具、AI 系统与信息安全。' },
      ru: { label: 'Технологии', description: 'Веб-архитектура, статическая генерация, инструменты разработки, ИИ и безопасность.' },
      tr: { label: 'Teknoloji', description: 'Web mimarisi, statik yayıncılık, geliştirici araçları, yapay zeka ve bilgi güvenliği.' },
      fr: { label: 'Technologie', description: 'Architecture web, publication statique, outils de développement, systèmes d’IA et sécurité.' },
      pt: { label: 'Tecnologia', description: 'Arquitetura web, publicação estática, ferramentas de programação, IA e segurança.' },
      es: { label: 'Tecnología', description: 'Arquitectura web, publicación estática, herramientas de desarrollo, IA y seguridad.' },
    },
  },
  'travel-transportation': {
    id: 'travel-transportation',
    translations: {
      en: { label: 'Travel and Transportation', description: 'High-speed rail, urban transit networks, aviation logistics, and regional field notes.' },
      ja: { label: '旅行・交通インフラ', description: '高速鉄道、都市交通ネットワーク、航空ロジスティクス、各地のフィールドノート。' },
      ko: { label: '여행 및 교통', description: '고속철도, 도시 대중교통 네트워크, 항공 물류 및 지역 필드 노트.' },
      zh: { label: '旅行与交通网络', description: '高速铁路、城市公共交通网络、航空物流与地域田野笔记。' },
      ru: { label: 'Путешествия и транспорт', description: 'Высокоскоростные железные дороги, городской транспорт, логистика и путевые заметки.' },
      tr: { label: 'Seyahat ve Ulaşım', description: 'Yüksek hızlı trenler, kentsel ulaşım ağları, havacılık lojistiği ve gezi notları.' },
      fr: { label: 'Voyage et transports', description: 'Train à grande vitesse, réseaux de transport urbain, logistique aérienne et carnets de terrain.' },
      pt: { label: 'Viagens e Transportes', description: 'Alta velocidade ferroviária, redes de transporte urbano, logística e notas de campo.' },
      es: { label: 'Viajes y transporte', description: 'Ferrocarriles de alta velocidad, transporte urbano, logística aérea y crónicas de viaje.' },
    },
  },
};

export function isValidCategoryId(value: unknown): value is CategoryId {
  return (
    typeof value === 'string' &&
    (CATEGORY_IDS as readonly string[]).includes(value)
  );
}

export function getCategoryMeta(id: CategoryId, locale: Locale): CategoryTranslation {
  return CATEGORIES[id]?.translations[locale] ?? CATEGORIES[id]?.translations.en;
}

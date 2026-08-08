/**
 * Portfolio Data Configuration
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Alex Ray",
    japaneseName: "アレックス レイ",
    role: "Full-Stack Engineer & Creative Developer",
    status: "🟢 新規プロジェクト・フリーランス案件 受付中",
    location: "Tokyo, Japan",
    bio: "モダンなWeb技術と直感的なUI/UXデザインを融合させ、ユーザーを魅了する次世代のデジタル体験を構築するフルスタックエンジニアです。フロントエンドの美しい表現からバックエンドの堅牢な設計、AIインテグレーションまで幅広く手掛けています。",
    stats: [
      { label: "実務経験年数", value: "5+", suffix: "年" },
      { label: "完了プロジェクト", value: "35+", suffix: "件" },
      { label: "顧客満足度", value: "99.4", suffix: "%" },
      { label: "OSS貢献・コード数", value: "1.2k", suffix: "+" }
    ],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "alex.ray.dev@example.com"
    }
  },

  skills: [
    {
      id: "fe-1",
      name: "React / Next.js",
      category: "frontend",
      level: 95,
      icon: "⚛️",
      description: "App Router, SSR/SSG, Server Actionsを活用した高速でSEOに強いWebアプリケーション開発",
      tags: ["React 18", "Next.js 14", "TypeScript", "Tailwind"]
    },
    {
      id: "fe-2",
      name: "TypeScript & Modern JS",
      category: "frontend",
      level: 92,
      icon: "📘",
      description: "厳格な型定義とモジュール設計による、保守性の高い大規模コードベースの構築",
      tags: ["ESNext", "Type System", "Generics", "Async Programming"]
    },
    {
      id: "fe-3",
      name: "HTML5 / Vanilla CSS",
      category: "frontend",
      level: 95,
      icon: "🎨",
      description: "CSS Grid, Flexbox, Animation, Custom Properties, Glassmorphismを用いたピクセルパーフェクトな実装",
      tags: ["CSS Architecture", "Animations", "Responsive", "Glassmorphism"]
    },
    {
      id: "fe-4",
      name: "Three.js / WebGL",
      category: "frontend",
      level: 80,
      icon: "🔮",
      description: "ブラウザ上でのリッチな3Dグラフィックス、パーティクルエフェクト、リッチインタラクションの構築",
      tags: ["Three.js", "GLSL Shaders", "Canvas", "3D Modeling"]
    },
    {
      id: "be-1",
      name: "Node.js & Express",
      category: "backend",
      level: 88,
      icon: "🟢",
      description: "RESTful API, WebSocketリアルタイム通信, マイクロサービスアーキテクチャの実装",
      tags: ["Node.js", "Express", "WebSocket", "JWT Auth"]
    },
    {
      id: "be-2",
      name: "Python & FastAPI",
      category: "backend",
      level: 85,
      icon: "🐍",
      description: "高性能なAsync API、データ処理パイプライン、AI/LLMモデル統合バックエンドの開発",
      tags: ["Python 3.11", "FastAPI", "AsyncIO", "Pydantic"]
    },
    {
      id: "be-3",
      name: "PostgreSQL & Prisma",
      category: "backend",
      level: 86,
      icon: "🐘",
      description: "効率的なデータベース設計、クエリ最適化、ORMを用いたタイプセーフなデータ操作",
      tags: ["PostgreSQL", "Prisma", "Redis", "Supabase"]
    },
    {
      id: "ai-1",
      name: "AI / LLM Integration",
      category: "ai",
      level: 87,
      icon: "🤖",
      description: "OpenAI API, LangChain, RAG (検索拡張世代), ベクトルデータベースを活用したスマート機能の実装",
      tags: ["OpenAI API", "Vector DB", "RAG", "Prompt Engineering"]
    },
    {
      id: "dev-1",
      name: "Docker & Cloud Platforms",
      category: "devops",
      level: 82,
      icon: "🐳",
      description: "コンテナ化、CI/CDパイプライン自動化、Vercel/AWSへのスケーラブルなデプロイ環境構築",
      tags: ["Docker", "GitHub Actions", "Vercel", "AWS S3/Lambda"]
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Neuralize AI - 次世代AIアナリティクスダッシュボード",
      category: "ai",
      categoryName: "AI / Web App",
      image: "assets/images/project-1.jpg",
      summary: "リアルタイムなデータスループットとAIモデルのパフォーマンスを監視・分析できる近未来型Webダッシュボード。",
      description: "大規模な時系列データとAIモデルの推論アクティビティを数ミリ秒単位でビジュアル表示する高パフォーマンスダッシュボード。ネオンカラーのUIとリッチなチャートアニメーションを採用し、オペレーターの直感的な意思決定をサポートします。",
      tags: ["React", "TypeScript", "Three.js", "FastAPI", "Tailwind CSS", "Chart.js"],
      features: [
        "リアルタイムデータストリーミング (WebSocket)",
        "ダークモード標準対応＆ネオンテーマ切り替え",
        "インタラクティブな3Dデータ視覚化ノード",
        "マルチモデル比較アナリティクス機能"
      ],
      githubUrl: "https://github.com",
      demoUrl: "https://example.com"
    },
    {
      id: "proj-2",
      title: "GlowMarket - ラグジュアリーモバイルECアプリ",
      category: "mobile",
      categoryName: "Mobile / E-Commerce",
      image: "assets/images/project-2.jpg",
      summary: "洗練されたマイクロアニメーションとシームレスな購買体験を実現したクロスプラットフォームECアプリ。",
      description: "スマートな検索フィルター、AR試着プレビュー機能、スムーズな決済フローを備えたモダンなショッピングアプリ。UXの快適性を追求し、表示スピードと操作性の高さを実現しました。",
      tags: ["React Native", "Expo", "GraphQL", "Node.js", "Stripe API"],
      features: [
        "ハプティックフィードバック付き直感的UI",
        "スムーズなカードアニメーション & ジェスチャー操作",
        "ワンタップ高速決済インテグレーション",
        "AIパーソナライズ商品レコメンドエンジン"
      ],
      githubUrl: "https://github.com",
      demoUrl: "https://example.com"
    },
    {
      id: "proj-3",
      title: "Aetherius - 3DクリエイティブWebスタジオ",
      category: "creative",
      categoryName: "3D & Creative",
      image: "assets/images/project-3.jpg",
      summary: "3Dインタラクションと表現力の高いデザインシステムを融合させた次世代クリエイティブWeb体験。",
      description: "WebGLとThree.jsを駆動し、ブラウザ上で滑らかに動く3Dオブジェクトとインタラクティブなパーティクルエフェクトを実現。訪問者のスクロールやマウスの動きに応じて動的に表情を変えるイマーシブなサイトデザインです。",
      tags: ["HTML5", "Vanilla CSS", "Three.js", "GLSL Shaders", "GSAP"],
      features: [
        "マウストラッキング3Dオブジェクト・ティルト",
        "スクロール連動型パーティクル・トランジション",
        "完全レスポンシブWebモジュール",
        "アクセシビリティを配慮したフォールバックデザイン"
      ],
      githubUrl: "https://github.com",
      demoUrl: "https://example.com"
    }
  ],

  experiences: [
    {
      period: "2023年 - 現在",
      role: "シニア フルスタックエンジニア / Creative Lead",
      company: "Apex Digital Solutions Inc.",
      description: "AI駆動プロダクトのフロントエンドアーキテクチャの設計およびデザインシステムの構築を担当。パフォーマンス最適化によりページの読み込み速度を55%向上させました。"
    },
    {
      period: "2021年 - 2023年",
      role: "フロントエンド開発エンジニア",
      company: "NextWave Tech Space",
      description: "React / Next.jsを用いたSaaSプラットフォームのフロントエンド新規立ち上げを主導。チーム全体のコンポーネントライブラリ標準化を推進。"
    },
    {
      period: "2019年 - 2021年",
      role: "Webディベロッパー & UIデザイナー",
      company: "Studio Pixel Craft",
      description: "企業のプロモーションWebサイトやブランドアイデンティティのデザイン・実装を手掛け、多数のWebデザインアワードを獲得。"
    }
  ]
};

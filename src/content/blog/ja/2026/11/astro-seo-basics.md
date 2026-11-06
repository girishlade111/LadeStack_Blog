---
articleId: story-2026-001
translationKey: astro-seo-basics
lang: ja
slug: astro-seo-basics
title: "Astro SEO設計論：相互参照hreflangと大規模静的インデックスの実践"
description: "Astroを用いた多言語静的パブリケーションにおいて、厳密な正規URL、相互参照hreflangグラフ、ビルド時スキーマ検証を実装するための技術解説。"
summary: "単一リポジトリによる静的サイト生成が、重複ロケールURLや未翻訳スタブの混入を防ぎ、9言語すべてで高速な初期表示を維持する仕組みを解説します。"
category: technology
tags: [astro, seo, web-development, static-publishing, i18n]
authorId: editor-main
status: published
publishedAt: 2026-11-01T11:00:00Z
updatedAt: 2026-11-04T15:00:00Z
reviewedAt: 2026-11-04T15:00:00Z
originalLang: en
featured: true
noindex: false
coverImage: /images/covers/astro-seo-architecture.svg
coverAlt: "Astro静的ビルドパイプライン、相互参照hreflangグラフ、Pagefindインデックスを示すアーキテクチャ図"
coverCredit: "LadeStack Systems Architecture Desk"
sources:
  - label: "Google 検索セントラル — ページのローカライズ版"
    url: "https://developers.google.com/search/docs/specialty/international/localized-versions"
  - label: "Astro ドキュメント — Content Collections"
    url: "https://docs.astro.build/en/guides/content-collections/"
---

単一のGitHubリポジトリから9言語のメディアを運用する場合、検索エンジン向けのメタデータは後付けの設定ではなく、ビルド時に厳密に検証される決定論的な成果物として扱う必要があります。記事数が数千件規模に拡大すると、末尾スラッシュの不統一や未公開ドラフトへの誤リンクがクロールバジェットの浪費につながります。

本稿では、**LadeStack Blog**が採用している静的HTML生成、相互参照`hreflang`グラフ、およびスキーマ検証ゲートの設計原則を解説します。

## 正規URL（Canonical）の厳格な管理

インデックス対象のすべてのページは、自身の絶対URLを指す単一の`<link rel="canonical">`を持たなければなりません。多言語サイトで頻発する誤りは、日本語やフランス語の翻訳ページのcanonicalを英語の元記事へ向けてしまうことです。これを行うと検索エンジンは翻訳ページを重複とみなし、インデックスから除外してしまいます。

### ルート英語URLとロケールプレフィックスの分離

当サイトのルーティング規約では、デフォルト言語である英語はプレフィックスなしのルートパス（`/posts/{slug}/`）を使用し、日本語を含む他の8言語は明示的なロケールプレフィックス（`/ja/posts/{slug}/`）配下に配置されます。

| ルート種別 | 英語（デフォルト） | 日本語 (`/ja/`) | フランス語 (`/fr/`) |
| :--- | :--- | :--- | :--- |
| ホーム | `/` | `/ja/` | `/fr/` |
| 記事詳細 | `/posts/astro-seo-basics/` | `/ja/posts/astro-seo-basics/` | `/fr/posts/guide-seo-astro/` |
| カテゴリー | `/category/technology/` | `/ja/category/technology/` | `/fr/category/technology/` |

### 末尾スラッシュの統一

すべてのHTMLルートで末尾スラッシュ（Trailing Slash）を統一することで、静的CDN上での不要なリダイレクトを防ぎます。URL生成ロジックは単一のヘルパー関数に集約されています。

## 相互参照hreflangの自動解決

`rel="alternate" hreflang="..."`は、翻訳グループ内のすべての公開ページが互いを対称に参照している場合にのみ有効に機能します。

### translationKeyによるグループ結合

各Markdownファイルは共通の`translationKey`（本記事では`astro-seo-basics`）を保持します。ビルド時に`status: published`かつ`noindex: false`の記事のみを抽出し、実際に公開されている言語バリアントだけを`hreflang`タグおよび言語スイッチャーに出力します。

### 未公開ドラフトの完全除外

レビュー中（`status: review`）や下書き（`status: draft`）の翻訳ファイルは、本番ビルドのルート生成・サイトマップ・検索インデックスから自動的に除外されます。

## 目次（TOC）の自動生成と言語別検索

記事本文のMarkdown見出し（H2およびH3）から一意のIDを生成し、デスクトップ右側の固定目次とモバイルの折りたたみ目次に同一の構造を渡します。また、検索インデックスは`<html lang="ja">`単位で分離されるため、日本語での検索時には日本語の公開記事とセクション見出しのみが正確にヒットします。

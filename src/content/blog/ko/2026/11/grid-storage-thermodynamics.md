---
articleId: story-2026-002
translationKey: grid-storage-thermodynamics
lang: ko
slug: grid-storage-thermodynamics
title: "장주기 그리드 에너지 저장의 열역학: 양수 발전, 압축 공기 및 내화 열블록 비교"
description: "재생 에너지 전력망을 위한 기계적, 전기화학적, 내화 열 에너지 저장 시스템의 비교 물리학과 왕복 효율 경계."
summary: "4시간 규모의 리튬인산철(LFP) 배터리가 일일 주파수 조정에 탁월한 반면, 다일(Multi-day) 산업 탈탄소화는 열역학적 열저장소와 양수 발전에 의존하는 이유."
category: science
tags: [energy-systems, thermodynamics, physics, grid-storage]
authorId: editorial-desk
status: published
publishedAt: 2026-11-02T13:00:00Z
updatedAt: 2026-11-05T09:30:00Z
reviewedAt: 2026-11-05T09:30:00Z
originalLang: en
featured: true
noindex: false
coverImage: /images/covers/grid-storage-thermodynamics.svg
coverAlt: "양수 발전, 압축 공기 및 내화 벽돌 그리드 저장의 열역학 사이클 효율 비교 차트"
coverCredit: "LadeStack Science & Energy Desk"
sources:
  - label: "NREL — 유틸리티 규모 에너지 저장 연간 기술 기준선 (ATB)"
    url: "https://atb.nrel.gov/"
  - label: "IEA — 그리드 규모 에너지 저장 시스템 성능 검토"
    url: "https://www.iea.org/energy-system/electricity/grid-scale-storage"
---

4시간 동안 이어지는 저녁 전력 수요 피크의 균형을 맞추는 것과, 겨울철 72시간 동안 지속되는 무풍 구간을 연결하는 것은 근본적으로 다른 문제입니다. 리튬인산철(LFP) 배터리 설비는 86% 이상의 왕복 효율로 일내 부하 이동을 주도하고 있지만, 그 자본 비용은 저장 지속 시간에 비례하여 선형적으로 증가합니다.

마케팅 과장 없이 다일(Multi-day) 에너지 저장을 평가하려면, 엔지니어는 **전력-대-전력(electricity-to-electricity)** 사이클과 **전력-대-산업열(electricity-to-industrial-heat)** 경로를 명확히 분리해야 합니다.

## 왕복 효율의 경계 조건

전기에너지, 기계적 위치에너지, 열에너지 사이의 모든 변환은 열역학 제2법칙이 지배하는 엔트ро피 비용을 지불합니다.

| 저장 아키텍처 | 주요 매체 | 일반적인 지속 시간 | 왕복 효율 |
| :--- | :--- | :--- | :--- |
| 리튬인산철 배터리 (LFP) | 전기화학 셀 | 2 ~ 6시간 | 86% – 89% |
| 양수 발전 (PHS) | 상하부 저수지 | 8 ~ 24시간 이상 | 78% – 82% |
| 단열 압축 공기 저장 (A-CAES) | 지하 암반 동굴 + 축열조 | 8 ~ 24시간 | 64% – 70% |
| 내화 열저장 블록 | 고밀도 알루미나/탄소 블록 | 10 ~ 60시간 | 90% 이상 (공정열 활용 시) |

### 열-전력 재변환에서의 카르노 한계

저항 가열기로 내화 벽돌을 1,500°C까지 가열할 때 전기에너지는 거의 99% 효율로 열로 변환됩니다. 이 열을 시멘트 소성로, 철강 재가열로 또는 화학 반응기에 직접 공급하면 시스템 손실은 단열 누설(일반적으로 일일 1~2%)로 제한됩니다. 그러나 저장된 열에너지를 증기 터빈이나 브레이턴 터빈을 통해 다시 계통 전력으로 변환하는 순간 카르노 사이클 한계가 즉시 적용되어, 전기 왕복 효율은 40~52%로 떨어집니다.

## 기계적 저장과 지질학적 제약

양수 발전(PHS)이 여전히 전 세계 장주기 에너지 저장 용량의 90% 이상을 차지하는 이유는, 가역 프란시스 수차를 통해 액체 상태의 물을 이동시키는 방식이 상변화 및 열압축 손실을 피할 수 있기 때문입니다.

### 압축 공기에서의 단열 열 회수

공기를 70 bar까지 압축하면 기체 온도가 500°C 이상으로 상승합니다. 1세대 비단열(디아바틱) 발전소는 그 열을 대기 중으로 방출하고, 팽창 시 터빈 결빙을 막기 위해 천연가스를 연소시켰습니다. 현대의 단열 압축 공기 저장 발전소(A-CAES)는 압축열을 충전층 암석이나 용융염 탱크에 포집한 뒤 방전 시 팽창하는 공기 흐름에 다시 공급함으로써 높은 효율을 달성합니다.

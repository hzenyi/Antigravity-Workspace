# 影音字幕與逐字稿專業潤飾翻譯模型 (Utb Translation & Polish Model)

本文件定義本專案對於外部影音字幕（尤其是技術/電子/程式設計教學）的翻譯與潤飾標準模型（簡稱 **Utb 模型**）。

---

## 1. 核心精神 (Philosophy)

1. **拒絕機械式字對字直譯 (No Literal Word-by-Word Translation)**：
   - 語音辨識（ASR）經常因為講者的口音、收音品質產生大量諧音錯字（如將 `Circuit` 辨識為 `suck it`，將 `EasyEDA` 辨識為 `easy ideeën`，將 `ATmega328P` 辨識為 `80 mega 328`）。
   - 翻譯者必須以**電子工程師與資訊科專業教師**的本職學能，還原講者真實的電路與技術語意。

2. **保留原始對照 (Bilingual Integrity)**：
   - 每一時間戳記段落下，完整保留原文（使用引用區塊 `> 💬 原文：...`），方便讀者隨時回溯原片發音或核對專有名詞。

3. **結構化與教學化潤飾 (Instructional & Pedagogical Enhancement)**：
   - 遇到關鍵心法、黃金法則或工程考量時，使用清楚的結構化標記（如：`【元件佈局關鍵心法】`、`【硬體工程四維度考量】`、`【走線黃金法則】`）。
   - 適度運用條列式清單（Bullet Points）輔助閱讀，使逐字稿直接具備教材或筆記等級的可讀性。

4. **台灣標準工程與教育術語 (Standard Terminology)**：
   - 嚴格遵守台灣業界與教育部課綱常用術語：
     - *Schematic* ➔ 原理圖
     - *PCB Layout* ➔ PCB 佈線 / 板級設計
     - *Net Port / Net Label* ➔ 網路標籤
     - *Footprint / Package* ➔ PCB 封裝
     - *Symbol* ➔ 原理圖符號
     - *Track / Trace* ➔ 走線 / 導線
     - *Via* ➔ 過孔 / 貫孔
     - *Copper Pour / Ground Plane* ➔ 鋪銅 / 接地銅箔
     - *DRC* ➔ 設計規則檢查 (Design Rule Check)
     - *Gerber File* ➔ Gerber 製造檔案
     - *Pick-and-place Machine* ➔ 自動打件機
     - *SMD / SMT* ➔ 表面黏著元件 / 表面貼片技術
     - *Bare-metal* ➔ 裸機開發

---

## 2. 標準輸出格式 (Standard Markdown Format)

```markdown
**[mm:ss]**
【核心模組或重點標籤（若適用）】
流暢、精確且具教學價值的繁體中文翻譯與工程解析...
- 重點 1：...
- 重點 2：...

> 💬 **原文**：The original transcribed sentence or speech tokens...
```

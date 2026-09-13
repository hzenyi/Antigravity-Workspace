const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  Header,
  Footer,
  PageNumber,
  ShadingType
} = require('d:/91_Antigravity/A02_教學工作/tools/node_modules/docx');

// Colors
const COLOR_PRIMARY = '1B365D';     // Navy Blue
const COLOR_SECONDARY = '2E75B6';   // Steel Blue
const COLOR_ACCENT = 'C55A11';      // Terracotta Orange
const COLOR_DARK = '262626';        // Charcoal Body Text
const COLOR_MUTED = '595959';       // Muted Gray
const COLOR_BG_LIGHT = 'F2F5F9';    // Very light blue-gray
const COLOR_BG_CALLOUT = 'EBF3FB';  // Light blue for callout
const COLOR_BG_WARN = 'FFFBEA';     // Warm light yellow for tips/warnings
const COLOR_BORDER = 'D3D9E2';      // Subtle table border

const FONT_TC = 'Microsoft JhengHei';

function createHeading1(text, icon = '🔷') {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [
      new TextRun({
        text: `${icon} ${text}`,
        bold: true,
        size: 30, // 15pt
        color: COLOR_PRIMARY,
        font: FONT_TC
      })
    ]
  });
}

function createHeading2(text, icon = '▶') {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: `${icon} ${text}`,
        bold: true,
        size: 24, // 12pt
        color: COLOR_SECONDARY,
        font: FONT_TC
      })
    ]
  });
}

function createBodyPara(text, options = {}) {
  const runs = [];
  if (typeof text === 'string') {
    runs.push(
      new TextRun({
        text,
        size: 21, // 10.5pt
        color: options.color || COLOR_DARK,
        font: FONT_TC,
        bold: options.bold || false,
        italics: options.italics || false
      })
    );
  } else if (Array.isArray(text)) {
    text.forEach(item => {
      if (typeof item === 'string') {
        runs.push(new TextRun({ text: item, size: 21, color: COLOR_DARK, font: FONT_TC }));
      } else {
        runs.push(
          new TextRun({
            text: item.text,
            size: item.size || 21,
            color: item.color || COLOR_DARK,
            font: item.font || FONT_TC,
            bold: item.bold || false,
            italics: item.italics || false,
            highlight: item.highlight
          })
        );
      }
    });
  }

  return new Paragraph({
    spacing: { before: options.before || 60, after: options.after || 60, line: 320 },
    alignment: options.alignment || AlignmentType.LEFT,
    bullet: options.bullet,
    children: runs
  });
}

function createBulletPara(textArray, level = 0) {
  return createBodyPara(textArray, {
    bullet: { level },
    before: 40,
    after: 40
  });
}

function createNumberedStep(stepNum, title, descriptionArray) {
  const elements = [
    new Paragraph({
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({
          text: `步驟 ${stepNum}：`,
          bold: true,
          size: 22,
          color: COLOR_PRIMARY,
          font: FONT_TC
        }),
        new TextRun({
          text: title,
          bold: true,
          size: 22,
          color: COLOR_DARK,
          font: FONT_TC
        })
      ]
    })
  ];

  if (descriptionArray) {
    descriptionArray.forEach(desc => {
      elements.push(createBulletPara(desc, 0));
    });
  }
  return elements;
}

function createCalloutBox(title, textArray, type = 'note') {
  const isWarn = type === 'warn';
  const bgColor = isWarn ? COLOR_BG_WARN : COLOR_BG_CALLOUT;
  const barColor = isWarn ? 'D97706' : COLOR_SECONDARY;
  const icon = isWarn ? '⚠️' : '💡';

  const cellChildren = [
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({
          text: `${icon} ${title}`,
          bold: true,
          size: 21,
          color: isWarn ? 'B45309' : COLOR_PRIMARY,
          font: FONT_TC
        })
      ]
    })
  ];

  textArray.forEach(line => {
    if (typeof line === 'string') {
      cellChildren.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: line, size: 20, color: COLOR_DARK, font: FONT_TC })]
        })
      );
    } else if (Array.isArray(line)) {
      const runs = line.map(item =>
        typeof item === 'string'
          ? new TextRun({ text: item, size: 20, color: COLOR_DARK, font: FONT_TC })
          : new TextRun({
              text: item.text,
              bold: item.bold,
              size: item.size || 20,
              color: item.color || COLOR_DARK,
              font: FONT_TC
            })
      );
      cellChildren.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: runs
        })
      );
    }
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      left: { style: BorderStyle.SINGLE, size: 24, color: barColor }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            children: cellChildren
          })
        ]
      })
    ]
  });
}

function createStyledTable(headers, rowsData, colWidths = []) {
  const tableRows = [];

  // Header Row
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: headers.map((h, i) => {
        const cellOptions = {
          shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: h,
                  bold: true,
                  size: 20,
                  color: 'FFFFFF',
                  font: FONT_TC
                })
              ]
            })
          ]
        };
        if (colWidths[i]) {
          cellOptions.width = { size: colWidths[i], type: WidthType.PERCENTAGE };
        }
        return new TableCell(cellOptions);
      })
    })
  );

  // Data Rows
  rowsData.forEach((row, rowIndex) => {
    const isEven = rowIndex % 2 === 1;
    tableRows.push(
      new TableRow({
        children: row.map((cellContent, cellIndex) => {
          const children = [];
          if (typeof cellContent === 'string') {
            children.push(
              new Paragraph({
                alignment: cellIndex === 0 && row.length > 2 ? AlignmentType.CENTER : AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: cellContent,
                    size: 19,
                    color: COLOR_DARK,
                    font: FONT_TC
                  })
                ]
              })
            );
          } else if (Array.isArray(cellContent)) {
            const runs = cellContent.map(c =>
              typeof c === 'string'
                ? new TextRun({ text: c, size: 19, color: COLOR_DARK, font: FONT_TC })
                : new TextRun({
                    text: c.text,
                    bold: c.bold,
                    size: c.size || 19,
                    color: c.color || COLOR_DARK,
                    font: FONT_TC
                  })
            );
            children.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: runs
              })
            );
          }

          const cellOptions = {
            shading: {
              fill: isEven ? COLOR_BG_LIGHT : 'FFFFFF',
              type: ShadingType.CLEAR
            },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
              left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER }
            },
            children
          };

          if (colWidths[cellIndex]) {
            cellOptions.width = { size: colWidths[cellIndex], type: WidthType.PERCENTAGE };
          }

          return new TableCell(cellOptions);
        })
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows
  });
}

function buildHandoutDocument() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: FONT_TC,
            size: 21,
            color: COLOR_DARK
          },
          paragraph: {
            lineSpacing: { line: 320 }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: '技術型高中實習教學手冊 ｜ Altium Designer 第零章 電路設計 這檔事',
                    size: 16,
                    color: COLOR_MUTED,
                    font: FONT_TC
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '第 ',
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_TC
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_TC
                  }),
                  new TextRun({
                    text: ' 頁，共 ',
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_TC
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_TC
                  }),
                  new TextRun({
                    text: ' 頁 ｜ 適用教材：第零章 p. 0-2 ~ p. 0-22',
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_TC
                  })
                ]
              })
            ]
          })
        },
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 120 },
            children: [
              new TextRun({
                text: '電子電路電腦輔助設計 (EDA) 實務講義',
                bold: true,
                size: 26,
                color: COLOR_SECONDARY,
                font: FONT_TC
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            children: [
              new TextRun({
                text: '第零章 電路設計 這檔事：Altium Designer 快速入門體驗',
                bold: true,
                size: 34,
                color: COLOR_PRIMARY,
                font: FONT_TC
              })
            ]
          }),

          // Course info table
          createStyledTable(
            ['課程名稱', '適用科別/年級', '教材出處', '授課教師 / 學生欄位'],
            [
              [
                '電子電路電腦輔助設計 / 電路板製作實習',
                '資訊科 / 電子科 二、三年級',
                '《Altium Designer 新例說》第零章 (p. 0-2 ~ 0-22)',
                '班級：________ 座號：____ 姓名：____________'
              ]
            ],
            [28, 24, 26, 22]
          ),

          new Paragraph({ spacing: { before: 180, after: 60 } }),

          // Learning Goals Box
          createCalloutBox(
            '本章核心學習目標 (108 課綱技術型高中素養導向指標)',
            [
              [
                { text: '1. 認知知識 (Knowledge)：', bold: true, color: COLOR_PRIMARY },
                '理解從「電路意念 ➔ 電路圖 ➔ 電路模擬 ➔ PCB 佈局 ➔ 實體洗板組裝」之完整設計流程；掌握專案檔 (.PrjPCB) 連繫電路圖與 PCB 檔之資料庫橋樑角色。'
              ],
              [
                { text: '2. 技能實作 (Skill)：', bold: true, color: COLOR_PRIMARY },
                '學會建立專案與檔案管理；熟練零件庫取用、屬性編輯(Tab)、水平翻轉(X)、90度旋轉(Space)；掌握連線(P➔W)與斜線轉角切換(Shift+Space)；執行零件自動編序(ECO)消除毛毛蟲；完成 PCB 導入、Room 管理、Keep-Out Layer 板框切板、單層板設計規則設定與自動佈線。'
              ],
              [
                { text: '3. 專業態度 (Attitude)：', bold: true, color: COLOR_PRIMARY },
                '建立良好的專案目錄命名規範與隨時存檔 (Ctrl+S) 習慣；培養圖面整潔、規範嚴謹且能主動排查錯誤之工程素養。'
              ]
            ],
            'note'
          ),

          // Chapter Index Table
          createHeading1('教材單元與頁碼對照索引表', '📑'),
          createBodyPara('本手冊各章節對應原廠/書本教材頁碼與圖號，方便課堂隨時對照紙本教材翻閱：'),
          createStyledTable(
            ['章節項目', '教學主題', '教材對應頁碼', '重點圖號與操作核心'],
            [
              ['導讀篇', '電路設計核心概念與全流程簡介', 'p. 0-2 ~ 0-3', '電路設計五大階段、專案結構與流程'],
              ['步驟 1', '建立專案與檔案管理 (專案目錄建置)', 'p. 0-3 ~ 0-4', '圖 1：新增專案、電路圖檔與電路板檔、另存新檔'],
              ['步驟 2', '繪製電路圖 (元件取用、旋轉翻轉與接線)', 'p. 0-4 ~ 0-10', '圖 2~6 取用零件、圖 7~10 導線繪製與 Shift+Space 斜線'],
              ['步驟 3', '零件自動編序 (解決紅色波浪線/毛毛蟲)', 'p. 0-10 ~ 0-12', '圖 11~13：Tools ➔ Annotate Schematics ➔ ECO 變更'],
              ['步驟 4', '轉移至 PCB 與零件佈置 (Placement)', 'p. 0-12 ~ 0-14', '圖 15~16：Design ➔ Import Changes、圖 17~19 零件排版與文字'],
              ['步驟 5', '板形設計 (Keep-Out Layer 定義板框與切板)', 'p. 0-15', '圖 20：Keep-Out 閉合框、Define from selected objects'],
              ['步驟 6', '編輯設計規則與自動佈線 (單層板/雙層板)', 'p. 0-15 ~ 0-17', '圖 21：Rules RoutingLayers、圖 22~23 Auto Route All 佈線'],
              ['實作篇', '課堂即時挑戰練習 (3 大綜合實作題)', 'p. 0-18 ~ 0-21', '圖 24~29：ex00-1 橋式整流、ex00-2 繼電器、ex00-3 穩壓電源'],
              ['反思篇', '學習成效評量量規 (Rubric) 與心得筆記', 'p. 0-22', '實作檢核表、常見除錯錦囊、心得反思']
            ],
            [12, 32, 18, 38]
          ),

          // Section 1: Concept
          createHeading1('一、電路設計核心觀念解析 【教材 p. 0-2】', '💡'),
          createBodyPara([
            '電路設計是一種將工程智慧與創意轉化為實體產品的過程。對於初學者而言，電路設計有跡可循；對於資深工程師而言，優良的電路佈局更是如同精雕細琢的工藝品。'
          ]),
          createHeading2('1.1 電路設計的五大階段'),
          createBulletPara([
            { text: '1. 意念構思 (Concept)：', bold: true },
            '確立電路功能需求（例如：設計一塊讓兩顆 LED 輪流交互閃爍的警示燈）。'
          ]),
          createBulletPara([
            { text: '2. 電路圖繪製 (Schematic Capture)：', bold: true },
            '取用電子零件符號，交代零件型號、接腳號碼與導線連接關係（Netlist 網路清單）。'
          ]),
          createBulletPara([
            { text: '3. 電路模擬 (Simulation)：', bold: true },
            '在真正洗板前，於軟體中預覽訊號波形與電氣動作，驗證邏輯是否正確。'
          ]),
          createBulletPara([
            { text: '4. 電路板佈局 (PCB Layout)：', bold: true },
            '將電路圖資料導入 PCB 編輯器，安排實體封裝零件位置（佈局），並拉設銅箔走線（佈線）。'
          ]),
          createBulletPara([
            { text: '5. 實體製作與組裝 (Fabrication & Assembly)：', bold: true },
            '透過化學蝕刻或 PCB 雕刻機洗出電路板，焊接組裝電子元件，完成商品級硬體（向麵包板說再見！）。'
          ]),

          createHeading2('1.2 專案 (Project) 的核心角色'),
          createBodyPara([
            '在 Altium Designer 中，電路板（PCB）必須透過',
            { text: '「專案檔 (*.PrjPCB)」', bold: true, color: COLOR_PRIMARY },
            '與電路圖檔 (*.SchDoc) 關聯在一起。只有在同一專案架構下，PCB 編輯器才能即時比對電路圖中的零件清單、網路連線，並透過工程變更設計 (ECO) 進行同步更新。'
          ]),

          // Section 2: Workflow
          createHeading1('二、Altium Designer 標準實作流程全景圖', '🗺️'),
          createBodyPara('初學者請務必記住以下標準七步驟工作流，本章將依照此流程步步引導：'),
          createCalloutBox(
            '標準設計 SOP 流程圖解',
            [
              '【1. 建立專案】➔ 新建 PCB Project ➔ 加入 Schematic (.SchDoc) 與 PCB (.PcbDoc) ➔ 另存新檔 (p. 0-3~0-4)',
              '         │',
              '【2. 繪圖連線】➔ 零件庫搜尋元件 ➔ Tab 改參數 ➔ X 水平翻轉 / Space 旋轉 ➔ P➔W 連線 (p. 0-4~0-10)',
              '         │',
              '【3. 自動編序】➔ 工具 / 零件序號自動編序 ➔ 更新序號 ➔ 建立 ECO ➔ 消除紅色毛毛蟲 (p. 0-10~0-12)',
              '         │',
              '【4. 導入 PCB】➔ 切換黑底 PCB ➔ Design ➔ Import Changes ➔ 載入零件至 Room 區間 (p. 0-12~0-13)',
              '         │',
              '【5. 零件佈局】➔ 拖曳零件至黑底工作區 ➔ Space 旋轉 ➔ 刪除 Room ➔ 統一調整文字朝向 (p. 0-13~0-14)',
              '         │',
              '【6. 定義板形】➔ Keep-Out Layer 繪製閉合矩形框 (P➔L) ➔ Shift 全選 ➔ Define Board Shape (p. 0-15)',
              '         │',
              '【7. 自動佈線】➔ Design Rules 設定單層板 (取消 Top Layer) ➔ Auto Route All 自動走線 (p. 0-15~0-17)'
            ],
            'note'
          ),

          // Section 3: Step-by-Step Guide
          createHeading1('三、雙晶體交互閃爍電路：步驟式實作指引 【教材 p. 0-3 ~ 0-17】', '🛠️'),

          createHeading2('步驟 1：建立專案與檔案管理 【教材 p. 0-3 ~ 0-4】'),
          ...createNumberedStep(
            '1.1',
            '啟動軟體與新建電路板專案 (p. 0-3 圖 1)',
            [
              ['1. 開啟 Altium Designer。'],
              ['2. 執行上方功能表：', { text: '檔案 (File) ➔ 新增 (New) ➔ 專案 (Project) ➔ 電路板專案 (PCB Project)', bold: true }],
              ['3. 畫面左側 Projects 面板將出現暫存專案名稱：', { text: 'PCB_Project1.PrjPCB', bold: true, color: COLOR_PRIMARY }]
            ]
          ),
          ...createNumberedStep(
            '1.2',
            '新增電路圖檔與電路板檔 (p. 0-3 圖 1)',
            [
              ['1. 滑鼠指向 Projects 面板中的 ', { text: 'PCB_Project1.PrjPCB', bold: true }, '，按', { text: '【滑鼠右鍵】', bold: true }],
              ['2. 選擇：', { text: '新增檔案到專案 (Add New to Project) ➔ Schematic', bold: true }, ' ➔ 產生白底電路圖編輯區 (Sheet1.SchDoc)。'],
              ['3. 再次於專案名稱按【滑鼠右鍵】➔ 選擇：', { text: '新增檔案到專案 ➔ PCB', bold: true }, ' ➔ 產生黑底電路板編輯區 (PCB1.PcbDoc)。']
            ]
          ),
          ...createNumberedStep(
            '1.3',
            '專案與檔案另存新檔 (p. 0-4)',
            [
              ['1. 在專案名稱上按【滑鼠右鍵】➔ 點選', { text: '【另存專案... (Save Project As...】', bold: true }],
              ['2. 指定存檔資料夾路徑（例如：', { text: 'D:\\Examples\\CH0', bold: true }, '）。'],
              ['3. 系統依序要求存檔：', { text: '電路板檔 (PCB1.PcbDoc)', bold: true }, ' ➔ ', { text: '電路圖檔 (Alter.SchDoc)', bold: true }, ' ➔ ', { text: '專案檔 (CH0.PrjPCB)', bold: true }],
              ['4. 存檔完成後，專案與檔案名稱旁的暫存標記「*」符號隨即消失。隨時養成按 ', { text: 'Ctrl + S', bold: true, color: COLOR_ACCENT }, ' 存檔的好習慣。']
            ]
          ),

          createHeading2('步驟 2：繪製電路圖 (Schematic Capture) 【教材 p. 0-4 ~ 0-10】'),
          createBodyPara('切換至白底的電路圖編輯區 (Alter.SchDoc)，依序從零件庫取出 11 個電子元件並連線：'),

          ...createNumberedStep(
            '2.1',
            '取用電晶體 2N3904 (p. 0-4 ~ 0-5 圖 2、圖 3)',
            [
              ['1. 滑鼠移至編輯區右側', { text: '【零件庫 (Libraries)】', bold: true }, '標籤（面板自動彈出）。'],
              ['2. 上方確認選取整合零件庫：', { text: 'Miscellaneous Devices.IntLib', bold: true, color: COLOR_PRIMARY }],
              ['3. 在搜尋名稱欄位輸入 ', { text: '2N3904', bold: true }, ' ➔ 點擊右上角 ', { text: '【Place 2N3904】', bold: true }, ' 按鈕。'],
              ['4. 游標帶有浮動電晶體符號，移至適當位置按【滑鼠左鍵】放置第 1 顆電晶體。'],
              ['5. 按鍵盤 ', { text: '【X】鍵', bold: true, color: COLOR_ACCENT }, ' 進行【水平翻轉（左右鏡射）】；移至右側按左鍵放置第 2 顆。'],
              ['6. 按【滑鼠右鍵】結束電晶體放置。']
            ]
          ),
          createCalloutBox(
            '觀念提點：為什麼電晶體右邊出現紅色波浪線（毛毛蟲）？【教材 p. 0-6】',
            [
              '此時兩顆電晶體的預設零件序號皆為「Q?」。在 Altium Designer 規範中，零件序號（Designator）是元件的身分證，必須具備唯一性。',
              '「Q?」代表尚未指派唯一序號，系統會以紅色波浪底線警示。初學者此時「先不理它」，待元件全數放置連線完畢後，執行自動編序即可一次消除！'
            ],
            'note'
          ),

          ...createNumberedStep(
            '2.2',
            '取用電阻器 Res1 (p. 0-6 ~ 0-7 圖 4、圖 5)',
            [
              ['1. 零件庫搜尋欄輸入 ', { text: 'Res1', bold: true }, ' ➔ 點擊 ', { text: '【Place Res1】', bold: true }],
              ['2. 游標浮動電阻時，按鍵盤 ', { text: '【Tab】鍵', bold: true, color: COLOR_ACCENT }, ' 開啟元件屬性對話盒（圖 4）：'],
              ['   - 在 ', { text: 'Comment', bold: true }, ' 欄位輸入電阻值：', { text: '1K', bold: true }],
              ['   - 取消勾選 ', { text: 'Value', bold: true }, ' 左邊的核取方塊（避免圖面雜亂）➔ 按【OK】關閉對話盒。'],
              ['3. 按鍵盤 ', { text: '【空白鍵 (Space)】', bold: true, color: COLOR_ACCENT }, ' 逆時針旋轉 90 度（變垂直）。'],
              ['4. 在兩側位置各放置 1 顆 1K 電阻。'],
              ['5. 再次按 ', { text: '【Tab】鍵', bold: true }, ' 將 Comment 改為 ', { text: '47K', bold: true }, '，於中間放置 2 顆 47K 電阻（圖 5）。'],
              ['6. 按【滑鼠右鍵】結束電阻放置。']
            ]
          ),

          ...createNumberedStep(
            '2.3',
            '取用電容器、發光二極體與電池 (p. 0-7 ~ 0-8 圖 6)',
            [
              ['1. ', { text: '電容器 (Cap)：', bold: true }, '搜尋 Cap ➔ 按 Tab 分別設定 Comment 為 ', { text: '0.1uF', bold: true }, ' 與 ', { text: '0.22uF', bold: true }, '。'],
              ['2. ', { text: '發光二極體 (LED0)：', bold: true }, '搜尋 LED0 ➔ 放置 2 顆發光二極體於兩側電阻下方。'],
              ['3. ', { text: '直流電源 (Battery)：', bold: true }, '搜尋 Battery ➔ 放置 1 個電池符號於最左側。'],
              ['4. 完成取用如課本 p. 0-8 圖 6 所示（共 11 個零件）。']
            ]
          ),

          ...createNumberedStep(
            '2.4',
            '連接線路與繪製斜線 (p. 0-8 ~ 0-10 圖 7 ~ 圖 10)',
            [
              ['1. 鍵盤依序按下快捷鍵 ', { text: '【P】➔【W】', bold: true, color: COLOR_ACCENT }, '（Place Wire），游標變為十字準星進入連線狀態。'],
              ['2. 將游標對準引腳端點（出現紅色十字連接標記），按【滑鼠左鍵】起點拉線，移至目標引腳按左鍵完成連線（圖 7）。'],
              ['3. ', { text: '繪製 45 度交叉斜線技巧 (p. 0-9 圖 8、圖 9)：', bold: true, color: COLOR_PRIMARY }],
              ['   - 導線預設為直角轉角模式。'],
              ['   - 在拉線未固定狀態下，按 ', { text: '【Shift + 空白鍵】兩下', bold: true, color: COLOR_ACCENT }, ' 即可切換為【斜線模式】！'],
              ['   - 按滑鼠左鍵固定前半段斜線，再移至目標端點按左鍵接妥。'],
              ['4. 依照教材 p. 0-10 圖 10 完成全部線路連接。']
            ]
          ),

          createHeading2('步驟 3：零件自動編序 (解決紅色毛毛蟲) 【教材 p. 0-10 ~ 0-12】'),
          createBodyPara('接線完成後，全圖爬滿紅色毛毛蟲，透過以下步驟一鍵自動指派唯一序號：'),
          ...createNumberedStep(
            '3.1',
            '啟動自動編序對話盒 (p. 0-10 圖 11)',
            [
              ['1. 執行選單：', { text: '工具 (Tools) ➔ 零件序號自動編序 (Annotate Schematics...)', bold: true }]
            ]
          ),
          ...createNumberedStep(
            '3.2',
            '更新序號並建立工程變更設計 (ECO) (p. 0-11 圖 12、圖 13)',
            [
              ['1. 點擊對話盒左下方 ', { text: '【更新序號 (Update Changes List)】', bold: true }, ' ➔ 系統自動產生建議序號清單。'],
              ['2. 點擊右下方 ', { text: '【接受變更(建立ECO) (Accept Changes / Create ECO)】', bold: true }, ' 按鈕。'],
              ['3. 跳出確認提示對話盒（顯示 11 changes made），按 ', { text: '【OK】', bold: true }, '。'],
              ['4. 開啟「工程變更設計」對話盒（圖 13），點擊左下方 ', { text: '【執行變更動作 (Execute Changes)】', bold: true }, '。'],
              ['5. 檢查右側狀態欄位均顯示綠色打勾成功標記。'],
              ['6. 依序按【關閉 (Close)】退回並關閉對話盒。']
            ]
          ),
          ...createNumberedStep(
            '3.3',
            '編序結果驗收與畫面縮放 (p. 0-12 圖 14)',
            [
              ['1. 回到電路圖，所有元件序號已變為 R1~R4, Q1~Q2, C1~C2, D1~D2, BT1，紅色波浪線全數消除（圖 14）。'],
              ['2. 按 ', { text: 'Ctrl + S', bold: true }, ' 存檔。'],
              ['3. 按快捷鍵 ', { text: 'Ctrl + PgDn', bold: true }, '（全圖最適化顯示）；若發現畫布上有誤點的多餘雜件，選取後按 Delete 刪除。']
            ]
          ),

          createHeading2('步驟 4：轉移至 PCB 與零件佈置 (Placement) 【教材 p. 0-12 ~ 0-14】'),
          ...createNumberedStep(
            '4.1',
            '導入電路圖資料到 PCB (p. 0-12 ~ 0-13 圖 15、圖 16)',
            [
              ['1. 點選視窗上方標籤，切換至黑底電路板編輯區 ', { text: 'PCB1.PcbDoc', bold: true }],
              ['2. 確認已存檔後，執行選單：', { text: '設計 (Design) ➔ Import Changes From CH0.PrjPcb', bold: true }],
              ['3. 開啟工程變更設計對話盒（圖 15），點擊 ', { text: '【執行變更動作 (Execute Changes)】', bold: true }, ' ➔ 狀態全數打勾後按【關閉】。'],
              ['4. 按鍵盤 ', { text: '【PgUp】鍵數下', bold: true }, ' 縮小顯示比例，可在黑色板框右側看到粉紅色方框（', { text: 'CH0 零件擺置區間 / Room', bold: true }, '），所有元件與飛線均暫存於此（圖 16）。']
            ]
          ),
          ...createNumberedStep(
            '4.2',
            '零件佈局、刪除 Room 與排列文字 (p. 0-14 圖 17 ~ 圖 19)',
            [
              ['1. ', { text: '拖曳零件：', bold: true }, '按住滑鼠左鍵將零件由 Room 拖曳至黑色編輯區；拖曳時按 ', { text: '【空白鍵】旋轉零件角度', bold: true }, '，按電路圖相對位置排列（圖 17）。'],
              ['2. ', { text: '刪除 Room 擺置區間：', bold: true }, '所有零件移出後，滑鼠點選紅色的 CH0 擺置區間方塊，按 ', { text: '【Delete】鍵', bold: true, color: COLOR_ACCENT }, ' 將其刪除（圖 18）。'],
              ['3. ', { text: '統一文字朝向：', bold: true }, '點選零件序號文字（如 R1、Q1），按住拖曳並按空白鍵調整，將所有標號文字轉為同一水平方向（圖 19）。'],
              ['4. 按 ', { text: 'Ctrl + S', bold: true }, ' 存檔。']
            ]
          ),

          createHeading2('步驟 5：定義板形 (Keep-Out Layer 切板) 【教材 p. 0-15】'),
          ...createNumberedStep(
            '5.1',
            '切換板層與繪製板框線 (p. 0-15 圖 20 左圖)',
            [
              ['1. 滑鼠點擊編輯區底部的板層標籤：', { text: '【Keep-Out Layer (禁置板層)】', bold: true, color: COLOR_PRIMARY }],
              ['2. 快捷鍵按下 ', { text: '【P】➔【L】', bold: true, color: COLOR_ACCENT }, '（Place Line）進入畫線狀態。'],
              ['3. 點選起點拉線，按 ', { text: 'Shift + 空白鍵', bold: true }, ' 切換為直角轉角模式。'],
              ['4. 圍繞已排好的零件四周拉出矩形外框；回到起點閉合時（無破洞漏縫），連按兩下滑鼠左鍵，再連按兩下滑鼠右鍵結束。']
            ]
          ),
          ...createNumberedStep(
            '5.2',
            '選取框線並重新定義板形 (p. 0-15 圖 20 右圖)',
            [
              ['1. 按住鍵盤 ', { text: '【Shift】鍵不放', bold: true, color: COLOR_ACCENT }, '，用滑鼠依序點選 4 段板框線（不可遺漏任何一段）。'],
              ['2. 執行選單：', { text: '設計 (Design) ➔ 板形設計 (Board Shape) ➔ 根據選取物件定義板形 (Define from selected objects)', bold: true }],
              ['3. 黑色電路板工作區立即被裁剪為矩形外框大小。點擊畫布空白處取消選取。']
            ]
          ),

          createHeading2('步驟 6：設定設計規則與自動佈線 (Auto-Routing) 【教材 p. 0-15 ~ 0-17】'),
          ...createNumberedStep(
            '6.1',
            '設定單層板走線規則 (p. 0-15 ~ 0-16 圖 21)',
            [
              ['1. 執行選單：', { text: '設計 (Design) ➔ 設計規則 (Rules...)', bold: true }],
              ['2. 展開左側樹狀目錄：', { text: 'Routing ➔ Routing Layers', bold: true }],
              ['3. 右側面板中：', { text: '【取消勾選 Top Layer】', bold: true, color: COLOR_ACCENT }, '，僅保留 ', { text: '【Bottom Layer】', bold: true, color: COLOR_PRIMARY }, '（限制僅能在底層走藍色單層銅箔線）。'],
              ['4. 點擊【確認 (OK)】關閉對話盒。']
            ]
          ),
          ...createNumberedStep(
            '6.2',
            '執行自動佈線與成果檢視 (p. 0-16 ~ 0-17 圖 22、圖 23)',
            [
              ['1. 執行選單：', { text: '自動佈線 (Auto Route) ➔ 整塊電路板 (All...)', bold: true }],
              ['2. 出現自動佈線設定對話盒（圖 22），直接點擊 ', { text: '【Route All】', bold: true, color: COLOR_PRIMARY }, ' 按鈕。'],
              ['3. 系統自動進行 100% 全面佈線（約 1 秒鐘即可完成）。'],
              ['4. 按 Messages 面板右上角【X】關閉提示面板。'],
              ['5. 檢視成果：全板呈現漂亮俐落的藍色底層單面板銅箔走線（圖 23）！'],
              ['6. 按 ', { text: 'Ctrl + S', bold: true }, ' 完成全專案存檔。']
            ]
          ),

          // Section 4: Keybindings & Troubleshooting
          createHeading1('四、核心快捷鍵與除錯排坑錦囊', '⚡'),
          createHeading2('4.1 Altium Designer 高效快捷鍵速查表'),
          createStyledTable(
            ['操作區域', '快捷鍵組合', '功能作用說明', '教材頁碼'],
            [
              ['全域環境', 'Ctrl + S', '隨時儲存當前活躍檔案與整個專案', 'p. 0-4'],
              ['電路圖 (Sch)', 'P ➔ W', '放置導線 (Place Wire) 連接元件接腳', 'p. 0-8'],
              ['電路圖 (Sch)', 'Tab', '放置元件時開啟屬性對話盒（設定電阻/電容值）', 'p. 0-7'],
              ['電路圖 (Sch)', 'Space (空白鍵)', '將浮動元件逆時針旋轉 90 度', 'p. 0-7'],
              ['電路圖 (Sch)', 'X', '將浮動元件左右水平鏡射翻轉', 'p. 0-5'],
              ['電路圖 (Sch)', 'Shift + Space', '循環切換導線轉角模式（直角 ➔ 45度斜線 ➔ 任意角）', 'p. 0-9'],
              ['電路圖 (Sch)', 'Ctrl + PgDn', '電路圖畫面最適化全圖顯示 (Fit Document)', 'p. 0-12'],
              ['電路板 (PCB)', 'P ➔ L', '放置線條 (Place Line，於 Keep-Out 繪製板框)', 'p. 0-15'],
              ['電路板 (PCB)', 'Shift + 左鍵', '連續複選多個物件（如複選 4 段板框線）', 'p. 0-15'],
              ['電路板 (PCB)', 'PgUp / PgDn', '放大 / 縮小檢視編輯區視角畫面', 'p. 0-12'],
              ['電路板 (PCB)', 'Space (空白鍵)', '拖曳零件或文字時旋轉方向 (0°/90°/180°/270°)', 'p. 0-14']
            ],
            [16, 20, 50, 14]
          ),

          createHeading2('4.2 初學者常見五大踩坑情境與排障 SOP'),
          createCalloutBox(
            '初學者常見除錯錦囊 (Troubleshooting Guide)',
            [
              [
                { text: '【問題 1】電路圖出現紅色波浪底線（毛毛蟲）？【p. 0-6, 0-10】\n', bold: true, color: COLOR_PRIMARY },
                '➔ 原因：元件序號重複或未指定（如多顆 Q?、R?）。\n',
                '➔ 解法：執行「工具 ➔ 零件序號自動編序 (Annotate Schematics) ➔ 更新序號 ➔ 接受變更建立 ECO ➔ 執行變更動作」。'
              ],
              [
                { text: '【問題 2】導線拉線時無法拉出 45 度斜線？【p. 0-9】\n', bold: true, color: COLOR_PRIMARY },
                '➔ 解法：在拉線尚未點擊固定端點的浮動狀態下，連按兩次【Shift + 空白鍵】即可切換至 45 度斜線模式。'
              ],
              [
                { text: '【問題 3】切板 (Define Board Shape) 毫無反應或失敗？【p. 0-15】\n', bold: true, color: COLOR_PRIMARY },
                '➔ 原因：(1) 板框未閉合有開口破洞；(2) 未按住 Shift 鍵將所有框線全部選取。\n',
                '➔ 解法：切換到 Keep-Out Layer 重新閉合繪製框線，按住 Shift 點選所有線段呈現高亮，再執行 Define from selected objects。'
              ],
              [
                { text: '【問題 4】自動佈線後出現紅色線條？【p. 0-16】\n', bold: true, color: COLOR_PRIMARY },
                '➔ 原因：紅色代表 Top Layer（頂層走線），表示設計規則允許雙面板走線。\n',
                '➔ 解法：至「設計 ➔ 設計規則 ➔ Routing Layers」將 Top Layer 取消勾選，僅保留 Bottom Layer 後重新 Route All。'
              ],
              [
                { text: '【問題 5】導入 PCB 時出現紅叉錯誤？【p. 0-13】\n', bold: true, color: COLOR_PRIMARY },
                '➔ 原因：電路圖中有元件封裝（Footprint）遺失或零件序號未完成編序。\n',
                '➔ 解法：回到電路圖檢查是否仍有「?」序號，重新執行 Annotate Schematics 存檔後再次 Import。'
              ]
            ],
            'warn'
          ),

          // Section 5: Exercises
          createHeading1('五、課堂即時挑戰練習 (3 大綜合實作題) 【教材 p. 0-18 ~ 0-21】', '🎯'),
          createBodyPara('請同學們依序完成以下 3 個電路專案，驗證電路繪圖與 PCB 佈局佈線技能：'),

          createHeading2('📝 練習 1：交流轉直流濾波電源指示電路 (`ex00-1`) 【教材 p. 0-18 ~ 0-19】'),
          createBulletPara([
            { text: '專案與檔案名稱：', bold: true },
            '專案 ',
            { text: 'ex00-1.PrjPcb', bold: true },
            '、電路圖 ',
            { text: 'ex00-1.SchDoc', bold: true },
            '、電路板 ',
            { text: 'PCB1.PcbDoc', bold: true }
          ]),
          createBulletPara([
            { text: '教材對照出處：', bold: true },
            '課本 p. 0-18 圖 24（電路圖）與 圖 25（PCB 佈局參考）'
          ]),
          createBulletPara([
            { text: '電路功能解析：', bold: true },
            '由 P1 輸入交流電，經保險絲 F1 與變壓器 T1 降壓，透過橋式整流器 D1 與電容 C1(0.1uF)、C2(470uF) 濾波，點亮 D2(LED) 指示燈並由 P2 輸出直流電源。'
          ]),
          createBodyPara('零件資料與取用清單表 (ex00-1)：', { bold: true }),
          createStyledTable(
            ['零件序號', '取用零件名稱 (Item Name)', '零件值 (Comment)', '零件庫名稱 (Library)'],
            [
              ['P1, P2', 'Header 2', '—', 'Miscellaneous Connectors.IntLib'],
              ['F1', 'Fuse2', '—', 'Miscellaneous Devices.IntLib'],
              ['T1', 'Trans', '—', 'Miscellaneous Devices.IntLib'],
              ['D1', 'Bridge1', '—', 'Miscellaneous Devices.IntLib'],
              ['C1', 'Cap', '0.1uF', 'Miscellaneous Devices.IntLib'],
              ['C2', 'Cap2', '470uF', 'Miscellaneous Devices.IntLib'],
              ['D2', 'LED0', '—', 'Miscellaneous Devices.IntLib'],
              ['R1', 'Res1', '1K', 'Miscellaneous Devices.IntLib']
            ],
            [20, 30, 20, 30]
          ),
          createBodyPara([
            { text: '驗收重點：', bold: true, color: COLOR_PRIMARY },
            '載入 PCB 進行零件佈置、Keep-Out 定義板框、設定單層板 (Bottom Layer) 並採 100% 自動佈線。'
          ]),

          createHeading2('📝 練習 2：雙晶體繼電器延遲開關控制電路 (`ex00-2`) 【教材 p. 0-19 ~ 0-20】'),
          createBulletPara([
            { text: '專案與檔案名稱：', bold: true },
            '專案 ',
            { text: 'ex00-2.PrjPcb', bold: true },
            '、電路圖 ',
            { text: 'ex00-2.SchDoc', bold: true },
            '、電路板 ',
            { text: 'PCB1.PcbDoc', bold: true }
          ]),
          createBulletPara([
            { text: '教材對照出處：', bold: true },
            '課本 p. 0-19 圖 26（電路圖）與 p. 0-20 圖 27（PCB 佈局參考）'
          ]),
          createBulletPara([
            { text: '電路功能解析：', bold: true },
            '透過按鈕開關 S1 觸發，配合電容 C1(100uF) 充放電時間常數，驅動雙晶體 Q1/Q2 達靈敏開關動作，控制雙刀雙擲繼電器 K1(Relay-DPDT) 吸合，二極體 D1 作為反向突波消弧保護。'
          ]),
          createBodyPara('零件資料與取用清單表 (ex00-2)：', { bold: true }),
          createStyledTable(
            ['零件序號', '取用零件名稱 (Item Name)', '零件值 (Comment)', '零件庫名稱 (Library)'],
            [
              ['P1', 'Header 2', '—', 'Miscellaneous Connectors.IntLib'],
              ['P2', 'Header 6', '—', 'Miscellaneous Connectors.IntLib'],
              ['S1', 'SW-PB', '—', 'Miscellaneous Devices.IntLib'],
              ['Q1, Q2', '2N3904', '—', 'Miscellaneous Devices.IntLib'],
              ['D1', 'Diode 1N4001', '—', 'Miscellaneous Devices.IntLib'],
              ['C1', 'Cap2', '100uF', 'Miscellaneous Devices.IntLib'],
              ['C2', 'Cap', '0.1uF', 'Miscellaneous Devices.IntLib'],
              ['K1', 'Relay-DPDT', '—', 'Miscellaneous Devices.IntLib'],
              ['R1', 'Res1', '3.3K', 'Miscellaneous Devices.IntLib'],
              ['R2', 'Res1', '47K', 'Miscellaneous Devices.IntLib']
            ],
            [20, 30, 20, 30]
          ),
          createBodyPara([
            { text: '驗收重點：', bold: true, color: COLOR_PRIMARY },
            '注意繼電器 8 支引腳對應與極性二極體方向，完成零件佈局、定義板框並實施單層板自動佈線。'
          ]),

          createHeading2('📝 練習 3：直流穩壓供電模組電路（進階雙層板）(`ex00-3`) 【教材 p. 0-20 ~ 0-21】'),
          createBulletPara([
            { text: '專案與檔案名稱：', bold: true },
            '專案 ',
            { text: 'ex00-3.PrjPcb', bold: true },
            '、電路圖 ',
            { text: 'ex00-3.SchDoc', bold: true },
            '、電路板 ',
            { text: 'PCB1.PcbDoc', bold: true }
          ]),
          createBulletPara([
            { text: '教材對照出處：', bold: true },
            '課本 p. 0-21 圖 28（電路圖）與 圖 29（PCB 佈局參考）'
          ]),
          createBulletPara([
            { text: '電路功能解析：', bold: true },
            '支援 DC Jack (PWR2.5) 或端子台雙電源輸入，透過滑動開關 S1 切換，經二極體防逆接保護與三端穩壓 IC (VR1) 輸出穩定電壓，配置 LED 電源指示燈與去耦濾波電容。'
          ]),
          createBodyPara('零件資料與取用清單表 (ex00-3)：', { bold: true }),
          createStyledTable(
            ['零件序號', '取用零件名稱 (Item Name)', '零件值 (Comment)', '零件庫名稱 (Library)'],
            [
              ['P1, P2', 'Header 2', '—', 'Miscellaneous Connectors.IntLib'],
              ['J1', 'PWR2.5', '—', 'Miscellaneous Connectors.IntLib'],
              ['S1', 'SW-SPDT', '—', 'Miscellaneous Devices.IntLib'],
              ['Q1, Q2', '2N3904', '—', 'Miscellaneous Devices.IntLib'],
              ['D1, D2', 'Diode 1N4001', '—', 'Miscellaneous Devices.IntLib'],
              ['C1', 'Cap2', '470uF', 'Miscellaneous Devices.IntLib'],
              ['C2, C3', 'Cap', '0.1uF', 'Miscellaneous Devices.IntLib'],
              ['VR1', 'Volt Reg', '—', 'Miscellaneous Devices.IntLib'],
              ['D3', 'LED0', '—', 'Miscellaneous Devices.IntLib'],
              ['R1', 'Res1', '470', 'Miscellaneous Devices.IntLib']
            ],
            [20, 30, 20, 30]
          ),
          createBodyPara([
            { text: '進階挑戰要求：', bold: true, color: COLOR_ACCENT },
            '本題請設定為',
            { text: '【雙層板 (Top Layer + Bottom Layer)】', bold: true, color: COLOR_PRIMARY },
            '進行自動佈線，觀察紅（頂層）、藍（底層）雙層銅箔立體穿梭與貫孔 (Via) 的分佈特性！'
          ]),

          // Section 6: Rubrics
          createHeading1('六、實作學習成效評量量規 (Rubric)', '📊'),
          createBodyPara('本單元實作評量標準依據 108 課綱技術型高級中等學校實習科目評量規範制定：'),
          createStyledTable(
            ['評量項目與佔分', '優秀 (A: 90~100分)', '良好 (B: 80~89分)', '尚可 (C: 60~79分)', '待加強 (D: <60分)'],
            [
              [
                '電路圖繪製與編序\n(佔 30%)',
                '零件選用完全正確，連線整潔無短路，成功完成自動編序(ECO)，圖面無紅色波浪線。',
                '零件選用與連線正確，完成自動編序，僅少許導線轉折不夠俐落。',
                '零件有少數選錯或遺漏數值設定，經提示後能完成自動編序消除毛毛蟲。',
                '零件庫選錯、連線嚴重短路或未進行自動編序，圖面佈滿紅色毛毛蟲。'
              ],
              [
                'PCB 零件佈置與美觀\n(佔 25%)',
                '順利導入 PCB 並成功刪除 Room，零件排列與電路圖流向高度契合，文字方向完全統一水平。',
                '成功導入 PCB 並刪除 Room，零件排列工整，文字方向大致水平一致。',
                '零件排列稍微擁擠或 Room 未刪除，文字朝向未完全統一。',
                '零件堆疊混亂、未移出 Room 區間，零件文字重疊難以辨識。'
              ],
              [
                '板框定義與佈線規則\n(佔 25%)',
                'Keep-Out 板框閉合正確並成功切板，精準設定單/雙層板規則，100% 完成自動佈線且無未連線。',
                '板框成功切板，佈線規則設定正確，自動佈線完成率達 100%。',
                '切板過程稍有延誤，經提示後完成單層板設定與自動佈線。',
                '無法成功切板（板框未閉合），或規則設定錯誤導致佈線失敗或層別混亂。'
              ],
              [
                '實習態度與除錯能力\n(佔 20%)',
                '養成良好存檔(Ctrl+S)習慣，能獨立排查報錯，準時完成課堂即時挑戰練習題。',
                '操作專注，遇到問題能參考除錯錦囊自行排除，順利完成實作練習。',
                '需同儕或教師適度提醒方能完成練習，操作習慣尚可。',
                '進度落後，未能依規範存檔或操作漫不經心，未完成練習。'
              ]
            ],
            [18, 22, 20, 20, 20]
          ),

          // Section 7: Student Reflection
          createHeading1('七、學生實作心得與自我反思筆記 【教材 p. 0-22】', '📝'),
          createBodyPara('請同學們在完成實作後，認真思考並填寫下列反思問題：'),

          createCalloutBox(
            '實作反思填寫區',
            [
              '1. 本次實作中，你覺得最需要注意或最容易卡關的步驟是哪一個？你是如何解決的？',
              '答：_____________________________________________________________________________________________________\n',
              '2. 在 Altium Designer 中，「電路圖」與「電路板」之間的資料是如何同步傳遞的？（請用你自己的話說明 ECO 的概念）',
              '答：_____________________________________________________________________________________________________\n',
              '3. 請列出 3 個你覺得在本次實作中最實用、最能提高繪圖效率的快捷鍵組合：',
              '答：(1) _______________________   (2) _______________________   (3) _______________________\n',
              '4. 課堂自由筆記與學習心得（對照課本 p. 0-22 筆記格）：',
              '_________________________________________________________________________________________________________\n_________________________________________________________________________________________________________\n_________________________________________________________________________________________________________'
            ],
            'note'
          ),

          new Paragraph({
            spacing: { before: 240, after: 60 },
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: '教師評閱簽章：____________________   實習總評成績：____________',
                bold: true,
                size: 22,
                color: COLOR_PRIMARY,
                font: FONT_TC
              })
            ]
          })
        ]
      }
    ]
  });

  return doc;
}

async function main() {
  const targetDir = path.resolve('d:/91_Antigravity/A02_教學工作/電路繪圖/教材講義');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const doc = buildHandoutDocument();
  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(targetDir, 'Altium_Designer_Chapter0_電路設計這檔事_教學手冊.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Word document generated successfully at: ${outputPath} (${buffer.length} bytes)`);
}

main().catch(err => {
  console.error('Error generating document:', err);
  process.exit(1);
});


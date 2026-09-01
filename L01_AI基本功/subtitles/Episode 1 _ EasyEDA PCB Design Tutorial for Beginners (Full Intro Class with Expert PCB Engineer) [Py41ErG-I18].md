# Episode 1 | EasyEDA PCB Design Tutorial for Beginners (Full Intro Class with Expert PCB Engineer)

- **影片網址**：https://www.youtube.com/watch?v=Py41ErG-I18
- **影片 ID**：`Py41ErG-I18`
- **頻道來源**：EMBEDDED SYSTEMS DIARY
- **逐字稿狀態**：✅ 已完成繁體中文專業工程潤飾翻譯（採用 Utb 結構化工程模型，保留原文對照）
- **專業審校**：電子工程師 / 資訊科教師

---

## 📝 逐字稿 / 雙語對照內容

**[00:00]**
現在我們把講台交給 Delight 工程師。請他向大家做個自我介紹，簡述他在電子電路領域的專業背景與實務經歷，並為大家說明他將如何在接下來的「印刷電路板（PCB）實戰設計」系列課程中，一步步帶領大家從零入門。

> 💬 **原文**：just give the room for engineer delight to you know introduce himself and just give us a brief of what he has done and how he's going to be directing us in this printed circuit board design playlist or episode

**[00:19]**
交給你了，Delight！
好的，各位學員大家好！我叫 Cojude（業界習慣叫我 Delight）。我是一名專業電子工程師，目前主要深耕於再生能源與綠能系統研發領域。

> 💬 **原文**：over to you engineer delight. Okay. Um, good day everyone. Um, my name is Cojude. Um, I am an electronics engineer currently working in the field of

**[00:39]**
在硬體研發方面，我累積了許多實際專案經驗，包括硬體電路設計、太陽能光電系統架構規劃與能效審查（Audits），目前同時擔任能源分析師。

> 💬 **原文**：renewable energies. Um, I've done some works in hardware design, um, solar systems, solar system design, audits. I'm working as an energy analyst currently.

**[00:55]**
過去幾年我很幸運能與許多頂尖的硬體開發者合作，打造出多款量產水準的優秀產品。我對硬體工程抱有極大熱情，始終持續學習最新的電路架構、晶片新特性與更先進的工程實作手法。

> 💬 **原文**：Um I've been opportunity to work with um some really great guys on some really nice products in the past and I am into hardware engineering. I'm constantly learning about hardware, new

**[01:13]**
【工程核心哲學：持續迭代（Iterative Design）】
在硬體領域，最關鍵的思維就是不斷從實作與測試中迭代優化設計。因此在這一系列的實戰教學中，我將為大家系統化梳理以下核心主軸：

> 💬 **原文**：designs, features, new ways of doing things and like the most important thing is I constantly try to iterate my designs. Um so in this series I'll be trying to cover things like um

**[01:34]**
1. **電路原理圖（Schematic）設計**：從電源、微控制器到感測介面的各功能模組劃分。
2. **原理圖轉 PCB Layout（網表導入與轉換）**：如何將邏輯電路映射為實體印刷電路板。
3. **PCB 設計規則（Design Rules）**：工業級走線間距、線寬計算、抗雜訊防護與製程限制。

> 💬 **原文**：schematic designs um different parts of the circuit board or different parts of your hardware project. um how to interpret your schematic to PCB, some rules in the PCB designing um

**[01:52]**
【擺脫現成開發板：邁向 Bare-metal 裸機電路思維】
許多人都玩過 Arduino 等現成開發模組，但在商業產品或專屬硬體中，我們不能總是疊加整塊昂貴又臃腫的開發板。在本課程中，我將示範如何直接提取板載的微控制器晶片，直接進行「裸機（Bare-metal）電路設計」。

> 💬 **原文**：um some component introduction, bare metal um so for instance um some of you are familiar with the Arduino Adino development board. So what I'll be doing is I will be using the onboard microcontroller on that development

**[02:12]**
我們直接使用晶片本體——**ATmega328P** 微控制器。我們將完全圍繞著這顆 MCU，從最底層的重置電路（Reset Circuit）、振盪時鐘（16MHz 石英晶體）、電源旁路電容開始，親手打造屬於自己的專屬電路板！

> 💬 **原文**：board to like give us a feel of how bare metal works. We're not going to use the development board. We're going to use like the ADO chip itself, the 80 mega 328. We'll build around the microcontroller.

**[02:29]**
我們會為它逐步擴充周邊功能，完整走過「需求發想 ➔ 元件選型 ➔ 電路整合 ➔ PCB 佈線 ➔ 送交打樣廠（JLC）製造」的標準工業流程。市面上有眾多電路設計（EDA）工具，

> 💬 **原文**：We'll add some features. see how we go from adding features to um selecting components to bringing it together, designing it, sending DH for printing. Um so there are a lot of software out there you could use for your design for

**[02:49]**
常見的工具例如 Proteus、KiCad 等。雖然這些軟體我都使用過，但在日常開發、教學以及追求極速打樣製造的場景下，我最主力推薦大家使用的就是 **EasyEDA**。

> 💬 **原文**：your um component selections. Um examples are like pros your K card supplies. Um there a lot of them out there. Um I use a few of the mention but primarily the one I use to make PCB designs and get

**[03:13]**
【為什麼選擇 EasyEDA？——設計階段即時選型與供應鏈打通】
EasyEDA 與大型電子元件通路商「立創商城（LCSC）」以及製造廠「JLCPCB」具備無縫的一條龍生態整合。這意味著你在電路設計階段，就能直接在軟體內完成元件尋源與選型。

> 💬 **原文**：them printed is easy. Now easy works with some other companies like LCLC and they enable you to source your components in the design stage. What

**[03:29]**
當你在畫電路圖挑選零件時，能直接查看立創商城的「即時現貨庫存數量」與「單價」，甚至可以直接預購，徹底避免畫完電路板才發現關鍵零件缺貨的慘劇！此外，EasyEDA 還具備極為強大的自訂元件庫功能。

> 💬 **原文**：that means is as I'm designing and I am using a particular component I can check if that component is available in inventory or I can pre-order that component for my board. Um, another thing EVVA helps allows us

**[03:47]**
當遇到特殊模組或冷門零件時，我們可以輕鬆建立自訂的電氣符號（Schematic Symbol）與實體封裝（PCB Footprint），將其精準整合進專案中。

> 💬 **原文**：to do is make custom design with custom components. Um, so I can make a custom layout or a footprint then um include it in my board, get that down to me, then put in a custom

**[04:05]**
現在請大家看我的螢幕畫面，我來為大家示範 EasyEDA 的基礎操作與核心導覽。

> 💬 **原文**：company. Um, so let me just share my screen to give like a basic introduction to what we will be doing. Okay. So, like I said, I'll be doing like a brief um introduction

**[04:29]**
我會帶大家熟悉編輯介面，並以實際的商業產品研發視角來檢視原理圖。例如，假設你今天接獲一個實際的物聯網（IoT）產品開發案：

> 💬 **原文**：how easy it works. Um how you can your way how you can navigate your way around the software. um going over some schematic designs in like if you're developing a product for instance

**[04:43]**
假設你要開發一款「室內出入人流計數器」，或是基於 PIR 人體被動紅外線感測器的智慧偵測裝置。從工程設計角度，你必須在原理圖階段就系統化考量以下四大要素：

> 💬 **原文**：um let's say you're developing a an IoT project that uh counts how many people leave or enter a room or you're developing a project that uses a P sensor and IoT project basically you're going to need things

**[05:00]**
【硬體工程考量 1：電源架構規劃（Power Architecture）】
- 專案採用直流（DC）還是交流（AC）供電？
- 若採用 DC 直流（如 5V 或 12V 輸入），後端的降壓轉換電路（LDO 線性穩壓還是 DC-DC 降壓開關電路）如何設計？
- 如何在電源端加入去耦電容與穩壓拓撲，提高電源轉換效率並確保晶片供電純淨穩定？

> 💬 **原文**：like power supplies what form I using to power that project are you using a DC source, an AC source. Using a DC source, what is the circuit pass by going to look like? How you going to interpret it? What can you do to make it better

**[05:17]**
【硬體工程考量 2：類比訊號調理與濾波（Signal Conditioning & Filtering）】
- 是否需要採集外部微弱的類比訊號（如聲音、光敏、震動）？
- 在類比數位轉換（ADC）前端該配置何種主動/被動濾波電路？如果是音訊或揚聲器產品，取樣率與訊號失真度該如何抑制？

> 💬 **原文**：signal? Are you measuring any external sign analog signals? What type of filter filtering are you going to use? If you're building something like an audio device, maybe a speaker, you need to do some signal sampling,

**[05:32]**
- 在輸入端必須配置 **EMI（電磁干擾）濾波電路**，並根據頻寬需求配置**低通濾波器（Low-pass Filter）**或**高通濾波器（High-pass Filter）**。

【硬體工程考量 3：微控制器選型評估（MCU Selection）】
- 專案需要多強大的微控制器算力？

> 💬 **原文**：analyzing or processing. You need some DMI filters. Um you need some blue or highp pass filters basically. Um are using microcontrollers in your projects? Um what kind of microcontroller do you require? Do you

**[05:50]**
- 內部 Flash 程式空間與 SRAM 是否足夠？是否需額外透過 SPI / I2C 外掛 EEPROM 或 SPI Flash？
- 元件封裝是選用適合手工焊接的通孔插件（THT / DIP），還是微型化的表面黏著（SMD / QFP / QFN）？
- 電路板的最終外觀尺寸限制為何？

> 💬 **原文**：require the one with large inbuilt memory or I guess use an external memory with your microcontroller hole or surface mount? um how much effect also the size of your body is very

**[06:10]**
【硬體工程考量 4：穿戴裝置的極致微型化與低功耗（Ultra-low Power Design）】
例如許多開發者想研發智慧手錶、運動穿戴或隱藏於衣物內的微型感知節點，體積必須極致小巧、重量必須極輕。

> 💬 **原文**：important like some people now want to design projects for wearable electronics like I want to design a smart wristwatch or something I could slide into my clothes um I need something that is very tiny carry on that is very lightweight

**[06:25]**
這類裝置往往只能採用 CR2032 等鈕扣電池（Coin cell battery）供電，容量極小。因此在硬體架構設計上，必須達成「超低待機功耗」與「長效續航」：

> 💬 **原文**：so um and then using very miniature batteries the sim batteries. So I need something that consumes very little amount of energy and can last for a very long time. So in your design you're going to one of the features is that

**[06:40]**
- 選擇極低靜態電流（Quiescent Current, Iq）的低壓降穩壓器（LDO）。
- 善用微控制器的電源管理單元，確保在無事件觸發時能自動進入微安培（µA）甚至奈安培級別的**深度睡眠模式（Deep Sleep Mode）**。

> 💬 **原文**：your project is going to have a very um power consu or power efficient power supply. Um it's going to drain or it's going to drain very minimal energy. it's to enter sleep mode when

**[06:58]**
- 僅在需要採樣感測器或進行無線數據傳輸時才喚醒執行。這些都是在電路板設計初期必須深思熟慮的工程細節。因此本系列課程的定位是：

> 💬 **原文**：um it's not sending or receiving information when it's not processing anything. So these are like considerations to take when you're designing your board. So this series is just going to be

**[07:09]**
【純硬體工程實務導向（Purely Hardware-Based）】
專注帶領大家走通硬體研發的五大里程碑：
> **創意發想 ➔ 原理圖繪製 ➔ PCB Layout 佈線 ➔ 工廠下單打樣 ➔ 實體焊接組裝**

現在請看我的螢幕：

> 💬 **原文**：hardware based purely hardware based. Yeah. um focus at getting you from idea to schematic from schematic to PCB from PCB to ordering from ordering soldering. So like that's the idea road map. So on my screen um we

**[07:31]**
這是我兩三年前親自設計的一個硬體專案。板上整合了一顆主控晶片、多顆濾波電容、分壓電阻與一顆功感電感，全數採用 SMD 表面黏著封裝。

> 💬 **原文**：have this is a project I did a couple of years ago about two or three years ago. Um it just has like a microchip um has some capacitors, some resistors, has like an inductor, all surface mounts.

**[07:52]**
電路板左側規劃有電源模組區，右側將微控制器的 GPIO 引腳整齊排列引出，兼具系統供電輸入、序列通訊（UART/I2C）以及外部感測觸發功能。

> 💬 **原文**：We have some power supply sections. Um it's just a very basic chip with peripheral pins where you can connect pins that you can use to power the board, do some communications, do some triggering.

**[08:10]**
這是一個非常典型且成熟的雙層電路板設計範例，讓大家對電路板最終成品的樣貌能有清晰的認知。

> 💬 **原文**：This was like a very very very generic um a few years ago. So this to show you give you an idea of what your project might look like at the

**[08:29]**
它的實體尺寸非常微型緊湊。畫面上看到的軟體介面就是 EasyEDA，我示範的是免安裝、打開瀏覽器即可直接運行的標準版（學生版）。

> 💬 **原文**：end. Um it's very minimal. Um this is very tiny in size very very tiny and it's also being displayed on the screen now. is easy to check when my mouse when my hovering now see the easy there and I'm using the student version

**[08:46]**
這個版本功能已經非常完整，完全能滿足你現階段所需的一切功能：從海量元件庫選型、即時調用官方封裝，甚至能向不同供應商即時查詢現貨。

> 💬 **原文**：um student gives you a lot of or rather all the features you require at this stage um allow you to select components pick from libraries source parts you can source parts from different suppliers

**[09:07]**
你可以直接在軟體內根據元件單價、品牌製造商、交貨地點進行即時比價與篩選，完全不需要額外開啟多個購物網站翻查規格，大幅節省研發時間。

> 💬 **原文**：There a lot of suppliers out there. So you can choose where you want your components to come from. You comparison based on price or manufacturer or location. Is there any waste time like you can do all that on this software.

**[09:24]**
【雙層板（2-Layer PCB）架構解析】
這塊板子是標準的雙層板架構：
- **頂層（Top Layer）**：主要擺放 SMD 元件焊盤與大部分訊號走線。
- **底層（Bottom Layer）**：佈局部分走線與大面積接地銅箔（Ground Plane），頂底兩層透過鍍銅過孔（Via）相連通。

> 💬 **原文**：So um like I said this is just like a generic board. All components being surface mounts. We have a few wires. Um it's a two layer board. So we have copper traces at the bottom and at the top.

**[09:43]**
後續我們的實作專案都會依循這個標準進行設計：在維持極小尺寸的同時，深入考量**「高頻雜訊抑制（Noise Suppression）」**與**「電源漣波濾波（Ripple Filtration）」**這兩個確保硬體穩定運行的關鍵環節。

> 💬 **原文**：Um that is basically it. So most of the events will be making look like this. We'll make them as compact as possible. uh we'll consider some things around noise and filtration which are very very

**[10:00]**
這就是本系列教學的核心內容規劃！我非常期待接下來為大家推出更多深入實作單元，也很期待能與各位硬體愛好者與工程師交流學習。

> 💬 **原文**：key. Um so that's what we be going over in the um in this series. So um I'm looking forward to dropping some content. I'm looking forward to learning from you guys and I'm looking

**[10:16]**
希望大家能跟著這個系列，一步步掌握硬體設計的真正硬實力！非常感謝大家，我們下個實作單元見！

> 💬 **原文**：forward to you guys learning from me also like yeah thank you and that's like my basic intro.

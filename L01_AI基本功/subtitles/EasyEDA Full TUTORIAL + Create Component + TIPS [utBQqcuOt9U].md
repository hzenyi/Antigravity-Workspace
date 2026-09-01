# EasyEDA Full TUTORIAL + Create Component + TIPS

- **影片網址**：https://www.youtube.com/watch?v=utBQqcuOt9U
- **影片 ID**：`utBQqcuOt9U`
- **頻道來源**：GreatScott!
- **逐字稿狀態**：✅ 已完成繁體中文專業工程潤飾翻譯（保留原音對照並校正技術術語）
- **專業審校**：電子工程師 / 資訊科教師

---

## 📝 逐字稿 / 雙語對照內容

**[00:00]**
我收到了非常多請求，希望我能做一部 EasyEDA 的完整教學，帶大家了解如何從一個點子出發，一路完成電路原理圖、PCB 佈線設計，最後向本集贊助商 JLCPCB 下單打樣電路板。網路上雖然已經有一些 EasyEDA 的教學，

> 💬 **原文字幕**：hij had op request to make an easy ideeën tutorial pensioen had to get from idea to suck it en pcb design en en had order de pc' beats van de sponsor of deze video deel cpc be there already had op tutorials op al deze ideeën

**[00:14]**
這也是為什麼我之前一直沒拍這類主題。但我收集了許多大家在該平台上遇到的痛點與常見問題。今天我將從頭到尾完整示範我在 EasyEDA 上的 PCB 設計流程，以及如何量測與佈局。

> 💬 **原文字幕**：and that's why never made by myself what i gather of je traits and problems that a you have this platform en to day i'll try to make up tutorial start to finish my busy bee designing in is idee what measures bed

**[00:27]**
此外，我也會教大家當你在線上元件庫找不到零件時，該如何自行建立客製化的元件符號（Symbol）與 PCB 封裝（Footprint / Layout），以及如何運用網路標籤（Net Labels）來簡化原理圖、避免線路雜亂，讓圖面更清晰美觀。

> 💬 **原文字幕**：jongen of solar had to clear the component layout en symbool in case you don't heb het component in die online library had u de labels en minimizer schematics voorbij de look

**[00:38]**
我會逐一解說各個工具列的功能與操作技巧。同時我們也會深入探討如何為 PCB 準備好 JLCPCB 的 SMT 貼片焊接服務（SMT Soldering Service）。這是一部全方位的 EasyEDA 教學，

> 💬 **原文字幕**：hot wheels die foto's van mij nu en altijd ik spring iets door separately maar dat ik doe and how to use it we ons het alka bad trip en de pcb voor ftm zoldering service seletti aanvoelt idee tutorial en show

**[00:51]**
向你展示自己設計一塊電路板是多麼簡單！如果你喜歡我的內容，請務必訂閱並開啟小鈴鐺，也感謝在 Patreon 上支持我的朋友們。現在我們馬上開始！

> 💬 **原文字幕**：how easy store design your board make sure you subscribe and activate de bel of zo een gastank het om mijn petrus for the support zo leer je starlette [Muziek]

**[01:05]**
好的朋友們，本集影片由 JLCPCB 贊助播出。他們提供了品質非常優秀的 PCB 製造打樣服務。

> 💬 **原文字幕**：[Applaus] [Muziek] [Applaus] [Muziek] geef frans dat bos of this video is chelsea pcb aos het goodwood moeder pc

**[01:19]**
正如大家在我頻道許多專案中所看到的，我的板子幾乎都是使用他們的 SMT 貼片服務，由自動打件機（Pick-and-Place Machine）精準焊接完成。如果你正好也打算製作電路板，

> 💬 **原文字幕**：game and fracture service and you can see that om op de peace peace on the channel wat melk die al hebben essent ism de service moet de pick-and-place machine soul eater planning to great for peace

**[01:29]**
自己完成設計並把電路板送去打樣焊接，非常推薦參考這項服務，打樣價格非常實惠，點擊下方說明欄連結即可了解更多詳情。感謝 JLCPCB 的贊助！

> 💬 **原文字幕**：ik baddesign story components and send your board for simple dikke look at the service stad in brons en van dollars jekyll de freecom questions to learn more nf per foton chelsea pcb badkamer

**[01:42]**
歡迎回來！在開始設計電路板之前，通常我習慣先在麵包板（Breadboard）上搭建原型電路，確保電路邏輯與功能完全正常。

> 💬 **原文字幕**：what's up my friends will come back de positieve niet eens een media en heeft u boeddha de orly heb 13 maar hij juli metafoor of the search for my breadboard in order to make sure that the final suck it will work after that i can of

**[01:55]**
確認無誤後，我會在紙上標記各接腳連接，最後在 EasyEDA 中繪製原理圖。我不再使用老舊 EDA 軟體的主因，就是 EasyEDA 擁有極為龐大且高度整合的線上元件庫。

> 💬 **原文字幕**：mac de connections om paper and then finally doordat comment ik in easy idee de montgri zijn hij dronk you design sparco regal anymore voor mijn pc bis is die idee of the height of the component om naar

**[02:08]**
每當社群上有其他使用者建立新元件，都會即時共享在庫存中，這種社群分享元件機制極為實用。好，現在我們就正式開始動手設計！

> 💬 **原文字幕**：en niet stem another user creten je component it will appear in the online library and sharing component is berrios vol oké solo heb alright bia led star wie de design

**[02:19]**
首先打開瀏覽器前往 EasyEDA 官方網站。如果尚未註冊，請點擊「註冊（Register）」，輸入使用者名稱、電子信箱與密碼完成註冊。有了帳號後，進入首頁，

> 💬 **原文字幕**：vorst haar to go to easy idee en quit een account if you don't edgar zo klik registered selecteer username insert your email create a new password en nou ik heb een nieuw account nou we go to the mainpage of icbe en

**[02:35]**
點擊「EasyEDA 編輯器（Designer）」。新進使用者的專案清單是空白的。點選「檔案（File）」➔「新建專案（New Project）」，跳出彈出視窗讓我們命名專案。

> 💬 **原文字幕**：klik dat design er buiten aore die hebben laten projects hier wat heb je er nieuwe this list will be empty oké zo lets start klik de file button en kwijt en uw project that will open a small windows live to keep a neemt u de

**[02:52]**
這次我要示範製作一塊基於 Arduino 的微型無線電接收板，所以我將專案命名為「Arduino Radio Receiver」，然後點擊儲存。這會自動開啟一個全新的原理圖（Schematic）工作畫布。

> 💬 **原文字幕**：project all be made simple onze smallridge receiver board media doe je nou zo alleen de project arduino radio receiver en klinkt als een bottom now this will open uw scan magic wand so can see it is not save yep zo voor stinken

**[03:09]**
首先第一件事一定要先點擊「儲存（Save）」，並為這張圖紙命名，以利專案追蹤。看畫布左側的元件庫選單，這裡有 EasyEDA 的預設元件庫，

> 💬 **原文字幕**：heb te door iets toe klik de save-button' lange cucina tijd al in de chique neem in order to keep track oké nu ik heb die component om de left side hoe heather grey termijn you you happy ze ideaal abri's en

**[03:25]**
雖然能找到常用基本零件，但我平時更偏好點擊「元件庫（Libraries）」按鈕。這裡擁有數百萬種線上元件。現在我們就可以在此搜尋任何所需的零件。

> 💬 **原文字幕**：weekend fijn of je component wat hij usually don't use this component vorm hier voor meer online components klik de light breeze buiten en hier heb al die component nou search for and the component

**[03:39]**
我們從 ATmega328P 晶片開始搜尋。在搜尋結果中，你會看到元件被分為幾大類群組。首先是「基礎元件（Basic Components）」，這些元件在立創商城（LCSC）都有現貨，

> 💬 **原文字幕**：hij start we dit mee gaat u gaan de tijd door nee chip ook en andere poorten gebouwd this result hij is uk ziel hebt die component die wij dit interview groups vorst dit artikel bonus deed u kunt fijn om die

**[03:50]**
旁邊會顯示購物車圖示。如果你打算直接送交打樣並購買元件，請務必挑選旁邊帶有購物車圖示的零件。

> 💬 **原文字幕**：scsi en jongens die shoppingcart niks doe ik zoiets i want to make sure that you we ooit van de component to purchase you the components that heb de shoppingcart next to do

**[04:01]**
另一組重要分類是「SMD 貼片元件」，這些元件能完美配合 JLCPCB 的 SMT 焊接代工服務，由工廠的自動打件機直接幫你焊接在電路板上。

> 💬 **原文字幕**：oké doordewijks groep we hebben die s en die component this a component that can be used within us and the soaring service van jersey pc be you can use this component voor s en t service moet de pick-and-place machine

**[04:14]**
元件名稱旁會標示 SMD 圖示。如果你挑選的零件沒有此標示，JLCPCB 在進行 SMT 焊接時就無法自動打件，這點在選型時請特別留意。

> 💬 **原文字幕**：die essent die eikel op eer om de site of the component neem je clio's een component methodisch en die icon jersey pc i won't be able to soorten reed using de s&amp;p service zo heb 13 markt

**[04:26]**
最後是「使用者貢獻庫（User Contributed）」，能找到社群其他開發者繪製的特殊元件。但使用這類元件時，請務必打開原廠規格書（Datasheet），核對接腳編號與封裝尺寸是否正確，

> 💬 **原文字幕**：finally i heb de user kanten beauty group and view free can find the component create by other users what if you want for this group make sure that to check the dimensions en de pi numbers moet de data sheet of the

**[04:37]**
避免其他作者在繪製時有筆誤。選好晶片後將它放置在原理圖上。接著以相同方式加入電阻、電容，以及一顆 16 MHz 石英晶體振盪器（Crystal）。

> 💬 **原文字幕**：component die klant er met die emmers mee bij ado creators oké zo dit is mijn cheap hij is lek that and place it on this came ik nooit doe dus een voedsel registers capacitors en de kort crystal of sixteen

**[04:51]**
選型時請務必確認封裝規格（Package）是否相符（例如電阻電容選擇 0805 或 0603 SMD 封裝）。在元件搜尋選單中，都能預覽焊盤與腳位等詳細規格。

> 💬 **原文字幕**：megahard mixer of de package that to my for your component in this case you something for you to her sister's en capacitors en je kunt u de patch de bedden en mooie formation in the search mijn je voor

**[05:03]**
每個電路模組都必須有接地（GND）連接以及至少一組電源（VCC）。在左側常用元件工具列中，可以直接選取 Ground（GND）與 VCC 符號。

> 💬 **原文字幕**：iets component of sorge tool heb een gramm connection en het liefst want power connection for that goal de i love barry' on the left side and you heb de ground in de bcc' ipad

**[05:16]**
將電源符號放置在電路對應端。所有連接到相同 GND 符號的端點，在電氣邏輯上都會自動相連在一起，不需要拉長長的電線滿圖跑。

> 💬 **原文字幕**：zodra close to your site de part of dus ook in de header gran icon connected to be connected to gather wat deed u hebt toegang acteurs en dj neem of one of them they would be connected to care anymore

**[05:30]**
現在我們來進行線路連接。在工具選單中點選「導線（Wire）」工具，在第一個引腳點一下，再點第二個目標點，兩者便會以導線連通。

> 💬 **原文字幕**：na let's make up you can access van de tools mijn you select the wire hoedjes de voorstoel klik de post point and then to the second point and now the connected one to each other and you can see and using

**[05:44]**
但如果電路很複雜、拉滿了密密麻麻的走線，整個原理圖會變得極度凌亂且難以閱讀。為了解決這個問題，

> 💬 **原文字幕**：more the program icons zal die dwars aarde zien oké nou heb of you can access wat weet niet meer hoe het laat op wired sg met ik will be ugly and you won't be able to understand ik zo voor dead to

**[05:58]**
我們應善用「網路標籤（Net Label / Net Port）」。從選單中選取網路標籤工具放置在導線上，雙擊名稱修改（例如命名為 RESET），

> 💬 **原文字幕**：use de labels zo'n aselecte net poort tools van de men you place that om de thematiek en nood doubleclick de neem in change it all neem dit voor simpele reset now and connect it to the first point

**[06:12]**
然後使用 Ctrl+C / Ctrl+V 複製到另一個目標引腳上（可按空白鍵或 R 鍵旋轉方向）。只要兩端標籤名稱相同，電氣邏輯上就會自動連通，而不需要實體畫線穿過整個畫布！

> 💬 **原文字幕**：than a copy de poort wit ctrl-c en ctrl-v geef je niet you can press the articulo die tijd en place the container site nam ik de connections and now the part of dus ook it is connected to the pieces

**[06:25]**
使用網路標籤，即便電路再複雜，也能保持原理圖清爽俐落、極具可讀性。大家可以在我之前的許多複雜專案中看到這種規範做法。

> 💬 **原文字幕**：x of get back a cheap hotel garbi wire zo using this net ports week in greater good looking skin magic key van ivoor heffen laptop connections and you can see hier in man of my schematisch voor project apple laat of connections wat u

**[06:40]**
這讓檢視原理圖的人能一目了然：RX 連接至 TX、D2 連接至對應腳位等等。好，完成了基本的微控制器外圍最小系統配置，

> 💬 **原文字幕**：geeft veel meer this comment ik die kunt meer nodig dat die heks is connected to let the ex die to to the two en zo lang oké nou geef de baby configuratie en of dit mee gaat ie en dan lijkt de kool ziet in de

**[06:51]**
我們在畫布上可以將不同功能模組分區規劃（電源模組、輸出介面等）。但如果需要的特殊元件在庫存中完全找不到，該怎麼辦？現在我們就來示範如何「從零自製客製化元件」！

> 💬 **原文字幕**：subreddit square en die bij met commenting to mobile part for power voor output missies en zo waar wat nou wat de bouw typ je de ontvang de component dat je niet zo lets see how to make waren led

**[07:05]**
假設你使用的是一顆特殊的 32 腳晶片，在線上庫存中找不到。你可以在 Google 搜尋該晶片的 Datasheet，查閱它的原理圖符號與 PCB 封裝尺寸。首先我們來繪製「原理圖符號（Symbol）」：

> 💬 **原文字幕**：zei dat je hebt mega toegang tot en planeet en kampioen dat het papier in de ideale library je hebt oesters die component a om google en koppen die layout size beach life dsm diverse zo di sicilia led voor smeek de symbool voor

**[07:22]**
點擊「檔案」➔「新建符號（New Symbol）」，開啟符號編輯器。點選「引腳（Pin）」工具，一顆 32 腳晶片每側有 8 個接腳。點擊放置引腳，可按空白鍵或 R 鍵旋轉方向，

> 💬 **原文字幕**：dat we klik file nieuw scan met ik liep en let atom pins klik de pin tool je hebt make-up toe aan dit tempo nieet hester die doe is episch om niet site voor sta ik weet wiens nou bij press the archy en ik bleef via

**[07:38]**
依序將 1 到 32 號引腳排列整齊。接著選取「矩形（Rectangle）」工具畫出晶片主體外框，並將接腳編號與名稱適當排版。

> 💬 **原文字幕**：de pins tillen get up to turkey to know selector rectangle tool and let me go rectangle shape hij moest de pi number insight andere tango

**[07:51]**
雙擊文字即可修改引腳名稱（如 VCC、GND、數位/類比 GPIO 等）。請注意：【引腳名稱（Pin Name）】可以依功能修改，但【引腳編號（Pin Number）】絕對要嚴格對應晶片 Datasheet！

> 💬 **原文字幕**：je kunt chaise die neem op de people tekst en net labels a jazzmusici grand digital pin sensoa nietwaar dus dubbelklik op de tekst kies de neem en press enter wat donjames de pi number

**[08:04]**
定義完成後，將原點放置在符號中心。符號畫好後點擊「儲存（Save As）」，輸入元件名稱（如 ATmega328P-AU）與描述後儲存。

> 💬 **原文字幕**：net zwelling portland familie hebt en ik de calm but a region to and play ziet wordt de symbolen you will be one de symbool is ready go to file save as en dan hardop je waarneemt en de discriptie nu toe maar ook die van neemt het is

**[08:18]**
符號建好後，下一步至關重要：我們必須為這顆元件建立對應的「PCB 封裝（Footprint / Package）」。點選「檔案」➔「新建封裝（New Footprint）」，開啟封裝編輯器。

> 💬 **原文字幕**：simpel het make-up toe aan de tentoon epi en you and click save nou het to make de pcb layout voor dit component voor that will go to file nieuw busy bee liep dit wil op en je design

**[08:33]**
打開晶片的 Datasheet，查看封裝尺寸圖（引腳間距 Pitch、焊盤長寬、跨距等）。首先在畫布上按右鍵，確認工作單位設定為「公釐（Millimeters / mm）」。

> 💬 **原文字幕**：nou op het dit mee gaat u gaan dit en tony die te chique jullie heb al die die mensen het voor arbeid de week dat distance de placement en zo lang voor smeagol right-click onder kan was and make sure that work in

**[08:47]**
選取「焊盤（Pad）」工具，在畫布上放置第一個焊盤。在屬性面板中將其型態設為 SMD 表面黏著焊盤，圖層設為頂層銅箔（Top Layer）。

> 💬 **原文字幕**：millimeters hoe u niet dat die toe sm die tijd voordat klik repair tool place want bij het onder design ze legden bed and change het vermoeden layer totaal player

**[09:00]**
依據規格書將焊盤寬度與高度設定準確（例如寬 0.4mm、長 1.5mm），輸入至屬性面板的 Width 與 Height 欄位中。

> 💬 **原文字幕**：nautisch dossier van rand rectangle onder details you can see the light of the parties pin for milliliter en de lunch op een servet de familie mieters zoon heeft to play this measurement hier in de wit and height

**[09:12]**
接著設定第一個焊盤的 X/Y 座標為基準點。接著利用陣列或座標間距功能，根據規格書中的 Pitch（腳距，如 0.8mm）等距複製其餘焊盤。

> 💬 **原文字幕**：bent kies de folder met suspension tuschinski oh my naam is zodat de voor spijt easing de duo positie nou doe ik een keer de pijp en rotate jeans de white positie of de zijkant bij het domein is er op punt 1 mm

**[09:27]**
在 Y 軸方向等距排列出該側所有接腳。完成一側後，複製整排焊盤，旋轉 90 度並依據對邊跨距移動到另一側，依序建置出 32 個 SMD 焊盤。

> 💬 **原文字幕**：wie cassette distance between tapijt het u kunt zich hieronder detacheert over t is de number of de bij toe doet is een voor een piens of the great things planeet millimeters in de why the action now duplicator

**[09:42]**
務必對照規格書檢查相對引腳之間的跨距中心線距離是否分毫不差。

> 💬 **原文字幕**：tapijt en move them suffer formido cindy ex directie check of de distance is onder datasheet en publiek in de vaatwasser en dat die stadsbus in de perpendiculair pins is easy tot en

**[09:54]**
計算焊盤邊界與外框距離，確保元件實際焊接時有足夠的錫膏附著面積。

> 💬 **原文字幕**：is ie moet je eens naar dit thuis begint opeens moet diep bij eet van uw armen zo strak dat resort and the white mij toe luisa meir of de pep wiet en heb of de patiënt en loopt in soepel naar milliliters

**[10:09]**
排列完成後，確認引腳編號（1 到 32）順時針或逆時針排序與規格書完全一致。接著切換至「頂層絲印層（Top Silkscreen Layer）」，使用線條工具畫出晶片主體外框線，

> 💬 **原文字幕**：zo moest het op een super na een aparte verticaal tijd en debat en patch op een aan builder artikel pijn sinds op de pins naambord voor man doet er niet toe nou het is de leert toe dat absil player now click desk where to and dry square

**[10:24]**
並在第 1 腳附近畫一個小圓點作為第一腳方向防呆標記。儲存此 PCB 封裝。現在回到先前繪製的「原理圖符號」編輯頁面，點選屬性欄中的「封裝（Package）」綁定按鈕，

> 💬 **原文字幕**：and give the icy shape live de micro four third oh en in die keten first biedt ook en ander menu en selecteer key van neemt u de leo en kliksafe now go back to the symbol eddy hier klik de package bottom

**[10:43]**
搜尋並選取剛才做好的 PCB 封裝。這時 EasyEDA 會自動將原理圖符號的接腳編號與 PCB 封裝的焊盤編號一一關聯綁定！點擊更新，自製元件便大功告成！

> 💬 **原文字幕**：search for de neem of de package has just great as you can see was wissel ik de layout is hoe meet de connections begin de pins number en de pet automaten clay nou klik op date in elk component is

**[10:55]**
未來遇到任何特殊感測器或連接器都能以此法自製。在佈局前，可使用「量測工具（Measurement Tool）」再次複查尺寸與腳距。

> 💬 **原文字幕**：ready je kunt u dus een voor die ipay barshens jeugdliefde pet voor boot layers oh het folie die mensen zonder detacheert en over double check using the measurement to selected en meisje

**[11:09]**
現在我們將原理圖中所有需要的元件放置妥當，並用網路標籤（Net Ports）完成所有訊號與電源連線。

> 💬 **原文字幕**：doel en measure oké naar je co2 wheat and use de component hij prees al die componisten die niet en uhm ik de kon executing de net poort youtube heeft modi korporaals just copy

**[11:22]**
檢查各電壓軌（3.3V、5V、GND）標籤無誤後，整個原理圖就完成了！下一步就是將原理圖正式轉換為 PCB 佈線！

> 💬 **原文字幕**：and psd bcc' icon and chase de nee voor het apple ik weet dat die franse by of truc met rebholz en indesign 2-point rear and now the sea statief en connection en de musici die kern zit dus kom uit i can now kempis tot de pcb

**[11:37]**
點選上方功能表「設計」➔「原理圖轉 PCB（Convert Schematic to PCB）」。這會建立一個全新的 PCB 佈線檔案，第一步同樣是立刻點擊「儲存」，

> 💬 **原文字幕**：layout voordat klikken wordt op i see the button in de tab many je dit wilt great een nieuw pcb design and once again the first thing you had to steeg naar design zo klik de save-button'

**[11:50]**
將其儲存在專案資料夾中，命名為「PCB1」。這時所有元件的焊盤與外觀都會出現在畫布外圍，連帶著藍色的飛線（預拉線 / Airwire）。在開始擺放零件前，提供幾個核心工程技巧：

> 💬 **原文字幕**：selecte project folder in this case arduino reed receiver die van neemt toe de pcb voor het sample alleen this one pc the one and grey leuk en place of the component wherever you want but let me give you some tips

**[12:05]**
【元件佈局關鍵心法】：
1. 核心 IC（如 MCU）引腳最多、連接最繁複，優先放置在電路板中央。
2. 連接器（Connectors）、排針、USB 埠與端子台，應擺放於電路板邊緣，方便插拔插線。
3. 將同一功能模組的周邊元件（如電源穩壓電路、去耦電容、分壓電阻）集中放置在對應晶片引腳附近，走線越短越好。

> 💬 **原文字幕**：die acties en component hoe de laat of connections try to place dood in de middle of de pcb de connectors en de poort spread to play store tolerante primair of de pcb feite organize de poll elements such a

**[12:18]**
在畫布上按右鍵進入畫布屬性設定，確認工作網格與單位設定為公釐（mm）。

> 💬 **原文字幕**：great earth de fusies wordt is dividers en zo warm oh my site op de pcb en mensen bij de walvis toen de dief een component make or right click onder great and select de camera set reboot

**[12:31]**
接下來設定「電路板外框（Board Outline）」：點選工具列的邊框工具，可畫出矩形、圓形或任何客製化造型外框。

> 💬 **原文字幕**：angie's de units toen millimeters jump jazz de pc pc klik de tools mijn nieuwe om tab en selecteer bord outline you can make you sweat angler ground or an rectangular like this one but each

**[12:45]**
透過雙擊外框線上的節點，可以隨意拖拉形狀，調整出專案外殼所需的特殊電路板尺寸。有了外框與擺放好的零件後，接下來就是佈線（Routing）。

> 💬 **原文字幕**：one to the vital unique shape select force de bord outline den dubbelklik en net en uw point nu can move the point where ever you want and gefinancierd met uw aan het oké nou dat wie haar de passie die outline en die

**[12:59]**
佈線方式有「自動佈線（Auto Router）」與「手動佈線（Manual Routing）」。雖然 EasyEDA 提供自動佈線功能，可設定線寬（Track Width）與間距（Clearance），

> 💬 **原文字幕**：component in place about woning je hebt de meeste doelwijt automatiek routing karmagnole voor open met ik just go to detail and you and select the alto water hier ik en selectie settings such as de trap wit en

**[13:14]**
甚至能針對特殊電源網路（如 VCC、GND）設定較粗的線寬（如 0.4mm 或更寬），一般訊號線設為 0.25mm，

> 💬 **原文字幕**：de kleur is wit minder trucks what did you go into a special net mijn you you can mix en tricks to be different app die ouders die mensen dit uw mind blown impliciet right to be of war mm en de rest of the report to

**[13:27]**
但身為專業工程師，我強烈推薦【手動佈線】！手動佈線才能掌握訊號路徑、減少干擾。點選「導線/走線（Track）」工具，設定好走線寬度即可開始拉線。

> 💬 **原文字幕**：willen mieters just play store gran en bcc' gier en mick doohan mm nou gieter one button en die potten met curator de connect shows how you feel i prefer to this man yo voor that get the wire to select the wit

**[13:42]**
走線過程中若遇到障礙，可隨時切換頂層/底層，軟體會自動生成「過孔（Via）」進行換層穿透。
【佈線黃金法則】：
★ 轉角務必走 45 度角，絕對不要走 90 度直角（以避免高頻阻抗不匹配與酸角腐蝕問題）。

> 💬 **原文字幕**：of de track en start routing might change roman leert to the other in de mijn you need to automatically great of via for you sos en tips he the mind het is al is better to make of forty five degrees

**[13:55]**
避免大面積平行長走線以降低寄生電容與串音干擾（Crosstalk）。電源線與大電流路徑盡可能加粗，以承受負載電流。

> 💬 **原文字幕**：enkel voor de tracks and try to never make de net iguy singles alsof hij the mind i capacité dat die crash course the players en de risico's voor perlon tracks oh so to make up altrex alleen a big

**[14:09]**
務必了解代工廠的製程極限（如最小線寬/線距能力）。若工廠極限是 0.15mm，而你畫了 0.1mm，打樣時就會被退件或導致斷線瑕疵。

> 💬 **原文字幕**：dikker en check dat design roelof dam en vector the quest for example if you may affect work and great straks more than the online millimeters en je header op een warme winter straks on your busy bee

**[14:20]**
如果某些大電流走線需要額外吃錫來增強導電能力，可以在阻焊層上設置開窗暴露銅箔（Solder Mask Opening），這樣焊接時表面就能直接掛錫。

> 💬 **原文字幕**：nee would be able to make that pcb en cancel your order the gimp exposure tries to be able to get some solar ontap jessel ik de draak met u want ik s'pose en giet ik s'pose kapper but that to make that works like this

**[14:34]**
好，走線大致完成後，電路板設計最重要的一步就是【大面積鋪銅（Copper Pour / Ground Plane）】！選取「鋪銅區域（Copper Area）」工具，

> 💬 **原文字幕**：zo u kunt een extra soldeer ontap in order to this time or current oké finally getting this well placed en de tracks armen zo week en philip is het nieuwe kapper voordat dit de kapper area to and quick

**[14:47]**
框選整塊電路板外圍，網路選擇連接至「GND」，對頂層與底層分別執行鋪銅。整塊板子的空白區域便會被接地銅箔完整覆蓋。

> 💬 **原文字幕**：de score van de pcb conducteur site then choose de debatten leer en doelen cm en nou bot leert hoe beviel goed kapper om i feel de pcb het kapper die twan en niet die sap share some signs for long

**[15:01]**
鋪銅不僅能提供極佳的電磁抗干擾（EMI Shielding）屏蔽效果，還能大幅降低接地阻抗，強化散熱能力。接著進行至關重要的【設計規則檢查（DRC - Design Rule Check）】：

> 💬 **原文字幕**：nooit voor ieder devices for example you might want to leave de pcb wie dat de kapper en ria familie jack liefhebber ding is oké ronde design group check zo voort foto de top menu en selecteer

**[15:13]**
在頂部選單開啟設計規則檢查，點選 DRC 驗證。軟體會全面掃描是否有未連接的走線、線距過近或短路錯誤。若檢查結果顯示 0 個錯誤（0 Errors），代表電路完全合格！

> 💬 **原文字幕**：design roel hier iets uit die die mensen het formulier mijn factuur safe niet en nooit had to go to dat event manager tampon de website klik die eronder lies en roos en ros check je hebt en yared is fictie en heeft net you're good to go

**[15:30]**
儲存檔案，點擊選單上的「生成製造檔案（Gerber）」按鈕。你可以選擇直接在 JLCPCB 下單，或下載包含完整層別資料的 Gerber ZIP 壓縮檔。

> 💬 **原文字幕**：steek de file and then click degenerate körber button om de tab mijn you hear you could greatly of door de baby van jersey pgb of sleep de geur borst in de zip-file de taal of the fire nou goed de gp's ibi en colt nou

**[15:46]**
在 JLCPCB 網站上傳 Gerber ZIP 檔，系統會自動解析電路板外觀並即時顯示 3D 預覽。選擇板厚（如 1.6mm）、阻焊漆顏色（綠、藍、黑、白、紅等），加入購物車結帳，幾天後就能收到做工精美的成品板！

> 💬 **原文字幕**：upload a file i heb jotaro die commissie idee select de pcb settings such as ignace de color en zo warm make do check out and white for the busy bee store ai is that easy life should

**[16:00]**
這就是從創意發想、原理圖繪製、自製客製化元件、PCB Layout 佈線鋪銅、到工廠打樣的完整流程！希望這些實戰技巧能對大家有所幫助。若有任何問題，歡迎在下方留言交流。

> 💬 **原文字幕**：know how to get from idea to scan magic en bent op pcb design and order upc be afraid to give you some tips en zowel en of social had to make the component in easy idee youtube heb een extra question just live build a video over

**[16:15]**
若需要相關連結或打樣服務優惠，請查看下方資訊欄。再次感謝所有在 Patreon 上支持我的朋友與訂閱者。

> 💬 **原文字幕**：check de link below and customer support in mijn werk om pedro eijssen op de graphite voor odp python this channel what you guys en niet lek this tutorial coursera subscribing

**[16:25]**
如果喜歡這支教學影片，請別忘了按讚、訂閱並分享！非常感謝大家的收看與支持，我們下一支影片見！

> 💬 **原文字幕**：and give a like to this video zo denken we rewatch for your support door mijn petrus en om eso's cry bars tanks en en ziel details [Muziek]

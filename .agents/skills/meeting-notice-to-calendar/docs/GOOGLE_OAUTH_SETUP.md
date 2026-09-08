# Google 日曆 API 授權金鑰設定指引 (OAuth Setup Guide)

為了讓 AI 能代表您安全地登錄、查詢與管理個人或學校的 Google 日曆，必須依循 Google 官方的安全機制建立一組私密金鑰（OAuth 2.0 用戶端憑證）。

全程大約只需 3~5 分鐘，只需設定這一次，未來即可全自動對話登錄！

---

## 步驟一：進入 Google Cloud 控制台並建立專案

1. 開啟瀏覽器，前往 [Google Cloud Console](https://console.cloud.google.com/)。
2. 登入您希望同步日曆的 Google 帳號（個人 Gmail 或學校 Workspace 帳號皆可）。
3. 點選頂端導覽列的專案下拉選單，點擊 **「新增專案 (New Project)」**。
4. 專案名稱輸入：`School-Calendar-Helper`（或自訂名稱），點選 **「建立 (Create)」**。
5. 建立完成後，確定上方專案切換為剛剛建立的專案。

---

## 步驟二：啟用 Google Calendar API

1. 在上方搜尋列輸入 `Google Calendar API`，或點選左側選單：**「API 和服務」 $\rightarrow$ 「程式庫 (Library)」**。
2. 找到 **Google Calendar API**，點擊進入。
3. 點選藍色按鈕 **「啟用 (Enable)」**。

---

## 步驟三：設定 OAuth 同意畫面 (OAuth Consent Screen)

1. 點選左側選單的 **「OAuth 同意畫面 (OAuth consent screen)」**。
2. 使用者類型（User Type）選擇 **「外部 (External)」**，點選「建立」。
3. 填寫基本資料：
   - **應用程式名稱**：輸入 `Antigravity 日曆助理`。
   - **使用者支援電子郵件**：選擇您的 Google 信箱。
   - **開發人員聯絡資訊**：填入您的 Google 信箱。
   - 點擊「儲存並繼續」。
4. **範圍 (Scopes)**：直接點「儲存並繼續」（預設即可）。
5. **測試使用者 (Test users)** ⭐️【非常重要】：
   - 點擊 **「+ ADD USERS (新增使用者)」**。
   - 輸入**您自己的 Google 信箱**（必須與您要同步日曆的帳號一致）。
   - 點擊「儲存並繼續」，最後點「返回資訊主頁」。

---

## 步驟四：建立 OAuth 2.0 用戶端憑證

1. 點選左側選單的 **「憑證 (Credentials)」**。
2. 點擊頂端的 **「+ 建立憑證 (+ CREATE CREDENTIALS)」** $\rightarrow$ 選擇 **「OAuth 用戶端 ID (OAuth client ID)」**。
3. **應用程式類型**：請務必選擇 **「桌面應用程式 (Desktop app)」**。
4. 名稱可保留預設（例如：`電腦版用戶端 1`），點擊 **「建立 (Create)」**。
5. 建立完成後會彈出視窗，點選 **「下載 JSON (DOWNLOAD JSON)」**。

---

## 步驟五：放置憑證檔並完成一次性授權

1. 將下載回來的 JSON 檔案改名為：
   `gcp-oauth.keys.json`
2. 將該檔案移動到以下指定目錄（此目錄已自動為您建妥）：
   `C:\Users\user\.config\google-calendar-mcp\gcp-oauth.keys.json`
3. 告訴 AI：「**我已經把憑證檔放好了！**」，或自行在終端機執行：
   ```cmd
   npx @cocal/google-calendar-mcp auth
   ```
4. 瀏覽器會自動彈出 Google 登入畫面：
   - 選擇您的 Google 帳號。
   - 若出現「Google 尚未驗證這個應用程式」警告，請點選 **「進階 (Advanced)」** $\rightarrow$ **「前往『Antigravity 日曆助理』（不安全）」**。
   - 勾選並點擊 **「允許 (Continue / Allow)」**。
5. 出現授權成功提示後，即全數設定完成！憑證會自動儲存於本機。

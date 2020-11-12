# NodeJs_Project_1
# [實作會員系統]

***ＭＶＣ架構***
- Ｒouter:    1.處理 Client 請求進來的 URL 位址。
              2.並將 Client 傳進來的 參數 ，交給Controller處理。

- Controller: 1.處理Ｒouter傳來的參數(也是Ｃlient的傳來參數)，例如：密碼加密、檢查email格式、
              設定JWT Token等等。
              2.並依照Ｃlient需求，透過 Models 執行SQL指令，向資料庫拿取資料，
              最後將資料Response給Client端。
              3.寫成一個Class，讓 Router 調用Class裡的Function。

- Models:     1.執行SQL指令，向資料庫拿資料。(使用promise技術)
              2.寫成Function 包住 promise，此Function將會在Controller被調用。

- Views:
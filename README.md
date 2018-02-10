# nemfolio
NEM-sdkで取得してきたハーベスト情報を表示するサイト。  
「アドレスを追加する」から自分のアドレスを追加してみてください。  

[DEMOはこちら](https://nemfolio.net)


# 概要

NEM APIの勉強をしたかった。  
ハーベストの状態、総数、報酬額を表示する。  
アドレスはlocalStorageに保存しているのでブラウザを閉じても再度表示が可能。  
データ取得タイミングはアドレス切替時、サイトを開いた時

# メモ

・現在、httpsに対応しているノードは少ない。Firebase Hosting + PWAだと障害になるので、対策が必要。  
・NEM APIでデータを取得するのは簡単。後はデザインセンスが問われる・・・。  

# 開発環境
cli packages: (/usr/local/lib/node_modules)  
  
    @ionic/cli-utils  : 1.19.1  
    ionic (Ionic CLI) : 3.19.1  
  
local packages:  
  
    @ionic/app-scripts : 3.1.6  
    Ionic Framework    : ionic-angular 3.9.2  
  
System:  
  
    Node : v8.6.0  
    npm  : 5.3.0  
    OS   : macOS High Sierra  
  
Misc:  
  
    backend : legacy  


# その他 
コードについてあまり綺麗でないという印象を持ったなら恐らくその通り、最後の最後でstore周りでバグにハマった。  
あれこれ、いじっているうちに日付けが変わり、やっとの思いで解決できたのだ。  

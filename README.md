# Docomo ハッカソン 2024

## これは何

Docomoハッカソンで使うベースアプリケーションのリポジトリ

## プロジェクトの開始

本レポジトリはAmplify DocsのQuickstart（React）を参考にして作成しています。（下記の環境構築な説明で不明な場合はドキュメントを参照ください。）

https://docs.amplify.aws/react/start/quickstart/

## 環境構築

AWSのアカウントにログイン後、リンクにアクセス

https://ap-northeast-1.console.aws.amazon.com/amplify/apps/d32eihk3oqeasd/branches/main/deployments

下記の画面に移動してamplify_outputs.json fileをダウンロード

<img width="701" alt="image" src="https://github.com/user-attachments/assets/63d8c649-eb8d-46a2-9410-6f8b6a594c09">


自分のPCでレポジトリの内容をcloneして、npmをinstall

```
git clone https://github.com/<github-user>/amplify-vite-react-template.git
cd amplify-vite-react-template && npm install
```


同様の構成になるようにダウンロードしたamplify_outputs.json fileを配置。
```
├── amplify
├── src
├── amplify_outputs.json <== backend outputs file
├── package.json
└── tsconfig.json
```

```
npm run dev
```

を実行するとhttp://localhost:5174/ で開発環境が立ち上がります。


## 環境セットアップガイド

devcontainer環境での作業を推奨します。npm installを手動で実行する必要はありません。コンテナ起動時に依存関係は自動的にインストールされます。また、コンテナ内にプリセットされているNode.jsのバージョンを使用してください。異なるバージョンでnpm installを実行すると、互換性の問題によりエラーが発生する可能性があります。

## ドキュメントの自動生成について

docs/swagger/document.yamlを修正した時に自動的にjson変換するには、Run on SaveというVisual Studio Codeのプラグインをインストールする必要があります。

仕組み的には、yamlの保存を監視し、保存されたら変換を実行するというものです。

こちらの設定は、.vscode/settings.jsonに記載してあるemeraldwalk.runonsaveで定義しています。

また、自動的に実行する方法以外にも以下コマンドでyamlファイルを変換することができます。

```
npm run docs
```

#### swagger-uiの起動

```shell
npm run swagger
```

こうすると、以下のように出力されます。
Your server is listening on port 8080 (http://localhost:8080)
Swagger-ui is available on http://localhost:8080/docs

./docs/swagger/README.mdを参照してください。

#### swagger-uiを使ってデバッグする。

デバッグしたい時を参考に、アプリケーションを実行しておきます。
ブレークポイントを置いた状態で、swagger-uiの画面でAPIを実行します。

document.yamlで以下確認してください。
このURLに対して、swagger-uiからAPIを実行します。

```yaml
servers:
  - url: http://localhost:7071/api
```

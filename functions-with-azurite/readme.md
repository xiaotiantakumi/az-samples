# Azure Functions with Azurite - Blob Trigger Example

このプロジェクトは、Azure Functions と Azurite を使用して Blob トリガーの実験をローカル環境で実行するためのものです。コンテナ環境を使用して、簡単に Azure Functions の開発を行えるようにしています。

## プロジェクト構成

- `docker-compose.yml`: ローカル開発環境を構築するための Docker Compose ファイル。
- `devcontainer.json`: Visual Studio Code の Remote - Containers 環境設定ファイル。
- `Dockerfile`: 開発用の Docker コンテナイメージの定義。
- `src/functions/storageBlobTrigger.ts`: Blob トリガーの Azure Functions の実装。
- `package.json`: プロジェクトの依存関係とスクリプト。

## セットアップ

1. このリポジトリをクローンします。

   ```bash
   git clone xxx
   cd functions_with_azrite
   ```

2. Visual Studio Code を開き、`.devcontainer`フォルダがあるディレクトリで Remote - Containers を使用して開発コンテナを起動します。

3. コンテナが起動したら、以下のコマンドを実行して依存関係をインストールします。

   ```bash
   npm install
   ```

4. Azure Functions Core Tools がコンテナ内にセットアップされているため、ローカルで Azure Functions を実行できます。

   ```bash
   npm start
   ```

## Blob トリガーの実行

1. Azurite はローカルでエミュレートされた Azure Storage サービスを提供します。Blob トリガーは、`work/{name}`というパスの下で指定された Blob を監視します。

2. 以下のコマンドを実行して、Azure Functions を起動します。

   ```bash
   npm start
   ```

3. `src/functions/storageBlobTrigger.ts`では、Blob がアップロードされるとそのサイズと名前をログに出力する処理が実行されます。

## デバッグ方法

このプロジェクトは、VSCode のデバッグ機能を使用して Azure Functions をデバッグできます。以下は、デバッグの手順です。

1. デバッグ環境を起動するには、VSCode の「デバッグ」タブを開き、`Debug Azure Function`構成を選択して起動します。

2. デバッグ中は、ブレークポイントを設定して、コードの実行をステップごとに確認することができます。

3. `Attach to Node Functions`を選択することで、Azure Functions のホストにアタッチしてデバッグも可能です。

## よくある問題

- **コンテナが起動しない場合**: `docker-compose`コマンドの出力を確認し、エラーがないかチェックしてください。
- **Blob トリガーが動作しない場合**: Azurite が正しく起動しているか確認し、ポートが競合していないかチェックしてください。

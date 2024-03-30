# ビルド・実行方法

## 環境構築

環境構築の手順は、以下のステップの通りです。

1. Gitのインストール
2. Node.jsのインストール

### 1. Gitのインストール

- 以下のサイトからgitをインストールしてください
  - **すでにgitが入っている人はインストール不要です**
  - [Git - Downloads](https://git-scm.com/downloads)

### 2. Node.jsのインストール

インストールするNode.jsのバージョンは「`18.16.0`」以上にしてください。

#### Windowsの場合

Windowsの場合はnodistでNode.jsのバージョンを切り替えると便利です。既存のNode.jsがインストールされている場合は、先にNode.jsをアンインストールする必要があります。

1. 以下URLにアクセスし、インストーラーのexeファイルををダウンロードして、インストールする。
   1. https://github.com/nullivex/nodist/releases
2. コマンドプロンプトを起動
3. コマンドプロンプトで以下のコマンドを実行し、**Node.jsをインストール**する

```
nodist [バージョン]
```

4. コマンドプロンプトで以下のコマンドを実行し、**Node.jsとnpmのバージョンを合わせる**

```
nodist npm match
```

#### Macの場合(Node.jsのインストール)

- `nodenv`のインストール

  - [公式ドキュメント](https://github.com/nodenv/nodenv#installation)に沿って、インストールを行なってください

- のインストール

```
$ nodenv install [バージョン]
$ nodenv global [バージョン]
$ nodenv rehash

$ node -v
 [バージョン]
```

# ビルド・実行方法

## ビルド方法

### ①Github からクローンする

Github からクローンし、必要なブランチをチェックアウトする。
Branchの構成は、開発者情報を参照してください

### 環境変数の設定

ステム固有の設定ファイルはリポジトリに含まれていないため、以下の手順で設定ファイルを作成する

client 直下に、.env ファイルを作成し、以下の内容を記述する

```

# DBに接続するためのURLを記述してください。
# 具体的なURLは別途チームLINE等で確認してください
DATABASE_URL=[DBへのURL]


# Next Authに関係する情報です
NEXTAUTH_SECRET=[暗号化キー]
NEXTAUTH_URL=http://localhost:3000

# 外部ログイン機能用の情報
# ※ここは開発中です。外部ログイン機能実装後に必要になります。
# (今は設定してもしなくても動作に影響ありません)

GOOGLE_CLIENT_ID=[GOOGLE_CLIENT_ID]
GOOGLE_CLIENT_SECRET=[GOOGLE_CLIENT_SECRET]

GITHUB_ID=[GITHUB_ID]
GITHUB_SECRET=[GITHUB_SECRET]

```

### ②DB の作成

ローカル開発時、DBをオンライン上の開発用DB(Planet Scale)ではなく、
自分のローカル環境のDB等に接続したい場合は、以下のコマンドでDBを更新してください

更新方法①
Planet Scale更新時

```bash
>npx prisma generate
>npx prisma db push
```

更新方法②

```bash
>npx prisma generate
>npx prisma migrate dev --name [任意の名称]
```

### ④ビルド・実行

以下のコマンドを実行する

```bash
>npm install
>npm run dev
```

#### ストーリーブック起動方法

※現状インストール未インストール後を想定して記載しています。
Storybook は、フロントエンドの UI を検証するためのツールで、以下のコマンドで起動する

```bash
> cd client
> npm run storybook
```

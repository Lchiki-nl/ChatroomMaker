# チャットアプリケーション：要件定義と仕様書

## 1. 要件定義

### 1.1. 目的

ユーザーが自由にチャット風の会話画面を作成、編集、閲覧できるウェブアプリケーションを提供します。特に、特定の人物（自分・相手）になりきってメッセージを追加したり、既存のメッセージを詳細に編集したりするニーズに応えます。表示設定のカスタマイズ機能も提供し、多様なシナリオでの利用を可能にします。

### 1.2. ターゲットユーザー

* チャット風の会話シミュレーションを作成したい**個人ユーザー**。
* 物語やシナリオの作成、コンテンツ制作にチャット形式を取り入れたい**クリエイター**。
* シンプルなUIでチャット画面を素早く生成・編集したいユーザー。

### 1.3. 主要機能

* **自分と相手のチャットメッセージの追加機能**。
* **既存チャットメッセージのテキスト内容、既読数、送信時刻の編集機能**。
* **既存チャットメッセージの削除機能**。
* **人物（相手側）の追加、名前の編集、アイコンの変更、削除機能**。
* **自分および相手のアイコン変更機能**（絵文字選択）。
* **チャットルーム全体の表示設定**（ルーム名、吹き出し色、文字色、背景色、ヘッダー色）のカスタマイズ機能。
* **自動既読モード**（相手の人数に応じて既読数を自動設定）。
* **表示のみモード**（編集・投稿UIを非表示にする）。

---

## 2. 仕様書

### 2.1. 機能一覧

| 機能カテゴリ | 機能名         | 詳細                                                              |
| :----------- | :------------- | :---------------------------------------------------------------- |
| **メッセージ** | メッセージ追加 | 自分または選択した相手として新しいチャットメッセージを追加する。  |
|              | メッセージ編集 | 各メッセージのペンアイコンからテキスト、既読数（数字入力）、送信時刻を編集する。 |
|              | メッセージ削除 | 各メッセージのゴミ箱アイコンからメッセージを削除する。            |
| **人物管理** | 人物追加       | 相手側に新しい人物を追加する（名前、ランダムな初期アイコン）。      |
|              | 人物選択       | メッセージ送信時に、追加された人物の中から送信者を選択する。      |
|              | 人物編集       | ユーザー管理モーダルで人物の名前やアイコンを変更する。            |
|              | 人物削除       | ユーザー管理モーダルで人物を削除する。                            |
| **表示設定** | チャットルーム名変更 | ヘッダーのチャットルーム名を変更する。                            |
|              | 吹き出し色変更 | 自分の吹き出し、相手の吹き出しの色を個別に変更する。              |
|              | 文字色変更     | 自分の吹き出し、相手の吹き出しの文字色を個別に変更する。          |
|              | 背景色変更     | チャットルームの背景色を変更する。                                |
|              | ヘッダー色変更 | ヘッダーの背景色、文字色を個別に変更する。                        |
|              | 自動既読モード | ONにすると、相手の人数（1人なら既読、2人以上なら既読＋人数）で自動既読を設定。 |
|              | 表示のみモード | ヘッダーの目のアイコンでON/OFF。ONで編集・投稿UIを非表示。      |

### 2.2. フォルダ構成
.
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx (エントリーポイント)
│   ├── components/
│   │   ├── Message.jsx
│   │   └── Modals/
│   │       ├── IconPickerModal.jsx
│   │       ├── ChatSettingsModal.jsx
│   │       └── UserManagementModal.jsx
│   ├── hooks/
│   │   └── useChatLogic.jsx
│   └── utils/
│       ├── constants.jsx
│       └── helpers.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

### 2.3. 各コードファイルの役割と処理詳細

* **public/index.html**
    * **役割**: ウェブアプリケーションの最も基本的な構造を定義するHTMLファイル。ブラウザが最初に読み込むファイルであり、Reactアプリケーションをマウントするためのルート要素 (`<div id="root"></div>`) を提供します。
    * **処理詳細**:
        * `charset="UTF-8"`: 文字エンコーディングをUTF-8に設定。
        * `viewport`: レスポンシブデザインのためのビューポート設定。
        * `title`: ブラウザのタブに表示されるページタイトル。
        * **Tailwind CSS CDN**: スタイルシートとしてTailwind CSSを外部から読み込み、アプリ全体で利用可能にする。
        * **Google Fonts - Inter**: 推奨フォント「Inter」を読み込む。
        * `<div id="root"></div>`: Reactアプリケーションがレンダリングされる場所。
        * `<script type="module" src="/src/main.jsx"></script>`: Reactアプリケーションのエントリーポイントである `main.jsx` をモジュールとして読み込む。

* **src/main.jsx**
    * **役割**: Reactアプリケーションのエントリーポイントであり、ルートコンポーネント (`App.jsx`) をブラウザのDOMにレンダリングします。
    * **処理詳細**:
        * `import React from 'react';`: Reactライブラリをインポート。
        * `import ReactDOM from 'react-dom/client';`: React DOMクライアントサイドレンダリング機能の一部をインポート。
        * `import App from './App.jsx';`: アプリケーションのメインコンポーネントである `App.jsx` をインポート。.jsx 拡張子を明示することで、Viteなどのバンドラーが正確にファイルを解決できるようにしています。
        * `ReactDOM.createRoot(document.getElementById('root'))`: `public/index.html` 内の `id="root"` を持つ要素を取得し、Reactのルートを作成。
        * `root.render(...)`: `React.StrictMode` 内で `App` コンポーネントをレンダリングします。StrictMode は開発モードでの潜在的な問題を検出するのに役立ちます。

* **src/App.jsx**
    * **役割**: アプリケーション全体のレイアウト、主要な状態管理、および各UIコンポーネントの統合を担うメインコンポーネントです。ユーザーの操作に応じて、様々なモーダルの表示制御やロジックの呼び出しを行います。
    * **処理詳細**:
        * `useChatLogic()` カスタムフックから、チャットアプリケーションのほぼすべての状態（`messages`, `otherUsers`, `chatSettings` など）とその操作関数（`handleAddMessage`, `handleEditMessage` など）を取得します。これにより、`App.jsx` 自体がシンプルに保たれます。
        * `myUser / setMyUser`: 自分のユーザー情報（名前、アイコン）。
        * `messages / setMessages`: 全チャットメッセージの配列。
        * `input / setInput`: 現在のメッセージ入力フィールドの値。
        * `currentSenderType / setCurrentSenderType`: 現在選択されている送信者のタイプ（'my' または 'other'）。
        * `otherUsers / setOtherUsers`: 相手ユーザーのリスト。
        * `selectedOtherUserId / setSelectedOtherUserId`: 現在選択されている相手ユーザーのID。
        * 各種 `show...Modal` ステート: 各モーダル（ユーザー追加、ユーザー管理、設定、アイコン選択）の表示/非表示を制御。
        * `displayOnlyMode / setDisplayOnlyMode`: 表示のみモードのオン/オフを制御。
        * `chatSettings / setChatSettings`: チャットの表示設定（色、ルーム名、自動既読モードなど）。
        * `messagesEndRef`: チャット履歴の自動スクロールのために、メッセージリストの末尾のDOM要素への参照を保持。
        * `useEffect` (自動スクロール): `messages` ステートが更新されるたびに、最新のメッセージが見えるようにスクロール。
        * `useEffect` (選択ユーザーの更新): 相手ユーザーが追加・削除された際に、`selectedOtherUserId` を適切に更新。
        * `currentPlaceholder`: 入力フィールドのプレースホルダーテキストを動的に変更。
        * **UIの条件付きレンダリング**: `displayOnlyMode` の値に基づいて、メッセージ入力エリア全体の表示/非表示を切り替えます。
        * `Message` コンポーネントに、メッセージデータ、編集・削除ハンドラー、表示設定、そして`displayOnlyMode`をプロップとして渡します。

* **src/components/Message.jsx**
    * **役割**: 個々のチャットメッセージとその詳細情報（既読、時刻）を表示し、編集・削除機能のトリガーを提供します。
    * **処理詳細**:
        * `message`: 表示するメッセージオブジェクト（テキスト、送信者、既読数、タイムスタンプなど）。
        * `onEdit`, `onDelete`: 親コンポーネントから渡される、メッセージ編集・削除のコールバック関数。
        * `isEditing` ステート: メッセージが編集モードにあるかを管理。
        * `editedText`, `editedReadCount`, `editedTimestamp` ステート: 編集モード中のメッセージの各値を保持。
        * `editContainerRef`: 編集UIのコンテナへの参照。クリックイベントの制御に使用。
        * `handleEditClick()`: 編集アイコンクリックで編集モードを開始。`displayOnlyMode`の場合は無効。
        * `handleSaveClick()`: 編集内容を保存し、編集モードを終了。`useCallback` でメモ化され、`useEffect` の依存配列に含まれる。
        * `handleKeyPress()`: 入力フィールドでEnterキーが押されたら `handleSaveClick` を呼び出す。
        * `useEffect` (フォーカス): 編集モードに入ったら入力フィールドに自動でフォーカス。
        * `useEffect` (クリック検知): 編集UIの外側がクリックされたら `handleSaveClick` を呼び出して編集モードを終了・保存。
        * `bubbleStyle`: `myBubbleColor`, `otherBubbleColor`, `myTextColor`, `otherTextColor` に基づいて吹き出しの背景色と文字色を動的に適用。
        * `getReadStatusText()`: 既読数に応じて「既読」、「既読 N」、「」（非表示）の文字列を生成。
        * **UIの条件付きレンダリング**: `isEditing` と `displayOnlyMode` の値に基づいて、メッセージの表示形式（通常表示か編集UIか）や、編集・削除アイコンの表示を切り替えます。
        * **時刻と既読の表示**: `isMyMessage` の真偽値に基づいて、時刻と既読の表示位置を吹き出しの左側または右側に調整します。

* **src/components/Modals/IconPickerModal.jsx**
    * **役割**: ユーザーがアイコンを選択するためのモーダルウィンドウを提供します。
    * **処理詳細**:
        * `availableIcons` をインポートし、グリッド形式で表示。
        * 各アイコンをクリックすると `onSelectIcon` コールバックを呼び出し、選択されたアイコンを親コンポーネントに渡してモーダルを閉じる。
        * 「閉じる」ボタンでモーダルを閉じる。

* **src/components/Modals/ChatSettingsModal.jsx**
    * **役割**: チャットルーム全体の表示設定（ルーム名、色、自動既読モード）を編集するためのモーダルウィンドウを提供します。
    * **処理詳細**:
        * `settings`: 親コンポーネントから渡される現在の設定オブジェクト。
        * `onSave`, `onClose`: 設定保存、モーダル閉じるのコールバック関数。
        * `useState` フックで、モーダル内の各設定項目（`currentName`, `currentMyBubbleColor` など）の現在の値を管理。
        * 各入力フィールド（text, color, checkbox）と選択ボックス（select）で設定値を変更。
        * `handleSave()`: 変更された設定を `onSave` コールバックで親コンポーネントに渡し、モーダルを閉じる。
        * 「キャンセル」ボタンで変更を破棄してモーダルを閉じる。
        * `max-h-[90vh] overflow-y-auto custom-scrollbar`: コンテンツが多すぎてもスクロールできるように設定。

* **src/components/Modals/UserManagementModal.jsx**
    * **役割**: 相手ユーザーの管理（名前の編集、アイコンの変更、削除）を行うためのモーダルウィンドウを提供します。
    * **処理詳細**:
        * `otherUsers`: 相手ユーザーのリスト。
        * `myUser`: 自分のユーザー情報（アイコン変更のために必要）。
        * `onUpdateOtherUser`, `onDeleteOtherUser`, `onOpenIconPicker`, `onClose`: 各操作のコールバック関数。
        * `useState` フックで、現在編集中のユーザー情報（`editingUserId`, `editingUserName`）を管理。
        * リスト形式で自分と相手ユーザーを表示。
        * 各ユーザーのアイコンをクリックすると `onOpenIconPicker` を呼び出し、アイコン選択モーダルを開く。
        * 編集アイコンをクリックすると、名前が入力フィールドに変わり、名前を編集できる。Enterキーまたは入力欄からフォーカスが外れると保存。
        * ゴミ箱アイコンをクリックすると、削除確認フローをトリガー (`onDeleteOtherUser`)。
        * `max-h-[90vh] overflow-y-auto custom-scrollbar`: コンテンツが多すぎてもスクロールできるように設定。

* **src/hooks/useChatLogic.jsx**
    * **役割**: チャットアプリケーション全体の核となるロジックと状態管理をカプセル化したカスタムフックです。コンポーネントからUIとロジックを分離し、コードの再利用性とテスト容易性を高めます。
    * **処理詳細**:
        * `useState` フックを多用し、`myUser`, `messages`, `otherUsers`, 各種モーダル表示状態、チャット設定など、アプリケーションのほぼすべての状態を保持。
        * `useCallback` を使用して、コンポーネントに渡される関数が不要に再生成されるのを防ぎ、パフォーマンスを最適化。
        * `handleAddMessage()`: 新しいメッセージオブジェクトを作成し、`messages` リストに追加。自動既読モードがONの場合、`otherUsers` の数に応じて `readCount` を自動計算。
        * `handleEditMessage()`: 指定されたIDのメッセージのテキスト、既読数、タイムスタンプを更新。
        * `handleDeleteMessage()`: 指定されたIDのメッセージをリストから削除。
        * `handleAddNewUser()`: 新しい相手ユーザーを作成し `otherUsers` リストに追加。ランダムな初期アイコンを割り当てる。
        * `handleEditUserStart()`: ユーザー名編集モードを開始。
        * `handleEditUserSave()`: ユーザー名を保存し、該当するメッセージの送信者名も更新。
        * `handleDeleteUserConfirm()`: ユーザー削除の確認を促す。
        * `handleDeleteUser()`: 指定されたユーザーを `otherUsers` リストから削除し、そのユーザーが送信したメッセージの送信者名を「(削除済み)」に変更。
        * `handleOpenIconPicker()`: アイコン選択モーダルを開くトリガー。
        * `handleSelectIcon()`: ユーザーアイコンを選択し、`myUser` または `otherUsers` の該当アイコンを更新。過去のメッセージのアイコンも更新。
        * `handleSaveChatSettings()`: チャットの全体設定を更新。
        * これらのステートと関数をオブジェクトとして返します。

* **src/utils/constants.jsx**
    * **役割**: アプリケーション全体で共通して使用される定数を一箇所にまとめて定義します。
    * **処理詳細**:
        * `availableIcons`: アイコン選択モーダルで使用される絵文字の配列をエクスポート。

* **src/utils/helpers.jsx**
    * **役割**: 日付や時刻のフォーマットなど、特定の機能に依存しない汎用的なユーティリティ関数を提供します。
    * **処理詳細**:
        * `formatTime()`: `Date` オブジェクトを `HH:MM` 形式の文字列に変換する関数をエクスポート。

### 2.4. 技術スタック

* **フレームワーク**: React (Vite経由)
* **UIフレームワーク/CSS**: Tailwind CSS (CDN経由)
* **言語**: JavaScript (JSX)
* **開発ツール**: Vite (開発サーバー、ビルドツール)
* **バージョン管理**: Git / GitHub
* **デプロイプラットフォーム**: Vercel

### 2.5. デプロイ方法の概要

1.  **プロジェクトの準備**: 上記のフォルダ構成とコードをローカルに配置し、`npm install` で依存関係をインストール。
2.  **Gitリポジトリへのプッシュ**: ローカルのコードをGitHubなどのリモートリポジトリにプッシュ。ブランチは`main`を推奨。
3.  **Vercelでの連携**: Vercelアカウントにログインし、GitHubリポジトリと連携して新しいプロジェクトとしてインポート。
4.  **自動デプロイ**: Vercelは自動的にプロジェクトをビルドし、公開URLを発行。以降、`main`ブランチへのプッシュで自動的にデプロイが実行される。
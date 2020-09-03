# sesame-beacon-opener

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nzws/sesame-beacon-opener/Node%20CI?style=for-the-badge)](https://github.com/nzws/sesame-beacon-opener/actions)
[![GitHub](https://img.shields.io/github/license/nzws/sesame-beacon-opener?style=for-the-badge)](#license)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/nzws/sesame-beacon-opener/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

> [WIP] LINE Beacon を使用した SESAME ロックのオープナーです。

**このプロジェクトは現在開発中です。私がまだ SESAME Lock を手に入れていないためテストできなく適当な実装です。**

[English](https://github.com/nzws/sesame-beacon-opener/blob/master/README.md) | [日本語](https://github.com/nzws/sesame-beacon-opener/blob/master/README.ja.md)

## あなたのオープナーを作成する方法

### 必要なもの

- [SESAME Smart Lock](https://jp.candyhouse.co/)
  - [API キー](https://jp.candyhouse.co/blogs/how-to/api%E3%82%AD%E3%83%BC%E5%8F%96%E5%BE%97%E6%96%B9%E6%B3%95%E3%81%A8%E3%82%BB%E3%82%B5%E3%83%9Fid%E3%81%AE%E7%A2%BA%E8%AA%8D%E6%96%B9%E6%B3%95)
  - Wi-Fi アクセスポイント
- Raspberry Pi 3+ (BLE をサポートしたもの)
- [LINE Developers アカウント](https://developers.line.biz/) (無料)
- [Vercel アカウント](https://vercel.com/) (無料)

1. Messaging API を使用した LINE Bot を作成してください。

- https://developers.line.biz/ja/docs/messaging-api/getting-started/
- https://developers.line.biz/ja/docs/messaging-api/building-bot/

2. `長期のチャネルアクセストークン` を作成し、それと `チャンネルシークレット` の両方をメモしてください。

- https://developers.line.biz/ja/docs/messaging-api/channel-access-tokens/#long-lived-channel-access-tokens

2. Raspberry Pi を使用して LINE Simple Beacon を作成してください。

- https://engineering.linecorp.com/ja/blog/line-beacon-raspberry-pie-line-simple-beacon-specification/
- ハードウェア ID を発行して Bot にリンクしてください: https://developers.line.biz/ja/docs/messaging-api/using-beacons/#line%E5%85%AC%E5%BC%8F%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%81%A8%E3%83%93%E3%83%BC%E3%82%B3%E3%83%B3%E3%82%92%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%99%E3%82%8B

3. あなたの LINE アプリで LINE Beacon を有効化してください。
4. SESAME Lock の API Key を作成し、ID をメモしてください。

- https://jp.candyhouse.co/blogs/how-to/api%E3%82%AD%E3%83%BC%E5%8F%96%E5%BE%97%E6%96%B9%E6%B3%95%E3%81%A8%E3%82%BB%E3%82%B5%E3%83%9Fid%E3%81%AE%E7%A2%BA%E8%AA%8D%E6%96%B9%E6%B3%95

5. バックエンドを Vercel にデプロイしてください。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fnzws%2Fsesame-beacon-opener&env=CHANNEL_SECRET,CHANNEL_ACCESS_TOKEN,USERS_ID,SESAME_ID,SESAME_API_KEY)

- `CHANNEL_SECRET`: LINE Bot のチャンネルシークレット
- `CHANNEL_ACCESS_TOKEN`: LINE Bot のチャンネルアクセストークン
- `USERS_ID`: 解錠を許可するユーザーの LINE ID(ユーザーは通常設定できない、長いやつ)をカンマ区切りで指定 (e.g. `11111,22222,33333`)
  - 自分の ID に限り `チャネル基本設定 > あなたのユーザーID` から確認できます
- `SESAME_ID`: SESAME Lock の ID
- `SESAME_API_KEY`: SESAME Lock の API キー

6. デプロイしたら LINE Bot の Webhook URL を次に設定してください:

- `https://<デプロイされたURL>/api/webhook`
- https://developers.line.biz/ja/docs/messaging-api/building-bot/#setting-webhook-url

7. ここまで完了したら、実際に動作するか確かめてみましょう ✨

# sesame-beacon-opener

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nzws/sesame-beacon-opener/Node%20CI?style=for-the-badge)](https://github.com/nzws/sesame-beacon-opener/actions)
[![GitHub](https://img.shields.io/github/license/nzws/sesame-beacon-opener?style=for-the-badge)](#license)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/nzws/sesame-beacon-opener/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

> [WIP] SESAME Lock Opener using LINE Beacon.

**This project is currently under development. I haven't yet been able to purchase SESAME Lock so I'm unable to test it.**

[English](https://github.com/nzws/sesame-beacon-opener/blob/master/README.md) | [日本語](https://github.com/nzws/sesame-beacon-opener/blob/master/README.ja.md)

## How to deploy your opener

### Requirements

- [SESAME Smart Lock](https://jp.candyhouse.co/)
  - [API Key](https://jp.candyhouse.co/blogs/how-to/api%E3%82%AD%E3%83%BC%E5%8F%96%E5%BE%97%E6%96%B9%E6%B3%95%E3%81%A8%E3%82%BB%E3%82%B5%E3%83%9Fid%E3%81%AE%E7%A2%BA%E8%AA%8D%E6%96%B9%E6%B3%95)
  - Wi-Fi access point
- Raspberry Pi 3+ (Support BLE)
- [LINE Developers Account](https://developers.line.biz/) (free)
- [Vercel Account](https://vercel.com/) (free)

1. Create a LINE Bot using the Messaging API.

- https://developers.line.biz/ja/docs/messaging-api/getting-started/
- https://developers.line.biz/ja/docs/messaging-api/building-bot/

2. Create a `Long-lived channel access token` and make note of it and `Channel secret`.

- https://developers.line.biz/ja/docs/messaging-api/channel-access-tokens/#long-lived-channel-access-tokens

3. Create a LINE Simple Beacon using Raspberry Pi.

- https://engineering.linecorp.com/ja/blog/line-beacon-raspberry-pie-line-simple-beacon-specification/
- Create a hardware ID and link it to Bot: https://developers.line.biz/ja/docs/messaging-api/using-beacons/#line%E5%85%AC%E5%BC%8F%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%81%A8%E3%83%93%E3%83%BC%E3%82%B3%E3%83%B3%E3%82%92%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%99%E3%82%8B

4. Enable LINE Beacon in your LINE account.
5. Create a SESAME Lock's API Key and make note of it and ID.

- https://jp.candyhouse.co/blogs/how-to/api%E3%82%AD%E3%83%BC%E5%8F%96%E5%BE%97%E6%96%B9%E6%B3%95%E3%81%A8%E3%82%BB%E3%82%B5%E3%83%9Fid%E3%81%AE%E7%A2%BA%E8%AA%8D%E6%96%B9%E6%B3%95

6. Deploy backend to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fnzws%2Fsesame-beacon-opener&env=CHANNEL_SECRET,CHANNEL_ACCESS_TOKEN,USERS_ID,SESAME_ID,SESAME_API_KEY)

- `CHANNEL_SECRET`: LINE Bot's channel secret
- `CHANNEL_ACCESS_TOKEN`: LINE Bot's channel access token
- `USERS_ID`: Comma-delimited LINE IDs of users who are authorized to unlock (e.g. `11111,22222,33333`)
- `SESAME_ID`: SESAME Lock's ID
- `SESAME_API_KEY`: SESAME Lock's API Key

7. Once deployed, input the following URL into your LINE Bot webhook URL.

- `https://<DEPLOYMENT_URL>/api/webhook`
- https://developers.line.biz/ja/docs/messaging-api/building-bot/#setting-webhook-url

8. Once you've completed this, make sure it's actually working ✨

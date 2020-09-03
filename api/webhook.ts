import got from 'got';
import { NowRequest, NowResponse } from '@vercel/node';
import { middleware, Client } from '@line/bot-sdk';

const secrets = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const checkLineSignature = (req, res) =>
  new Promise((resolve, reject) => {
    middleware(secrets)(req, res, result => {
      console.log(result);
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });

const client = new Client(secrets);

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  console.log(req.body);
  await checkLineSignature(req, res);

  const events = req.body.events;
  const allowUsers = process.env.USERS_ID.split(',');

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (!allowUsers.includes(event.source.userId)) {
      console.warn('not allowed user:', event.source);
      continue;
    }

    if (
      !(
        (event.type === 'beacon' && event.beacon.type !== 'enter') ||
        (event.type === 'message' && event.message.text === 'unlock')
      )
    ) {
      continue;
    }

    try {
      await got.post(
        `https://api.candyhouse.co/public/sesame/${process.env.SESAME_ID}`,
        {
          json: {
            command: 'unlock'
          },
          headers: {
            Authorization: process.env.SESAME_API_KEY
          },
          responseType: 'json'
        }
      );

      client.replyMessage(event.replyToken, {
        type: 'text',
        text: `Unlocked!`
      });
    } catch (e) {
      if (e.response.body.error) {
        client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Error: ${e.response.body.error}`
        });
      }

      throw e;
    }
  }

  res.json({ status: 'success' });
};

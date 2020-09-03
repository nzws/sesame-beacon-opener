import { NowRequest, NowResponse } from '@vercel/node';
import { middleware } from '@line/bot-sdk';

const checkLineSignature = (req, res) =>
  new Promise((resolve, reject) => {
    middleware({
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.CHANNEL_SECRET
    })(req, res, result => {
      console.log(result);
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  console.log(req.body);
  await checkLineSignature(req, res);

  const events = req.body.events;
  const allowUsers = process.env.USERS_ID.split(',');

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (
      event.type !== 'beacon' ||
      event.beacon.type !== 'enter' ||
      !allowUsers.includes(event.source.userId)
    ) {
      continue;
    }

    console.log('worked!');
  }

  res.json({ status: 'success' });
};

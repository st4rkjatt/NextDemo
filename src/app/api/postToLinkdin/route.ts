// pages/api/postToLinkedIn.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message, accessToken } = req.body;

  try {
    const profileRes = await axios.get('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const userURN = `urn:li:person:${profileRes.data.id}`;

    const postRes = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: userURN,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: message },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ status: 'Posted', postRes: postRes.data });
  } catch (err: unknown) {
    res.status(500).json({ error: err });
  }
}

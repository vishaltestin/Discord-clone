import { getDataFromToken } from '@/helpers/getDataFromtoken';
import { db } from '@/lib/db';
const getRandomImageUrl = async () => {
  const response = await fetch('https://source.unsplash.com/random/800x600');
  const imageUrl = response.url;
  return imageUrl;
};

export const initialProfile = async () => {
  const id = getDataFromToken()
  const profile = await db.profile.findUnique({
    where: {
      userId: id,
    },
  });

  if (profile) {
    return profile;
  }

  const userInfo = await db.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      displayName: true,
      email: true,
    },
  });

  if (!userInfo) {
    throw new Error('User not found');
  }
  const imageUrl = await getRandomImageUrl();
  const { displayName, email } = userInfo;
  const newProfile = await db.profile.create({
    data: {
      userId: id,
      name: displayName,
      imageUrl: imageUrl,
      email: email,
    },
  });

  return newProfile;
};
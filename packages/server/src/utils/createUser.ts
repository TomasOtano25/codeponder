import { User } from "../entity/User";

export const createUser = async ({
  username,
  githubId,
  pictureUrl,
  bio,
  name
}: {
  username: string;
  githubId: string;
  pictureUrl: string;
  bio: string;
  name: string;
}) => {
  let user: User | undefined = undefined;
  let times = 0;

  while (times < 100) {
    try {
      console.log("logging: ", times);
      user = await User.create({
        username: times ? `${username}${times}` : username,
        githubId,
        // pictureUrl: profile.photos![0].value,
        pictureUrl,
        bio,
        name
      }).save();
      break;
    } catch (err) {
      console.log(err);
      if (!err.detail.includes("already exists")) {
        throw err;
      }
    }
    times += 1;
  }

  return user;
};

// export const createUser = async (profile: any) => {
//   return await User.create({
//     username: profile.username,
//     githubId: profile.id,
//     // pictureUrl: profile.photos![0].value,
//     pictureUrl: profile._json.avatar_url,
//     bio: profile._json.bio,
//     name: profile._json.name
//   }).save();
// };

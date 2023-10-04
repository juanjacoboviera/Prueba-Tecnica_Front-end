export const organizeData = async (data) => {
  const _usersList = [];

  await Promise.all(
    data.map(async (user) => {
      const url = `https://api.github.com/users/${user.login}`;

      const res = await fetch(url);
      const userData = await res.json();
      const cleanUser = {
        name: user.login,
        followers: userData.followers,
      };

      _usersList.push(cleanUser);
    })
  );

  return _usersList;
};

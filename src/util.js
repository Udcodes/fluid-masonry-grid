export const uniqueValues = (data) => {
  const uniqueIds = [
    ...new Set(
      data.map((item) => {
        return item.id;
      })
    ),
  ];

  return uniqueIds.map((item) => {
    let filteredArr = data.find(({ id }) => id === item);
    return filteredArr || [];
  });
};

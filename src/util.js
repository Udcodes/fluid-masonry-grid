export const uniqueValues = (arr) => {
  const uniqueIds = [
    ...new Set(
      arr.map((item) => {
        return item.id;
      })
    ),
  ];

  return uniqueIds.map((item) => {
    let filtered = arr.find(({ id }) => id === item);
    return filtered || [];
  });
};

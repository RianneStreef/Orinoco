export const removeItemFromArray = (id, items) =>
  items.filter((item) => item.id !== id);

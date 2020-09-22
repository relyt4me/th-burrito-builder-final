export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders').then((response) => response.json());
};

export const addOrder = (order) => {
  const stringyOrder = JSON.stringify(order);
  return fetch(`http://localhost:3001/api/v1/orders`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringyOrder,
  }).then((response) => {
    return response.json();
  });
};

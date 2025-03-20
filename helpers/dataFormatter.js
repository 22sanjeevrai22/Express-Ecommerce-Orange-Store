const formatUserData = (data) => {
  const formattedData = {
    name: data.name,
    email: data.email,
    createdAt: data.createdAt,
    phone: data.phone,
    roles: data.roles,
    address: data.address,
    id: data._id,
  };
  return formattedData;
};

export { formatUserData };

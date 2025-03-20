import User from "../models/User.js";

const getAllUsers = async (data) => {
  try {
    const userList = await User.find(data);
    return userList;
  } catch (error) {
    console.log("Error fetching users", error);
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
};

export default {
  getAllUsers,
  createUser,
};

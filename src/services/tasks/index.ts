import { restClient } from "@/config/restClient";
import {
  getTasksURL,
  getTaskURL,
  getUserTasksURL,
  createTaskURL,
  updateTaskURL,
  deleteTaskURL,
} from "./baseURL";

export const getTasks = async () => {
  const rest = await restClient();
  return rest.get(getTasksURL());
};

export const getTask = async (id: string, user: any) => {
  const rest = await restClient();
  return rest.get(getTaskURL(id), {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });
};

export const getUserTasks = async (user: any) => {
  const rest = await restClient();
  return rest.get(getUserTasksURL(user.id), {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });
};

export const createTask = async (body: any, user: any) => {
  const rest = await restClient();
  return rest.post(createTaskURL(), body, {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });
};

export const updateTask = async (id: string, body: any, user: any) => {
  const rest = await restClient();
  return rest.put(updateTaskURL(id), body, {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });
};

export const deleteTask = async (id: string, user: any) => {
  const rest = await restClient();
  return rest.delete(deleteTaskURL(id), {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });
};

export const getTasksURL = (): string => {
  return "tasks";
};

export const getTaskURL = (id: string): string => {
  return `tasks/${id}`;
};

export const getUserTasksURL = (userId: string): string => {
  return `tasks/user/${userId}`;
};

export const createTaskURL = (): string => {
  return `tasks`;
};

export const updateTaskURL = (id: string): string => {
  return `tasks/${id}`;
};

export const deleteTaskURL = (id: string): string => {
  return `tasks/${id}`;
};

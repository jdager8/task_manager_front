"use client";

import TasksForm from "@/components/TasksForm";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { getTask } from "../../../../../services/tasks";
import { useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";

export default function ViewTask() {
  const user = useSession({ required: true }).data?.user;
  const params = useParams();
  const id = params.id.toString();
  const [task, setTask] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTask(id, user);
        if (res?.status === 200) {
          setTask(res.data);
          setIsLoading(false);
        }
      } catch (error) {}
    };
    fetchTask();
  }, [id, user]);

  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      {isLoading && <Spinner />}
      {!isLoading && <TasksForm task={task} isViewing={false} />}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, DatePicker, Switch, Link } from "@nextui-org/react";
import { createTask, updateTask } from "../../services/tasks";
import { parseDate, now, getLocalTimeZone } from "@internationalized/date";
import { useSession } from "next-auth/react";

export default function TaskForm({
  task,
  isViewing = false,
}: Readonly<{ task: any; isViewing: boolean }>) {
  const isEditing = task !== null && !isViewing;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.due_date
      ? parseDate(task.due_date.split("T")[0])
      : now(getLocalTimeZone())
  );
  const [completed, setCompleted] = useState(task?.completed || false);

  const router = useRouter();
  const user = useSession({ required: true }).data?.user as any;

  const handleCreateTask = async () => {
    try {
      let res = null;

      if (isEditing) {
        res = await updateTask(
          task.id,
          {
            title,
            description,
            dueDate,
            completed,
            user_id: user ? user.id : 0,
          },
          user
        );
      } else {
        res = await createTask(
          {
            title,
            description,
            dueDate,
            completed,
            user_id: user ? user.id : 0,
          },
          user
        );
      }

      if (res?.status === 200) {
        router.push("/tasks");
      }
    } catch (error) {}
  };

  return (
    <div>
      <form className="flex flex-col items-center gap-5 mt-10">
        <Input
          isRequired
          isClearable={isViewing}
          isDisabled={isViewing}
          type="text"
          label="Título"
          className="max-w-xs"
          variant="underlined"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          onClear={() => setTitle("")}
        />

        <Input
          isRequired
          isClearable={isViewing}
          isDisabled={isViewing}
          type="text"
          label="Descripción"
          className="max-w-xs"
          variant="underlined"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          onClear={() => setDescription("")}
        />

        <DatePicker
          isDisabled={isViewing}
          label="Fecha de vencimiento"
          variant="underlined"
          className="max-w-xs"
          hideTimeZone
          showMonthAndYearPickers
          onChange={(date) => setDueDate(date.toString())}
          value={dueDate}
        />

        <Switch
          isSelected={completed}
          onValueChange={setCompleted}
          isDisabled={isViewing}
        >
          Finalizada
        </Switch>

        <div className="flex justify-between items-center gap-10">
          {!isViewing && (
            <Button
              color="primary"
              variant="bordered"
              type="button"
              onPress={handleCreateTask}
            >
              {isEditing ? "Editar tarea" : "Crear tarea"}
            </Button>
          )}
          <Link href="/tasks">Volver</Link>
        </div>
      </form>
    </div>
  );
}

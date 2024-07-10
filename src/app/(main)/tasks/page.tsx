"use client";

import { useLayoutEffect, useState, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";

import { deleteTask, getUserTasks } from "../../../services/tasks";

import { EyeIcon } from "../../../shared/icons/EyeIcon";
import { EditIcon } from "../../../shared/icons/EditIcon";
import { DeleteIcon } from "../../../shared/icons/DeleteIcon";

const COLUMNS = [
  { name: "Nombre", key: "title" },
  { name: "Descripción", key: "description" },
  { name: "Vencimiento", key: "due_date" },
  { name: "Status", key: "completed" },
  { name: "Actions", key: "actions" },
];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const user = useSession({ required: true }).data?.user;
  const router = useRouter();

  useLayoutEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getUserTasks(user);
        if (res?.status === 200) {
          setTasks(res.data);
        }
      } catch (error) {}
    };
    fetchTasks();
  }, [user]);

  const handleCreateTask = () => {
    router.push("/tasks/create");
  };

  const handleDeleteTask = (id: any) => async () => {
    try {
      const res = await deleteTask(id, user);
      if (res?.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.filter((task: any) => task.id !== id)
        );
      }
    } catch (error) {}
  };

  const renderCell = useCallback(
    (task: any, columnKey: any) => {
      const cellValue = task[columnKey];

      switch (columnKey) {
        case "title":
          return <p className="text-sm capitalize">{cellValue}</p>;
        case "description":
          return <p className="text-sm capitalize">{cellValue}</p>;
        case "completed":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={cellValue ? "success" : "danger"}
            >
              {cellValue ? "Completado" : "Pendiente"}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex justify-center items-center gap-2">
              <Tooltip content="Ver tarea">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`/tasks/view/${task.id}`)}
                  aria-hidden="true"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Editar tarea">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`/tasks/edit/${task.id}`)}
                  aria-hidden="true"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar tarea">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={handleDeleteTask(task.id)}
                  aria-hidden="true"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDeleteTask, router]
  );

  return (
    <div className="flex flex-col gap-5 mt-5 pr-20 pl-20">
      <div className="flex justify-end items-end gap-5 mt-5">
        <Button
          color="primary"
          variant="bordered"
          type="button"
          onPress={handleCreateTask}
        >
          Crear tarea
        </Button>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={tasks}>
          {(task) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>{renderCell(task, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-start items-end gap-5 mt-5">
        <Button
          color="primary"
          variant="bordered"
          type="button"
          onPress={() => signOut()}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TodoFormSchema } from "./schema";
import { QueryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

const addTodo = async (data: TodoFormSchema) => {
  const response = await axios.post("/api/todos", data);

  return response.data;
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoFormSchema) => addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TODOS] });
      toast.success("Todo added successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add todo");
    },
  });
};

"use client";

import { useState } from "react";
import AddTodoDialog from "./add-todo-dialog";

const TodosPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="p-4">
      <AddTodoDialog
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
      />
    </div>
  );
};

export default TodosPage;

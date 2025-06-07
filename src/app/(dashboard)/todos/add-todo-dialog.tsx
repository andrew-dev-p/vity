import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddTodoForm from "./add-todo-form";

const AddTodoDialog = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
}: {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Todo
          </DialogTitle>
        </DialogHeader>
        <AddTodoForm setIsAddDialogOpen={setIsAddDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;

interface ITask {
  id: number;
  name: string;
  favorite: boolean;
  create_date: string;
}

type TaskState = {
  tasks: ITask;
};

type TaskAction = {
  type: string;
  task: ITask;
};

export type DispatchType = (args: TaskAction) => TaskAction;

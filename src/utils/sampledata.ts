import { Todo } from "../pages/Home";

const loadSampleData = () => {
  let todo_list = localStorage.getItem("todoList");
  let sampleTodo: Todo[] = []
  if (!todo_list){
    sampleTodo = [{"id":"a8df1496-2775-42b5-826e-c4863aa45fa5","title":"Team Meeting","description":"tomorrow morning","tasks":[{"uid":"3bb09aa1-e122-4011-9c24-f0995c0c0afd","taskString":"Task list and assinments","isChecked":true},{"uid":"8fad1bed-2574-4cef-9d6c-3d19d9973549","taskString":"Set due date and assignments","isChecked":true},{"uid":"e3f72156-3fc8-4027-b342-d2782ade9693","taskString":"Remove duplicate tasks and stories","isChecked":false},{"uid":"d007a789-bff8-45ae-86b0-0286fbc2a563","taskString":"Update the userflow and stories","isChecked":false}]}]
    localStorage.setItem("todoList", JSON.stringify(sampleTodo));
     
  }
  console.log('inside loadSampleData', todo_list);
  return sampleTodo;
}

export default loadSampleData;
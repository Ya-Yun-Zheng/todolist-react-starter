import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react'; // 使用到 useState Hook 時，需要 import 進來

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);
  const todoNums = todos.length; //todoNums數目


  const handleChange = (value) => {
    setInputValue(value);
  };

  // 監聽器
  const handleAddTodo = () => {
    // 先確認inputValue到底有沒有值
    if (inputValue.length === 0) {
      return;
    }

    // 加入資料
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });

    setInputValue(''); // 新增完畢後，讓inputValue的值更新(歸零)
  };

  const handleKeyDown = () => {
    // 功能和handleTodo一樣，複製過來
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });

    setInputValue(''); // 新增完畢後，讓inputValue的值更新(歸零)
  }

  const handleToggleDone = (id) => {
    // 透過setTodos去更新資料的狀態(用prevTodos函數拿到當前Todo的資料)
    setTodos((prevTodos)=>{
      return prevTodos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone
            // 做出跟原本相反的內容(!)
          };
        }
        return todo; //其他就原封不動地回傳
      });
    });
  };

  const handleChangeMode = ({ id, isEdit}) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return {...todo, isEdit: false }; //其他沒有被觸發到的，就不會是編輯模式
      });
    });
  }

  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false, //新的狀態已經被更新、被儲存了
          };
        }

        return todo; //其他就原封不動地回傳
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue} 
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos} 
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer numOfTodos={todoNums} />
    </div>
  );
};

export default TodoPage;

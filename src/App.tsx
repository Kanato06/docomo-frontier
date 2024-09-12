import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  useEffect(() => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUser([...data.items]),
    });
  }, []);

  const [user, setUser] = useState<Array<Schema["User"]["type"]>>([]);
  const [goal, setGoal] = useState<Array<Schema["Goal"]["type"]>>([]);
  const [document, setDocument] = useState<Array<Schema["Document"]["type"]>>([]);
  const [result, setResult] = useState<Array<Schema["Result"]["type"]>>([]);

  function createUser() {
    client.models.User.create({
      // content: window.prompt("Todo content")
      name: "myname",
      email: "myemail",
      password: "mypassword",
      createdAt: 2024
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createUser}>+ new</button>
      <ul>
        {user.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;

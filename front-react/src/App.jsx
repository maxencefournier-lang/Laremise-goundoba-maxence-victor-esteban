import './App.css'

function App() {
  const users = [
    {
      id: 1,
      prenom: 'Lucas',
      nom: 'Martin',
      role: 'Bénévole',
      email: 'lucas@test.fr',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: 2,
      prenom: 'Emma',
      nom: 'Bernard',
      role: 'Responsable',
      email: 'emma@test.fr',
      image: 'https://i.pravatar.cc/150?img=47',
    },
    {
      id: 3,
      prenom: 'Nathan',
      nom: 'Robert',
      role: 'Bénévole',
      email: 'nathan@test.fr',
      image: 'https://i.pravatar.cc/150?img=33',
    },
  ]

  return (
    <main className="page">
      <h1>Bénévoles</h1>

      <div className="users-container">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <div className="card-border-top"></div>

            <img
              className="avatar"
              src={user.image}
              alt={`${user.prenom} ${user.nom}`}
            />

            <span className="name">
              {user.prenom} {user.nom}
            </span>

            <p className="job">{user.role}</p>
            <p className="email">{user.email}</p>

            <button onClick={() => console.log(user)}>
              Voir le profil
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
import './App.css'
import UserCard from '../components/Card/Card'
import '../components/Card/Card.css'

function App() {
    const users = [
        {
            id: 1,
            prenom: 'Lucas',
            nom: 'Martin',
            role: 'Bénévole',
        },
        {
            id: 2,
            prenom: 'Emma',
            nom: 'Bernard',
            role: 'Bénévole',
        },
        {
            id: 3,
            prenom: 'Nathan',
            nom: 'Robert',
            role: 'Bénévole',
        },
    ]

    return (
        <main className="page">
            <h1>Bénévoles</h1>

            <div className="users-container">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </main>
    )
}

export default App
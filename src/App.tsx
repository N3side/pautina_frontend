import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {$fetch} from "./fetch.tsx";

// export const UserContext = createContext(null)

// test 1

function App() {

    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {
        async function getUser() {
            const response: {response: Response, json: any}  = await $fetch("login")

            const user_ = response?.json?.data

            if (user_) {
                setUser(user_)
            }
        }
        getUser()
    }, [])

    const [count, setCount] = useState(0)

    return (

        // <UserContext.Provider value={{user}}>
            <>
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Тест111 {user?.name}</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </>
        // </UserContext.Provider>


    )
}

export default App

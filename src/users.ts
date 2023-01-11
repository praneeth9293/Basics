import { User } from "./app/shared/models/User";

export const users: User[] = [
    {
        id: "001",
        username: 'jhon.doe',
        name: 'Jhon Doe',
        isAdmin: false,
        password: 'password'
    },
    {
        id: "002",
        username: 'jane',
        name: 'Jane',
        isAdmin: true,
        password: 'password'
    }
]
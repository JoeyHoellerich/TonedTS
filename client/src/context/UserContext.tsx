import React from "react"

interface UserContextInterface {
    user: any,
    updateUser: any
}

// create Context to store User Data after loggin in
const UserContext = React.createContext<UserContextInterface>({
    user: [],
    updateUser: () => {}
})

export default UserContext
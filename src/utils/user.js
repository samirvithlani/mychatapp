const users = []
//adduser remove user,getuser,getuserInroom

const addUser = ({ id, username, room }) => {

    //username = username.trim().toLowerCase()
    //room = room.trim().toLowerCase()
    //validate data

    if (!username || !room) {
        return {
            error: "username and room is required"
        }
    }
    //check if user exist
    const existingUser = users.find((user) => {

        return user.room === room && username === username
    })
    //validate user
    if (existingUser) {
        return {
            error: "username is in use"
        }
    }
    //store user

    const user = { id, username, room }
    users.push(user)
    return { user }

}

const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {

    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

/* addUser({
    id: 22,
    username: "samir",
    room: "sam"
})
addUser({
    id: 24,
    username: "raj",
    room: "raj"
})
addUser({
    id: 25,
    username: "sanjay",
    room: "sam"
})
 */
//console.log(getUser(25))

/* console.log(users)
const removedUser = removeUser(22)
console.log(removeUser)
console.log(users) */

/* const userList  = getUsersInRoom('sam')
console.log(userList) */


module.exports  ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
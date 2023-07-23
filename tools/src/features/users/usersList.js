import UserListById from "./UserListById";
import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";
import { logOut } from "../auth/authSlice";
import { useDispatch } from "react-redux"

const UsersList = () => {
    const dispach = useDispatch()
    
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    const credentials = [{email: '', token: ''}]
    const HandlerLogout = () => {
        dispach(logOut(...credentials, ''))
    }
    let content
    if (isLoading) {
        content = <p>Loading ...</p>
    }else if (isSuccess) {
        content = (
            <section className="users">
                <button onClick={HandlerLogout}>Cerrar sesiòn</button>
                <h1>List users</h1>
                <ul>
                    {users.users.map((user, i) => {
                        return <li key={i}>{user.email}</li>
                    })}
                </ul>
                <Link to="/welcome">Back to welcome</Link>
                <hr/>
                <UserListById/>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }

    return content
}

export default UsersList
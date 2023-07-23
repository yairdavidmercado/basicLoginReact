import { useGetUserByIdQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UserListById = () => {
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserByIdQuery(1)

    let content
    if (isLoading) {
        content = <p>Loading ...</p>
    }else if (isSuccess) {
        content = (
            <section className="users">
                <h1>List user</h1>
                <ul>
                    <li>{user.user.email}</li>
                </ul>
                <Link to="/welcome">Back to welcome</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }

    return content
}

export default UserListById
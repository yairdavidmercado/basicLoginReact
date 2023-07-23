import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentEmail, selectCurrentToken } from "./authSlice"

const Welcome = () => {
    const user = useSelector(selectCurrentEmail)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}!` : `Welcome!`
    const tokenAbbr = `${token.slice(0, 25)}...`

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/usersList">Go to the users list</Link></p>
        </section>
    )
    return content
}
export default Welcome
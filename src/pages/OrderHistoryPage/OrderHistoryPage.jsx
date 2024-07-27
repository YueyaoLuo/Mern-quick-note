import * as usersService from "../../utilities/users-service";

export default function OrderHistroyPage(){
    async function handleCheckToken(){
        const expData = await usersService.checkToken();
        console.log(expData)
    }
    return(
        <>
        <button onClick={handleCheckToken}>CheckWhen My Login Expires</button>
        <h1>OrderHistroyPage</h1>
        </>
    )
}
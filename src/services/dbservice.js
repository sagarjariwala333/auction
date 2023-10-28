import { API_END_POINT } from "../enviroment";
import { axiosobj } from "../http/axios";

export async function SignUp(req)
{
    try
    {
        const data = await axiosobj.post(API_END_POINT + "signup", req)
        return data;
    }
    catch(err)
    {
        return err;
    }
}

export async function SignIn(req)
{
    try
    {
        const data = await axiosobj.post(API_END_POINT + "login", req)
        return data;
    }
    catch(err)
    {
        return err;
    }
}
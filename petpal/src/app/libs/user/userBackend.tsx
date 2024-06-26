
// import { cookies } from 'next/headers'
import { API_URL } from "@/app/_constants/env";
import { setCookie } from "cookies-next";
export async function LoginApi() {
    try {
        console.log("In loginAPI")
        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'sanji@gmail.com',
                logintype: 'user',
                password: '123456789'
            })
        })

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const responseData = await response.json();
        const cookie = response.headers.get('Set-Cookie');
        // cookies().set(responseData)
        // setCookie("token",responseData.AccessToken);
        return { data: responseData, cookie: cookie };

    } catch (error) {
        console.error('Error posting data:', error);
    }
}

export async function getCurrentEntity() {
    try {

        const response = await fetch(API_URL + '/current-entity', {
            method: 'GET',
            credentials: 'include',
        });

        // if (!response.ok) {
        //     throw new Error('Failed to get current-entity');
        // }

        return await response.json();

    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}

export async function deleteBank(usertype: String) {

    console.log("get in deleteBank function")
    try {
        // const log = await Login()
        const response = await fetch(`${API_URL}/${usertype}/delete-bank-account`, {
            method: 'DELETE',
            credentials: "include",
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function setdefaultBank(usertype: String, accountNumber: String, bankAccount: String) {
    // const log = await Login()
    console.log("in set default bank ")
    try {
        const response = await fetch(`${API_URL}/${usertype}/set-default-bank-account`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                defaultAccountNumber: accountNumber,
                defaultBank: bankAccount
            }) // Replace this with your data object

        })
        if (!response.ok) {
            throw new Error("Fail to get default bank account")
        }
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


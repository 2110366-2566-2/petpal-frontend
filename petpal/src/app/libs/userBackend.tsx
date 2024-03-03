// "use server"
export async function LoginApi(){
    try {
        console.log("In loginAPI")
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            credentials:'include',
            headers: {
                'Cache-Control' :'no-cache',
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
        return { data: responseData, cookie: cookie };

    } catch (error) {
        console.error('Error posting data:', error);
    } 
}

export async function getCurrentEntity(cookie:any){
    try {
        // const { cookie } = await LoginApi();
        // console.log(cookie)
        const response = await fetch('http://localhost:8080/current-entity', {
            method: 'GET',
            credentials:'include',
            headers: {
                'Cookie': `${cookie.split(" ")[0]}`, 
                'Content-Type': 'application/json',
                // 'Authorization':`${cookie}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get current-entity');
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}

export async function deleteBank(fromLogin:any){

    console.log("get in deleteBank function")
    try{
        // const log = await Login()
        const response = await fetch(`http://localhost:8080/${fromLogin.logintype}/delete-bank-account`,{
            method:'Delete',
            headers :{
                'Content-Type': 'application/json',
                'Cookie':`token=${fromLogin.AccessToken}`
            },
        })
        if(!response.ok){
            throw new Error("Fail to delete bank account")
        }
        return await response.json() 
    }catch(err){
        console.log(err)
    }

}

export async function setdefaultBank(fromLogin:any,accountNumber:string , bankAccount:string){
    // const log = await Login()
    console.log("in set default bank ")
    try{
        const response = await fetch(`http://localhost:8080/${fromLogin.logintype}/set-default-bank-account`,{
            method:'POST',
            headers :{
                'Content-Type': 'application/json',
                'Cookie':`token=${fromLogin.AccessToken}`
            },
            body: JSON.stringify({ 
                defaultAccountNumber: '789789789',
                defaultBank: "kaiskorn"
            }) // Replace this with your data object

        })
        if(!response.ok){
            throw new Error("Fail to get default bank account")
        }
        return await response.json()    
    }catch(err){
        console.log(err)
    }
}


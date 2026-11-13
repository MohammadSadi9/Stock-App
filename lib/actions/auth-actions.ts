'use server'

import { date, email, success } from "better-auth"
import { auth } from "../better-auth/auth"
import { inngest } from "../inngest/client"
import { name } from "nodemailer/lib/package-info.js"
import { count } from "console"
import { headers } from "next/dist/server/request/headers"

export const signUpWithEmail = async ({email,fullName,password,country,investmentGoals,riskTolerance,preferredIndustry}:SignUpFormData)=>{

    try {
        const response = await auth.api.signUpEmail({
            body:{     name: fullName,
      email,
      password,

            },
        })

        if(response){
            await inngest.send({
                name:'app/user.created',
                data:{
                    email,
                    name:fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,    
                }

            })
        }

        return{success:true,
            data:response
        }
   

    } catch (error) {
        console.log('sign up failed',error)
        return{success:false, error: 'Sign up failed'}
    }

}


export const signIn = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });
    return { success: true, data: response };
  }catch (error) {
    console.error("Error signing in:", error);
    throw error;
  } 
}




export const signOut = async()=>{


    try{
   await auth.api.signOut({headers: await  headers()})
    }
    catch(error){
        console.log('sign out failed',error)
        return{success:false, error: 'Sign out failed'}
    }
};
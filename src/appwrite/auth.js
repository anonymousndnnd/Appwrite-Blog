import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
// console.log(appwriteProjectId)
export class AuthService {
  client=new Client();
  account;
  
  constructor(){ 
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

    this.account=new Account(this.client);
  }

  //creating an account
  async createAccount({email,password,name}){
    try{
      const userAccount=await this.account.create(ID.unique(),email,password,name);
      if(userAccount){
        //agar user ka account create ho gay hai toh login karwa do ya fir return kar do 
        return this.login({email,password});
      }
      else{
        return userAccount;
      }
    }
    catch(error){
      throw error;
    }
  }
  async login({email,password}){
    try{
      return await this.account.createEmailPasswordSession(email,password);
    }
    catch(error){
      throw error;
    }
  }
  async getCurrentUser(){
    try{
      const user = await this.account.get();
      console.log("User:", user);
      return user;
    }
    catch(error){
      console.log("AppWrite Service :: getCurrentUser :: error",error);
    }
    return null;
  }
  async logout(){
    try{
      await this.account.deleteSessions();
    }
    catch(error){
      console.log("Appwrite service :: logout :: error",error);
    }
  }
}

const authService=new AuthService();
export default authService
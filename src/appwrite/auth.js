import config from "../config/config";
import {Client, Account, ID} from "appwrite"

// Vendor LockIn Method : 
export class AuthService {

    client = new Client();
    account;

    constructor(){ 
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({userEmail, userPassword, userName}){
        try {
            const userAccount = await this.account.create( ID.unique(), userEmail, userPassword,userName);
            if(userAccount){
                // either give a success response or Make user directly login
                return this.userLogin({userEmail, userPassword});
            }
            else{
                return userAccount;
            }
        } 
        catch (error) {
            throw error;   
        }
    }

    async userLogin({userEmail, userPassword}){
        try {
            return await this.account.createEmailPasswordSession(userEmail, userPassword);
        } 
        catch (error) {
            throw error;
        }
    }

    async userLogOut(){
        try {
            await this.account.deleteSessions();
            // await this.account.deleteSession('current'); 
            // to LogOut from current Device or provide <SESSION_ID> to LogOut from any_Particular Device

            return true;
        } 
        catch (error) {
            console.log("Appwrite serice :: logout :: error", error);
            return false;
        }
    }

    async getCurrentSession(){  // Get the currently logged in user.
        try {
            return await this.account.get();
        } 
        catch (error) {
            console.log("Appwrite serice :: getCurrentSession :: error", error);
        }

        return null;
    }

}

const authService = new AuthService();
export default authService
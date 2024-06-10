import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;
    storage;
 
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
 
    // createDocument requires {db_id, collection_id, }
    async createPost({title, content, featured_image, status, slug, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug, // taking as DOCUMENT_ID, we can instead choose ID.unique()
                {
                    title, 
                    content, 
                    featured_image, 
                    status, 
                    userId
                }
            )
        } 
        catch (error) {
            console.log("Appwrite serice :: createPost :: error", error);
        }
    }

    async updatePost( slug, {title, content, featured_image, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // taking as DOCUMENT_ID, we can instead choose ID.unique()
                {
                    title, 
                    content, 
                    featured_image, 
                    status, 
                }
            )
        } catch (error) {
            console.log("Appwrite serice :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } 
        catch (error) {
            console.log("Appwrite serice :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } 
        catch (error) {
            console.log("Appwrite serice :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,

                // Pagination Service can also be used
                // 100,
                // 0,

            )
        } 
        catch (error) {
            console.log("Appwrite serice :: getPosts :: error", error);
            return false;
        }
    }

    // File Upload Service : 

    async uploadFile(file){
        try {
            
            return await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            )  
        } 
        catch (error) {
            console.log("Appwrite serice :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite serice :: deleteFile :: error", error);
            return false;
        }
    }

    getFile(fileId){
        return this.storage.getFilePreview(
            config.appwriteStorageId,
            fileId
        )
    }

}

const service = new DatabaseService();
export default service
export {service};
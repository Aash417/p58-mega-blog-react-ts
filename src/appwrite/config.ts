/* eslint-disable no-useless-catch */
import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

type input = {
	title: string;
	slug?: string;
	content: string;
	featuredImage: string;
	status: string;
	userId?: string;
};

class Service {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({
		title,
		slug,
		content,
		featuredImage,
		status,
		userId,
	}: input) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug as string,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log('appwrite service : create doc : ', error);
		}
	}

	async updatePost(
		slug: string,
		{ title, content, featuredImage, status }: input
	) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{ title, content, status, featuredImage }
			);
		} catch (error) {
			console.log('appwrite service : update doc : ', error);
		}
	}

	async deletePost(slug: string) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log('appwrite service : delete error : ', error);
			return false;
		}
	}

	async getPost(slug: string) {
		try {
		return await this.databases.getDocument(
			conf.appwriteDatabaseId,
			conf.appwriteCollectionId,
			slug
		);
			
		} catch (error) {
			console.log('appwrite sevice : getPost error : ', error);
			return false;
		}
	}

	async getPosts(queries: string[] = [Query.equal('status', 'active')]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log('appwrite service : getPosts error : ', error);
			return false;
		}
	}

	async uploadFile(file: File) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log('appwrite service : uploadFile error : ', error);
			return false;
		}
	}

	async deleteFile(fileId: string) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log('appwrite service : deleteFile error : ', error);
			return false;
		}
	}

	getFilePreview(fileId: string) {
		return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
	}
}

const service = new Service();

export default service;

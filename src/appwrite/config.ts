/* eslint-disable no-useless-catch */
import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export type createPostType = {
	title: string;
	slug: string;
	content: string;
	featuredImage: string;
	status: string;
	userId?: string;
};

type updatePostType = {
	title: string;
	content: string;
	featuredImage: string;
	status: string;
};

export class Service {
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
	}: createPostType) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log('Appwrite serive :: createPost :: error', error);
		}
	}

	async updatePost(
		slug: string,
		{ title, content, featuredImage, status }: updatePostType
	) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log('Appwrite serive :: updatePost :: error', error);
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
			console.log('Appwrite service :: deletePost :: error', error);
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
			console.log('Appwrite service :: getPost :: error', error);
			throw error;
		}
	}

	async getPosts(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log('Appwrite service :: getPosts :: error', error);
			return false;
		}
	}

	// file upload service

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log('Appwrite service :: uploadFile :: error', error);
			throw error;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log('Appwrite service :: deleteFile :: error', error);
			throw error;
		}
	}

	getFilePreview(fileId?: string) {
		if (fileId)
			return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
		else return null;
	}
}

const service = new Service();
export default service;

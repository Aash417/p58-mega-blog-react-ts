/* eslint-disable no-useless-catch */
import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

type signUpType = {
	email: string;
	password: string;
	name?: string;
};
export type loginType = {
	email: string;
	password: string;
};

class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }: signUpType) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// call another method
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }: loginType) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			throw error;
		}
		return null;
	}

	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			console.log('appwrite sevice : logout error : ', error);
		}
	}
	async getUserId() {
		const user = await this.getCurrentUser();
		return user ? user.$id : null;
	}
}

const authservice = new AuthService();

export default authservice;

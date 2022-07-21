import axios from 'axios';

export const API = axios.create({
	baseURL: String(process.env.REACT_APP_API_SERVER_URL),
	withCredentials: true
})
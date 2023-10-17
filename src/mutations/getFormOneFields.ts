import { FormOneRequest } from '@/types';
import axios from 'axios';

export default async function getFormOneFields(params: FormOneRequest) {
	try {
		const response = await axios.post('/api/v1/form-1', params);
		return response.data.content;
	} catch (error) {
		console.error(error);
	}
}
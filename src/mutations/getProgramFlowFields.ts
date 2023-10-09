import { ProgramFlowRequest } from '@/types';
import axios from 'axios';

export default async function getProgramFlowFields(params: ProgramFlowRequest) {
	try {
		const response = await axios.post('/api/v1/program-flow', params);
		return response.data.content;
	} catch (error) {
		console.error(error);
	}
}

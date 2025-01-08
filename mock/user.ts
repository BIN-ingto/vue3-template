import { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/api/user/info',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: {
					id: 1,
					name: 'John Doe',
					email: 'johndoe@example.com1'
				}
			}
		}
	},
	{
		url: '/api/test',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: {
					name: 'vben'
				}
			}
		}
	}
] as MockMethod[]

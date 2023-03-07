import ky, {BeforeErrorHook, HTTPError} from "ky"

const kyClient = ky.create({
  prefixUrl: `${import.meta.env.VITE_PREFIX_API_URL}/api`
}).extend({
  hooks: {
    beforeRequest: [
      (request, options)=> {
        const token = localStorage.getItem('ACCESS_TOKEN')
        if(token) request.headers.set("Authorization", `Bearer ${token}`)
      }
    ],
    beforeError: [
      (error: HTTPError) => {
        const { response } = error
        if(response && response.status === 401 ) {
          localStorage.removeItem('ACCESS_TOKEN')
        }
        throw error;
      }
    ]
  }
})
export default kyClient;

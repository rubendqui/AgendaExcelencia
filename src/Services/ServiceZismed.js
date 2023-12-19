import axios from "axios";
export default class ServiceZismed {
    constructor(){
        this.Url = "https://localhost:44372/api/"
        this.API =   axios.create({
            //http://200.63.165.201:3004/ApiSatizen/api
            //http://localhost:31417/api
            baseURL: this.Url,
            withCredentials: false,
            headers: {
                Accept: "applicacion/json"
            },
        });
    }
    async GetUser(user,pass) {
        let data = JSON.stringify({
            "usuario": user,
            "password": pass
          });
          let config = {
            maxBodyLength: Infinity,
            headers: { 
              'Content-Type': 'application/json', 
              'access-token': 'ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRnJhbmNlc2NhIiwiYXBlbGxpZG8iOiJRdWlub25leiIsImxvdmUiOiJBbW9yIG1pbyJ9.zeE7B7AYad5USq8pdOPGX6Flj7fqodKFJHmulcGEQ-4'
            },
          };
          
        let datas;
           await this.API.post('/Usuario/Login',data,config).then(x=>
                {
                    datas = x.data
                }).catch(x=>console.log(x))
            return datas;
        }

}
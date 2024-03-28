import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDg5MjYzMmVhMTJjNDMzNjQ4ZGI4OTVmZWY2MGY2MCIsInN1YiI6IjY1ZjczOTBkZTIxMDIzMDE0YmVkYTgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pt9562Z3e6rkM9VC6XrKov_gkvBHsGP0-7O4I11rzyw'
      }
})


export default instance;
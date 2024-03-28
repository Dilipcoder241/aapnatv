import axios from "../../Utils/axios";
import {loadMovie} from "../reducers/Movieslice";
export {removeMovie} from "../reducers/Movieslice";


export const asyncLoadMovie = (id) => async (dispatch , getstate) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalIds = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
        let ultimateDetails ={
            detail:detail.data,
            externalIds:externalIds.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find(m => m.type === "Trailer"),
            watchProviders:watchProviders.data.results.IN
        }
        dispatch(loadMovie(ultimateDetails))
    } catch (error) {
        console.log(error);
    }
}
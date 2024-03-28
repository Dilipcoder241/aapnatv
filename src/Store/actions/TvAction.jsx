export {removeTv} from "../reducers/tvSlice";
import axios from "../../Utils/axios";
import {loadTv} from "../reducers/tvSlice";


export const asyncLoadTv = (id) => async (dispatch , getstate) =>{
    const detail = await axios.get(`/tv/${id}`);
    const externalIds = await axios.get(`/tv/${id}/external_ids`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const ultimateDetails = {
        detail:detail.data,
        externalIds:externalIds.data,
        similar:similar.data.results,
        videos:videos.data.results.find(m => m.type === "Trailer"),
        watchProviders:watchProviders.data.results.IN,
    }

    dispatch(loadTv(ultimateDetails));

} 
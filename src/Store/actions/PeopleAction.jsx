import axios from "../../Utils/axios";
import {loadPerson} from "../reducers/personSlice";
export {removePerson} from "../reducers/personSlice";

export const asyncLoadPerson = (id) => async (dispatch , getstate)=>{
    const detail = await axios.get(`/person/${id}`);
    const externalIds = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    const ultimateData = {
        detail:detail.data,
        externalIds:externalIds.data,
        combinedCredits:combinedCredits.data,
        tvCredits:tvCredits.data,
        movieCredits:movieCredits.data
    }

    dispatch(loadPerson(ultimateData))
}
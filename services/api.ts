import { LatLon } from "@/types/citis";
import axios from "axios";
const Client=axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5"
});
export const APIKey="023984b43435bbea7cce5a18f3a71891"

export const GetCurrentWeather=async({lat,lon}:LatLon)=>{
   const {data} =await Client(`/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`);
   return data
   console.log(data);
   
}
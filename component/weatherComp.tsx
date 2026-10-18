"use client"

import { AppData } from "@/appdata/data";
import { GetCurrentWeather } from "@/services/api";
import { LatLon } from "@/types/citis";
import { WeatherResponse } from "@/types/weather";
import { useState } from "react";
import { Info } from "./InfoComp";

export const WeatherComp = () => {
    const [WeatherDatas, setWeatherDatas] = useState<WeatherResponse | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = e.target.value;
        if (!values) return;

        const SelectedLocation: LatLon = JSON.parse(values);
        const Result = await GetCurrentWeather({
            lat: SelectedLocation.lat,
            lon: SelectedLocation.lon,
        });

        setWeatherDatas(Result);
    };

    const formatTime = (t: number) =>
        new Date(t * 1000).toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Tehran",
        });

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
            {/* عنوان */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-8 drop-shadow-2xl">
                SKYAPP
            </h1>

            {/* سلکت شهر */}
            <div className="max-w-md mx-auto mb-10">
                <select
                    className="w-full p-3 sm:p-4 text-base sm:text-lg rounded-xl border-4 border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg"
                    onChange={handleChange}
                    defaultValue=""
                >
                    <option value="" disabled className="text-gray-700">
                        انتخاب شهر
                    </option>
                    {AppData.CitiesLocation.map(item => (
                        <option key={item.id} value={JSON.stringify(item)} className="text-gray-800">
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* کارت آب و هوا */}
            {WeatherDatas && (
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-2xl mx-auto border border-white/30">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">
                        {WeatherDatas.name}
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                        <img
                            src={`https://openweathermap.org/img/wn/${WeatherDatas.weather[0]?.icon}@4x.png`}
                            alt={WeatherDatas.weather[0]?.description || "وضعیت آب و هوا"}
                            className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-xl"
                        />
                        <div className="text-center sm:text-right">
                            <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white drop-shadow-2xl">
                                {(WeatherDatas.main.temp - 273.15).toFixed(1)}°
                            </p>
                            <p className="text-xl sm:text-2xl text-white/90 capitalize mt-2">
                                {WeatherDatas.weather[0]?.description}
                            </p>
                        </div>
                    </div>

                    {/* اطلاعات جزئی */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-white">
                        <Info label="احساس دما" value={`${(WeatherDatas.main.feels_like - 273.15).toFixed(1)}°C`} />
                        <Info label="رطوبت" value={`${WeatherDatas.main.humidity}%`} />
                        <Info label="فشار هوا" value={`${WeatherDatas.main.pressure} hPa`} />
                        <Info label="سرعت باد" value={`${WeatherDatas.wind.speed} m/s`} />
                        <Info label="ابرناکی" value={`${WeatherDatas.clouds.all}%`} />
                        <Info label="طلوع آفتاب" value={formatTime(WeatherDatas.sys.sunrise)} />
                        <Info label="غروب آفتاب" value={formatTime(WeatherDatas.sys.sunset)} />
                        <Info label="وضعیت" value={WeatherDatas.weather[0].description} />
                    </div>
                </div>
            )}
        </div>
    );
};
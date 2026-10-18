import { WeatherComp } from "@/component/weatherComp";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-400 to-blue-100 px-4 sm:px-6 lg:px-8 pt-8 pb-12 flex flex-col items-center justify-start">
      <WeatherComp />
    </div>
  );
}
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DropLoader from '../Loaders/DropLoader/DropLoader';





interface WeatherDataType {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: { lon: number; lat: number };
    dt: number;
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    name: string;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
        gust?: number; // gust may be absent
    };
}





const Weather = () => {
    console.log(process.env.NEXT_PUBLIC_WEATHER_API_KEY)
    const myAPI_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const [weatherData, setWeatherData] = useState<WeatherDataType[]>([]);
    const [timeNow, setTimeNow] = useState<string>();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const todayNumber = new Date().getDay()
    const today = dayNames[todayNumber]
    const otherDays = dayNames.slice(todayNumber + 1, 7).concat(dayNames.slice(0, todayNumber))
    useEffect(() => {
        const interval = setInterval(() => {
            const extractTimeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTimeNow(extractTimeNow);
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    console.log(dayNames[todayNumber])
    console.log(timeNow)

    const fetchWeather = async (city: string) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myAPI_key}`;
        return fetch(url).then((response) => response.json())
            .then((data) => {
                console.log(data)
                return data
            })
    }

    useEffect(() => {
        const cities = ['karachi', 'lahore', 'islamabad', 'queta', 'peshawar'];
        Promise.all(cities.map(fetchWeather))
            .then((data) => {
                setWeatherData(data); // Safely update state
                console.log(data); // Logs the final array with 5 objects
            });
    }, [])
    // console.log(allWeatherData)

    return (
        <div className='Weather min-h-screen sm:min-h-[unset] xl:min-h-screen
        bg-[url("https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg")]
        bg-no-repeat bg-cover bg-bottom bg-blend-color bg-black/50
         py-12 px-6 flex gap-6 justify-center '>

            {/* left side */}
            {
                weatherData.length > 0
                    ?
                    <div className="leftSide relative text-white w-full xl:w-1/2 flex flex-col justify-evenly sm:justify-between gap-10">
                        <div className="icon w-full sm:h-full sm:absolute text-[60px] text-center flex justify-center items-center">
                            <div className='flex flex-col items-center justify-center '>
                                <Image className='w-32 h-32' src={`/images/weather/${weatherData[0]?.weather[0].icon}.png`} alt='icon' width={300} height={300} />
                                <p className='text-[22px]'>{weatherData[0]?.weather[0].main}</p>
                            </div>
                        </div>
                        <div className="today flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                            <div className="temperatureSide">
                                <h1 className='text-[clamp(20px,20vw,60px)] sm:text-[60px]'>{Math.round(weatherData[0]?.main.temp)}<sup className=''>o</sup>C</h1>
                                <p className='text-[clamp(16px,5vw,22px)] sm:text-sm'>Precepitation: 2%</p>
                                <p className='text-[clamp(16px,5vw,22px)] sm:text-sm'>Humidity: {weatherData[0]?.main.humidity}%</p>
                                <p className='text-[clamp(16px,5vw,22px)] sm:text-sm'>Wind Speed: {weatherData[0]?.wind.speed}</p>
                            </div>

                            <div className="location text-[clamp(16px,5vw,22px)] sm:text-sm">
                                <p>{weatherData[0]?.name}, {weatherData[0]?.sys.country}</p>
                                <p>{today}, {timeNow}</p>
                            </div>
                        </div>

                        <div className="predictions hidden sm:flex jusstify-between gap-2">
                            {
                                otherDays.map((day, index: number) => {
                                    return (
                                        <div key={index} className="day py-4 px-2 flex-1 rounded-lg text-[10px] md:text-[14px] flex flex-col bg-black/50 backdrop-blur-lg gap-2 items-center">
                                            <h1>{day.slice(0, 3)}</h1>
                                            <div className="icon">
                                                <Image className='w-10 h-10' src={`/images/weather/${weatherData[0]?.weather[0].icon}.png`} alt='icon' width={100} height={100} />

                                            </div>
                                            <p>{Math.round(weatherData[0]?.main.temp + Math.random() * (4 * 2) - 4)} <sup>o</sup> c</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className='xl:w-1/2 flex items-center'>

                        <DropLoader />
                    </div>
            }


            {/* right side */}
            <div className="rightSide hidden text-white text-[1vmin] w-fit justify-end xl:w-1/2 sm:flex flex-wrap gap-2">

                {weatherData.length > 0 ?
                    weatherData?.slice(1, 5).map((weather: WeatherDataType, index: number) => {
                        return (
                            <div key={index} className={`city1 
                            ${index === 0 ? 'hidden sm:flex bg-gradient-to-r from-cyan-500/50 to-blue-500/50' :
                                    index === 1 ? 'hidden sm:flex bg-gradient-to-r from-green-300/50 to-green-700/50' :
                                        index === 2 ? 'hidden xl:flex bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50' :
                                            'hidden xl:flex bg-gradient-to-r from-red-400/50 to-red-700/50'
                                }
                            flex flex-col justify-center gap-10 rounded-lg w-full xl:w-[48%] h-1/2 py-8 px-6 `}
                            >
                                <div className="row1 text-[1.7vmin] flex justify-between">
                                    <div className="humiditySide">
                                        <p>Precepitation: 2%</p>
                                        <p>Humidity: {weather.main.humidity}%</p>
                                        <p>Wind Speed: {weather.wind.speed}</p>
                                    </div>
                                    <div className="location">
                                        <p>{weather.name}, {weather.sys.country}</p>
                                        <p>{today}</p>
                                        <p>{timeNow}</p>
                                    </div>
                                </div>
                                <div className="row2 text-center flex justify-center items-center gap-10">
                                    <div className="icon ">
                                        <Image className='w-20 h-20 object-contain' src={`/images/weather/${weather.weather[0].icon}.png`} alt='icon' width={300} height={300} />
                                    </div>
                                    <h1 className='text-[3vmin]'>{Math.round(weather.main.temp)}<sup className=''>o</sup>C</h1>
                                </div>
                            </div>
                        )
                    })
                    :
                    <DropLoader />
                }

            </div>
        </div>
    )
}

export default Weather
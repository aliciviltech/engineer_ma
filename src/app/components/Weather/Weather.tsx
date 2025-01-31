import Image from 'next/image';
import React, { useEffect, useState } from 'react'



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
    const myAPI_key = '13c34acc87a5f0efc6e2bf5854ae8a71';
    const [weatherData, setWeatherData] = useState<WeatherDataType[]>([]);
    const [timeNow, setTimeNow] = useState<string>();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const todayNumber = new Date().getDay()
    const today = dayNames[todayNumber]
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
        <div className='Weather  
        bg-[url("https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg")]
        bg-no-repeat bg-cover bg-bottom bg-blend-color bg-black/50
        min-h-[50vh] sm:h-fit py-12 px-6 flex gap-6'>

            {/* left side */}
            <div className="leftSide relative  text-white w-full xl:w-1/2 flex flex-col justify-between gap-10">
                <div className="icon w-full h-full sm:absolute text-[60px] text-center flex justify-center items-center">
                    <div className='flex flex-col items-center justify-center '>
                    <Image className='w-32 h-32' src={`/images/weather/${weatherData[0]?.weather[0].icon}.png`} alt='icon' width={300} height={300} />
                    <p className='text-[22px]'>{weatherData[0]?.weather[0].main}</p>
                    </div>
                </div>
                <div className="today flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                    <div className="temperatureSide">
                        <h1 className='text-[60px]'>{Math.round(weatherData[0]?.main.temp)}<sup className=''>o</sup>C</h1>
                        <p>Precepitation: 2%</p>
                        <p>Humidity: {weatherData[0]?.main.humidity}%</p>
                        <p>Wind Speed: {weatherData[0]?.wind.speed}</p>
                    </div>

                    <div className="location">
                        <p>{weatherData[0]?.name}, {weatherData[0]?.sys.country}</p>
                        <p>{today}, {timeNow}</p>
                    </div>
                </div>

                <div className="predictions hidden sm:flex jusstify-between gap-2">
                    {
                        [1, 2, 3, 4, 5, 6, 7].map((day,index:number) => {
                            return (
                                <div key={index} className="day py-4 px-2 flex-1 rounded-lg text-[14px] flex flex-col bg-black/50 backdrop-blur-lg gap-2 items-center">
                                    <h1>Tue</h1>
                                    <div className="icon">ICON</div>
                                    <p>30 <sup>o</sup> c</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* right side */}
            <div className="rightSide text-white text-[1vmin] w-fit justify-end xl:w-1/2 flex flex-wrap gap-2">

                {
                    weatherData?.slice(1, 5).map((weather:WeatherDataType, index:number) => {
                        return (
                            <div key={index} className={`city1 
                            ${index === 0 ? 'hidden sm:flex bg-gradient-to-r from-cyan-500/50 to-blue-500/50': 
                            index === 1 ? 'hidden sm:flex bg-gradient-to-r from-green-300/50 to-green-700/50':
                            index === 2 ? 'hidden xl:flex bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50':
                            'hidden xl:flex bg-gradient-to-r from-red-400/50 to-red-700/50'
                            }
                            flex flex-col gap-10 rounded-lg w-full xl:w-[48%] h-1/2 py-8 px-6`}
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
                }

            </div>
        </div>
    )
}

export default Weather
export default interface ICityInfo {
   name: string
   main: ICityInfo_Main
}

interface ICityInfo_Main {
   feels_like: number
   humidity: number
   pressure: number
   temp: number
   temp_max: number
   temp_min: number
}

export interface ICityInfo_Foreacst {
   daily: ICityInfo_ForeacstDaily[]
}

export interface ICityInfo_ForeacstDaily {
   dt: Date;
   temp: ICityInfo_ForeacstDailyTemp
}

export interface ICityInfo_ForeacstDailyTemp {
   morn: number
   day: number
   night: number
}

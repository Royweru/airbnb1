import countries from 'world-countries'

const formattedCountries = countries.map((country:any)=>({
    value:country.cca2,
    label:country.name.common,
    flag:country.flag,
    latlng:country.latlng,
    region:country.region
}))

export const useCountires = ()=>{
    const getAll = () =>formattedCountries

    const getByValue = (value:string)=>{
        return formattedCountries.find((item:any)=>item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}


import { settings } from "../Setting.js"


let allParks = []

const useParks = () => [...allParks]

const getParks = () => {
    return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${settings.npsKey}`)
    .then(response => response.json())
    .then(
        parsedResponse => {
        allParks = parsedResponse.data

    })

}
console.log(useParks);

const render = (parkList) => {
    
    const parkTarget = document.querySelector("#national-park-select")
    
    let options = parkList.map(singlePark => {
        return `<option value="${singlePark.id}">${singlePark.fullName}</option>`
    }).join("")
    
    parkTarget.innerHTML = `
    <select id="national-park__dropdown">
                <option value="0">Select an Park</option>
                ${options}
            </select>`
}


export const populateParks = () => {
    getParks()
    .then( () => {
        const parks = useParks()
        render(parks)
    }

    )
}
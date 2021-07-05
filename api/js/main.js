let form = document.querySelector('.racerform')


// Get Our Data
const getData = async () => {
    let season=document.querySelector("#season").value; 
    let round=document.querySelector("#round").value; 
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response.data)
    return response.data
}

const DOM_ELEMENTS = {
    racer_list: '#racer-list'
}


const create_list = (position, name, nationality, sponsor, points) => {
    const row= `
        <tr class="racers">
            <td>${position}</td>
            <td>${name}</td>
            <td>${nationality}</td>
            <td>${sponsor}</td>
            <td>${points}</td>
        </tr>`;
    document.querySelector(DOM_ELEMENTS.racer_list).insertAdjacentElement('beforeend', row)
}

const load_data = async () => {
    const racers = await getData();
    let racers_data = racers.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)
    console.log(racers_data)
    racers.forEach(element => create_list(element.position, element.name, element.nationality, element.sponsor, element.points))
}

const clear_data = () => {
    document.querySelector(DOM_ELEMENTS.racer_list).innerHTML = '';
}


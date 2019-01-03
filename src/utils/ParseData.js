const map = {
    'Measurement':
        {
            'date': 'x',
            'temp': 'y'
        }
};

function convert(date) {
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'Europe/Budapest'
    };
    return new Intl.DateTimeFormat('hu-HU', options).format(date);
};

export function getData(measurementsData) {
    let data = [];
    if (measurementsData) {
        data = measurementsData['measurements'];

        for (let m = 0; m <= data.length; m++) {
            for (let prop in data[m]) {
                if (data[m].hasOwnProperty(prop) && prop in map.Measurement) {
                    data[m][map.Measurement[prop]] = prop === 'date' ? convert(data[m][prop]) : data[m][prop];
                    delete data[m][prop];
                }
            }
        }

        data = [data];
    }
    return data;
};
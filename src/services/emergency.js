import axios from 'axios'


class Emergency {

    getEmergencies(){
        return axios
                .get('https://br6cad6dd4.execute-api.us-east-1.amazonaws.com/dev/emergency')
                .then(({data, status}) => {
                    return data;
                });
    }

    getEmergenciesByState(state){
        return axios
                .get(`https://br6cad6dd4.execute-api.us-east-1.amazonaws.com/dev/emergency/status/${state}`)
                .then(({data, status}) => {
                    return data;
                });
    }

    updateEmergency(emergency){
        return axios.put('https://br6cad6dd4.execute-api.us-east-1.amazonaws.com/dev/emergency', emergency)
                    .then(({data, status}) => {
                        return data;
                    });
    }
}

export default Emergency;
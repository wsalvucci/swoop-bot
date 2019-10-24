const app = require('./expressApp')

var response = {
    'status': null,
    'message': '',
    'data': null
}

varsityLoveSchedule = [
    {
        'date_time': 1572116400,
        'opponent': 'Frost Penguins RL',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1572721200,
        'opponent': 'KSUFlashes',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1573329600,
        'opponent': 'UC Bearcats D',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1573934400,
        'opponent': 'SSU Rocket League Gray',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1574539200,
        'opponent': 'WVU PSC Varsity',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1578772800,
        'opponent': 'UC Bearcats B',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1579377600,
        'opponent': 'Dos Rapido Dos Furioso',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1579982400,
        'opponent': 'GWU RL',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1581192000,
        'opponent': 'Ohio State Scarlet',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1581796800,
        'opponent': 'Ohio Bobcats',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1581883200,
        'opponent': 'Miami Uni Varsity Team Honor',
        'miami_score': null,
        'opp_score': null,
    }
]

varsityHonorSchedule = [
    {
        'date_time': 1572721200,
        'opponent': 'Ohio State Scarlet',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1573329600,
        'opponent': 'Ohio Bobcats',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1573934400,
        'opponent': 'UC Bearcats B',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1574539200,
        'opponent': 'SSU Varsity Rocket League',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1578772800,
        'opponent': 'Dos Rapido Dos Furioso',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1579377600,
        'opponent': 'KSUFlashes',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1579982400,
        'opponent': 'UC Bearcats D',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1580587200,
        'opponent': 'SSU Rocket League Gray',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1581192000,
        'opponent': 'WVU PSC Varsity',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1581796800,
        'opponent': 'Frost Penguins RL',
        'miami_score': null,
        'opp_score': null,
    },
    {
        'date_time': 1581883200,
        'opponent': 'Miami University Team Love',
        'miami_score': null,
        'opp_score': null,
    }
]

app.get('/schedules/rl', function (req, res) {
    const team = req.query['team']
    const subteam = req.query['subteam']

    if (team !== 'varsity' && team !== 'jv') {
        response['status'] = 'FAIL'
        response['message'] = 'Need to specify varsity or jv in the "team" parameter'
        response['data'] = team
        res.send(response)
        return;
    }

    if (subteam !== 'love' && subteam !== 'honor') {
        response['status'] = 'FAIL'
        response['message'] = 'Need to specify love or honor in the "subteam" parameter'
        response['data'] = subteam
        res.send(response)
        return;
    }

    switch (team) {
        case 'varsity':
            switch (subteam) {
                case 'love':
                    response['status'] = 'OK'
                    response['data'] = varsityLoveSchedule
                    break;
                case 'honor':
                    response['status'] = 'OK'
                    response['data'] = varsityHonorSchedule
                    break;
                default:
                    response['status'] = 'FAIL'
                    response['message'] = 'Team verification fail'
                    break;
            }
            break;
        case 'jv':
            switch (subteam) {
                case 'love':
                    response['status'] = 'OK'
                    break;
                case 'honor':
                    response['status'] = 'OK'
                    break;
                default:
                    response['status'] = 'FAIL'
                    response['message'] = 'Team verification fail'
                    break;
            }
            break;
        default:
            response['status'] = 'FAIL'
            response['message'] = 'Team verification fail'
            break;
    }

    res.send(response)
})
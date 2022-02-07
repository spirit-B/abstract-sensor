class Sensor {
    constructor(sensorId) {
        this.powerStatus = 'off';
        this.status = '';
        this.reportingInterval = 10000;
    }

    turn(status) {
        if (status === 'on') {
            if (this.powerStatus === 'on') throw new Error();
            else if (this.powerStatus === 'off') {
                this.powerStatus = status;
                this.status = 'idle';
                setTimeout(() => {
                    this.status = 'sensingDistance'; 
                    setInterval(() => {
                        this.status = 'reportingData';
                        setInterval(() => this.status = 'idle', 1000)
                    }, 500)
                }, this.reportingInterval);
            }
        } else if (status === 'off') {
            if (this.powerStatus === 'on') return this.powerStatus = status;
        }
    }
}

class IotServer {
    constructor() {
        this.sensorInfo = [];
    }

    start([sensor]) {
        this.sensorInfo.push(sensor);
    }

    publish(information) {
        const [info] = this.sensorInfo;
        if (information.actionId === 'CHANGE_REPORTING_INTERVAL') {
            if (info.powerStatus === 'on') {
                info.reportingInterval = information.payload;
            } else return;
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};

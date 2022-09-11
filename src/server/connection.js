import mongoConnection from '../connection/mongo';

export default class Connections {
    static buildConnections() {
        mongoConnection();
    }
}

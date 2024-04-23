class IpfsConstructor {
    constructor (Ipfs, OrbitDB) {
        this.Ipfs = Ipfs
        this.OrbitDB = OrbitDB
    }


    async create() {
        this.node = await this.Ipfs.create({
            preload: { enabled: false },
            repo: './ipfs',
            EXPERIMENTAL: { pubsub: true },
            config: {
                Bootstrap: [],
                Addresses: { Swarm: [] }
            }
        }).then(console.log("Node created."));
        this._init();
    }

    async _init() {
        this.orbitdb = await this.OrbitDB.createInstance(this.node)
        this.defaultOptions = { 
            accessController: {
                write: [this.orbitdb.identity.id]
            },
        }
        const docStoreOptions = {
            ...this.defaultOptions,
            indexBy: 'pubk',
        }
        this.records = await this.orbitdb.docs('records', docStoreOptions)
        await console.log("The id/address/multiaddress of the 'docstore' DB is " + this.orbitdb.identity.id);
        await this.records.load();
        // wait 2 secs
        await new Promise(done => setTimeout(() => done(), 2000));
        this.onready();
    }

    async addNewRecord(json) {
          const cid = await this.records.put(json)
          return cid
    }

    getAllRecords() {
        const records = this.records.get("")
        return records
    }

    getRecordByPubk(pubk) {
        const singleRecord = this.records.get(pubk)[0]
        return singleRecord
    }

    async updateRecordTxHashByPubk(pubk, txHash) {
        const record = await this.getRecordByPubk(pubk);
        record.txHash = txHash;
        return await this.records.put(record);
    }    
    
    async updateSubjectMark(pubk, subject, mark) {
        const record = await this.getRecordByPubk(pubk);
        record.subjects.forEach((sub) => {
            if (sub["Subject"] == subject){
                console.log("Before: " + sub["Mark"]);
                sub["Mark"] = mark;
                console.log("After: " + sub["Mark"]);
            }
        });
        return await this.records.put(record);
    }

}


try {
    const Ipfs = require('ipfs')
    const OrbitDB = require('orbit-db')
    module.exports = exports = new IpfsConstructor(Ipfs, OrbitDB)
} catch (e) {
    window.NPP = new IpfsConstructor(window.Ipfs, window.OrbitDB)
}
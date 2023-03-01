const counterModel = require('../models/counterModel').counterModel;

async function getNextSequence(sequenceName) {
    seqDoc = await counterModel.findByIdAndUpdate({ _id: sequenceName }, { $inc: { seq: 1 } });
    return seqDoc.seq;
}

module.exports = {getNextSequence};
import Counter from "../models/Counter.js";

const generateSequence = async (counterName, prefix) => {
    const counter = await Counter.findByIdAndUpdate(
        counterName,
        { $inc: { sequenceValue: 1 } },
        {
            new: true,
            upsert: true,
        }
    );

    const number = String(counter.sequenceValue).padStart(4, "0");

    return `${prefix}${number}`;
};

export default generateSequence;
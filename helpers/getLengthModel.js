export const getLengthModel = async (model, filter) => {
    try {
        // [id]
        const ids = await model.find(filter);
        if (ids) {
            return ids.length;
        } else {
            return false;
        }
    } catch (error) {}
};

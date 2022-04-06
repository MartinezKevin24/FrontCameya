export const INSERT_DATA = "INSERT_DATA";
export const CLEAR_DATA = "CLEAR_DATA";

export const insertData = (data) => {
    return{
        type: INSERT_DATA,
        payload: data
    }
}

export const clearData = () => {
    return{
        type: CLEAR_DATA,
    }
}
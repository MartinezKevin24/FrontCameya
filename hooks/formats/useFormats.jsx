export default function useFormats(){

  //Change the format of the frontend for the request to the api
  const changeFormatDate = (date) => {
    const selectedDate = new Date(date)
    return selectedDate.getFullYear() +"-"+ parseInt(selectedDate.getMonth()+1) +"-"+ selectedDate.getDate();
  }

  return{
    changeFormatDate
  }

}  
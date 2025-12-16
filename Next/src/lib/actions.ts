'use server';

import axios from "axios";



export async function addEmployee() {
    try{
        await axios.post('https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees')
        return {status: 'success' , message: 'Employee added successfully'}
    } catch(err) {
        return {status: false, message: 'Failed to add employee'}
    }


}

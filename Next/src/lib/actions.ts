//api bata data haru liyera data add garni or id anusar delte garni ki k garni update..?

'use server';

import { Employee } from "@/models/model";
import axios from "axios";



export async function addEmployee(employee: Employee) {
    try{
        await axios.post('https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees', employee );
        return {status: 'success' , message: 'Employee added successfully'}
    } catch(err) {
        return {status: false, message: 'Failed to add employee'}
    }


}

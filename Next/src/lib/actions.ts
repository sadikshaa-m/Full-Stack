//api bata data haru liyera data add garni or id anusar delte garni ki k garni update..?

'use server';

import { Employee } from "@/models/model";
import axios from "axios";
import { revalidatePath } from "next/cache";



export async function addEmployee(employee: Employee) {
    try{
        await axios.post('https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees', employee);
        revalidatePath('/');
        return {success: true , message: 'Employee added successfully'}
    } catch(err: any) {
        return {sucess: false, message: err.message}
    }


}



export async function getEmployees(): Promise<Employee[]> {
    try{
        const response = await axios.get('https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees');
       
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}


export async function updateEmployee(employee: Employee ) {
    try{
        await axios.patch(`https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees/${employee.id}`, employee);
        revalidatePath('/');
        return {success: true, message: 'Employee updated successfully'}
    } catch (err : any) {
        return {success: false, message: err.message}
    }
}



export async function removeEmployee(id: string) {
    try{
        await axios.delete(`https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees/${id}`);
        revalidatePath('/');
        return {success:true , message: 'Employee removed successfully'}

    } catch(err : any) {
        return {success:false , message: err.message}
    }
}
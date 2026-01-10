//hooks haru use garnu parcha so use client gareko
'use client';

import { Employee } from "@/models/model"
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Formik } from "formik";
import { addEmployee, updateEmployee } from "@/lib/actions";
import toast from "react-hot-toast";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";




export default function EditForm({ employee }: { employee: Employee }) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Update Employee</CardTitle>
        <CardDescription>
          Enter your details
        </CardDescription>

      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            name: employee.name,
            position: employee.position,
            age: employee.age,
          }}

          onSubmit={async (val: Employee) => {
            startTransition(async () => {
             
                const response = await updateEmployee({...val, id: employee.id});
                router.back();
                if(response.success){
                  toast.success(response.message);
                } else {
                  toast.error(response.message
                  );
                }
             
            });


          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">


                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="John Doe"
                  />

                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    onChange={handleChange}
                    value={values.position}
                    name="position"
                    placeholder="Dev"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    onChange={handleChange}
                    value={values.age}

                    type="number"
                    placeholder="90"
                  />
                </div>





                {isLoading ? <Button disabled className="w-full">
                  <Spinner /> Submit
                </Button> : <Button type="submit" className="w-full">
                  Submit
                </Button>}


              </div>
            </form>

          )}
        </Formik>

      </CardContent>

    </Card>
  )
}


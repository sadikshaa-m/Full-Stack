'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner";
import { addEmployee } from "@/lib/actions";
import { Formik } from "formik";
import { useTransition } from "react";


export default function EmployeeAdd() {

    const [isLoading, startTransition] = useTransition();


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>
          Enter your details
        </CardDescription>

      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            name: '',
            position: '',
            age: 0
          }}
          onSubmit={(val) => {
            startTransition(async() => {
try{
                const response = await addEmployee();
                console.log(response);
            } catch(err) {
                console.log(err);
            }
            })
            

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
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
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
import { Button } from "../components/ui/button"


export default function Home() {

  return (
    <div>

      <Button className="" >Click me</Button>

      <ChildCompo personName="ram" age={90} />




    </div>
  )
}


interface ChildCompoProps {
  personName: string,
  age: number
}

function ChildCompo({ personName, age }: ChildCompoProps) {

  return (
    <div>ChildCompo</div>
  )
}
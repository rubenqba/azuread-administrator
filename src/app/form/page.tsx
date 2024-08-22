import { submitForm } from "@action/forms";
import CheckboxFormWithAction from "@component/CheckboxFormWithAction";
import CheckboxFormWithSubmit from "@component/CheckboxFormWithSubmit";
import { Checkbox, Switch } from "@nextui-org/react";

export default function FormPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-grow gap-8">
        <div>
          <h1 className="text-2xl font-bold">Form with submit</h1>
          <CheckboxFormWithSubmit />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Form with action</h1>
          <CheckboxFormWithAction />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Form native</h1>
          <form action={submitForm}>
            <input type="hidden" name="id" value={new Date().toISOString()} />
            <Switch name="switch" >Selecciona para probar</Switch>
            <Checkbox name="checkbox" >Selecciona para probar</Checkbox>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}

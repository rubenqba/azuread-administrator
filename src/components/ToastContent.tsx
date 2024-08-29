import { FormErrorState } from "@model/forms";

export function FormErrorMessage({ error }: { error: FormErrorState }) {
  return (
    <div>
      <div className="header">{error.message}</div>
      <div className="description">
        <dl>
          {error.errors?.map((err) => (
            <>
              <dt key={err.path}>{err.path}</dt>
              <dd>{err.message}</dd>
            </>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function SimpleMessage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-medium font-semibold">{title}</h2>
      <p className="text-small">{description}</p>
    </div>
  );
}

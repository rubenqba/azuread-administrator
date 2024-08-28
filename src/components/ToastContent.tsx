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

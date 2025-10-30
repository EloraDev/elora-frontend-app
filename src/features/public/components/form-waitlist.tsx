import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";

const formWaitlistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
});

function FormWaitList() {
  const form = useForm<z.infer<typeof formWaitlistSchema>>({
    resolver: zodResolver(formWaitlistSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formWaitlistSchema>) => {
    console.log(JSON.stringify(data, null, 2));
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="font-roboto-mono text-sidebar-primary-foreground max-w-[555px] rounded-sm bg-[#ffffff33] px-6 pt-[26px] pb-[39px] backdrop-blur-sm md:px-17"
    >
      <h4 className="mb-5 text-base font-medium uppercase">
        join the waitlist
      </h4>
      <FieldGroup className="gap-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-xs uppercase" htmlFor={field.name}>
                name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Your name here"
                className="bg-sidebar-primary-foreground h-[61px] w-full rounded-[10px] pl-6 text-base text-black placeholder:text-base placeholder:font-medium placeholder:text-black placeholder:uppercase"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-xs uppercase" htmlFor={field.name}>
                email
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Your email here"
                className="bg-sidebar-primary-foreground h-[61px] w-full rounded-[10px] pl-6 text-base text-black placeholder:text-base placeholder:font-medium placeholder:text-black placeholder:uppercase"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}

export default FormWaitList;

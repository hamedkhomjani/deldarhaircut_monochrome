"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, type SelectOption } from "@/components/ui/field";
import { Rule } from "@/components/ui/rule";
import { cn } from "@/lib/cn";
import { services, team } from "@/lib/site";

const serviceOptions: SelectOption[] = services.map((service) => ({
  value: service.id,
  label: `${service.name} — ${service.duration}`,
}));

const barberOptions: SelectOption[] = [
  { value: "any", label: "No preference — first available" },
  ...team.map((member) => ({ value: member.name, label: member.name })),
];

/* Appointments are taken in half-hour steps. Held as data so the grid and
 * the validation message can never fall out of step with each other. */
const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

type Values = {
  name: string;
  email: string;
  phone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
  consent: boolean;
};

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  service: "",
  barber: "any",
  date: "",
  time: "",
  notes: "",
  consent: false,
};

type Errors = Partial<Record<keyof Values, string>>;

/** Deliberately permissive. The point is to catch a typo, not to adjudicate
 *  RFC 5322 — anything stricter rejects addresses that genuinely work. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A date in the past is refused. Evaluated on submit, on the client, so
 *  it reads the visitor's own clock — no server/client date disagreement to
 *  reconcile and no stale value baked in at build time. */
function isPastDate(value: string) {
  const endOfDay = new Date(`${value}T23:59:59`);
  return Number.isFinite(endOfDay.getTime()) && endOfDay.getTime() < Date.now();
}

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Required";
  if (!values.email.trim()) errors.email = "Required";
  else if (!EMAIL.test(values.email.trim())) errors.email = "Check this address";
  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "That number looks short";

  if (!values.service) errors.service = "Choose a service";
  if (!values.date) errors.date = "Choose a date";
  else if (isPastDate(values.date)) errors.date = "Pick today or later";
  if (!values.time) errors.time = "Choose a time";
  if (!values.consent) errors.consent = "We need your consent to hold the chair";

  return errors;
}

export function BookingForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    // Clear a field's error the moment it is corrected, so the summary and
    // the field never disagree about what is still wrong.
    setErrors((previous) =>
      previous[key] ? { ...previous, [key]: undefined } : previous,
    );
  };

  const errorList = Object.entries(errors).filter(
    (entry): entry is [keyof Values, string] => Boolean(entry[1]),
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Send focus to the summary rather than the first field: it is the
      // only way a non-sighted user learns that nine things are wrong at
      // once rather than one at a time.
      summaryRef.current?.focus();
      return;
    }

    setPending(true);
    const params = new URLSearchParams({
      name: values.name,
      email: values.email,
      service: values.service,
      barber: values.barber,
      date: values.date,
      time: values.time,
    });
    router.push(`/confirmation?${params.toString()}`);
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-12">
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className={cn(
          "flex flex-col gap-3 border border-ink p-6",
          errorList.length > 0 ? "block" : "hidden",
        )}
      >
        <p className="micro-label text-ink">
          {errorList.length} {errorList.length === 1 ? "detail" : "details"} need
          attention
        </p>
        <ul className="flex flex-col gap-1">
          {errorList.map(([key, message]) => (
            <li key={key} className="text-caption text-muted-ink">
              {message}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12">
        <Field
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(event) => set("name", event.target.value)}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(event) => set("email", event.target.value)}
        />
        <Field
          label="Telephone"
          name="phone"
          type="tel"
          autoComplete="tel"
          hint="Optional. The fastest way to reach you."
          value={values.phone}
          error={errors.phone}
          onChange={(event) => set("phone", event.target.value)}
        />
        <Field
          as="select"
          label="Service"
          name="service"
          required
          options={serviceOptions}
          value={values.service}
          error={errors.service}
          onChange={(event) => set("service", event.target.value)}
        />
        <Field
          as="select"
          label="Barber"
          name="barber"
          options={barberOptions}
          value={values.barber}
          onChange={(event) => set("barber", event.target.value)}
        />
        <Field
          label="Preferred date"
          name="date"
          type="date"
          required
          value={values.date}
          error={errors.date}
          onChange={(event) => set("date", event.target.value)}
        />
        <Field
          as="select"
          label="Preferred time"
          name="time"
          required
          options={times.map((time) => ({ value: time, label: time }))}
          value={values.time}
          error={errors.time}
          onChange={(event) => set("time", event.target.value)}
        />
        <Field
          as="textarea"
          label="Anything we should know"
          name="notes"
          rows={4}
          maxLength={400}
          hint="Optional. Allergies, a previous cut you liked, a deadline."
          placeholder="The last cut I liked was…"
          value={values.notes}
          onChange={(event) => set("notes", event.target.value)}
        />
      </div>

      <Rule />

      <Checkbox
        label="I agree to be contacted about this appointment, and understand that a booking is confirmed only once we reply."
        name="consent"
        required
        checked={values.consent}
        onChange={(event) => set("consent", event.target.checked)}
      />
      {errors.consent ? (
        <p className="micro-label -mt-8 text-ink" role="alert">
          {errors.consent}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Request this time"}
        </Button>
        <p className="micro-label text-muted-ink">
          We reply within one working day
        </p>
      </div>
    </form>
  );
}

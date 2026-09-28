import { cn } from "@/lib/cn";
import type {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

/* Fields are ruled lines, not boxes.
 *
 * The spec allows the 2px border to be full or bottom-only, and bottom-only
 * is the correct editorial gesture: it gives the form the same vocabulary as
 * `Rule`, so a booking page reads as the same document as the price list. A
 * filled box would have read as a different product.
 *
 * Focus is expressed as the border *thickening* from 2px to 4px rather than as
 * an outline. Both meet the 3:1 non-text contrast requirement, but the
 * outline has to be drawn 3px outside the control and would visually detach
 * from it, whereas a thicker rule reads as the same line being emphasised.
 * The global `:focus-visible` outline is switched off for form controls in
 * `globals.css` so the two do not stack.
 *
 * The thickness change is a `border-width` transition, not a `border-color`
 * one — Tailwind's `transition-colors` does not cover it, so the property is
 * named explicitly. The padding is also compensated: the rule grows by 2px,
 * so `py-4` (16) becomes `py-[15px]` to keep the control's outer height
 * identical. Without that the whole form would reflow 6px the moment a field
 * was focused, which is a layout jump rather than a state change. */
const control = cn(
  "w-full border-b-2 border-line bg-transparent",
  "py-4 text-body text-ink",
  "placeholder:text-muted-ink",
  "transition-colors duration-instant ease-sharp motion-reduce:transition-none",
  "hover:border-ink",
  "focus:border-4 focus:border-ink focus:py-[15px]",
);

/** A change from any of the three controls this field can render.
 *
 * All three expose `value`, so consumers read `event.target.value` without
 * narrowing. `Control` narrows back down to the concrete element when it
 * spreads the handler onto the actual tag. */
type FieldChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

type BaseProps = {
  label: string;
  /**
   * Required, and doubles as the element `id`. This keeps label/control
   * association airtight without threading a generated id through a context
   * (which is unavailable in Server Components). The only requirement is
   * that `name` is unique per page — which it must be anyway, because the
   * form has to post it.
   */
  name: string;
  hint?: string;
  /** Presence switches the control to its invalid state and announces it. */
  error?: string;
  required?: boolean;
  /** Present to control the field. Omit for an uncontrolled field. */
  value?: string;
  onChange?: (event: FieldChangeEvent) => void;
  children?: never;
  className?: string;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  /** Used by `type="date"` to prevent choosing a day in the past. */
  min?: string;
  defaultValue?: string;
};

type TextareaProps = BaseProps & {
  as: "textarea";
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: TextareaHTMLAttributes<"textarea">["maxLength"];
};

export type SelectOption = { value: string; label: string };

type SelectProps = BaseProps & {
  as: "select";
  options: readonly SelectOption[];
  defaultValue?: string;
};

export type FieldProps = InputProps | TextareaProps | SelectProps;

function Control({
  props,
  id,
  describedBy,
  invalid,
}: {
  props: FieldProps;
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
}) {
  const shared = {
    id,
    name: props.name,
    required: props.required,
    "aria-describedby": describedBy,
    "aria-invalid": invalid || undefined,
    className: control,
    value: props.value,
  };

  if (props.as === "textarea") {
    return (
      <textarea
        {...shared}
        rows={props.rows ?? 4}
        placeholder={props.placeholder}
        defaultValue={props.value === undefined ? props.defaultValue : undefined}
        maxLength={props.maxLength}
        onChange={props.onChange as ChangeEventHandler<HTMLTextAreaElement>}
        className={cn(control, "resize-y")}
      />
    );
  }

  if (props.as === "select") {
    return (
      <select
        {...shared}
        defaultValue={props.value === undefined ? props.defaultValue : undefined}
        onChange={props.onChange as ChangeEventHandler<HTMLSelectElement>}
        className={cn(control, "pr-8")}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      {...shared}
      type={props.type ?? "text"}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      min={props.min}
      defaultValue={props.value === undefined ? props.defaultValue : undefined}
      onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
    />
  );
}

/** Label, control, hint and error as one accessible unit.
 *
 * The component owns the `label`/`for` pair, the `aria-describedby` chain
 * and the invalid state, so no caller can ship a form control without a
 * label. That is the reason it renders the control itself rather than
 * accepting one as a child: the accessibility wiring cannot be forgotten,
 * because there is nothing to forget.
 */
export function Field(props: FieldProps) {
  const { label, name, hint, error, className } = props;
  const id = name;
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label htmlFor={id} className="micro-label text-muted-ink">
        {label}
        {props.required ? (
          <span aria-hidden="true" className="text-ink">
            {" "}
            *
          </span>
        ) : null}
      </label>

      <Control
        props={props}
        id={id}
        describedBy={describedBy}
        invalid={Boolean(error)}
      />

      {hint ? (
        <p id={hintId} className="text-caption text-muted-ink">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="micro-label text-ink"
          // Announced as soon as it appears, so a client using a screen
          // reader hears why submission was refused.
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type CheckboxProps = {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

/** A native checkbox, recoloured to the palette.
 *
 * The instinct here is a custom square plus a hand-drawn tick. The better
 * one is the platform control with `accent-color` pointed at the ink token:
 * it is keyboard- and screen-reader-correct for free, it scales with the
 * user's font size, and it is already perfectly square. Reimplementing it
 * would have cost accessibility and bought nothing.
 */
export function Checkbox({
  label,
  name,
  hint,
  className,
  required,
  ...rest
}: CheckboxProps) {
  const hintId = hint ? `${name}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-4">
        <input
          id={name}
          name={name}
          type="checkbox"
          required={required}
          aria-describedby={hintId}
          className="mt-1 size-4 shrink-0 accent-ink"
          {...rest}
        />
        <label htmlFor={name} className="text-caption text-muted-ink">
          {label}
        </label>
      </div>
      {hint ? (
        <p id={hintId} className="text-caption text-muted-ink">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** A read-only definition row, e.g. the confirmation summary. */
export function ReadOnlyRow({
  term,
  children,
  className,
}: {
  term: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-4",
        className,
      )}
    >
      <dt className="micro-label text-muted-ink">{term}</dt>
      <dd className="text-body text-ink">{children}</dd>
    </div>
  );
}

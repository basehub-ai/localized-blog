import { format } from "date-fns";
import * as fnsLocales from "date-fns/locale";

export default function DateComponent({
  dateString,
  locale,
}: {
  dateString: string;
  locale: string;
}) {
  return (
    <time dateTime={dateString} className="capitalize">
      {format(new Date(dateString), "LLLL	d, yyyy", {
        locale: fnsLocales[locale as keyof typeof fnsLocales],
      })}
    </time>
  );
}

import { LanguagesEnum } from "@/.basehub/schema";
import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";

export function Intro({ locale }: { locale: LanguagesEnum }) {
  return (
    <Pump
      queries={[
        {
          blog: {
            __args: {
              variants: {
                languages: locale,
              },
            },
            subtitle: {
              json: {
                content: true,
              },
            },
          },
        },
      ]}
    >
      {async ([{ blog }]) => {
        "use server";
        return (
          <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-16 md:mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
              Blog.
            </h1>
            <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
              <RichText
                content={blog.subtitle.json.content}
                components={{
                  a: (props) => (
                    <a
                      className="underline hover:text-orange-500 duration-200 transition-colors"
                      {...props}
                    />
                  ),
                }}
              />
            </h2>
          </section>
        );
      }}
    </Pump>
  );
}

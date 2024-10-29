import { Pump } from "basehub/react-pump";
import { Intro } from "../components/intro";
import { HeroPost, PostMetaFragment } from "../components/hero-post";
import { MoreStories } from "../components/more-stories";
import { LanguageEnum } from "@/.basehub/schema";
import { basehub } from "basehub";

export async function generateStaticParams() {
  const locales = await basehub().query({
    settings: {
      language: {
        variants: {
          apiName: true,
        },
      },
    },
  });

  return locales.settings.language.variants.map((v) => ({ locale: v.apiName }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: LanguageEnum }>;
}) {
  const { locale } = await params;
  return (
    <Pump
      queries={[
        {
          blog: {
            __args: {
              variants: {
                language: locale,
              },
            },
            morePosts: true,
            posts: {
              __args: { orderBy: "date__DESC" },
              items: PostMetaFragment,
            },
          },
        },
      ]}
    >
      {async ([{ blog }]) => {
        "use server";

        const heroPost = blog.posts.items[0];
        const morePosts = blog.posts.items.slice(1);

        return (
          <main>
            <section className="container mx-auto px-5">
              <Intro locale={locale} />
              {heroPost && <HeroPost {...heroPost} locale={locale} />}
              <MoreStories
                morePosts={morePosts}
                title={blog.morePosts}
                locale={locale}
              />
            </section>
          </main>
        );
      }}
    </Pump>
  );
}

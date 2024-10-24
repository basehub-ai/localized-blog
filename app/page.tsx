"use cache";
import { Pump } from "basehub/react-pump";
import { Intro } from "./components/intro";
import { HeroPost, PostMetaFragment } from "./components/hero-post";
import { MoreStories } from "./components/more-stories";

export default async function Page() {
  return (
    <Pump
      queries={[
        {
          blog: {
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
              <Intro />
              {heroPost && <HeroPost {...heroPost} />}
              <MoreStories morePosts={morePosts} />
            </section>
          </main>
        );
      }}
    </Pump>
  );
}

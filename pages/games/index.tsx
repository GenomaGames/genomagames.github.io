import { GetStaticProps, GetStaticPropsResult } from "next";
import Layout from "@/components/layout";

interface Props {
  games: {
    title: string;
    description: string;
    publishedAt: Date | null;
  }[];
}

const IndexPage: React.JSXElementConstructor<Props> = (props: Props) => {
  return (
    <Layout>
      {props.games.map((game, index) => {
        return (
          <article key={index}>
            <header>
              <h2>{game.title}</h2>
            </header>
            <div>{game.description}</div>
            <footer>
              <span>TBD</span>
            </footer>
          </article>
        );
      })}
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const result: GetStaticPropsResult<Props> = {
    props: {
      games: [
        {
          description:
            "Genoma Invaders is a Fixed shooter - Shoot 'em up game developed to teach the basics for game development in Unity which development is explained through a series of tutorials.",
          publishedAt: null,
          title: "Genoma Invaders",
        },
      ],
    },
  };

  return result;
};

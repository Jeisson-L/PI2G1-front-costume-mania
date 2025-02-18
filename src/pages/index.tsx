import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import {
  getPopularCostumes,
  getNewCostumes,
} from "@/services/costumes.service";
import { ApiCostume, Category, Costume } from "@/interfaces/costume";
import Banner from "@/components/MainBanner";
import HomeSection from "@/components/HomeSection";
import InfoBanner from "@/components/InfoBanner";
import CostumesSection from "@/components/CostumesSection";
import spot1 from "@assets/spot1.png";
import custome1 from "@assets/custome1.png";
import spot2 from "@assets/spot2.png";
import custome2 from "@assets/custome2.png";
import RootLayout from "@/layouts/rootLayout";
import CategoriesBanner from "@/components/CategoriesBanner";
import { getCategories } from "@/services/categories.service";

interface Props {
  newCostumes: ApiCostume[];
  popularCostumes: ApiCostume[];
  categories: Category[];
}

const bannersInfo = [
  {
    title: "WHERE PERSONALITY MEETS FABRIC",
    mainImage: custome1,
    backgroundImage: spot1,
    text: "Personal style in fashion is more than just what you wear—it's a visual manifestation of your personality. It's the art of curating outfits that resonate with your inner essence.",
  },
  {
    title: "INTERSECTION OF CONFIDENCE AND COUTURE",
    mainImage: custome2,
    backgroundImage: spot2,
    text: "Staying confidently true to who you are in fashion involves embracing your quirks. It's about exuding an authenticity that is truly captivating.",
  },
];

const HomePage: NextPage<Props> = ({
  newCostumes,
  popularCostumes,
  categories,
}) => {
  return (
    <RootLayout>
      <Head>
        <title>Costume Mania</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeSection>
        <Banner></Banner>
      </HomeSection>
      <HomeSection additionalClasses="bg-purple-3 bg-opacity-20">
        <CostumesSection title="Popular Models" costumes={popularCostumes} />
      </HomeSection>
      <HomeSection additionalClasses="bg-opacity-20">
        <CategoriesBanner
          title="Categories"
          categories={categories}
        ></CategoriesBanner>
      </HomeSection>
      <HomeSection additionalClasses="bg-purple-3 bg-opacity-20">
        <CostumesSection title="New Arrivals" costumes={newCostumes} />
      </HomeSection>
      <HomeSection>
        <InfoBanner {...bannersInfo[0]} />
      </HomeSection>
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const popularCostumes = await getPopularCostumes();
  const newCostumes = await getNewCostumes();
  const categories = await getCategories();

  return {
    props: {
      newCostumes,
      popularCostumes,
      categories,
    },
  };
};

export default HomePage;

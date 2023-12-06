import Head from "next/head";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getStaticNewCostumes, getStaticPopularCostumes } from "@/services/costumes.service";
import { ApiCostume, Category } from "@/interfaces/costume";
import Banner from "@/components/MainBanner";
import HomeSection from "@/components/HomeSection";
import InfoBanner from "@/components/InfoBanner";
import CostumesSection from "@/components/CostumesSection";
import spot1 from "@assets/spot1.png";
import custome1 from "@assets/custome1.png";
import spot2 from "@assets/spot2.png";
import custome2 from "@assets/custome2.png";
import santaImage from "@assets/santa.png";
import RootLayout from "@/layouts/rootLayout";
import CategoriesBanner from "@/components/CategoriesBanner";
import { getCategories } from "@/services/categories.service";
import Snowfall from "react-snowfall";

interface Props {
  newCostumes: ApiCostume[];
  popularCostumes: ApiCostume[];
  categories: Category[];
}

const bannersInfo = [
  {
    title: "CELEBRATE CHRISTMAS IN STYLE",
    mainImage: santaImage,
    backgroundImage: spot1,
    text: "Explore our festive collection of Christmas costumes! From jolly Santas to cheerful elves, find the perfect outfit to make this holiday season extra special.",
  },
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
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "70",
        }}
        snowflakeCount={100}
      />
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
          <CategoriesBanner title="Categories" categories={categories} />
        </HomeSection>
        <HomeSection additionalClasses="bg-opacity-20">
          <CostumesSection title="New Arrivals" costumes={newCostumes} />
        </HomeSection>
        <HomeSection additionalClasses="bg-purple-3 bg-opacity-20">
          <InfoBanner {...bannersInfo[0]} />
        </HomeSection>
        <HomeSection>
          <CostumesSection
            title="Popular Models"
            costumes={popularCostumes.reverse()}
          />
        </HomeSection>
      </RootLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const popularCostumes = await getStaticPopularCostumes();
  const newCostumes = await getStaticNewCostumes();
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

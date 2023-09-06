import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Container from "@/components/Container";
import VideoSearch from "@/components/VideoSearch";
import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Social from "@/components/Social";
import FeatureCard from "@/components/FeatureCard";
import VideoDownloadList from "@/components/VideoDownloadList";
import useRequestVideo from "@/hooks/useRequestVideo";
import { getSupportedDownloaders } from "@/utils";
import Loader from "@/components/Loader";
import VideoDownloadError from "@/components/VideoDownloadError";

const socials = [
  { icon: <FaFacebook />, text: "Facebook" },
  { icon: <FaYoutube />, text: "Youtube" },
  { icon: <FaTwitter />, text: "Twitter" },
  { icon: <FaLinkedin />, text: "LinkedIn" },
  { icon: <FaInstagram />, text: "Instagram" },
];

const features: Array<{ title: string; description: string }> = [
  {
    title: "Multiple video formats and quality",
    description:
      "We support downloading video in different formats of your choice such as mp4, webm and different qualities like 360p, 720p and so on.",
  },
  {
    title: "Security and data protection",
    description:
      "SaveVideo will not save your video data, user data or any personal information on it's servers",
  },
  {
    title: "Accesible for free",
    description:
      "No need for a paid subscription, our video downloader is free and will remain so",
  },
  {
    title: "Multiple websites supported",
    description:
      "We support downloading videos from a variety of websites such as Facebook, Twitter, Youtube...",
  },
];

export default function Home() {
  const { sendRequest, isLoading, error, data } = useRequestVideo();

  const handleSubmit = async (url: string) => {
    await sendRequest("", url);
  };

  return (
    <>
      <Head>
        <title>Video Downloader</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.hero}>
        <Container gutter={false} className={styles["hero-container"]}>
          <Image
            src="/y.svg"
            alt="Hero Image"
            className={styles["hero-image"]}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <h2 className={styles["hero-title"]}>
            Download Videos From <br /> Your Favourite Social Media
          </h2>
          <p className={styles["hero-description"]}>
            Choose any supported video format of your choice.{" "}
            <span>
              Download any video offline and watch when ever you want to.
            </span>
          </p>
          <div className={styles["hero-input"]}>
            <VideoSearch
              className={styles["hero-text-input"]}
              onSubmit={handleSubmit}
              placeholder="Paste your video link here"
            />
          </div>
        </Container>
        <Container className={styles["hero-video"]}>
          <div>
            {isLoading && (
              <div className={styles["hero-loading"]}>
                <Loader />
              </div>
            )}
            {error && (
              <div className={styles["hero-error"]}>
                <VideoDownloadError message={error} />
              </div>
            )}
            {data && <VideoDownloadList videoData={data} />}
          </div>
        </Container>
      </section>
      <section className={styles["social"]}>
        <Container>
          <h3 className={styles["social-title"]}>
            Your favourite Social Media is not left out
          </h3>
          <div className={styles["social-icons"]}>
            {socials.map((social) => (
              <div key={social.text} className={styles["social-icon"]}>
                <Social icon={social.icon} text={social.text} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className={styles["feature"]}>
        <Container>
          <header className={styles["header"]}>
            <h4 className={styles["feature-subtitle"]}>Core Features</h4>
            <h2 className={styles["feature-title"]}>
              What makes our services exceptional from others
            </h2>
          </header>
          <div className={styles["cards"]}>
            {features.map((feature, index) => (
              <div className={styles["card-wrapper"]} key={index}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const downloaders = await getSupportedDownloaders();
  return {
    props: {
      downloaders,
    },
    revalidate: 60 * 60,
  };
};

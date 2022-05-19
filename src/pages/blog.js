// Stylesheet
import styles from "@styles/Blog/Blog.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// Local components
import BlogPost from "@components/Blog/BlogPost.js";
// MongoDB
import clientPromise from "@lib/mongodb.js";

const Blog = (props) => {
    // Calculate total number of pages
    const getNumPages = () => {
        return Math.floor(props.posts.length / 5) + 1;
    };

    return (
        <div id={styles.blog}>
            <Head>
                <title>Blog | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id={styles.control}>
                <p id={styles["page-num"]}>Page 1 of {getNumPages()}</p>
                <div id={styles["control-buttons"]}>
                    <Link href="/post">
                        <a
                            id={styles["new-post"]}
                            className={styles["control-button"]}
                        >
                            <Image
                                src="/icons/add.svg"
                                alt=""
                                height={16}
                                width={16}
                            />
                            <p className={styles["button-text"]}>New Post</p>
                        </a>
                    </Link>
                    <button className={styles["control-button"]}>
                        <Image
                            src="/icons/sort.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Sort By</p>
                    </button>
                    <button className={styles["control-button"]}>
                        <Image
                            src="/icons/filter.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Filter</p>
                    </button>
                </div>
            </div>
            <ul id={styles.posts}>
                {props.posts.map(function (post, i) {
                    return (
                        <li className={styles["blog-post"]} key={i}>
                            <BlogPost post={post} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// Fetch all posts, sorted from most recent -> least recent
export async function getServerSideProps() {
    // Fetch from MongoDB
    const client = await clientPromise;
    const db = client.db("VickyDelk");
    let posts = await db
        .collection("posts")
        .find({})
        .sort({ timestamp: -1 })
        .toArray();
    posts = JSON.parse(JSON.stringify(posts));
    return {
        props: { posts },
    };
}

export default Blog;

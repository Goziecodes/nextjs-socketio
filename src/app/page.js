'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';
import { MyForm } from './MyForm';
import { Events } from './Events';



// "undefined" means the URL will be computed from the `window.location` object


export default function Home() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  console.log({ isConnected })
  console.log({ fooEvents })

  // socket.on('error', e => console.log({ e }, "error>>"));
  // socket.on('error', console.log("<<error>>"));
  // socket.on('connect', console.log(socket.connected, "conn"));
  socket.on("connect", () => {
    console.log(socket.id, "soc id"); // x8WIv7-mJelg7on_ALbx
  });
  // socket.on('disconnect', console.log("disconnect"));


  useEffect(() => {
    function onConnect() {
      console.log("connecting.....")
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Disconnecting.....")
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log({ value }, "value")
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('spray_event', onFooEvent);
    socket.on("spray_event", data => {
      console.log({ data }, "spray")
    });
    socket.on("spray_event", data => {
      console.log({ data }, "spray")
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('spray_event', onFooEvent);
    };
  }, []);

  return (
    <main className={styles.main}>


      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
        <ConnectionState isConnected={isConnected} />
        <Events events={fooEvents} />
        <ConnectionManager />
        {/* <MyForm /> */}

      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}

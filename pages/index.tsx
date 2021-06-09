import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="home">
      <div className="game-intro">
        每個人都有便秘的時候，而對於每個人的腸胃來說，都存在著可以幫助人們大便的淸道夫以及阻礙人們排便的搗蛋鬼。
        <br />
        <br />
        腸胃淸道夫是一個陣營遊戲，透過讓玩家們化身為友善的淸道夫、調皮的搗蛋鬼，用不同的角度去理解在日常生活中的種種細節，是如何影響到大便的誕生！
        <div
          className="button"
          onClick={() => {
            router.push(`/intro`);
          }}
        >
          {". . . "} 更多遊戲介紹
        </div>
        {/* <img src="/img/game.jpeg" /> */}
      </div>
      <div className="game-start">
        <div
          className="button"
          onClick={() => {
            router.push(`/startGame`);
          }}
        >
          <span>遊戲試玩</span>
        </div>
      </div>
    </div>
  );
}
